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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UniswapV3BaseProvider = exports.NUMBER_OF_SURROUNDING_TICKS = void 0;
var abi_1 = require("@sushiswap/abi");
var tines_1 = require("@sushiswap/tines");
var v3_sdk_1 = require("@sushiswap/v3-sdk");
var memoize_fs_1 = require("memoize-fs");
var getCurrencyCombinations_1 = require("../getCurrencyCombinations");
var UniV3Pool_1 = require("../pools/UniV3Pool");
var LiquidityProvider_1 = require("./LiquidityProvider");
var memoizer = (0, memoize_fs_1.default)({ cachePath: "./mem-cache" });
exports.NUMBER_OF_SURROUNDING_TICKS = 1000; // 10% price impact
var getActiveTick = function (tickCurrent, feeAmount) {
    return typeof tickCurrent === 'number' && feeAmount
        ? Math.floor(tickCurrent / v3_sdk_1.TICK_SPACINGS[feeAmount]) * v3_sdk_1.TICK_SPACINGS[feeAmount]
        : undefined;
};
var bitmapIndex = function (tick, tickSpacing) {
    return Math.floor(tick / tickSpacing / 256);
};
var UniswapV3BaseProvider = /** @class */ (function (_super) {
    __extends(UniswapV3BaseProvider, _super);
    function UniswapV3BaseProvider(chainId, web3Client, factory, initCodeHash, tickLens, databaseClient) {
        var _this = _super.call(this, chainId, web3Client) || this;
        _this.poolsByTrade = new Map();
        _this.pools = new Map();
        _this.isInitialized = false;
        _this.factory = {};
        _this.initCodeHash = {};
        _this.tickLens = {};
        _this.factory = factory;
        _this.initCodeHash = initCodeHash;
        _this.tickLens = tickLens;
        if (!(chainId in _this.factory) || !(chainId in _this.initCodeHash) || !(chainId in tickLens)) {
            throw new Error("".concat(_this.getType(), " cannot be instantiated for chainid ").concat(chainId, ", no factory or initCodeHash"));
        }
        _this.databaseClient = databaseClient;
        return _this;
    }
    UniswapV3BaseProvider.prototype.fetchPoolsForToken = function (t0, t1, excludePools, options) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
        return __awaiter(this, void 0, void 0, function () {
            var staticPools, asyncMulticallWrapper, multicallMemoize, slot0, existingPools, liquidityContracts, token0Contracts, token1Contracts, minIndexes, maxIndexes, wordList, ticksContracts, _r, liquidityResults, token0Balances, token1Balances, tickResults, ticks, transformedV3Pools;
            var _this = this;
            return __generator(this, function (_s) {
                switch (_s.label) {
                    case 0:
                        staticPools = this.getStaticPools(t0, t1);
                        if (excludePools)
                            staticPools = staticPools.filter(function (p) { return !excludePools.has(p.address); });
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
                        multicallMemoize = _s.sent();
                        return [4 /*yield*/, multicallMemoize({
                                multicallAddress: (_c = (_b = (_a = this.client.chain) === null || _a === void 0 ? void 0 : _a.contracts) === null || _b === void 0 ? void 0 : _b.multicall3) === null || _c === void 0 ? void 0 : _c.address,
                                allowFailure: true,
                                blockNumber: options === null || options === void 0 ? void 0 : options.blockNumber,
                                contracts: staticPools.map(function (pool) {
                                    return ({
                                        address: pool.address,
                                        chainId: _this.chainId,
                                        abi: [
                                            {
                                                inputs: [],
                                                name: 'slot0',
                                                outputs: [
                                                    { internalType: 'uint160', name: 'sqrtPriceX96', type: 'uint160' },
                                                    { internalType: 'int24', name: 'tick', type: 'int24' },
                                                    { internalType: 'uint16', name: 'observationIndex', type: 'uint16' },
                                                    { internalType: 'uint16', name: 'observationCardinality', type: 'uint16' },
                                                    { internalType: 'uint16', name: 'observationCardinalityNext', type: 'uint16' },
                                                    { internalType: 'uint8', name: 'feeProtocol', type: 'uint8' },
                                                    { internalType: 'bool', name: 'unlocked', type: 'bool' },
                                                ],
                                                stateMutability: 'view',
                                                type: 'function',
                                            },
                                        ],
                                        functionName: 'slot0',
                                    });
                                }),
                            }, function (res, rej) {
                                if (rej) {
                                    console.warn("".concat(_this.getLogPrefix(), " - INIT: multicall failed, message: ").concat(e.message));
                                    return undefined;
                                }
                                else
                                    return res;
                            })];
                    case 2:
                        slot0 = _s.sent();
                        existingPools = [];
                        staticPools.forEach(function (pool, i) {
                            var _a, _b;
                            if (slot0 === undefined || !slot0[i])
                                return;
                            var sqrtPriceX96 = (_a = slot0[i].result) === null || _a === void 0 ? void 0 : _a[0];
                            var tick = (_b = slot0[i].result) === null || _b === void 0 ? void 0 : _b[1];
                            if (!sqrtPriceX96 || sqrtPriceX96 === 0n || typeof tick !== 'number')
                                return;
                            var activeTick = getActiveTick(tick, pool.fee);
                            if (typeof activeTick !== 'number')
                                return;
                            existingPools.push(__assign(__assign({}, pool), { sqrtPriceX96: sqrtPriceX96, activeTick: activeTick }));
                        });
                        if (existingPools.length === 0)
                            return [2 /*return*/];
                        liquidityContracts = multicallMemoize({
                            multicallAddress: (_f = (_e = (_d = this.client.chain) === null || _d === void 0 ? void 0 : _d.contracts) === null || _e === void 0 ? void 0 : _e.multicall3) === null || _f === void 0 ? void 0 : _f.address,
                            allowFailure: true,
                            blockNumber: options === null || options === void 0 ? void 0 : options.blockNumber,
                            contracts: existingPools.map(function (pool) {
                                return ({
                                    chainId: _this.chainId,
                                    address: pool.address,
                                    abi: [
                                        {
                                            inputs: [],
                                            name: 'liquidity',
                                            outputs: [{ internalType: 'uint128', name: '', type: 'uint128' }],
                                            stateMutability: 'view',
                                            type: 'function',
                                        },
                                    ],
                                    functionName: 'liquidity',
                                });
                            }),
                        }, function (res, rej) {
                            if (rej)
                                return undefined;
                            return res;
                        });
                        token0Contracts = multicallMemoize({
                            multicallAddress: (_j = (_h = (_g = this.client.chain) === null || _g === void 0 ? void 0 : _g.contracts) === null || _h === void 0 ? void 0 : _h.multicall3) === null || _j === void 0 ? void 0 : _j.address,
                            allowFailure: true,
                            blockNumber: options === null || options === void 0 ? void 0 : options.blockNumber,
                            contracts: existingPools.map(function (pool) {
                                return ({
                                    chainId: _this.chainId,
                                    address: pool.token0.wrapped.address,
                                    args: [pool.address],
                                    abi: abi_1.erc20Abi,
                                    functionName: 'balanceOf',
                                });
                            }),
                        }, function (res, rej) {
                            if (rej)
                                return undefined;
                            return res;
                        });
                        token1Contracts = multicallMemoize({
                            multicallAddress: (_m = (_l = (_k = this.client.chain) === null || _k === void 0 ? void 0 : _k.contracts) === null || _l === void 0 ? void 0 : _l.multicall3) === null || _m === void 0 ? void 0 : _m.address,
                            allowFailure: true,
                            blockNumber: options === null || options === void 0 ? void 0 : options.blockNumber,
                            contracts: existingPools.map(function (pool) {
                                return ({
                                    chainId: _this.chainId,
                                    address: pool.token1.wrapped.address,
                                    args: [pool.address],
                                    abi: abi_1.erc20Abi,
                                    functionName: 'balanceOf',
                                });
                            }),
                        }, function (res, rej) {
                            if (rej)
                                return undefined;
                            return res;
                        });
                        minIndexes = existingPools.map(function (pool) {
                            return bitmapIndex(pool.activeTick - exports.NUMBER_OF_SURROUNDING_TICKS, v3_sdk_1.TICK_SPACINGS[pool.fee]);
                        });
                        maxIndexes = existingPools.map(function (pool) {
                            return bitmapIndex(pool.activeTick + exports.NUMBER_OF_SURROUNDING_TICKS, v3_sdk_1.TICK_SPACINGS[pool.fee]);
                        });
                        wordList = existingPools.flatMap(function (pool, i) {
                            var minIndex = minIndexes[i];
                            var maxIndex = maxIndexes[i];
                            return Array.from({ length: maxIndex - minIndex + 1 }, function (_, i) { return minIndex + i; }).flatMap(function (j) { return ({
                                chainId: _this.chainId,
                                address: _this.tickLens[_this.chainId],
                                args: [pool.address, j],
                                abi: abi_1.tickLensAbi,
                                functionName: 'getPopulatedTicksInWord',
                                index: i,
                            }); });
                        });
                        ticksContracts = multicallMemoize({
                            multicallAddress: (_q = (_p = (_o = this.client.chain) === null || _o === void 0 ? void 0 : _o.contracts) === null || _p === void 0 ? void 0 : _p.multicall3) === null || _q === void 0 ? void 0 : _q.address,
                            allowFailure: true,
                            contracts: wordList,
                            blockNumber: options === null || options === void 0 ? void 0 : options.blockNumber
                        }, function (res, rej) {
                            if (rej)
                                return undefined;
                            return res;
                        });
                        return [4 /*yield*/, Promise.all([
                                liquidityContracts,
                                token0Contracts,
                                token1Contracts,
                                ticksContracts,
                            ])];
                    case 3:
                        _r = _s.sent(), liquidityResults = _r[0], token0Balances = _r[1], token1Balances = _r[2], tickResults = _r[3];
                        ticks = [];
                        tickResults.forEach(function (t, i) {
                            var index = wordList[i].index;
                            ticks[index] = (ticks[index] || []).concat(t.result || []);
                        });
                        transformedV3Pools = [];
                        existingPools.forEach(function (pool, i) {
                            if (!(liquidityResults === null || liquidityResults === void 0 ? void 0 : liquidityResults[i]) || !(token0Balances === null || token0Balances === void 0 ? void 0 : token0Balances[i].result) || !(token1Balances === null || token1Balances === void 0 ? void 0 : token1Balances[i].result))
                                return;
                            var balance0 = token0Balances[i].result;
                            var balance1 = token1Balances[i].result;
                            var liquidity = liquidityResults[i].result;
                            if (balance0 === undefined || balance1 === undefined || liquidity === undefined)
                                return;
                            var poolTicks = ticks[i]
                                .map(function (tick) { return ({
                                index: tick.tick,
                                DLiquidity: tick.liquidityNet,
                            }); })
                                .sort(function (a, b) { return a.index - b.index; });
                            var lowerUnknownTick = minIndexes[i] * v3_sdk_1.TICK_SPACINGS[pool.fee] * 256 - v3_sdk_1.TICK_SPACINGS[pool.fee];
                            console.assert(poolTicks.length === 0 || lowerUnknownTick < poolTicks[0].index, 'Error 236: unexpected min tick index');
                            poolTicks.unshift({
                                index: lowerUnknownTick,
                                DLiquidity: 0n,
                            });
                            var upperUnknownTick = (maxIndexes[i] + 1) * v3_sdk_1.TICK_SPACINGS[pool.fee] * 256;
                            console.assert(poolTicks[poolTicks.length - 1].index < upperUnknownTick, 'Error 244: unexpected max tick index');
                            poolTicks.push({
                                index: upperUnknownTick,
                                DLiquidity: 0n,
                            });
                            //console.log(pool.fee, TICK_SPACINGS[pool.fee], pool.activeTick, minIndexes[i], maxIndexes[i], poolTicks)
                            var v3Pool = new tines_1.UniV3Pool(pool.address, pool.token0, pool.token1, pool.fee / 1000000, balance0, balance1, pool.activeTick, liquidity, pool.sqrtPriceX96, poolTicks);
                            var pc = new UniV3Pool_1.UniV3PoolCode(v3Pool, _this.getType(), _this.getPoolProviderName());
                            transformedV3Pools.push(pc);
                            _this.pools.set(pool.address.toLowerCase(), pc);
                        });
                        this.poolsByTrade.set(this.getTradeId(t0, t1), transformedV3Pools.map(function (pc) { return pc.pool.address.toLowerCase(); }));
                        return [2 /*return*/];
                }
            });
        });
    };
    UniswapV3BaseProvider.prototype.getStaticPools = function (t1, t2) {
        var _this = this;
        var currencyCombinations = (0, getCurrencyCombinations_1.getCurrencyCombinations)(this.chainId, t1, t2);
        var allCurrencyCombinationsWithAllFees = currencyCombinations.reduce(function (list, _a) {
            var tokenA = _a[0], tokenB = _a[1];
            if (tokenA !== undefined && tokenB !== undefined) {
                return list.concat([
                    [tokenA, tokenB, v3_sdk_1.FeeAmount.LOWEST],
                    [tokenA, tokenB, v3_sdk_1.FeeAmount.LOW],
                    [tokenA, tokenB, v3_sdk_1.FeeAmount.MEDIUM],
                    [tokenA, tokenB, v3_sdk_1.FeeAmount.HIGH],
                ]);
            }
            return [];
        }, []);
        var filtered = [];
        allCurrencyCombinationsWithAllFees.forEach(function (_a) {
            var currencyA = _a[0], currencyB = _a[1], feeAmount = _a[2];
            if (currencyA && currencyB && feeAmount) {
                var tokenA = currencyA.wrapped;
                var tokenB = currencyB.wrapped;
                if (tokenA.equals(tokenB))
                    return;
                filtered.push(tokenA.sortsBefore(tokenB) ? [tokenA, tokenB, feeAmount] : [tokenB, tokenA, feeAmount]);
            }
        });
        return filtered.map(function (_a) {
            var currencyA = _a[0], currencyB = _a[1], fee = _a[2];
            return ({
                address: (0, v3_sdk_1.computePoolAddress)({
                    factoryAddress: _this.factory[_this.chainId],
                    tokenA: currencyA.wrapped,
                    tokenB: currencyB.wrapped,
                    fee: fee,
                    initCodeHashManualOverride: _this.initCodeHash[_this.chainId],
                }),
                token0: currencyA,
                token1: currencyB,
                fee: fee,
            });
        });
    };
    UniswapV3BaseProvider.prototype.startFetchPoolsData = function () {
        var _this = this;
        this.stopFetchPoolsData();
        // this.topPools = new Map()
        this.unwatchBlockNumber = this.client.watchBlockNumber({
            onBlockNumber: function (blockNumber) {
                _this.lastUpdateBlock = Number(blockNumber);
                // if (!this.isInitialized) {
                //   this.initialize()
                // } else {
                //   this.updatePools()
                // }
            },
            onError: function (error) {
                console.error("".concat(_this.getLogPrefix(), " - Error watching block number: ").concat(error.message));
            },
        });
    };
    UniswapV3BaseProvider.prototype.getCurrentPoolList = function () {
        // const tradeId = this.getTradeId(t0, t1)
        // const poolsByTrade = this.poolsByTrade.get(tradeId) ?? []
        // return poolsByTrade
        //   ? Array.from(this.pools)
        //       .filter(([poolAddress]) => poolsByTrade.includes(poolAddress))
        //       .map(([, p]) => p)
        //   : []
        return Array.from(this.pools.values());
    };
    UniswapV3BaseProvider.prototype.stopFetchPoolsData = function () {
        if (this.unwatchBlockNumber)
            this.unwatchBlockNumber();
        this.blockListener = undefined;
    };
    return UniswapV3BaseProvider;
}(LiquidityProvider_1.LiquidityProvider));
exports.UniswapV3BaseProvider = UniswapV3BaseProvider;
//# sourceMappingURL=UniswapV3Base.js.map