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
exports.TridentProvider = exports.convertTokenToBento = exports.getBentoChainId = exports.convertToNumbers = void 0;
var abi_1 = require("@sushiswap/abi");
var bentobox_1 = require("@sushiswap/bentobox");
var tines_1 = require("@sushiswap/tines");
var date_fns_1 = require("date-fns");
var memoize_fs_1 = require("memoize-fs");
var api_1 = require("../lib/api");
var BentoBridge_1 = require("../pools/BentoBridge");
var BentoPool_1 = require("../pools/BentoPool");
var Trident_1 = require("../static-pool-fetcher/Trident");
var trident_sdk_1 = require("../trident-sdk");
var LiquidityProvider_1 = require("./LiquidityProvider");
var memoizer = (0, memoize_fs_1.default)({ cachePath: "./mem-cache" });
function convertToNumbers(arr) {
    return arr.map(function (a) {
        if (a === undefined)
            return undefined;
        return parseInt(a.toString(16), 16);
    });
}
exports.convertToNumbers = convertToNumbers;
function getBentoChainId(chainId) {
    return "Bento ".concat(chainId);
}
exports.getBentoChainId = getBentoChainId;
function convertTokenToBento(token) {
    var t = __assign({}, token);
    t.chainId = getBentoChainId(token.chainId);
    t.name = getBentoChainId(token.name);
    t.symbol = getBentoChainId(token.symbol);
    delete t.tokenId;
    return t;
}
exports.convertTokenToBento = convertTokenToBento;
var TridentProvider = /** @class */ (function (_super) {
    __extends(TridentProvider, _super);
    function TridentProvider(chainId, web3Client, databaseClient) {
        var _this = _super.call(this, chainId, web3Client) || this;
        _this.TOP_POOL_SIZE = 155;
        _this.TOP_POOL_LIQUIDITY_THRESHOLD = 1000;
        _this.ON_DEMAND_POOL_SIZE = 20;
        _this.REFRESH_INITIAL_POOLS_INTERVAL = 60; // SECONDS
        _this.isInitialized = false;
        _this.topClassicPools = new Map();
        _this.topStablePools = new Map();
        _this.onDemandClassicPools = new Map();
        _this.onDemandStablePools = new Map();
        _this.poolsByTrade = new Map();
        _this.availablePools = new Map();
        _this.bridges = new Map();
        _this.bentoBox = bentobox_1.bentoBoxV1Address;
        _this.constantProductPoolFactory = trident_sdk_1.tridentConstantPoolFactoryAddress;
        _this.stablePoolFactory = trident_sdk_1.tridentStablePoolFactoryAddress;
        _this.latestPoolCreatedAtTimestamp = new Date();
        _this.discoverNewPoolsTimestamp = (0, date_fns_1.getUnixTime)((0, date_fns_1.add)(Date.now(), { seconds: _this.REFRESH_INITIAL_POOLS_INTERVAL }));
        _this.refreshAvailablePoolsTimestamp = (0, date_fns_1.getUnixTime)((0, date_fns_1.add)(Date.now(), { seconds: _this.FETCH_AVAILABLE_POOLS_AFTER_SECONDS }));
        _this.chainId = chainId;
        _this.databaseClient = databaseClient;
        if (!(chainId in _this.bentoBox) ||
            !(chainId in _this.constantProductPoolFactory) ||
            !(chainId in _this.stablePoolFactory)) {
            throw new Error("".concat(_this.getType(), " cannot be instantiated for chainId ").concat(chainId, ", no bentobox address found"));
        }
        return _this;
    }
    TridentProvider.prototype.getType = function () {
        return LiquidityProvider_1.LiquidityProviders.Trident;
    };
    TridentProvider.prototype.getPoolProviderName = function () {
        return 'Trident';
    };
    TridentProvider.prototype.initialize = function () {
        return __awaiter(this, void 0, void 0, function () {
            var availablePools, topPools;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // TODO: retry logic, every X seconds? dont flag as true until the end of the function ideally. add isInitalizing? to avoid it being called twice before completed.
                        this.isInitialized = true;
                        return [4 /*yield*/, this.getInitialPools()
                            //console.debug(`${this.getLogPrefix()} - TOTAL POOLS: ${availablePools.size}`)
                        ];
                    case 1:
                        availablePools = _a.sent();
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
                        return [4 /*yield*/, this.initPools(topPools)
                            // console.debug(
                            //   `${this.getLogPrefix()} - INIT, WATCHING ${this.topClassicPools.size} CLASSIC AND ${
                            //     this.topStablePools.size
                            //   } STABLE POOLS`
                            // )
                        ];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    TridentProvider.prototype.getInitialPools = function () {
        return __awaiter(this, void 0, void 0, function () {
            var pools;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.databaseClient) return [3 /*break*/, 2];
                        return [4 /*yield*/, (0, api_1.getAllPools)(this.databaseClient, this.chainId, 'SushiSwap', 'TRIDENT', [
                                'CONSTANT_PRODUCT_POOL',
                                'STABLE_POOL',
                            ])];
                    case 1:
                        pools = _a.sent();
                        return [2 /*return*/, pools];
                    case 2: return [2 /*return*/, new Map()];
                }
            });
        });
    };
    TridentProvider.prototype.initPools = function (pools) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
        return __awaiter(this, void 0, void 0, function () {
            var classicPools, stablePools, sortedTokens, classicReservePromise, stableReservePromise, totalsPromise, balancesPromise, _o, classicReserves, stableReserves, totals, balances, rebases;
            var _this = this;
            return __generator(this, function (_p) {
                switch (_p.label) {
                    case 0:
                        classicPools = pools.filter(function (p) { return p.type === 'CONSTANT_PRODUCT_POOL'; });
                        stablePools = pools.filter(function (p) { return p.type === 'STABLE_POOL'; });
                        sortedTokens = this.poolResponseToSortedTokens(pools);
                        classicReservePromise = this.client
                            .multicall({
                            multicallAddress: (_c = (_b = (_a = this.client.chain) === null || _a === void 0 ? void 0 : _a.contracts) === null || _b === void 0 ? void 0 : _b.multicall3) === null || _c === void 0 ? void 0 : _c.address,
                            allowFailure: true,
                            contracts: pools.map(function (pool) {
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
                        });
                        stableReservePromise = this.client
                            .multicall({
                            multicallAddress: (_f = (_e = (_d = this.client.chain) === null || _d === void 0 ? void 0 : _d.contracts) === null || _e === void 0 ? void 0 : _e.multicall3) === null || _f === void 0 ? void 0 : _f.address,
                            allowFailure: true,
                            contracts: stablePools.map(function (p) {
                                return ({
                                    address: p.address,
                                    chainId: _this.chainId,
                                    abi: abi_1.getStableReservesAbi,
                                    functionName: 'getReserves',
                                });
                            }),
                        })
                            .catch(function (e) {
                            console.warn("".concat(_this.getLogPrefix(), " - INIT: multicall failed, message: ").concat(e.message));
                        });
                        totalsPromise = this.client
                            .multicall({
                            multicallAddress: (_j = (_h = (_g = this.client.chain) === null || _g === void 0 ? void 0 : _g.contracts) === null || _h === void 0 ? void 0 : _h.multicall3) === null || _j === void 0 ? void 0 : _j.address,
                            allowFailure: true,
                            contracts: sortedTokens.map(function (t) {
                                return ({
                                    args: [t.address],
                                    address: _this.bentoBox[_this.chainId],
                                    chainId: _this.chainId,
                                    abi: abi_1.totalsAbi,
                                    functionName: 'totals',
                                });
                            }),
                        })
                            .catch(function (e) {
                            console.warn("".concat(_this.getLogPrefix(), " - INIT: multicall failed, message: ").concat(e.message));
                        });
                        balancesPromise = this.client
                            .multicall({
                            multicallAddress: (_m = (_l = (_k = this.client.chain) === null || _k === void 0 ? void 0 : _k.contracts) === null || _l === void 0 ? void 0 : _l.multicall3) === null || _m === void 0 ? void 0 : _m.address,
                            allowFailure: true,
                            contracts: sortedTokens.map(function (t) {
                                return ({
                                    args: [_this.bentoBox[_this.chainId]],
                                    address: t.address,
                                    chainId: _this.chainId,
                                    abi: abi_1.balanceOfAbi,
                                    functionName: 'balanceOf',
                                });
                            }),
                        })
                            .catch(function (e) {
                            console.warn("".concat(_this.getLogPrefix(), " - INIT: multicall failed, message: ").concat(e.message));
                        });
                        return [4 /*yield*/, Promise.all([
                                classicReservePromise,
                                stableReservePromise,
                                totalsPromise,
                                balancesPromise,
                            ])];
                    case 1:
                        _o = _p.sent(), classicReserves = _o[0], stableReserves = _o[1], totals = _o[2], balances = _o[3];
                        classicPools.forEach(function (pool, i) {
                            var _a, _b, _c, _d;
                            var res0 = (_b = (_a = classicReserves === null || classicReserves === void 0 ? void 0 : classicReserves[i]) === null || _a === void 0 ? void 0 : _a.result) === null || _b === void 0 ? void 0 : _b[0];
                            var res1 = (_d = (_c = classicReserves === null || classicReserves === void 0 ? void 0 : classicReserves[i]) === null || _c === void 0 ? void 0 : _c.result) === null || _d === void 0 ? void 0 : _d[1];
                            if (!res0 || !res1)
                                return;
                            var tokens = [
                                convertTokenToBento((0, api_1.mapToken)(_this.chainId, pool.token0)),
                                convertTokenToBento((0, api_1.mapToken)(_this.chainId, pool.token1)),
                            ];
                            var rPool = new tines_1.ConstantProductRPool(pool.address, tokens[0], tokens[1], pool.swapFee, res0, res1);
                            var pc = new BentoPool_1.BentoPoolCode(rPool, _this.getType(), _this.getPoolProviderName());
                            _this.topClassicPools.set(pool.address, pc);
                        });
                        rebases = new Map();
                        sortedTokens.forEach(function (t, i) {
                            var _a, _b, _c, _d, _e;
                            var elastic = (_b = (_a = totals === null || totals === void 0 ? void 0 : totals[i]) === null || _a === void 0 ? void 0 : _a.result) === null || _b === void 0 ? void 0 : _b[0];
                            var base = (_d = (_c = totals === null || totals === void 0 ? void 0 : totals[i]) === null || _c === void 0 ? void 0 : _c.result) === null || _d === void 0 ? void 0 : _d[1];
                            var balance = (_e = balances === null || balances === void 0 ? void 0 : balances[i]) === null || _e === void 0 ? void 0 : _e.result;
                            if (!elastic || !base || !balance)
                                return;
                            var pool = new tines_1.BridgeBento("Bento bridge for ".concat(t.symbol), t, convertTokenToBento(t), elastic, base, balance);
                            _this.bridges.set(t.address.toLowerCase(), new BentoBridge_1.BentoBridgePoolCode(pool, _this.getType(), _this.getPoolProviderName(), _this.bentoBox[_this.chainId]));
                            rebases.set(t.address.toLowerCase(), {
                                elastic: elastic,
                                base: base,
                            });
                        });
                        stablePools.forEach(function (pool, i) {
                            var _a, _b, _c, _d;
                            var res0 = (_b = (_a = stableReserves === null || stableReserves === void 0 ? void 0 : stableReserves[i]) === null || _a === void 0 ? void 0 : _a.result) === null || _b === void 0 ? void 0 : _b[0];
                            var res1 = (_d = (_c = stableReserves === null || stableReserves === void 0 ? void 0 : stableReserves[i]) === null || _c === void 0 ? void 0 : _c.result) === null || _d === void 0 ? void 0 : _d[1];
                            var totals0 = rebases.get(pool.token0.address);
                            var totals1 = rebases.get(pool.token1.address);
                            if (!res0 || !res1 || totals0 === undefined || totals1 === undefined)
                                return;
                            var tokens = [
                                convertTokenToBento((0, api_1.mapToken)(_this.chainId, pool.token0)),
                                convertTokenToBento((0, api_1.mapToken)(_this.chainId, pool.token1)),
                            ];
                            var stablePool = new tines_1.StableSwapRPool(pool.address, tokens[0], tokens[1], pool.swapFee, (0, tines_1.toShareBI)(res0, totals0), (0, tines_1.toShareBI)(res1, totals1), pool.token0.decimals, pool.token1.decimals, totals0, totals1);
                            _this.topStablePools.set(pool.address, new BentoPool_1.BentoPoolCode(stablePool, _this.getType(), _this.getPoolProviderName()));
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    TridentProvider.prototype.updatePools = function () {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t;
        return __awaiter(this, void 0, void 0, function () {
            var initialClassicPools, initialStablePools, onDemandClassicPools, onDemandStablePools, bridges, initClassicReservePromise, onDemandClassicReservePromise, initStableReservePromise, onDemandStableReservePromise, totalsPromise, balancesPromise, _u, initClassicReserves, onDemandClassicReserves, initStableReserves, onDemandStableReserves, totals, balances, rebases;
            var _this = this;
            return __generator(this, function (_v) {
                switch (_v.label) {
                    case 0:
                        this.removeStalePools();
                        // The two calls below are Async functions, but we do not want them to block. If they find any pools they will be updated next interval
                        this.discoverNewPools();
                        this.updateAvailablePools();
                        initialClassicPools = Array.from(this.topClassicPools.values());
                        initialStablePools = Array.from(this.topStablePools.values());
                        onDemandClassicPools = Array.from(this.onDemandClassicPools.values()).map(function (p) { return p.poolCode; });
                        onDemandStablePools = Array.from(this.onDemandStablePools.values()).map(function (p) { return p.poolCode; });
                        if (initialClassicPools.length === 0 &&
                            initialStablePools.length === 0 &&
                            onDemandClassicPools.length === 0 &&
                            onDemandStablePools.length === 0) {
                            return [2 /*return*/];
                        }
                        bridges = Array.from(this.bridges.values());
                        initClassicReservePromise = this.client
                            .multicall({
                            multicallAddress: (_c = (_b = (_a = this.client.chain) === null || _a === void 0 ? void 0 : _a.contracts) === null || _b === void 0 ? void 0 : _b.multicall3) === null || _c === void 0 ? void 0 : _c.address,
                            allowFailure: true,
                            contracts: initialClassicPools.map(function (pc) {
                                return ({
                                    address: pc.pool.address,
                                    chainId: _this.chainId,
                                    abi: abi_1.getReservesAbi,
                                    functionName: 'getReserves',
                                });
                            }),
                        })
                            .catch(function (e) {
                            console.warn("".concat(_this.getLogPrefix(), " - UPDATE: multicall failed, message: ").concat(e.message));
                            return undefined;
                        });
                        onDemandClassicReservePromise = this.client
                            .multicall({
                            multicallAddress: (_f = (_e = (_d = this.client.chain) === null || _d === void 0 ? void 0 : _d.contracts) === null || _e === void 0 ? void 0 : _e.multicall3) === null || _f === void 0 ? void 0 : _f.address,
                            allowFailure: true,
                            contracts: onDemandClassicPools.map(function (pc) {
                                return ({
                                    address: pc.pool.address,
                                    chainId: _this.chainId,
                                    abi: abi_1.getReservesAbi,
                                    functionName: 'getReserves',
                                });
                            }),
                        })
                            .catch(function (e) {
                            console.warn("".concat(_this.getLogPrefix(), " - UPDATE: multicall failed, message: ").concat(e.message));
                            return undefined;
                        });
                        initStableReservePromise = this.client
                            .multicall({
                            multicallAddress: (_j = (_h = (_g = this.client.chain) === null || _g === void 0 ? void 0 : _g.contracts) === null || _h === void 0 ? void 0 : _h.multicall3) === null || _j === void 0 ? void 0 : _j.address,
                            allowFailure: true,
                            contracts: initialStablePools.map(function (pc) {
                                return ({
                                    address: pc.pool.address,
                                    chainId: _this.chainId,
                                    abi: abi_1.getStableReservesAbi,
                                    functionName: 'getReserves',
                                });
                            }),
                        })
                            .catch(function (e) {
                            console.warn("".concat(_this.getLogPrefix(), " - UPDATE: multicall failed, message: ").concat(e.message));
                            return undefined;
                        });
                        onDemandStableReservePromise = this.client
                            .multicall({
                            multicallAddress: (_m = (_l = (_k = this.client.chain) === null || _k === void 0 ? void 0 : _k.contracts) === null || _l === void 0 ? void 0 : _l.multicall3) === null || _m === void 0 ? void 0 : _m.address,
                            allowFailure: true,
                            contracts: onDemandStablePools.map(function (pc) {
                                return ({
                                    address: pc.pool.address,
                                    chainId: _this.chainId,
                                    abi: abi_1.getStableReservesAbi,
                                    functionName: 'getReserves',
                                });
                            }),
                        })
                            .catch(function (e) {
                            console.warn("".concat(_this.getLogPrefix(), " - UPDATE: multicall failed, message: ").concat(e.message));
                            return undefined;
                        });
                        totalsPromise = this.client
                            .multicall({
                            multicallAddress: (_q = (_p = (_o = this.client.chain) === null || _o === void 0 ? void 0 : _o.contracts) === null || _p === void 0 ? void 0 : _p.multicall3) === null || _q === void 0 ? void 0 : _q.address,
                            allowFailure: true,
                            contracts: bridges.map(function (b) {
                                return ({
                                    args: [b.pool.token0.address],
                                    address: _this.bentoBox[_this.chainId],
                                    chainId: _this.chainId,
                                    abi: abi_1.totalsAbi,
                                    functionName: 'totals',
                                });
                            }),
                        })
                            .catch(function (e) {
                            console.warn("".concat(_this.getLogPrefix(), " - UPDATE: multicall failed, message: ").concat(e.message));
                            return undefined;
                        });
                        balancesPromise = this.client
                            .multicall({
                            multicallAddress: (_t = (_s = (_r = this.client.chain) === null || _r === void 0 ? void 0 : _r.contracts) === null || _s === void 0 ? void 0 : _s.multicall3) === null || _t === void 0 ? void 0 : _t.address,
                            allowFailure: true,
                            contracts: bridges.map(function (b) {
                                return ({
                                    args: [_this.bentoBox[_this.chainId]],
                                    address: b.pool.token0.address,
                                    chainId: _this.chainId,
                                    abi: abi_1.balanceOfAbi,
                                    functionName: 'balanceOf',
                                });
                            }),
                        })
                            .catch(function (e) {
                            console.warn("".concat(_this.getLogPrefix(), " - UPDATE: multicall failed, message: ").concat(e.message));
                            return undefined;
                        });
                        return [4 /*yield*/, Promise.all([
                                initClassicReservePromise,
                                onDemandClassicReservePromise,
                                initStableReservePromise,
                                onDemandStableReservePromise,
                                totalsPromise,
                                balancesPromise,
                            ])];
                    case 1:
                        _u = _v.sent(), initClassicReserves = _u[0], onDemandClassicReserves = _u[1], initStableReserves = _u[2], onDemandStableReserves = _u[3], totals = _u[4], balances = _u[5];
                        this.updateClassicReserves(initialClassicPools, initClassicReserves);
                        this.updateClassicReserves(onDemandClassicPools, onDemandClassicReserves);
                        rebases = new Map();
                        bridges.forEach(function (b, i) {
                            var _a, _b, _c, _d, _e;
                            var bridge = b.pool;
                            var t = bridge.token0;
                            var elastic = (_b = (_a = totals === null || totals === void 0 ? void 0 : totals[i]) === null || _a === void 0 ? void 0 : _a.result) === null || _b === void 0 ? void 0 : _b[0];
                            var base = (_d = (_c = totals === null || totals === void 0 ? void 0 : totals[i]) === null || _c === void 0 ? void 0 : _c.result) === null || _d === void 0 ? void 0 : _d[1];
                            var balance = (_e = balances === null || balances === void 0 ? void 0 : balances[i]) === null || _e === void 0 ? void 0 : _e.result;
                            if (!elastic || !base || !balance) {
                                return;
                            }
                            rebases.set(t.address.toLowerCase(), {
                                elastic: elastic,
                                base: base,
                            });
                            if (bridge.reserve0 !== elastic || bridge.reserve1 === base) {
                                bridge.updateReserves(elastic, base);
                                // console.debug(
                                //   `${this.getLogPrefix()} - BRIDGE REBASE UPDATE: ${bridge.token0.symbol} ${bridge.reserve0} ${bridge.reserve1}`
                                // )
                            }
                            if (bridge.freeLiquidity !== Number(balance)) {
                                bridge.freeLiquidity = Number(balance);
                                //console.debug(`${this.getLogPrefix()} - BRIDGE BALANCE UPDATE: ${bridge.token0.symbol} ${bridge.freeLiquidity}`)
                            }
                        });
                        this.updateStablePools(initialStablePools, rebases, initStableReserves);
                        this.updateStablePools(onDemandStablePools, rebases, onDemandStableReserves);
                        return [2 /*return*/];
                }
            });
        });
    };
    TridentProvider.prototype.getOnDemandPools = function (t0, t1, excludePools, options) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
        return __awaiter(this, void 0, void 0, function () {
            var topPoolAddresses, pools, _o, onDemandClassicPools, onDemandStablePools, _p, validUntilTimestamp, sortedTokens, classicPoolCodesToCreate, stablePoolCodesToCreate, bridgesToCreate, asyncMulticallWrapper, multicallMemoize, classicReservePromise, stableReservePromise, totalsPromise, balancesPromise, _q, classicReserves, stableReserves, totals, balances, rebases;
            var _this = this;
            return __generator(this, function (_r) {
                switch (_r.label) {
                    case 0:
                        topPoolAddresses = __spreadArray(__spreadArray([], Array.from(this.topClassicPools.keys()), true), Array.from(this.topStablePools.keys()), true);
                        pools = (0, api_1.filterOnDemandPools)(Array.from(this.availablePools.values()), t0.address, t1.address, topPoolAddresses, this.ON_DEMAND_POOL_SIZE);
                        if (excludePools)
                            pools = pools.filter(function (p) { return !excludePools.has(p.address); });
                        if (!(pools.length > 0)) return [3 /*break*/, 1];
                        _p = [
                            pools.filter(function (p) { return p.type === 'CONSTANT_PRODUCT_POOL' && !_this.topClassicPools.has(p.address); }),
                            pools.filter(function (p) { return p.type === 'STABLE_POOL' && !_this.topStablePools.has(p.address); }),
                        ];
                        return [3 /*break*/, 3];
                    case 1: return [4 /*yield*/, Trident_1.TridentStaticPoolFetcher.getStaticPools(this.client, this.chainId, t0, t1, options)];
                    case 2:
                        _p = _r.sent();
                        _r.label = 3;
                    case 3:
                        _o = _p, onDemandClassicPools = _o[0], onDemandStablePools = _o[1];
                        if (excludePools)
                            onDemandClassicPools = onDemandClassicPools.filter(function (p) { return !excludePools.has(p.address); });
                        if (excludePools)
                            onDemandStablePools = onDemandStablePools.filter(function (p) { return !excludePools.has(p.address); });
                        this.poolsByTrade.set(this.getTradeId(t0, t1), [onDemandClassicPools, onDemandStablePools].flat().map(function (pool) { return pool.address; }));
                        validUntilTimestamp = (0, date_fns_1.getUnixTime)((0, date_fns_1.add)(Date.now(), { seconds: this.ON_DEMAND_POOLS_LIFETIME_IN_SECONDS }));
                        sortedTokens = this.poolResponseToSortedTokens(__spreadArray(__spreadArray([], onDemandClassicPools, true), onDemandStablePools, true).flat());
                        classicPoolCodesToCreate = [];
                        stablePoolCodesToCreate = [];
                        bridgesToCreate = [];
                        sortedTokens.forEach(function (t) {
                            var fakeBridgeAddress = "Bento bridge for ".concat(t.symbol);
                            if (excludePools === null || excludePools === void 0 ? void 0 : excludePools.has(fakeBridgeAddress))
                                return;
                            if (!_this.bridges.has(t.address)) {
                                var pool = new tines_1.BridgeBento(fakeBridgeAddress, t, convertTokenToBento(t), 0n, 0n, 0n);
                                bridgesToCreate.push(new BentoBridge_1.BentoBridgePoolCode(pool, _this.getType(), _this.getPoolProviderName(), _this.bentoBox[_this.chainId]));
                                // ++newBridges
                            }
                        });
                        onDemandClassicPools.forEach(function (pr) {
                            var existingPool = _this.onDemandClassicPools.get(pr.address);
                            if (existingPool === undefined) {
                                if (!pr.swapFee)
                                    return;
                                var rPool = new tines_1.ConstantProductRPool(pr.address, convertTokenToBento(pr.token0), convertTokenToBento(pr.token1), pr.swapFee, 0n, 0n);
                                var pc = new BentoPool_1.BentoPoolCode(rPool, _this.getType(), _this.getPoolProviderName());
                                classicPoolCodesToCreate.push(pc);
                            }
                            else {
                                existingPool.validUntilTimestamp = validUntilTimestamp;
                                // ++updated
                            }
                        });
                        onDemandStablePools.forEach(function (pr) {
                            var existingPool = _this.onDemandStablePools.get(pr.address);
                            if (existingPool === undefined) {
                                if (!pr.swapFee)
                                    return;
                                var stablePool = new tines_1.StableSwapRPool(pr.address, convertTokenToBento(pr.token0), convertTokenToBento(pr.token1), pr.swapFee, 0n, 0n, pr.token0.decimals, pr.token1.decimals, { elastic: 0n, base: 0n }, { elastic: 0n, base: 0n });
                                var pc = new BentoPool_1.BentoPoolCode(stablePool, _this.getType(), _this.getPoolProviderName());
                                stablePoolCodesToCreate.push(pc);
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
                    case 4:
                        multicallMemoize = _r.sent();
                        classicReservePromise = multicallMemoize({
                            multicallAddress: (_c = (_b = (_a = this.client.chain) === null || _a === void 0 ? void 0 : _a.contracts) === null || _b === void 0 ? void 0 : _b.multicall3) === null || _c === void 0 ? void 0 : _c.address,
                            allowFailure: true,
                            blockNumber: options === null || options === void 0 ? void 0 : options.blockNumber,
                            contracts: classicPoolCodesToCreate.map(function (pc) {
                                return ({
                                    address: pc.pool.address,
                                    chainId: _this.chainId,
                                    abi: abi_1.getReservesAbi,
                                    functionName: 'getReserves',
                                });
                            }),
                        }, function (res, rej) {
                            if (rej) {
                                console.warn("".concat(_this.getLogPrefix(), " - UPDATE: multicall failed, message: ").concat(rej.message));
                                return undefined;
                            }
                            else
                                return res;
                        });
                        stableReservePromise = multicallMemoize({
                            multicallAddress: (_f = (_e = (_d = this.client.chain) === null || _d === void 0 ? void 0 : _d.contracts) === null || _e === void 0 ? void 0 : _e.multicall3) === null || _f === void 0 ? void 0 : _f.address,
                            allowFailure: true,
                            blockNumber: options === null || options === void 0 ? void 0 : options.blockNumber,
                            contracts: stablePoolCodesToCreate.map(function (pc) {
                                return ({
                                    address: pc.pool.address,
                                    chainId: _this.chainId,
                                    abi: abi_1.getStableReservesAbi,
                                    functionName: 'getReserves',
                                });
                            }),
                        }, function (res, rej) {
                            if (rej) {
                                console.warn("".concat(_this.getLogPrefix(), " - UPDATE: multicall failed, message: ").concat(rej.message));
                                return undefined;
                            }
                            else
                                return res;
                        });
                        totalsPromise = multicallMemoize({
                            multicallAddress: (_j = (_h = (_g = this.client.chain) === null || _g === void 0 ? void 0 : _g.contracts) === null || _h === void 0 ? void 0 : _h.multicall3) === null || _j === void 0 ? void 0 : _j.address,
                            allowFailure: true,
                            blockNumber: options === null || options === void 0 ? void 0 : options.blockNumber,
                            contracts: bridgesToCreate.map(function (b) {
                                return ({
                                    args: [b.pool.token0.address],
                                    address: _this.bentoBox[_this.chainId],
                                    chainId: _this.chainId,
                                    abi: abi_1.totalsAbi,
                                    functionName: 'totals',
                                });
                            }),
                        }, function (res, rej) {
                            if (rej) {
                                console.warn("".concat(_this.getLogPrefix(), " - UPDATE: multicall failed, message: ").concat(rej.message));
                                return undefined;
                            }
                            else
                                return res;
                        });
                        balancesPromise = multicallMemoize({
                            multicallAddress: (_m = (_l = (_k = this.client.chain) === null || _k === void 0 ? void 0 : _k.contracts) === null || _l === void 0 ? void 0 : _l.multicall3) === null || _m === void 0 ? void 0 : _m.address,
                            allowFailure: true,
                            blockNumber: options === null || options === void 0 ? void 0 : options.blockNumber,
                            contracts: bridgesToCreate.map(function (b) {
                                return ({
                                    args: [_this.bentoBox[_this.chainId]],
                                    address: b.pool.token0.address,
                                    chainId: _this.chainId,
                                    abi: abi_1.balanceOfAbi,
                                    functionName: 'balanceOf',
                                });
                            }),
                        }, function (res, rej) {
                            if (rej) {
                                console.warn("".concat(_this.getLogPrefix(), " - UPDATE: multicall failed, message: ").concat(rej.message));
                                return undefined;
                            }
                            else
                                return res;
                        });
                        return [4 /*yield*/, Promise.all([
                                classicReservePromise,
                                stableReservePromise,
                                totalsPromise,
                                balancesPromise,
                            ])];
                    case 5:
                        _q = _r.sent(), classicReserves = _q[0], stableReserves = _q[1], totals = _q[2], balances = _q[3];
                        classicPoolCodesToCreate.forEach(function (poolCode, i) {
                            var _a, _b, _c, _d;
                            var pool = poolCode.pool;
                            var res0 = (_b = (_a = classicReserves === null || classicReserves === void 0 ? void 0 : classicReserves[i]) === null || _a === void 0 ? void 0 : _a.result) === null || _b === void 0 ? void 0 : _b[0];
                            var res1 = (_d = (_c = classicReserves === null || classicReserves === void 0 ? void 0 : classicReserves[i]) === null || _c === void 0 ? void 0 : _c.result) === null || _d === void 0 ? void 0 : _d[1];
                            if (res0 !== undefined && res1 !== undefined) {
                                pool.updateReserves(res0, res1);
                                _this.onDemandClassicPools.set(pool.address, { poolCode: poolCode, validUntilTimestamp: validUntilTimestamp });
                                // ++created
                                // console.debug(
                                //   `${this.getLogPrefix()} - ON DEMAND CREATION: ${pool.address} classic (${pool.token0.symbol}/${
                                //     pool.token1.symbol
                                //   })`
                                // )
                            }
                            else {
                                console.error("".concat(_this.getLogPrefix(), " - ERROR FETCHING RESERVES: ").concat(pool.address, ", pool does not exist?"));
                                // TODO: some pools seem to be initialized with 0 in reserves, they should just be ignored, shouldn't log error
                            }
                        });
                        rebases = new Map();
                        bridgesToCreate.forEach(function (bc, i) {
                            var _a, _b, _c, _d, _e;
                            var bridge = bc.pool;
                            var t = bridge.token0;
                            var elastic = (_b = (_a = totals === null || totals === void 0 ? void 0 : totals[i]) === null || _a === void 0 ? void 0 : _a.result) === null || _b === void 0 ? void 0 : _b[0];
                            var base = (_d = (_c = totals === null || totals === void 0 ? void 0 : totals[i]) === null || _c === void 0 ? void 0 : _c.result) === null || _d === void 0 ? void 0 : _d[1];
                            var balance = (_e = balances === null || balances === void 0 ? void 0 : balances[i]) === null || _e === void 0 ? void 0 : _e.result;
                            if (!elastic || !base || !balance) {
                                return;
                            }
                            rebases.set(t.address.toLowerCase(), {
                                elastic: elastic,
                                base: base,
                            });
                            bridge.updateReserves(elastic, base);
                            bridge.freeLiquidity = Number(balance);
                            _this.bridges.set(bridge.address.toLowerCase(), bc);
                        });
                        stablePoolCodesToCreate.forEach(function (poolCode, i) {
                            var _a, _b, _c, _d;
                            var pool = poolCode.pool;
                            var total0 = rebases.get(pool.token0.address.toLowerCase());
                            if (total0) {
                                var current = pool.getTotal0();
                                if (total0.elastic !== current.elastic || total0.base !== current.base) {
                                    pool.updateTotal0(total0);
                                }
                            }
                            var total1 = rebases.get(pool.token1.address.toLowerCase());
                            if (total1) {
                                var current = pool.getTotal1();
                                if (total1.elastic !== current.elastic || total1.base !== current.base) {
                                    pool.updateTotal1(total1);
                                }
                            }
                            var res0 = (_b = (_a = stableReserves === null || stableReserves === void 0 ? void 0 : stableReserves[i]) === null || _a === void 0 ? void 0 : _a.result) === null || _b === void 0 ? void 0 : _b[0];
                            var res1 = (_d = (_c = stableReserves === null || stableReserves === void 0 ? void 0 : stableReserves[i]) === null || _c === void 0 ? void 0 : _c.result) === null || _d === void 0 ? void 0 : _d[1];
                            if (!res0 || !res1) {
                                return;
                            }
                            //pool.updateReserves(toShareBI(res0BN, pool.getTotal0()), toShareBI(res1BN, pool.getTotal1()))
                            pool.updateReservesAmounts(res0, res1);
                            _this.onDemandStablePools.set(pool.address, { poolCode: poolCode, validUntilTimestamp: validUntilTimestamp });
                            // console.debug(
                            //   `${this.getLogPrefix()} - ON DEMAND CREATION: ${pool.address} stable (${pool.token0.symbol}/${
                            //     pool.token1.symbol
                            //   })`
                            // )
                            // ++created
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    TridentProvider.prototype.discoverNewPools = function () {
        return __awaiter(this, void 0, void 0, function () {
            var newDate, discoveredPools, addedPools_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.discoverNewPoolsTimestamp > (0, date_fns_1.getUnixTime)(Date.now())) {
                            return [2 /*return*/];
                        }
                        if (!this.databaseClient) {
                            return [2 /*return*/];
                        }
                        this.discoverNewPoolsTimestamp = (0, date_fns_1.getUnixTime)((0, date_fns_1.add)(Date.now(), { seconds: this.REFRESH_INITIAL_POOLS_INTERVAL }));
                        newDate = new Date();
                        return [4 /*yield*/, (0, api_1.discoverNewPools)(this.databaseClient, this.chainId, 'SushiSwap', 'TRIDENT', ['CONSTANT_PRODUCT_POOL', 'STABLE_POOL'], this.latestPoolCreatedAtTimestamp)];
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
    TridentProvider.prototype.updateAvailablePools = function () {
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
    TridentProvider.prototype.prioritizeTopPools = function () {
        var _this = this;
        var allNewPools = (0, api_1.filterTopPools)(Array.from(this.availablePools.values()), this.TOP_POOL_SIZE);
        var currentClassicPoolAddresses = Array.from(this.topClassicPools.keys());
        var newClassicAddresses = Array.from(allNewPools.filter(function (p) { return p.type === 'CONSTANT_PRODUCT_POOL'; }).map(function (pool) { return pool.address; }));
        var classicPoolsToRemove = currentClassicPoolAddresses.filter(function (x) { return !newClassicAddresses.includes(x); });
        var classicPoolsToAdd = newClassicAddresses.filter(function (x) { return !currentClassicPoolAddresses.includes(x); });
        classicPoolsToRemove.forEach(function (address) {
            _this.topClassicPools.delete(address);
            //console.log(`${this.getLogPrefix()} - PRIORITIZE POOLS: Removed ${address} from classic top pools`)
        });
        classicPoolsToAdd.forEach(function (address) {
            var poolsToCreate = _this.availablePools.get(address);
            if (poolsToCreate) {
                var tokens = [
                    convertTokenToBento((0, api_1.mapToken)(_this.chainId, poolsToCreate.token0)),
                    convertTokenToBento((0, api_1.mapToken)(_this.chainId, poolsToCreate.token1)),
                ];
                var rPool = new tines_1.ConstantProductRPool(poolsToCreate.address, tokens[0], tokens[1], poolsToCreate.swapFee, 0n, 0n);
                _this.topClassicPools.set(poolsToCreate.address, new BentoPool_1.BentoPoolCode(rPool, _this.getType(), _this.getPoolProviderName()));
                //console.log(`${this.getLogPrefix()} - PRIORITIZE POOLS: Added ${address} to classic top pools`)
            }
            else {
                console.warn("".concat(_this.getLogPrefix(), " - PRIORITIZE POOLS: Could not find classic pool, unexpected state."));
            }
        });
        var currentStablePoolAddresses = Array.from(this.topStablePools.keys());
        var newStablePools = Array.from(allNewPools.filter(function (p) { return p.type === 'STABLE_POOL'; }));
        var newStablePoolAddresses = newStablePools.map(function (pool) { return pool.address; });
        var stablePoolsToRemove = currentStablePoolAddresses.filter(function (x) { return !newStablePoolAddresses.includes(x); });
        var stablePoolsToAdd = newStablePoolAddresses.filter(function (x) { return !currentStablePoolAddresses.includes(x); });
        stablePoolsToRemove.forEach(function (address) {
            _this.topStablePools.delete(address);
            //console.log(`${this.getLogPrefix()} - PRIORITIZE POOLS: Removed ${address} from stable top pools`)
        });
        stablePoolsToAdd.forEach(function (address) {
            var poolsToCreate = _this.availablePools.get(address);
            if (poolsToCreate) {
                var token0 = (0, api_1.mapToken)(_this.chainId, poolsToCreate.token0);
                var token1 = (0, api_1.mapToken)(_this.chainId, poolsToCreate.token1);
                var stablePool = new tines_1.StableSwapRPool(poolsToCreate.address, convertTokenToBento(token0), convertTokenToBento(token1), poolsToCreate.swapFee, 0n, 0n, poolsToCreate.token0.decimals, poolsToCreate.token1.decimals, { elastic: 0n, base: 0n }, { elastic: 0n, base: 0n });
                _this.topStablePools.set(poolsToCreate.address, new BentoPool_1.BentoPoolCode(stablePool, _this.getType(), _this.getPoolProviderName()));
                //console.log(`${this.getLogPrefix()} - PRIORITIZE POOLS: Added ${address} to stable top pools`)
            }
            else {
                console.warn("".concat(_this.getLogPrefix(), " - PRIORITIZE POOLS: Could not find stable pool, unexpected state."));
            }
        });
        var allPoolsToCreate = allNewPools.filter(function (p) { return stablePoolsToAdd.includes(p.address) || classicPoolsToAdd.includes(p.address); });
        var sortedTokens = this.poolResponseToSortedTokens(allPoolsToCreate);
        sortedTokens.forEach(function (t) {
            if (!_this.bridges.has(t.address)) {
                var bridge = new tines_1.BridgeBento("Bento bridge for ".concat(t.symbol), t, convertTokenToBento(t), 0n, 0n, 0n);
                _this.bridges.set(t.address.toLowerCase(), new BentoBridge_1.BentoBridgePoolCode(bridge, _this.getType(), _this.getPoolProviderName(), _this.bentoBox[_this.chainId]));
                //console.log(`${this.getLogPrefix()} - PRIORITIZE POOLS: Added bridge ${bridge.address}`)
            }
        });
    };
    TridentProvider.prototype.startFetchPoolsData = function () {
        var _this = this;
        this.stopFetchPoolsData();
        this.topClassicPools = new Map();
        this.topStablePools = new Map();
        this.bridges = new Map();
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
    TridentProvider.prototype.removeStalePools = function () {
        var removed = 0;
        var now = (0, date_fns_1.getUnixTime)(Date.now());
        for (var _i = 0, _a = this.onDemandClassicPools.values(); _i < _a.length; _i++) {
            var poolInfo = _a[_i];
            if (poolInfo.validUntilTimestamp < now) {
                this.onDemandClassicPools.delete(poolInfo.poolCode.pool.address);
                removed++;
            }
        }
        for (var _b = 0, _c = this.onDemandStablePools.values(); _b < _c.length; _b++) {
            var poolInfo = _c[_b];
            if (poolInfo.validUntilTimestamp < now) {
                this.onDemandStablePools.delete(poolInfo.poolCode.pool.address);
                removed++;
            }
        }
        if (removed > 0) {
            //console.log(`${this.getLogPrefix()} -Removed ${removed} stale pools`)
        }
    };
    TridentProvider.prototype.fetchPoolsForToken = function (t0, t1, excludePools, options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getOnDemandPools(t0, t1, excludePools, options)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    TridentProvider.prototype.getCurrentPoolList = function (t0, t1) {
        var _a;
        var tradeId = this.getTradeId(t0, t1);
        var poolsByTrade = (_a = this.poolsByTrade.get(tradeId)) !== null && _a !== void 0 ? _a : [];
        var onDemandPoolCodes = poolsByTrade
            ? [Array.from(this.onDemandClassicPools), Array.from(this.onDemandStablePools)]
                .flat()
                .filter(function (_a) {
                var poolAddress = _a[0];
                return poolsByTrade.includes(poolAddress);
            })
                .map(function (_a) {
                var p = _a[1];
                return p.poolCode;
            })
            : [];
        return __spreadArray(__spreadArray(__spreadArray(__spreadArray([], this.topClassicPools.values(), true), this.topStablePools.values(), true), onDemandPoolCodes, true), this.bridges.values(), true);
    };
    TridentProvider.prototype.stopFetchPoolsData = function () {
        if (this.unwatchBlockNumber)
            this.unwatchBlockNumber();
        this.blockListener = undefined;
    };
    TridentProvider.prototype.updateClassicReserves = function (poolCodes, reserves) {
        if (!reserves)
            return;
        poolCodes.forEach(function (pc, i) {
            var _a, _b, _c, _d;
            var pool = pc.pool;
            var res0 = (_b = (_a = reserves === null || reserves === void 0 ? void 0 : reserves[i]) === null || _a === void 0 ? void 0 : _a.result) === null || _b === void 0 ? void 0 : _b[0];
            var res1 = (_d = (_c = reserves === null || reserves === void 0 ? void 0 : reserves[i]) === null || _c === void 0 ? void 0 : _c.result) === null || _d === void 0 ? void 0 : _d[1];
            if (!res0 || !res1) {
                return;
            }
            if (pool.reserve0 === res0 && pool.reserve1 === res1) {
                return;
            }
            pool.updateReserves(res0, res1);
            // console.info(
            //   `${this.getLogPrefix()} - SYNC, classic pool: ${pool.address} ${pool.token0.symbol}/${
            //     pool.token1.symbol
            //   } ${res0BN.toString()} ${res1BN.toString()}`
            // )
        });
    };
    TridentProvider.prototype.updateStablePools = function (poolCodes, rebases, reserves) {
        if (!reserves)
            return;
        poolCodes.forEach(function (pc, i) {
            var _a, _b, _c, _d;
            var pool = pc.pool;
            var total0 = rebases.get(pool.token0.address.toLowerCase());
            if (total0) {
                var current = pool.getTotal0();
                if (total0.elastic !== current.elastic || total0.base !== current.base) {
                    pool.updateTotal0(total0);
                }
            }
            var total1 = rebases.get(pool.token1.address.toLowerCase());
            if (total1) {
                var current = pool.getTotal1();
                if (total1.elastic !== current.elastic || total1.base !== current.base) {
                    pool.updateTotal1(total1);
                }
            }
            var res0 = (_b = (_a = reserves === null || reserves === void 0 ? void 0 : reserves[i]) === null || _a === void 0 ? void 0 : _a.result) === null || _b === void 0 ? void 0 : _b[0];
            var res1 = (_d = (_c = reserves === null || reserves === void 0 ? void 0 : reserves[i]) === null || _c === void 0 ? void 0 : _c.result) === null || _d === void 0 ? void 0 : _d[1];
            if (!res0 || !res1) {
                return;
            }
            pool.updateReservesAmounts(res0, res1);
            // Always updating because reserve0 and 1 is being converted to amount and adjusted to wei using realReservesToAdjusted()
            // but the res0 and res1 are not adjusted.
        });
    };
    TridentProvider.prototype.poolResponseToSortedTokens = function (poolResults) {
        var tokenMap = new Map();
        poolResults.forEach(function (pool) {
            tokenMap.set(pool.token0.address, pool.token0);
            tokenMap.set(pool.token1.address, pool.token1);
        });
        var tokensDedup = Array.from(tokenMap.values());
        // tokens sorting
        var tok0 = tokensDedup.map(function (t) { return [
            t.address.toLocaleLowerCase().substring(2).padStart(40, '0'),
            t,
        ]; });
        return tok0.sort(function (a, b) { return (b[0] > a[0] ? -1 : 1); }).map(function (_a) {
            var t = _a[1];
            return t;
        });
    };
    return TridentProvider;
}(LiquidityProvider_1.LiquidityProvider));
exports.TridentProvider = TridentProvider;
//# sourceMappingURL=Trident.js.map