"use strict";
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
var chain_1 = require("@sushiswap/chain");
var currency_1 = require("@sushiswap/currency");
var tines_1 = require("@sushiswap/tines");
var https_1 = require("https");
var DataFetcher_1 = require("../DataFetcher");
var LiquidityProvider_1 = require("../liquidity-providers/LiquidityProvider");
var Router_1 = require("../Router");
var delay = function (ms) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    return [2 /*return*/, new Promise(function (res) { return setTimeout(res, ms); })];
}); }); };
function getAPIObject(url, data) {
    return __awaiter(this, void 0, void 0, function () {
        var params, urlWithParams;
        return __generator(this, function (_a) {
            params = Object.keys(data)
                .map(function (k) { return (data[k] !== undefined ? "".concat(k, "=").concat(data[k]) : undefined); })
                .filter(function (k) { return k !== undefined; })
                .join('&');
            urlWithParams = "".concat(url, "?").concat(params);
            return [2 /*return*/, new Promise(function (result, reject) {
                    https_1.default
                        .get(urlWithParams, function (res) {
                        var out = '';
                        res.on('data', function (chunk) {
                            out += chunk;
                        });
                        res.on('end', function () {
                            var r = JSON.parse(out);
                            if (r.statusCode !== undefined && r.statusCode !== 200)
                                reject(r);
                            else
                                result(r);
                        });
                    })
                        .on('error', function (err) {
                        reject(JSON.parse(err.message));
                    });
                })];
        });
    });
}
function quote1InchV5(chainId, fromTokenAddress, toTokenAddress, amount, gasPrice, providers) {
    return __awaiter(this, void 0, void 0, function () {
        var protocolWhiteList, resp;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    protocolWhiteList = providers ? getProtocols(providers, chainId) : undefined;
                    return [4 /*yield*/, getAPIObject("https://api.1inch.io/v5.0/".concat(chainId, "/quote"), {
                            fromTokenAddress: fromTokenAddress,
                            toTokenAddress: toTokenAddress,
                            amount: amount,
                            gasPrice: gasPrice,
                            protocolWhiteList: protocolWhiteList,
                        })];
                case 1:
                    resp = (_a.sent());
                    return [2 /*return*/, resp.toTokenAmount];
            }
        });
    });
}
function quote1InchV1_4(chainId, fromTokenAddress, toTokenAddress, amount, gasPrice, providers) {
    return __awaiter(this, void 0, void 0, function () {
        var protocolWhiteList, resp;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    protocolWhiteList = providers ? getProtocols(providers, chainId) : undefined;
                    return [4 /*yield*/, getAPIObject("https://pathfinder.1inch.io/v1.4/chain/".concat(chainId, "/router/v5/quotes"), {
                            fromTokenAddress: fromTokenAddress,
                            toTokenAddress: toTokenAddress,
                            amount: amount,
                            gasPrice: gasPrice,
                            protocolWhiteList: protocolWhiteList,
                            preset: 'maxReturnResult',
                        })];
                case 1:
                    resp = (_a.sent());
                    return [2 /*return*/, resp.bestResult.toTokenAmount];
            }
        });
    });
}
function getEnvironment(chainId, lps) {
    var network;
    switch (chainId) {
        case chain_1.ChainId.ETHEREUM:
            network = 'mainnet';
            break;
        case chain_1.ChainId.POLYGON:
            network = 'matic';
            break;
        default:
    }
    var dataFetcher = new DataFetcher_1.DataFetcher(chainId);
    dataFetcher.startDataFetching(lps);
    return {
        chainId: chainId,
        dataFetcher: dataFetcher,
    };
}
function route(env, from, to, amount, gasPrice, providers) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, Router_1.Router.findBestRoute(env.dataFetcher.getCurrentPoolCodeMap(from, to), env.chainId, from, BigInt(amount), to, gasPrice, providers)];
        });
    });
}
function getProtocol(lp, chainId) {
    var prefix;
    switch (chainId) {
        case chain_1.ChainId.ETHEREUM:
            prefix = '';
            break;
        case chain_1.ChainId.POLYGON:
            prefix = 'POLYGON_';
            break;
        default:
            throw new Error("Unsupported network: ".concat(chainId));
    }
    switch (lp) {
        case LiquidityProvider_1.LiquidityProviders.SushiSwapV2:
            return "".concat(prefix, "SUSHISWAP");
        case LiquidityProvider_1.LiquidityProviders.QuickSwap:
            return "".concat(prefix, "QUICKSWAP");
        case LiquidityProvider_1.LiquidityProviders.Trident:
            return "".concat(prefix, "TRIDENT");
        case LiquidityProvider_1.LiquidityProviders.UniswapV2:
            return "".concat(prefix, "UNISWAP_V2");
    }
}
function getProtocols(lp, chainId) {
    return lp.map(function (l) { return getProtocol(l, chainId); }).join(',');
}
function test(env, from, to, amount, gasPrice, providers) {
    return __awaiter(this, void 0, void 0, function () {
        var fromAddress, toAddress, _a, 
        // res1,
        res2, res3;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    fromAddress = from.isNative ? '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE' : from.address;
                    toAddress = to.isNative ? '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE' : to.address;
                    return [4 /*yield*/, Promise.all([
                            // quote1InchV5(env.chainId, fromAddress, toAddress, amount, gasPrice, providers), // NOTE: trident not supported in v5
                            quote1InchV1_4(env.chainId, fromAddress, toAddress, amount, gasPrice, providers),
                            route(env, from, to, amount, gasPrice, providers),
                        ])];
                case 1:
                    _a = _b.sent(), res2 = _a[0], res3 = _a[1];
                    return [2 /*return*/, [parseInt(res2), res3.amountOut]];
            }
        });
    });
}
function testTrident() {
    return __awaiter(this, void 0, void 0, function () {
        var chainId, from, divisor, to, gasPrice, providers, env, i, amount, res, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 7, , 8]);
                    chainId = chain_1.ChainId.POLYGON;
                    from = currency_1.USDT[chainId];
                    divisor = Math.pow(10, from.decimals);
                    to = currency_1.USDC[chainId];
                    gasPrice = 100e9;
                    providers = [LiquidityProvider_1.LiquidityProviders.Trident];
                    env = getEnvironment(chainId, providers);
                    return [4 /*yield*/, delay(5000)];
                case 1:
                    _a.sent();
                    env.dataFetcher.fetchPoolsForToken(from, to);
                    return [4 /*yield*/, delay(5000)];
                case 2:
                    _a.sent();
                    i = 6;
                    _a.label = 3;
                case 3:
                    if (!(i < 15)) return [3 /*break*/, 6];
                    amount = (0, tines_1.getBigInt)(Math.pow(10, i)).toString();
                    return [4 /*yield*/, test(env, from, to, amount, gasPrice, providers)
                        // console.log(
                        //   Math.pow(10, i) / divisor,
                        //   res.map((e) => e / divisor)
                        // )
                    ];
                case 4:
                    res = _a.sent();
                    _a.label = 5;
                case 5:
                    ++i;
                    return [3 /*break*/, 3];
                case 6:
                    env.dataFetcher.stopDataFetching();
                    return [3 /*break*/, 8];
                case 7:
                    e_1 = _a.sent();
                    console.log('Error', e_1);
                    return [3 /*break*/, 8];
                case 8: return [2 /*return*/];
            }
        });
    });
}
testTrident();
//# sourceMappingURL=check.js.map