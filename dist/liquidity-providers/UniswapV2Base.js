"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UniswapV2BaseProvider = void 0;
var abi_1 = require("@sushiswap/abi");
var router_config_1 = require("@sushiswap/router-config");
var tines_1 = require("@sushiswap/tines");
var date_fns_1 = require("date-fns");
var memoize_fs_1 = require("memoize-fs");
var viem_1 = require("viem");
var getCurrencyCombinations_1 = require("../getCurrencyCombinations");
var api_1 = require("../lib/api");
var ConstantProductPool_1 = require("../pools/ConstantProductPool");
var LiquidityProvider_1 = require("./LiquidityProvider");
var memoizer = (0, memoize_fs_1.default)({ cachePath: "./mem-cache" });
var UniswapV2BaseProvider = /** @class */ (function (_super) {
    __extends(UniswapV2BaseProvider, _super);
    function UniswapV2BaseProvider(chainId, web3Client, factory, initCodeHash, databaseClient) {
        var _this = _super.call(this, chainId, web3Client) || this;
        _this.TOP_POOL_SIZE = 155;
        _this.TOP_POOL_LIQUIDITY_THRESHOLD = 5000;
        _this.ON_DEMAND_POOL_SIZE = 20;
        _this.REFRESH_INITIAL_POOLS_INTERVAL = 60; // SECONDS
        _this.topPools = new Map();
        _this.poolsByTrade = new Map();
        _this.onDemandPools = new Map();
        _this.availablePools = new Map();
        _this.staticPools = new Map();
        _this.fee = 0.003;
        _this.isInitialized = false;
        _this.factory = {};
        _this.initCodeHash = {};
        _this.latestPoolCreatedAtTimestamp = new Date();
        _this.discoverNewPoolsTimestamp = (0, date_fns_1.getUnixTime)((0, date_fns_1.add)(Date.now(), { seconds: _this.REFRESH_INITIAL_POOLS_INTERVAL }));
        _this.refreshAvailablePoolsTimestamp = (0, date_fns_1.getUnixTime)((0, date_fns_1.add)(Date.now(), { seconds: _this.FETCH_AVAILABLE_POOLS_AFTER_SECONDS }));
        _this.factory = factory;
        _this.initCodeHash = initCodeHash;
        if (!(chainId in _this.factory) || !(chainId in _this.initCodeHash)) {
            throw new Error("".concat(_this.getType(), " cannot be instantiated for chainid ").concat(chainId, ", no factory or initCodeHash"));
        }
        _this.databaseClient = databaseClient;
        return _this;
    }
    UniswapV2BaseProvider.prototype.initialize = function () {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function () {
            var availablePools, topPools, results;
            var _this = this;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        // TODO: retry logic, every X seconds? dont flag as true until the end of the function ideally. add isInitalizing? to avoid it being called twice before completed.
                        this.isInitialized = true;
                        return [4 /*yield*/, this.getInitialPools()
                            //console.debug(`${this.getLogPrefix()} - TOTAL POOLS: ${availablePools.size}`)
                        ];
                    case 1:
                        availablePools = _d.sent();
                        //console.debug(`${this.getLogPrefix()} - TOTAL POOLS: ${availablePools.size}`)
                        this.availablePools = availablePools;
                        topPools = (0, api_1.filterTopPools)(Array.from(availablePools.values()), this.TOP_POOL_SIZE);
                        if (topPools.length > 0) {
                            //console.debug(`${this.getLogPrefix()} - INIT: top pools found: ${topPools.length}`)
                        }
                        else {
                            //console.debug(`${this.getLogPrefix()} - INIT: NO pools found.`)
                            return [2 /*return*/, []];
                        }
                        return [4 /*yield*/, this.client
                                .multicall({
                                multicallAddress: (_c = (_b = (_a = this.client.chain) === null || _a === void 0 ? void 0 : _a.contracts) === null || _b === void 0 ? void 0 : _b.multicall3) === null || _c === void 0 ? void 0 : _c.address,
                                allowFailure: true,
                                contracts: topPools.map(function (pool) {
                                    return ({
                                        address: pool.address,
                                        chainId: _this.chainId,
                                        abi: abi_1.getReservesAbi,
                                        functionName: 'getReserves',
                                    });
                                }),
                            })
                                .catch(function (e) {
                                console.warn("".concat(_this.getLogPrefix(), " - INIT: multicall failed, message: ").concat(e.message));
                                return undefined;
                            })];
                    case 2:
                        results = _d.sent();
                        topPools.forEach(function (pool, i) {
                            var _a, _b, _c, _d;
                            var res0 = (_b = (_a = results === null || results === void 0 ? void 0 : results[i]) === null || _a === void 0 ? void 0 : _a.result) === null || _b === void 0 ? void 0 : _b[0];
                            var res1 = (_d = (_c = results === null || results === void 0 ? void 0 : results[i]) === null || _c === void 0 ? void 0 : _c.result) === null || _d === void 0 ? void 0 : _d[1];
                            if (res0 && res1) {
                                var token0 = (0, api_1.mapToken)(_this.chainId, pool.token0);
                                var token1 = (0, api_1.mapToken)(_this.chainId, pool.token1);
                                var rPool = new tines_1.ConstantProductRPool(pool.address, token0, token1, _this.fee, res0, res1);
                                var pc = new ConstantProductPool_1.ConstantProductPoolCode(rPool, _this.getType(), _this.getPoolProviderName());
                                _this.topPools.set(pool.address, pc);
                            }
                            else {
                                console.error("".concat(_this.getLogPrefix(), " - ERROR INIT SYNC, Failed to fetch reserves for pool: ").concat(pool.address));
                            }
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    UniswapV2BaseProvider.prototype.getInitialPools = function () {
        return __awaiter(this, void 0, void 0, function () {
            var pools;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.databaseClient) return [3 /*break*/, 2];
                        return [4 /*yield*/, (0, api_1.getAllPools)(this.databaseClient, this.chainId, this.getType() === LiquidityProvider_1.LiquidityProviders.UniswapV2 ? 'Uniswap' : this.getType(), this.getType() === LiquidityProvider_1.LiquidityProviders.SushiSwapV2 ? 'LEGACY' : 'V2', ['CONSTANT_PRODUCT_POOL'])];
                    case 1:
                        pools = _a.sent();
                        return [2 /*return*/, pools];
                    case 2: return [2 /*return*/, new Map()];
                }
            });
        });
    };
    UniswapV2BaseProvider.prototype.getOnDemandPools = function (t0, t1, excludePools, options) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function () {
            var topPoolAddresses, pools, validUntilTimestamp, poolCodesToCreate, asyncMulticallWrapper, multicallMemoize, reserves;
            var _this = this;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        topPoolAddresses = Array.from(this.topPools.keys());
                        pools = topPoolAddresses.length > 0
                            ? (0, api_1.filterOnDemandPools)(Array.from(this.availablePools.values()), t0.address, t1.address, topPoolAddresses, this.ON_DEMAND_POOL_SIZE)
                            : this.getStaticPools(t0, t1);
                        if (excludePools)
                            pools = pools.filter(function (p) { return !excludePools.has(p.address); });
                        if (pools.length === 0) {
                            //console.info(`${this.getLogPrefix()} - No on demand pools found for ${t0.symbol}/${t1.symbol}`)
                            return [2 /*return*/];
                        }
                        this.poolsByTrade.set(this.getTradeId(t0, t1), pools.map(function (pool) { return pool.address; }));
                        validUntilTimestamp = (0, date_fns_1.getUnixTime)((0, date_fns_1.add)(Date.now(), { seconds: this.ON_DEMAND_POOLS_LIFETIME_IN_SECONDS }));
                        poolCodesToCreate = [];
                        pools.forEach(function (pool) {
                            var existingPool = _this.onDemandPools.get(pool.address);
                            if (existingPool === undefined) {
                                var token0 = pool.token0;
                                var token1 = pool.token1;
                                var rPool = new tines_1.ConstantProductRPool(pool.address, token0, token1, _this.fee, 0n, 0n);
                                var pc = new ConstantProductPool_1.ConstantProductPoolCode(rPool, _this.getType(), _this.getPoolProviderName());
                                poolCodesToCreate.push(pc);
                            }
                            else {
                                existingPool.validUntilTimestamp = validUntilTimestamp;
                                // ++updated
                            }
                        });
                        asyncMulticallWrapper = function (calldata, callback) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                this.client.multicall(calldata)
                                    .then(function (v) { return callback(v, undefined); })
                                    .catch(function (reason) { return callback(undefined, reason); });
                                return [2 /*return*/];
                            });
                        }); };
                        return [4 /*yield*/, memoizer.fn(asyncMulticallWrapper)];
                    case 1:
                        multicallMemoize = _d.sent();
                        return [4 /*yield*/, multicallMemoize({
                                multicallAddress: (_c = (_b = (_a = this.client.chain) === null || _a === void 0 ? void 0 : _a.contracts) === null || _b === void 0 ? void 0 : _b.multicall3) === null || _c === void 0 ? void 0 : _c.address,
                                allowFailure: true,
                                blockNumber: options === null || options === void 0 ? void 0 : options.blockNumber,
                                contracts: poolCodesToCreate.map(function (poolCode) {
                                    return ({
                                        address: poolCode.pool.address,
                                        chainId: _this.chainId,
                                        abi: abi_1.getReservesAbi,
                                        functionName: 'getReserves',
                                    });
                                }),
                            }, function (res, rej) {
                                if (rej) {
                                    console.warn("".concat(_this.getLogPrefix(), " - UPDATE: on-demand pools multicall failed, message: ").concat(rej.message));
                                    return undefined;
                                }
                                else
                                    return res;
                            })];
                    case 2:
                        reserves = _d.sent();
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
                        poolCodesToCreate.forEach(function (poolCode, i) {
                            var _a, _b, _c, _d;
                            var pool = poolCode.pool;
                            var res0 = (_b = (_a = reserves === null || reserves === void 0 ? void 0 : reserves[i]) === null || _a === void 0 ? void 0 : _a.result) === null || _b === void 0 ? void 0 : _b[0];
                            var res1 = (_d = (_c = reserves === null || reserves === void 0 ? void 0 : reserves[i]) === null || _c === void 0 ? void 0 : _c.result) === null || _d === void 0 ? void 0 : _d[1];
                            if (res0 !== undefined && res1 !== undefined) {
                                pool.updateReserves(res0, res1);
                                _this.onDemandPools.set(pool.address, { poolCode: poolCode, validUntilTimestamp: validUntilTimestamp });
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
                        return [2 /*return*/];
                }
            });
        });
    };
    UniswapV2BaseProvider.prototype.updatePools = function () {
        var _a, _b, _c, _d, _e, _f;
        return __awaiter(this, void 0, void 0, function () {
            var initialPools, onDemandPools, _g, initialPoolsReserves, onDemandPoolsReserves;
            var _this = this;
            return __generator(this, function (_h) {
                switch (_h.label) {
                    case 0:
                        if (!this.isInitialized) return [3 /*break*/, 2];
                        this.removeStalePools();
                        // The two calls below are Async functions, but we do not want them to block. If they find any pools they will be updated next interval
                        this.discoverNewPools();
                        this.updateAvailablePools();
                        initialPools = Array.from(this.topPools.values());
                        onDemandPools = Array.from(this.onDemandPools.values()).map(function (pi) { return pi.poolCode; });
                        if (initialPools.length === 0 && onDemandPools.length === 0) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, Promise.all([
                                this.client
                                    .multicall({
                                    multicallAddress: (_c = (_b = (_a = this.client.chain) === null || _a === void 0 ? void 0 : _a.contracts) === null || _b === void 0 ? void 0 : _b.multicall3) === null || _c === void 0 ? void 0 : _c.address,
                                    allowFailure: true,
                                    contracts: initialPools.map(function (poolCode) {
                                        return ({
                                            address: poolCode.pool.address,
                                            chainId: _this.chainId,
                                            abi: abi_1.getReservesAbi,
                                            functionName: 'getReserves',
                                        });
                                    }),
                                })
                                    .catch(function (e) {
                                    console.warn("".concat(_this.getLogPrefix(), " - UPDATE: initPools multicall failed, message: ").concat(e.message));
                                    return undefined;
                                }),
                                this.client
                                    .multicall({
                                    multicallAddress: (_f = (_e = (_d = this.client.chain) === null || _d === void 0 ? void 0 : _d.contracts) === null || _e === void 0 ? void 0 : _e.multicall3) === null || _f === void 0 ? void 0 : _f.address,
                                    allowFailure: true,
                                    contracts: onDemandPools.map(function (poolCode) {
                                        return ({
                                            address: poolCode.pool.address,
                                            chainId: _this.chainId,
                                            abi: abi_1.getReservesAbi,
                                            functionName: 'getReserves',
                                        });
                                    }),
                                })
                                    .catch(function (e) {
                                    console.warn("".concat(_this.getLogPrefix(), " - UPDATE: on-demand pools multicall failed, message: ").concat(e.message));
                                    return undefined;
                                }),
                            ])];
                    case 1:
                        _g = _h.sent(), initialPoolsReserves = _g[0], onDemandPoolsReserves = _g[1];
                        this.updatePoolWithReserves(initialPools, initialPoolsReserves, 'INITIAL');
                        this.updatePoolWithReserves(onDemandPools, onDemandPoolsReserves, 'ON_DEMAND');
                        _h.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    UniswapV2BaseProvider.prototype.discoverNewPools = function () {
        return __awaiter(this, void 0, void 0, function () {
            var newDate, discoveredPools, addedPools_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.databaseClient)
                            return [2 /*return*/];
                        if (this.discoverNewPoolsTimestamp > (0, date_fns_1.getUnixTime)(Date.now())) {
                            return [2 /*return*/];
                        }
                        this.discoverNewPoolsTimestamp = (0, date_fns_1.getUnixTime)((0, date_fns_1.add)(Date.now(), { seconds: this.REFRESH_INITIAL_POOLS_INTERVAL }));
                        newDate = new Date();
                        return [4 /*yield*/, (0, api_1.discoverNewPools)(this.databaseClient, this.chainId, this.getType() === LiquidityProvider_1.LiquidityProviders.UniswapV2 ? 'Uniswap' : this.getType(), this.getType() === LiquidityProvider_1.LiquidityProviders.SushiSwapV2 ? 'LEGACY' : 'V2', ['CONSTANT_PRODUCT_POOL'], this.latestPoolCreatedAtTimestamp)];
                    case 1:
                        discoveredPools = _a.sent();
                        if (discoveredPools.size > 0) {
                            addedPools_1 = 0;
                            this.latestPoolCreatedAtTimestamp = newDate;
                            discoveredPools.forEach(function (pool) {
                                if (!_this.availablePools.has(pool.address)) {
                                    _this.availablePools.set(pool.address, pool);
                                    addedPools_1++;
                                }
                            });
                            if (addedPools_1 > 0) {
                                this.prioritizeTopPools();
                            }
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    UniswapV2BaseProvider.prototype.updateAvailablePools = function () {
        return __awaiter(this, void 0, void 0, function () {
            var freshInitPools;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.refreshAvailablePoolsTimestamp > (0, date_fns_1.getUnixTime)(Date.now())) {
                            return [2 /*return*/];
                        }
                        this.refreshAvailablePoolsTimestamp = (0, date_fns_1.getUnixTime)((0, date_fns_1.add)(Date.now(), { seconds: this.FETCH_AVAILABLE_POOLS_AFTER_SECONDS }));
                        return [4 /*yield*/, this.getInitialPools()];
                    case 1:
                        freshInitPools = _a.sent();
                        freshInitPools.forEach(function (updatedPool) {
                            // Don't do `this.availablePools = freshInitPools`, in case the db requests for any reason fail, it shouldn't be completely overwritten.
                            _this.availablePools.set(updatedPool.address, updatedPool);
                        });
                        this.prioritizeTopPools();
                        return [2 /*return*/];
                }
            });
        });
    };
    UniswapV2BaseProvider.prototype.prioritizeTopPools = function () {
        var _this = this;
        var newTopPools = (0, api_1.filterTopPools)(Array.from(this.availablePools.values()), this.TOP_POOL_SIZE);
        var currentTopPoolAddresses = Array.from(this.topPools.keys());
        var newTopPoolAddresses = Array.from(newTopPools.map(function (pool) { return pool.address; }));
        var poolsToRemove = currentTopPoolAddresses.filter(function (x) { return !newTopPoolAddresses.includes(x); });
        var poolsToAdd = newTopPoolAddresses.filter(function (x) { return !currentTopPoolAddresses.includes(x); });
        poolsToRemove.forEach(function (address) {
            _this.topPools.delete(address);
            //console.log(`${this.getLogPrefix()} - PRIORITIZE POOLS: Removed ${address} from top pools`)
        });
        poolsToAdd.forEach(function (address) {
            var poolsToCreate = _this.availablePools.get(address);
            if (poolsToCreate) {
                var token0 = (0, api_1.mapToken)(_this.chainId, poolsToCreate.token0);
                var token1 = (0, api_1.mapToken)(_this.chainId, poolsToCreate.token1);
                var rPool = new tines_1.ConstantProductRPool(poolsToCreate.address, token0, token1, _this.fee, 0n, 0n);
                var pc = new ConstantProductPool_1.ConstantProductPoolCode(rPool, _this.getType(), _this.getPoolProviderName());
                _this.topPools.set(poolsToCreate.address, pc);
                //console.log(`${this.getLogPrefix()} - PRIORITIZE POOLS: Added ${address} to top pools`)
            }
            else {
                console.warn("".concat(_this.getLogPrefix(), " - PRIORITIZE POOLS: Could not find pool, unexpected state."));
            }
        });
    };
    UniswapV2BaseProvider.prototype.updatePoolWithReserves = function (pools, reserves, type) {
        var _this = this;
        if (!reserves)
            return;
        pools.forEach(function (poolCode, i) {
            var _a, _b, _c, _d;
            var pool = poolCode.pool;
            var res0 = (_b = (_a = reserves === null || reserves === void 0 ? void 0 : reserves[i]) === null || _a === void 0 ? void 0 : _a.result) === null || _b === void 0 ? void 0 : _b[0];
            var res1 = (_d = (_c = reserves === null || reserves === void 0 ? void 0 : reserves[i]) === null || _c === void 0 ? void 0 : _c.result) === null || _d === void 0 ? void 0 : _d[1];
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
                console.error("".concat(_this.getLogPrefix(), " - ERROR UPDATING RESERVES for a ").concat(type, " pool, Failed to fetch reserves for pool: ").concat(pool.address));
            }
        });
    };
    UniswapV2BaseProvider.prototype._getPoolAddress = function (t1, t2) {
        return (0, viem_1.getCreate2Address)({
            from: this.factory[this.chainId],
            salt: (0, viem_1.keccak256)((0, viem_1.encodePacked)(['address', 'address'], [t1.address, t2.address])),
            bytecode: this.initCodeHash[this.chainId],
        });
    };
    // TODO: Decide if this is worth keeping as fallback in case fetching top pools fails? only used on initial load.
    UniswapV2BaseProvider.prototype._getProspectiveTokens = function (t0, t1) {
        var set = new Set(__spreadArray(__spreadArray(__spreadArray([
            t0,
            t1
        ], router_config_1.BASES_TO_CHECK_TRADES_AGAINST[this.chainId], true), (router_config_1.ADDITIONAL_BASES[this.chainId][t0.address] || []), true), (router_config_1.ADDITIONAL_BASES[this.chainId][t1.address] || []), true));
        return Array.from(set);
    };
    UniswapV2BaseProvider.prototype.getStaticPools = function (t1, t2) {
        var _this = this;
        var currencyCombination = (0, getCurrencyCombinations_1.getCurrencyCombinations)(this.chainId, t1, t2).map(function (_a) {
            var c0 = _a[0], c1 = _a[1];
            return c0.sortsBefore(c1) ? [c0, c1] : [c1, c0];
        });
        return currencyCombination.map(function (combination) { return ({
            address: _this._getPoolAddress(combination[0], combination[1]),
            token0: combination[0],
            token1: combination[1],
            fee: _this.fee,
        }); });
        // return pools
    };
    UniswapV2BaseProvider.prototype.startFetchPoolsData = function () {
        var _this = this;
        this.stopFetchPoolsData();
        this.topPools = new Map();
        this.unwatchBlockNumber = this.client.watchBlockNumber({
            onBlockNumber: function (blockNumber) {
                _this.lastUpdateBlock = Number(blockNumber);
                if (!_this.isInitialized) {
                    _this.initialize();
                }
                else {
                    _this.updatePools();
                }
            },
            onError: function (error) {
                console.error("".concat(_this.getLogPrefix(), " - Error watching block number: ").concat(error.message));
            },
        });
    };
    UniswapV2BaseProvider.prototype.removeStalePools = function () {
        var removed = 0;
        var now = (0, date_fns_1.getUnixTime)(Date.now());
        for (var _i = 0, _a = this.onDemandPools.values(); _i < _a.length; _i++) {
            var poolInfo = _a[_i];
            if (poolInfo.validUntilTimestamp < now) {
                this.onDemandPools.delete(poolInfo.poolCode.pool.address);
                removed++;
            }
        }
        if (removed > 0) {
            //console.log(`${this.getLogPrefix()} STALE: Removed ${removed} stale pools`)
        }
    };
    UniswapV2BaseProvider.prototype.fetchPoolsForToken = function (t0, t1, excludePools) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getOnDemandPools(t0, t1, excludePools)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * The pools returned are the initial pools, plus any on demand pools that have been fetched for the two tokens.
     * @param t0
     * @param t1
     * @returns
     */
    UniswapV2BaseProvider.prototype.getCurrentPoolList = function (t0, t1) {
        var _a;
        var tradeId = this.getTradeId(t0, t1);
        var poolsByTrade = (_a = this.poolsByTrade.get(tradeId)) !== null && _a !== void 0 ? _a : [];
        var onDemandPoolCodes = poolsByTrade
            ? Array.from(this.onDemandPools)
                .filter(function (_a) {
                var poolAddress = _a[0];
                return poolsByTrade.includes(poolAddress);
            })
                .map(function (_a) {
                var p = _a[1];
                return p.poolCode;
            })
            : [];
        return __spreadArray(__spreadArray([], this.topPools.values(), true), [onDemandPoolCodes], false).flat();
    };
    UniswapV2BaseProvider.prototype.stopFetchPoolsData = function () {
        if (this.unwatchBlockNumber)
            this.unwatchBlockNumber();
        this.blockListener = undefined;
    };
    return UniswapV2BaseProvider;
}(LiquidityProvider_1.LiquidityProvider));
exports.UniswapV2BaseProvider = UniswapV2BaseProvider;
//# sourceMappingURL=UniswapV2Base.js.map