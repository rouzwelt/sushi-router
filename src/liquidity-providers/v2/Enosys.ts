import { add, getUnixTime } from "date-fns";
import { Address, Hex, PublicClient } from "viem";
import { getReservesAbi } from "../../abi";
import { ChainId } from "../../chain";
import { Token } from "../../currency";
import { ConstantProductRPool, RToken } from "../../tines";
import { getCurrencyCombinationsEnosys } from "../../getCurrencyCombinations";
import { PoolResponse2, filterOnDemandPools } from "../../lib/api";
import { ConstantProductPoolCode, type PoolCode } from "../../pool-codes";
import { LiquidityProvider, LiquidityProviders } from "../LiquidityProvider";
import { memoizer } from "../../memoizer";
import { ENOSYS_APS, ENOSYS_BNZ, ENOSYS_EQNT, ENOSYS_HLN, USDT, WETH9, WNATIVE } from "../../currency";

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

export class EnosysProvider extends LiquidityProvider {
  getType(): LiquidityProviders {
    return LiquidityProviders.Enosys;
  }
  getPoolProviderName(): string {
    return "Enosys";
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
    if (chainId !== ChainId.FLARE) {
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

  getStaticPools(t1: Token, t2: Token): StaticPool[] {
    const currencyCombination = getCurrencyCombinationsEnosys(this.chainId, t1, t2).map(
      ([c0, c1]) => (c0.sortsBefore(c1) ? [c0, c1] : [c1, c0]),
    );
    return currencyCombination
      .map((combination) => {
        const p = getEnosysPoolAddress(combination[0], combination[1]);
        if (p)
          return {
            address: getEnosysPoolAddress(combination[0], combination[1]),
            token0: combination[0],
            token1: combination[1],
            fee: this.fee,
          };
        else return null;
      })
      .filter((v) => v !== null) as StaticPool[];
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

function getEnosysPoolAddress(t1: Token, t2: Token): string | undefined {
  for (let i = 0; i < EnosysPools.length; i++) {
    if (
      (t1.address.toLowerCase() === EnosysPools[i].token0.toLowerCase() &&
        t2.address.toLowerCase() === EnosysPools[i].token1.toLowerCase()) ||
      (t1.address.toLowerCase() === EnosysPools[i].token1.toLowerCase() &&
        t2.address.toLowerCase() === EnosysPools[i].token0.toLowerCase())
    )
      return EnosysPools[i].address;
  }
  return;
}

export const EnosysTokens = [
  WNATIVE[ChainId.FLARE],
  USDT[ChainId.FLARE],
  WETH9[ChainId.FLARE],
  ENOSYS_BNZ,
  ENOSYS_EQNT,
  ENOSYS_HLN,
  ENOSYS_APS,
];

export const EnosysPools = [
  {
    address: "0x7520005032F43229F606d3ACeae97045b9D6F7ea",
    token0: "0x1D80c49BbBCd1C0911346656B529DF9E5c2F783d",
    token1: "0x96B41289D90444B8adD57e6F265DB5aE8651DF29",
  },
  {
    address: "0x2C934BbBD152A40419d3330e4d79f362Bc6691D6",
    token0: "0x1D80c49BbBCd1C0911346656B529DF9E5c2F783d",
    token1: "0xfD3449E8Ee31117a848D41Ee20F497a9bCb53164",
  },
  {
    address: "0xEd920325b7dB1e909DbE2d562fCD07f714395e10",
    token0: "0x60fDC7B744E886e96Aa0DEf5f69eE440dB9d8c77",
    token1: "0x140D8d3649Ec605CF69018C627fB44cCC76eC89f",
  },
  {
    address: "0x80A08BbAbB0A5C51A9ae53211Df09EF23Debd4f3",
    token0: "0x60fDC7B744E886e96Aa0DEf5f69eE440dB9d8c77",
    token1: "0x1D80c49BbBCd1C0911346656B529DF9E5c2F783d",
  },
  {
    address: "0x32fd7858393918A984DA6ee279EcA27f630a1C02",
    token0: "0xa76dcddce60a442d69bac7158f3660f50921b122",
    token1: "0x1D80c49BbBCd1C0911346656B529DF9E5c2F783d",
  },
  {
    address: "0x87E0E33558c8e8EAE3c1E9EB276e05574190b48a",
    token0: "0x140d8d3649ec605cf69018c627fb44ccc76ec89f",
    token1: "0xff56eb5b1a7faa972291117e5e9565da29bc808d",
  },
  {
    address: "0x02C6b5B1fbE01Da872E21f9Dab1B980933B0EF27",
    token0: "0x140d8d3649ec605cf69018c627fb44ccc76ec89f",
    token1: "0x1d80c49bbbcd1c0911346656b529df9e5c2f783d",
  },
  {
    address: "0xef24D5155818d4bD16AF0Cea1148A147eb620743",
    token0: "0xff56eb5b1a7faa972291117e5e9565da29bc808d",
    token1: "0x1d80c49bbbcd1c0911346656b529df9e5c2f783d",
  },
];
