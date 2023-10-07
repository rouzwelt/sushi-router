"use strict";
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
exports.DataFetcher = void 0;
var bentobox_1 = require("@sushiswap/bentobox");
var viem_config_1 = require("@sushiswap/viem-config");
var viem_1 = require("viem");
var ApeSwap_1 = require("./liquidity-providers/ApeSwap");
var Biswap_1 = require("./liquidity-providers/Biswap");
var CurveProvider_1 = require("./liquidity-providers/CurveProvider");
var Dfyn_1 = require("./liquidity-providers/Dfyn");
var DovishV3_1 = require("./liquidity-providers/DovishV3");
var Elk_1 = require("./liquidity-providers/Elk");
var HoneySwap_1 = require("./liquidity-providers/HoneySwap");
var JetSwap_1 = require("./liquidity-providers/JetSwap");
var LaserSwap_1 = require("./liquidity-providers/LaserSwap");
var LiquidityProvider_1 = require("./liquidity-providers/LiquidityProvider");
var NativeWrapProvider_1 = require("./liquidity-providers/NativeWrapProvider");
var NetSwap_1 = require("./liquidity-providers/NetSwap");
var PancakeSwap_1 = require("./liquidity-providers/PancakeSwap");
var QuickSwap_1 = require("./liquidity-providers/QuickSwap");
var SpookySwap_1 = require("./liquidity-providers/SpookySwap");
var SushiSwapV2_1 = require("./liquidity-providers/SushiSwapV2");
var SushiSwapV3_1 = require("./liquidity-providers/SushiSwapV3");
var TraderJoe_1 = require("./liquidity-providers/TraderJoe");
var Trident_1 = require("./liquidity-providers/Trident");
var UbeSwap_1 = require("./liquidity-providers/UbeSwap");
var UniswapV2_1 = require("./liquidity-providers/UniswapV2");
var UniswapV3_1 = require("./liquidity-providers/UniswapV3");
var trident_sdk_1 = require("./trident-sdk");
// import { create } from 'viem'
var isTest = process.env.NODE_ENV === 'test' || process.env.NEXT_PUBLIC_TEST === 'true';
// Gathers pools info, creates routing in 'incremental' mode
// This means that new routing recalculates each time new pool fetching data comes
var DataFetcher = exports.DataFetcher = /** @class */ (function () {
    function DataFetcher(chainId, web3Client, databaseClient) {
        this.providers = [];
        // Provider to poolAddress to PoolCode
        this.poolCodes = new Map();
        this.stateId = 0;
        this.databaseClient = undefined;
        this.chainId = chainId;
        if (!web3Client && !viem_config_1.config[chainId]) {
            throw new Error("No viem client or config for chainId ".concat(chainId));
        }
        if (web3Client) {
            this.web3Client = web3Client;
        }
        else {
            this.web3Client = (0, viem_1.createPublicClient)(__assign(__assign({}, viem_config_1.config[chainId]), { transport: isTest ? (0, viem_1.http)('http://127.0.0.1:8545') : viem_config_1.config[chainId].transport, pollingInterval: 8000, batch: {
                    multicall: {
                        batchSize: 512,
                    },
                } }));
        }
        this.databaseClient = databaseClient;
    }
    DataFetcher.onChain = function (chainId) {
        if (chainId in this.cache) {
            return this.cache[chainId];
        }
        this.cache[chainId] = new DataFetcher(chainId);
        return this.cache[chainId];
    };
    DataFetcher.prototype._providerIsIncluded = function (lp, liquidity) {
        if (!liquidity)
            return true;
        if (lp === LiquidityProvider_1.LiquidityProviders.NativeWrap)
            return true;
        return liquidity.some(function (l) { return l === lp; });
    };
    // Starts pool data fetching
    DataFetcher.prototype.startDataFetching = function (providers // all providers if undefined
    ) {
        this.stopDataFetching();
        this.poolCodes = new Map();
        this.providers = [new NativeWrapProvider_1.NativeWrapProvider(this.chainId, this.web3Client)];
        if (this._providerIsIncluded(LiquidityProvider_1.LiquidityProviders.SushiSwapV2, providers)) {
            try {
                var provider = new SushiSwapV2_1.SushiSwapV2Provider(this.chainId, this.web3Client, this.databaseClient);
                this.providers.push(provider);
            }
            catch (e) {
                // console.warn(e.message)
            }
        }
        if (this._providerIsIncluded(LiquidityProvider_1.LiquidityProviders.Trident, providers) &&
            (0, bentobox_1.isBentoBoxV1ChainId)(this.chainId) &&
            ((0, trident_sdk_1.isTridentConstantPoolFactoryChainId)(this.chainId) || (0, trident_sdk_1.isTridentStablePoolFactoryChainId)(this.chainId))) {
            try {
                var provider = new Trident_1.TridentProvider(this.chainId, this.web3Client, this.databaseClient);
                this.providers.push(provider);
            }
            catch (e) {
                // console.warn(e.message)
            }
        }
        if (this._providerIsIncluded(LiquidityProvider_1.LiquidityProviders.SushiSwapV3, providers)) {
            try {
                var provider = new SushiSwapV3_1.SushiSwapV3Provider(this.chainId, this.web3Client, this.databaseClient);
                this.providers.push(provider);
            }
            catch (e) {
                // console.warn(e.message)
            }
        }
        if (this._providerIsIncluded(LiquidityProvider_1.LiquidityProviders.UniswapV3, providers)) {
            try {
                var provider = new UniswapV3_1.UniswapV3Provider(this.chainId, this.web3Client, this.databaseClient);
                this.providers.push(provider);
            }
            catch (e) {
                // console.warn(e.message)
            }
        }
        if (this._providerIsIncluded(LiquidityProvider_1.LiquidityProviders.ApeSwap, providers)) {
            try {
                var provider = new ApeSwap_1.ApeSwapProvider(this.chainId, this.web3Client, this.databaseClient);
                this.providers.push(provider);
            }
            catch (e) {
                // console.warn(e.message)
            }
        }
        if (this._providerIsIncluded(LiquidityProvider_1.LiquidityProviders.Biswap, providers)) {
            try {
                var provider = new Biswap_1.BiswapProvider(this.chainId, this.web3Client, this.databaseClient);
                this.providers.push(provider);
            }
            catch (e) {
                // console.warn(e.message)
            }
        }
        if (this._providerIsIncluded(LiquidityProvider_1.LiquidityProviders.Dfyn, providers)) {
            try {
                var provider = new Dfyn_1.DfynProvider(this.chainId, this.web3Client, this.databaseClient);
                this.providers.push(provider);
            }
            catch (e) {
                // console.warn(e.message)
            }
        }
        if (this._providerIsIncluded(LiquidityProvider_1.LiquidityProviders.Elk, providers)) {
            try {
                var provider = new Elk_1.ElkProvider(this.chainId, this.web3Client, this.databaseClient);
                this.providers.push(provider);
            }
            catch (e) {
                // console.warn(e.message)
            }
        }
        if (this._providerIsIncluded(LiquidityProvider_1.LiquidityProviders.HoneySwap, providers)) {
            try {
                var provider = new HoneySwap_1.HoneySwapProvider(this.chainId, this.web3Client, this.databaseClient);
                this.providers.push(provider);
            }
            catch (e) {
                // console.warn(e.message)
            }
        }
        if (this._providerIsIncluded(LiquidityProvider_1.LiquidityProviders.JetSwap, providers)) {
            try {
                var provider = new JetSwap_1.JetSwapProvider(this.chainId, this.web3Client, this.databaseClient);
                this.providers.push(provider);
            }
            catch (e) {
                // console.warn(e.message)
            }
        }
        if (this._providerIsIncluded(LiquidityProvider_1.LiquidityProviders.NetSwap, providers)) {
            try {
                var provider = new NetSwap_1.NetSwapProvider(this.chainId, this.web3Client, this.databaseClient);
                this.providers.push(provider);
            }
            catch (e) {
                // console.warn(e.message)
            }
        }
        if (this._providerIsIncluded(LiquidityProvider_1.LiquidityProviders.PancakeSwap, providers)) {
            try {
                var provider = new PancakeSwap_1.PancakeSwapProvider(this.chainId, this.web3Client, this.databaseClient);
                this.providers.push(provider);
            }
            catch (e) {
                // console.warn(e.message)
            }
        }
        if (this._providerIsIncluded(LiquidityProvider_1.LiquidityProviders.QuickSwap, providers)) {
            try {
                var provider = new QuickSwap_1.QuickSwapProvider(this.chainId, this.web3Client, this.databaseClient);
                this.providers.push(provider);
            }
            catch (e) {
                // console.warn(e.message)
            }
        }
        if (this._providerIsIncluded(LiquidityProvider_1.LiquidityProviders.SpookySwap, providers)) {
            try {
                var provider = new SpookySwap_1.SpookySwapProvider(this.chainId, this.web3Client, this.databaseClient);
                this.providers.push(provider);
            }
            catch (e) {
                // console.warn(e.message)
            }
        }
        if (this._providerIsIncluded(LiquidityProvider_1.LiquidityProviders.TraderJoe, providers)) {
            try {
                var provider = new TraderJoe_1.TraderJoeProvider(this.chainId, this.web3Client, this.databaseClient);
                this.providers.push(provider);
            }
            catch (e) {
                // console.warn(e.message)
            }
        }
        if (this._providerIsIncluded(LiquidityProvider_1.LiquidityProviders.UbeSwap, providers)) {
            try {
                var provider = new UbeSwap_1.UbeSwapProvider(this.chainId, this.web3Client, this.databaseClient);
                this.providers.push(provider);
            }
            catch (e) {
                // console.warn(e.message)
            }
        }
        if (this._providerIsIncluded(LiquidityProvider_1.LiquidityProviders.UniswapV2, providers)) {
            try {
                var provider = new UniswapV2_1.UniswapV2Provider(this.chainId, this.web3Client, this.databaseClient);
                this.providers.push(provider);
            }
            catch (e) {
                // console.warn(e.message)
            }
        }
        if (this._providerIsIncluded(LiquidityProvider_1.LiquidityProviders.CurveSwap, providers)) {
            try {
                var provider = new CurveProvider_1.CurveProvider(this.chainId, this.web3Client);
                this.providers.push(provider);
            }
            catch (e) {
                // console.warn(e.message)
            }
        }
        if (this._providerIsIncluded(LiquidityProvider_1.LiquidityProviders.DovishV3, providers)) {
            try {
                var provider = new DovishV3_1.DovishV3Provider(this.chainId, this.web3Client);
                this.providers.push(provider);
            }
            catch (e) {
                // console.warn(e.message)
            }
        }
        if (this._providerIsIncluded(LiquidityProvider_1.LiquidityProviders.LaserSwap, providers)) {
            try {
                var provider = new LaserSwap_1.LaserSwapV2Provider(this.chainId, this.web3Client);
                this.providers.push(provider);
            }
            catch (e) {
                // console.warn(e.message)
            }
        }
        // console.log(
        //   `${chainShortName[this.chainId]}/${this.chainId} - Included providers: ${this.providers
        //     .map((p) => p.getType())
        //     .join(', ')}`
        // )
        this.providers.forEach(function (p) { return p.startFetchPoolsData(); });
    };
    // To stop fetch pool data
    DataFetcher.prototype.stopDataFetching = function () {
        this.providers.forEach(function (p) { return p.stopFetchPoolsData(); });
    };
    DataFetcher.prototype.fetchPoolsForToken = function (currency0, currency1, excludePools, options) {
        return __awaiter(this, void 0, void 0, function () {
            var provider, _a, token0_1, token1_1;
            var _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!currency0.wrapped.equals(currency1.wrapped)) return [3 /*break*/, 5];
                        provider = this.providers.find(function (p) { return p.getType() === LiquidityProvider_1.LiquidityProviders.NativeWrap; });
                        if (!provider) return [3 /*break*/, 4];
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, provider.fetchPoolsForToken(currency0.wrapped, currency1.wrapped, excludePools, options)];
                    case 2:
                        _c.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        _a = _c.sent();
                        return [3 /*break*/, 4];
                    case 4: return [3 /*break*/, 7];
                    case 5:
                        token0_1 = (_b = currency0.wrapped.equals(currency1.wrapped) || currency0.wrapped.sortsBefore(currency1.wrapped)
                            ? [currency0.wrapped, currency1.wrapped]
                            : [currency1.wrapped, currency0.wrapped], _b[0]), token1_1 = _b[1];
                        return [4 /*yield*/, Promise.allSettled(this.providers.map(function (p) { return p.fetchPoolsForToken(token0_1, token1_1, excludePools, options); }))];
                    case 6:
                        _c.sent();
                        _c.label = 7;
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    DataFetcher.prototype.getCurrentPoolCodeMap = function (currency0, currency1) {
        var result = new Map();
        this.providers.forEach(function (p) {
            var poolCodes = p.getCurrentPoolList(currency0.wrapped, currency1.wrapped);
            poolCodes.forEach(function (pc) { return result.set(pc.pool.address, pc); });
        });
        return result;
    };
    DataFetcher.prototype.getCurrentPoolCodeList = function (currency0, currency1) {
        var pcMap = this.getCurrentPoolCodeMap(currency0.wrapped, currency1.wrapped);
        return Array.from(pcMap.values());
    };
    // returns the last processed by all LP block number
    DataFetcher.prototype.getLastUpdateBlock = function (providers) {
        var _this = this;
        var lastUpdateBlock;
        this.providers.forEach(function (p) {
            if (_this._providerIsIncluded(p.getType(), providers)) {
                var last = p.getLastUpdateBlock();
                if (last < 0)
                    return;
                if (lastUpdateBlock === undefined)
                    lastUpdateBlock = last;
                else
                    lastUpdateBlock = Math.min(lastUpdateBlock, last);
            }
        });
        return lastUpdateBlock === undefined ? 0 : lastUpdateBlock;
    };
    // TODO: maybe use an actual map
    // private static cache = new Map<number, DataFetcher>()
    DataFetcher.cache = {};
    return DataFetcher;
}());
//# sourceMappingURL=DataFetcher.js.map