"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UniswapV2BaseProvider = void 0;
const abi_1 = require("@sushiswap/abi");
const router_config_1 = require("@sushiswap/router-config");
const tines_1 = require("@sushiswap/tines");
const date_fns_1 = require("date-fns");
const memoize_fs_1 = require("memoize-fs");
const viem_1 = require("viem");
const getCurrencyCombinations_1 = require("../getCurrencyCombinations");
const api_1 = require("../lib/api");
const ConstantProductPool_1 = require("../pools/ConstantProductPool");
const LiquidityProvider_1 = require("./LiquidityProvider");
const memoizer = (0, memoize_fs_1.default)({ cachePath: "./mem-cache" });
class UniswapV2BaseProvider extends LiquidityProvider_1.LiquidityProvider {
    constructor(chainId, web3Client, factory, initCodeHash, databaseClient) {
        super(chainId, web3Client);
        this.TOP_POOL_SIZE = 155;
        this.TOP_POOL_LIQUIDITY_THRESHOLD = 5000;
        this.ON_DEMAND_POOL_SIZE = 20;
        this.REFRESH_INITIAL_POOLS_INTERVAL = 60; // SECONDS
        this.topPools = new Map();
        this.poolsByTrade = new Map();
        this.onDemandPools = new Map();
        this.availablePools = new Map();
        this.staticPools = new Map();
        this.fee = 0.003;
        this.isInitialized = false;
        this.factory = {};
        this.initCodeHash = {};
        this.latestPoolCreatedAtTimestamp = new Date();
        this.discoverNewPoolsTimestamp = (0, date_fns_1.getUnixTime)((0, date_fns_1.add)(Date.now(), { seconds: this.REFRESH_INITIAL_POOLS_INTERVAL }));
        this.refreshAvailablePoolsTimestamp = (0, date_fns_1.getUnixTime)((0, date_fns_1.add)(Date.now(), { seconds: this.FETCH_AVAILABLE_POOLS_AFTER_SECONDS }));
        this.factory = factory;
        this.initCodeHash = initCodeHash;
        if (!(chainId in this.factory) || !(chainId in this.initCodeHash)) {
            throw new Error(`${this.getType()} cannot be instantiated for chainid ${chainId}, no factory or initCodeHash`);
        }
        this.databaseClient = databaseClient;
    }
    async initialize() {
        // TODO: retry logic, every X seconds? dont flag as true until the end of the function ideally. add isInitalizing? to avoid it being called twice before completed.
        this.isInitialized = true;
        const availablePools = await this.getInitialPools();
        //console.debug(`${this.getLogPrefix()} - TOTAL POOLS: ${availablePools.size}`)
        this.availablePools = availablePools;
        const topPools = (0, api_1.filterTopPools)(Array.from(availablePools.values()), this.TOP_POOL_SIZE);
        if (topPools.length > 0) {
            //console.debug(`${this.getLogPrefix()} - INIT: top pools found: ${topPools.length}`)
        }
        else {
            //console.debug(`${this.getLogPrefix()} - INIT: NO pools found.`)
            return [];
        }
        const results = await this.client
            .multicall({
            multicallAddress: this.client.chain?.contracts?.multicall3?.address,
            allowFailure: true,
            contracts: topPools.map((pool) => ({
                address: pool.address,
                chainId: this.chainId,
                abi: abi_1.getReservesAbi,
                functionName: 'getReserves',
            })),
        })
            .catch((e) => {
            console.warn(`${this.getLogPrefix()} - INIT: multicall failed, message: ${e.message}`);
            return undefined;
        });
        topPools.forEach((pool, i) => {
            const res0 = results?.[i]?.result?.[0];
            const res1 = results?.[i]?.result?.[1];
            if (res0 && res1) {
                const token0 = (0, api_1.mapToken)(this.chainId, pool.token0);
                const token1 = (0, api_1.mapToken)(this.chainId, pool.token1);
                const rPool = new tines_1.ConstantProductRPool(pool.address, token0, token1, this.fee, res0, res1);
                const pc = new ConstantProductPool_1.ConstantProductPoolCode(rPool, this.getType(), this.getPoolProviderName());
                this.topPools.set(pool.address, pc);
            }
            else {
                console.error(`${this.getLogPrefix()} - ERROR INIT SYNC, Failed to fetch reserves for pool: ${pool.address}`);
            }
        });
        //console.debug(`${this.getLogPrefix()} - INIT, WATCHING ${this.topPools.size} POOLS`)
    }
    async getInitialPools() {
        if (this.databaseClient) {
            const pools = await (0, api_1.getAllPools)(this.databaseClient, this.chainId, this.getType() === LiquidityProvider_1.LiquidityProviders.UniswapV2 ? 'Uniswap' : this.getType(), this.getType() === LiquidityProvider_1.LiquidityProviders.SushiSwapV2 ? 'LEGACY' : 'V2', ['CONSTANT_PRODUCT_POOL']);
            return pools;
        }
        return new Map();
    }
    async getOnDemandPools(t0, t1, excludePools, options) {
        const topPoolAddresses = Array.from(this.topPools.keys());
        let pools = topPoolAddresses.length > 0
            ? (0, api_1.filterOnDemandPools)(Array.from(this.availablePools.values()), t0.address, t1.address, topPoolAddresses, this.ON_DEMAND_POOL_SIZE)
            : this.getStaticPools(t0, t1);
        if (excludePools)
            pools = pools.filter((p) => !excludePools.has(p.address));
        if (pools.length === 0) {
            //console.info(`${this.getLogPrefix()} - No on demand pools found for ${t0.symbol}/${t1.symbol}`)
            return;
        }
        this.poolsByTrade.set(this.getTradeId(t0, t1), pools.map((pool) => pool.address));
        const validUntilTimestamp = (0, date_fns_1.getUnixTime)((0, date_fns_1.add)(Date.now(), { seconds: this.ON_DEMAND_POOLS_LIFETIME_IN_SECONDS }));
        // let created = 0
        // let updated = 0
        const poolCodesToCreate = [];
        pools.forEach((pool) => {
            const existingPool = this.onDemandPools.get(pool.address);
            if (existingPool === undefined) {
                const token0 = pool.token0;
                const token1 = pool.token1;
                const rPool = new tines_1.ConstantProductRPool(pool.address, token0, token1, this.fee, 0n, 0n);
                const pc = new ConstantProductPool_1.ConstantProductPoolCode(rPool, this.getType(), this.getPoolProviderName());
                poolCodesToCreate.push(pc);
            }
            else {
                existingPool.validUntilTimestamp = validUntilTimestamp;
                // ++updated
            }
        });
        const asyncMulticallWrapper = async (calldata, callback) => {
            this.client.multicall(calldata)
                .then(v => callback(v, undefined))
                .catch(reason => callback(undefined, reason));
        };
        const multicallMemoize = await memoizer.fn(asyncMulticallWrapper);
        const reserves = await multicallMemoize({
            multicallAddress: this.client.chain?.contracts?.multicall3?.address,
            allowFailure: true,
            blockNumber: options?.blockNumber,
            contracts: poolCodesToCreate.map((poolCode) => ({
                address: poolCode.pool.address,
                chainId: this.chainId,
                abi: abi_1.getReservesAbi,
                functionName: 'getReserves',
            })),
        }, (res, rej) => {
            if (rej) {
                console.warn(`${this.getLogPrefix()} - UPDATE: on-demand pools multicall failed, message: ${rej.message}`);
                return undefined;
            }
            else
                return res;
        });
        // const reserves = await this.client
        //   .multicall({
        //     multicallAddress: this.client.chain?.contracts?.multicall3?.address as Address,
        //     allowFailure: true,
        //     contracts: poolCodesToCreate.map(
        //       (poolCode) =>
        //         ({
        //           address: poolCode.pool.address as Address,
        //           chainId: this.chainId,
        //           abi: getReservesAbi,
        //           functionName: 'getReserves',
        //         } as const)
        //     ),
        //   })
        //   .catch((e) => {
        //     console.warn(`${this.getLogPrefix()} - UPDATE: on-demand pools multicall failed, message: ${e.message}`)
        //     return undefined
        //   })
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
            }
            else {
                // Pool doesn't exist?
                // console.error(`${this.getLogPrefix()} - ERROR FETCHING RESERVES, initialize on demand pool: ${pool.address}`)
            }
        });
        // console.debug(
        //   `${this.getLogPrefix()} - ON DEMAND: Created and fetched reserves for ${created} pools, extended 'lifetime' for ${updated} pools`
        // )
    }
    async updatePools() {
        if (this.isInitialized) {
            this.removeStalePools();
            // The two calls below are Async functions, but we do not want them to block. If they find any pools they will be updated next interval
            this.discoverNewPools();
            this.updateAvailablePools();
            const initialPools = Array.from(this.topPools.values());
            const onDemandPools = Array.from(this.onDemandPools.values()).map((pi) => pi.poolCode);
            if (initialPools.length === 0 && onDemandPools.length === 0) {
                return;
            }
            const [initialPoolsReserves, onDemandPoolsReserves] = await Promise.all([
                this.client
                    .multicall({
                    multicallAddress: this.client.chain?.contracts?.multicall3?.address,
                    allowFailure: true,
                    contracts: initialPools.map((poolCode) => ({
                        address: poolCode.pool.address,
                        chainId: this.chainId,
                        abi: abi_1.getReservesAbi,
                        functionName: 'getReserves',
                    })),
                })
                    .catch((e) => {
                    console.warn(`${this.getLogPrefix()} - UPDATE: initPools multicall failed, message: ${e.message}`);
                    return undefined;
                }),
                this.client
                    .multicall({
                    multicallAddress: this.client.chain?.contracts?.multicall3?.address,
                    allowFailure: true,
                    contracts: onDemandPools.map((poolCode) => ({
                        address: poolCode.pool.address,
                        chainId: this.chainId,
                        abi: abi_1.getReservesAbi,
                        functionName: 'getReserves',
                    })),
                })
                    .catch((e) => {
                    console.warn(`${this.getLogPrefix()} - UPDATE: on-demand pools multicall failed, message: ${e.message}`);
                    return undefined;
                }),
            ]);
            this.updatePoolWithReserves(initialPools, initialPoolsReserves, 'INITIAL');
            this.updatePoolWithReserves(onDemandPools, onDemandPoolsReserves, 'ON_DEMAND');
        }
    }
    async discoverNewPools() {
        if (!this.databaseClient)
            return;
        if (this.discoverNewPoolsTimestamp > (0, date_fns_1.getUnixTime)(Date.now())) {
            return;
        }
        this.discoverNewPoolsTimestamp = (0, date_fns_1.getUnixTime)((0, date_fns_1.add)(Date.now(), { seconds: this.REFRESH_INITIAL_POOLS_INTERVAL }));
        const newDate = new Date();
        const discoveredPools = await (0, api_1.discoverNewPools)(this.databaseClient, this.chainId, this.getType() === LiquidityProvider_1.LiquidityProviders.UniswapV2 ? 'Uniswap' : this.getType(), this.getType() === LiquidityProvider_1.LiquidityProviders.SushiSwapV2 ? 'LEGACY' : 'V2', ['CONSTANT_PRODUCT_POOL'], this.latestPoolCreatedAtTimestamp);
        if (discoveredPools.size > 0) {
            let addedPools = 0;
            this.latestPoolCreatedAtTimestamp = newDate;
            discoveredPools.forEach((pool) => {
                if (!this.availablePools.has(pool.address)) {
                    this.availablePools.set(pool.address, pool);
                    addedPools++;
                }
            });
            if (addedPools > 0) {
                this.prioritizeTopPools();
            }
        }
        // console.debug(
        //   `* MEM ${this.getLogPrefix()} INIT COUNT: ${this.topPools.size} ON DEMAND COUNT: ${this.onDemandPools.size}`
        // )
    }
    async updateAvailablePools() {
        if (this.refreshAvailablePoolsTimestamp > (0, date_fns_1.getUnixTime)(Date.now())) {
            return;
        }
        this.refreshAvailablePoolsTimestamp = (0, date_fns_1.getUnixTime)((0, date_fns_1.add)(Date.now(), { seconds: this.FETCH_AVAILABLE_POOLS_AFTER_SECONDS }));
        const freshInitPools = await this.getInitialPools();
        freshInitPools.forEach((updatedPool) => {
            // Don't do `this.availablePools = freshInitPools`, in case the db requests for any reason fail, it shouldn't be completely overwritten.
            this.availablePools.set(updatedPool.address, updatedPool);
        });
        this.prioritizeTopPools();
    }
    prioritizeTopPools() {
        const newTopPools = (0, api_1.filterTopPools)(Array.from(this.availablePools.values()), this.TOP_POOL_SIZE);
        const currentTopPoolAddresses = Array.from(this.topPools.keys());
        const newTopPoolAddresses = Array.from(newTopPools.map((pool) => pool.address));
        const poolsToRemove = currentTopPoolAddresses.filter((x) => !newTopPoolAddresses.includes(x));
        const poolsToAdd = newTopPoolAddresses.filter((x) => !currentTopPoolAddresses.includes(x));
        poolsToRemove.forEach((address) => {
            this.topPools.delete(address);
            //console.log(`${this.getLogPrefix()} - PRIORITIZE POOLS: Removed ${address} from top pools`)
        });
        poolsToAdd.forEach((address) => {
            const poolsToCreate = this.availablePools.get(address);
            if (poolsToCreate) {
                const token0 = (0, api_1.mapToken)(this.chainId, poolsToCreate.token0);
                const token1 = (0, api_1.mapToken)(this.chainId, poolsToCreate.token1);
                const rPool = new tines_1.ConstantProductRPool(poolsToCreate.address, token0, token1, this.fee, 0n, 0n);
                const pc = new ConstantProductPool_1.ConstantProductPoolCode(rPool, this.getType(), this.getPoolProviderName());
                this.topPools.set(poolsToCreate.address, pc);
                //console.log(`${this.getLogPrefix()} - PRIORITIZE POOLS: Added ${address} to top pools`)
            }
            else {
                console.warn(`${this.getLogPrefix()} - PRIORITIZE POOLS: Could not find pool, unexpected state.`);
            }
        });
    }
    updatePoolWithReserves(pools, reserves, type) {
        if (!reserves)
            return;
        pools.forEach((poolCode, i) => {
            const pool = poolCode.pool;
            const res0 = reserves?.[i]?.result?.[0];
            const res1 = reserves?.[i]?.result?.[1];
            if (res0 && res1) {
                if (pool.reserve0 !== res0 || pool.reserve1 !== res1) {
                    pool.updateReserves(res0, res1);
                    // console.info(
                    //   `${this.getLogPrefix()} - SYNC, ${type}: ${pool.address} ${pool.token0.symbol}/${
                    //     pool.token1.symbol
                    //   } ${res0BN.toString()} ${res1BN.toString()}`
                    // )
                }
            }
            else {
                console.error(`${this.getLogPrefix()} - ERROR UPDATING RESERVES for a ${type} pool, Failed to fetch reserves for pool: ${pool.address}`);
            }
        });
    }
    _getPoolAddress(t1, t2) {
        return (0, viem_1.getCreate2Address)({
            from: this.factory[this.chainId],
            salt: (0, viem_1.keccak256)((0, viem_1.encodePacked)(['address', 'address'], [t1.address, t2.address])),
            bytecode: this.initCodeHash[this.chainId],
        });
    }
    // TODO: Decide if this is worth keeping as fallback in case fetching top pools fails? only used on initial load.
    _getProspectiveTokens(t0, t1) {
        const set = new Set([
            t0,
            t1,
            ...router_config_1.BASES_TO_CHECK_TRADES_AGAINST[this.chainId],
            ...(router_config_1.ADDITIONAL_BASES[this.chainId][t0.address] || []),
            ...(router_config_1.ADDITIONAL_BASES[this.chainId][t1.address] || []),
        ]);
        return Array.from(set);
    }
    getStaticPools(t1, t2) {
        const currencyCombination = (0, getCurrencyCombinations_1.getCurrencyCombinations)(this.chainId, t1, t2).map(([c0, c1]) => c0.sortsBefore(c1) ? [c0, c1] : [c1, c0]);
        return currencyCombination.map((combination) => ({
            address: this._getPoolAddress(combination[0], combination[1]),
            token0: combination[0],
            token1: combination[1],
            fee: this.fee,
        }));
        // return pools
    }
    startFetchPoolsData() {
        this.stopFetchPoolsData();
        this.topPools = new Map();
        this.unwatchBlockNumber = this.client.watchBlockNumber({
            onBlockNumber: (blockNumber) => {
                this.lastUpdateBlock = Number(blockNumber);
                if (!this.isInitialized) {
                    this.initialize();
                }
                else {
                    this.updatePools();
                }
            },
            onError: (error) => {
                console.error(`${this.getLogPrefix()} - Error watching block number: ${error.message}`);
            },
        });
    }
    removeStalePools() {
        let removed = 0;
        const now = (0, date_fns_1.getUnixTime)(Date.now());
        for (const poolInfo of this.onDemandPools.values()) {
            if (poolInfo.validUntilTimestamp < now) {
                this.onDemandPools.delete(poolInfo.poolCode.pool.address);
                removed++;
            }
        }
        if (removed > 0) {
            //console.log(`${this.getLogPrefix()} STALE: Removed ${removed} stale pools`)
        }
    }
    async fetchPoolsForToken(t0, t1, excludePools) {
        await this.getOnDemandPools(t0, t1, excludePools);
    }
    /**
     * The pools returned are the initial pools, plus any on demand pools that have been fetched for the two tokens.
     * @param t0
     * @param t1
     * @returns
     */
    getCurrentPoolList(t0, t1) {
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
        if (this.unwatchBlockNumber)
            this.unwatchBlockNumber();
        this.blockListener = undefined;
    }
}
exports.UniswapV2BaseProvider = UniswapV2BaseProvider;
//# sourceMappingURL=UniswapV2Base.js.map