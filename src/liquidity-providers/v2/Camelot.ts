import { getCreate2Address } from "@ethersproject/address";
import { add, getUnixTime } from "date-fns";
import { Address, Hex, PublicClient, encodePacked, keccak256, parseAbi } from "viem";
import { ChainId } from "../../chain";
import { ADDITIONAL_BASES, BASES_TO_CHECK_TRADES_AGAINST } from "../../config";
import { Token } from "../../currency";
import { ConstantProductRPool, RToken } from "../../tines";
import { getCurrencyCombinations } from "../../getCurrencyCombinations";
import { PoolResponse2, filterOnDemandPools } from "../../lib/api";
import { ConstantProductPoolCode, type PoolCode } from "../../pool-codes";
import { LiquidityProvider, LiquidityProviders } from "../LiquidityProvider";
import { memoizer } from "../../memoizer";

interface PoolInfo {
  poolCode: PoolCode;
  validUntilTimestamp: number;
}

interface StaticPool {
  address: Address;
  token0: Token;
  token1: Token;
  fee: number;
}

const getReservesAbi = parseAbi([
  "function getReserves() public view returns (uint112 _reserve0, uint112 _reserve1, uint16 _token0FeePercent, uint16 _token1FeePercent)",
]);

export class CamelotProvider extends LiquidityProvider {
  getType(): LiquidityProviders {
    return LiquidityProviders.Camelot;
  }
  getPoolProviderName(): string {
    return "Camelot";
  }
  readonly TOP_POOL_SIZE = 155;
  readonly TOP_POOL_LIQUIDITY_THRESHOLD = 5000;
  readonly ON_DEMAND_POOL_SIZE = 20;
  readonly REFRESH_INITIAL_POOLS_INTERVAL = 60; // SECONDS

  topPools: Map<Address, PoolCode> = new Map();
  poolsByTrade: Map<string, Address[]> = new Map();
  onDemandPools: Map<Address, PoolInfo> = new Map();
  availablePools: Map<Address, PoolResponse2> = new Map();
  staticPools: Map<Address, PoolResponse2> = new Map();

  blockListener?: () => void;
  unwatchBlockNumber?: () => void;

  fee = 0.003;
  isInitialized = false;
  factory: Record<number, Address> = {};
  initCodeHash: Record<number, Hex> = {};
  latestPoolCreatedAtTimestamp = new Date();
  discoverNewPoolsTimestamp = getUnixTime(
    add(Date.now(), { seconds: this.REFRESH_INITIAL_POOLS_INTERVAL }),
  );
  refreshAvailablePoolsTimestamp = getUnixTime(
    add(Date.now(), { seconds: this.FETCH_AVAILABLE_POOLS_AFTER_SECONDS }),
  );

  constructor(chainId: ChainId, web3Client: PublicClient) {
    super(chainId, web3Client);
    this.factory = {
      [ChainId.ARBITRUM]: "0x6EcCab422D763aC031210895C81787E87B43A652",
    };
    this.initCodeHash = {
      [ChainId.ARBITRUM]: "0xa856464ae65f7619087bc369daaf7e387dae1e5af69cfa7935850ebf754b04c1",
    };
    if (!(chainId in this.factory) || !(chainId in this.initCodeHash)) {
      throw new Error(
        `${this.getType()} cannot be instantiated for chainid ${chainId}, no factory or initCodeHash`,
      );
    }
  }

  async getOnDemandPools(
    t0: Token,
    t1: Token,
    excludePools?: Set<string>,
    options?: { blockNumber?: bigint; memoize?: boolean },
  ): Promise<void> {
    const topPoolAddresses = Array.from(this.topPools.keys());
    let pools =
      topPoolAddresses.length > 0
        ? filterOnDemandPools(
            Array.from(this.availablePools.values()),
            t0.address,
            t1.address,
            topPoolAddresses,
            this.ON_DEMAND_POOL_SIZE,
          )
        : this.getStaticPools(t0, t1);
    if (excludePools) pools = (pools as StaticPool[]).filter((p) => !excludePools.has(p.address));
    if (pools.length === 0) {
      //console.info(`${this.getLogPrefix()} - No on demand pools found for ${t0.symbol}/${t1.symbol}`)
      return;
    }

    this.poolsByTrade.set(
      this.getTradeId(t0, t1),
      pools.map((pool) => pool.address),
    );
    const validUntilTimestamp = getUnixTime(
      add(Date.now(), { seconds: this.ON_DEMAND_POOLS_LIFETIME_IN_SECONDS }),
    );

    // let created = 0
    // let updated = 0
    const poolCodesToCreate: PoolCode[] = [];
    pools.forEach((pool) => {
      const existingPool = this.onDemandPools.get(pool.address);
      if (existingPool === undefined) {
        const token0 = pool.token0 as RToken;
        const token1 = pool.token1 as RToken;

        const rPool = new ConstantProductRPool(pool.address, token0, token1, this.fee, 0n, 0n);
        const pc = new ConstantProductPoolCode(rPool, this.getType(), this.getPoolProviderName());
        poolCodesToCreate.push(pc);
      } else {
        existingPool.validUntilTimestamp = validUntilTimestamp;
        // ++updated
      }
    });

    const multicallMemoize = await memoizer.fn(this.client.multicall);

    const reserves: any = options?.memoize
      ? await multicallMemoize({
          multicallAddress: this.client.chain?.contracts?.multicall3?.address as Address,
          allowFailure: true,
          blockNumber: options?.blockNumber,
          contracts: poolCodesToCreate.map(
            (poolCode) =>
              ({
                address: poolCode.pool.address as Address,
                chainId: this.chainId,
                abi: getReservesAbi,
                functionName: "getReserves",
              }) as const,
          ),
        })
      : await this.client
          .multicall({
            multicallAddress: this.client.chain?.contracts?.multicall3?.address as Address,
            allowFailure: true,
            blockNumber: options?.blockNumber,
            contracts: poolCodesToCreate.map(
              (poolCode) =>
                ({
                  address: poolCode.pool.address as Address,
                  chainId: this.chainId,
                  abi: getReservesAbi,
                  functionName: "getReserves",
                }) as const,
            ),
          })
          .catch((e) => {
            console.warn(
              `${this.getLogPrefix()} - UPDATE: on-demand pools multicall failed, message: ${
                e.message
              }`,
            );
            return undefined;
          });

    poolCodesToCreate.forEach((poolCode, i) => {
      const pool = poolCode.pool;
      const res0 = reserves?.[i]?.result?.[0];
      const res1 = reserves?.[i]?.result?.[1];

      if (res0 !== undefined && res1 !== undefined) {
        pool.updateReserves(res0, res1);
        this.onDemandPools.set(pool.address, { poolCode, validUntilTimestamp });
        // console.debug(
        //   `${this.getLogPrefix()} - ON DEMAND CREATION: ${pool.address} (${pool.token0.symbol}/${pool.token1.symbol})`
        // )
        // ++created
      } else {
        // Pool doesn't exist?
        // console.error(`${this.getLogPrefix()} - ERROR FETCHING RESERVES, initialize on demand pool: ${pool.address}`)
      }
    });

    // console.debug(
    //   `${this.getLogPrefix()} - ON DEMAND: Created and fetched reserves for ${created} pools, extended 'lifetime' for ${updated} pools`
    // )
  }

  _getPoolAddress(t1: Token, t2: Token): Address {
    return getCreate2Address(
      this.factory[this.chainId as keyof typeof this.factory],
      keccak256(
        encodePacked(["address", "address"], [t1.address as Address, t2.address as Address]),
      ),
      this.initCodeHash[this.chainId as keyof typeof this.initCodeHash],
    ) as Address;
  }

  // TODO: Decide if this is worth keeping as fallback in case fetching top pools fails? only used on initial load.
  _getProspectiveTokens(t0: Token, t1: Token) {
    const set = new Set<Token>([
      t0,
      t1,
      ...(BASES_TO_CHECK_TRADES_AGAINST?.[this.chainId] ?? []),
      ...(ADDITIONAL_BASES?.[this.chainId]?.[t0.address] ?? []),
      ...(ADDITIONAL_BASES?.[this.chainId]?.[t1.address] ?? []),
    ]);
    return Array.from(set);
  }

  getStaticPools(t1: Token, t2: Token): StaticPool[] {
    const currencyCombination = getCurrencyCombinations(this.chainId, t1, t2).map(([c0, c1]) =>
      c0.sortsBefore(c1) ? [c0, c1] : [c1, c0],
    );
    return currencyCombination.map((combination) => ({
      address: this._getPoolAddress(combination[0]!, combination[1]!),
      token0: combination[0]!,
      token1: combination[1]!,
      fee: this.fee,
    }));
    // return pools
  }

  startFetchPoolsData() {
    this.stopFetchPoolsData();
    this.topPools = new Map();
  }

  async fetchPoolsForToken(
    t0: Token,
    t1: Token,
    excludePools?: Set<string>,
    options?: { blockNumber?: bigint; memoize?: boolean },
  ): Promise<void> {
    await this.getOnDemandPools(t0, t1, excludePools, options);
  }

  /**
   * The pools returned are the initial pools, plus any on demand pools that have been fetched for the two tokens.
   * @param t0
   * @param t1
   * @returns
   */
  getCurrentPoolList(t0: Token, t1: Token): PoolCode[] {
    const tradeId = this.getTradeId(t0, t1);
    const poolsByTrade = this.poolsByTrade.get(tradeId) ?? [];
    const onDemandPoolCodes = poolsByTrade
      ? Array.from(this.onDemandPools)
          .filter(([poolAddress]) => poolsByTrade.includes(poolAddress))
          .map(([, p]) => p.poolCode)
      : [];

    return [...this.topPools.values(), onDemandPoolCodes].flat();
  }

  stopFetchPoolsData() {
    if (this.unwatchBlockNumber) this.unwatchBlockNumber();
    this.blockListener = undefined;
  }
}
