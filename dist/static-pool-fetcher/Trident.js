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
exports.TridentStaticPoolFetcher = void 0;
var abi_1 = require("@sushiswap/abi");
var memoize_fs_1 = require("memoize-fs");
var getCurrencyCombinations_1 = require("../getCurrencyCombinations");
var trident_sdk_1 = require("../trident-sdk");
var memoizer = (0, memoize_fs_1.default)({ cachePath: "./mem-cache" });
var TridentStaticPoolFetcher = /** @class */ (function () {
    function TridentStaticPoolFetcher() {
    }
    TridentStaticPoolFetcher.getStaticPools = function (client, chainId, t1, t2, options) {
        return __awaiter(this, void 0, void 0, function () {
            var pools;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Promise.all([
                            this.getPools(client, chainId, t1, t2, 'CONSTANT_PRODUCT_POOL', options),
                            this.getPools(client, chainId, t1, t2, 'STABLE_POOL', options),
                        ])];
                    case 1:
                        pools = _a.sent();
                        return [2 /*return*/, pools];
                }
            });
        });
    };
    TridentStaticPoolFetcher.getPools = function (client, chainId, t1, t2, type, options) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        return __awaiter(this, void 0, void 0, function () {
            var currencies, _pairsUnique, _pairsUniqueAddr, factoryAddress, factoryAbi, asyncMulticallWrapper, multicallMemoize, callStatePoolsCount, callStatePoolsCountProcessed, pairsUniqueProcessed, callStatePools, pools, poolsAddresses, fees, results;
            var _this = this;
            return __generator(this, function (_k) {
                switch (_k.label) {
                    case 0:
                        currencies = (0, getCurrencyCombinations_1.getCurrencyCombinations)(chainId, t1, t2);
                        _pairsUnique = pairsUnique(currencies);
                        _pairsUniqueAddr = _pairsUnique.map(function (_a) {
                            var t0 = _a[0], t1 = _a[1];
                            return [t0.address, t1.address];
                        });
                        factoryAddress = type === 'STABLE_POOL'
                            ? trident_sdk_1.tridentStablePoolFactoryAddress[chainId]
                            : trident_sdk_1.tridentConstantPoolFactoryAddress[chainId];
                        factoryAbi = type === 'STABLE_POOL'
                            ? trident_sdk_1.tridentStablePoolFactoryAbi[chainId]
                            : trident_sdk_1.tridentConstantPoolFactoryAbi[chainId];
                        asyncMulticallWrapper = function (calldata, callback) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                client.multicall(calldata)
                                    .then(function (v) { return callback(v, undefined); })
                                    .catch(function (reason) { return callback(undefined, reason); });
                                return [2 /*return*/];
                            });
                        }); };
                        return [4 /*yield*/, memoizer.fn(asyncMulticallWrapper)];
                    case 1:
                        multicallMemoize = _k.sent();
                        return [4 /*yield*/, multicallMemoize({
                                multicallAddress: (_c = (_b = (_a = client.chain) === null || _a === void 0 ? void 0 : _a.contracts) === null || _b === void 0 ? void 0 : _b.multicall3) === null || _c === void 0 ? void 0 : _c.address,
                                allowFailure: true,
                                blockNumber: options === null || options === void 0 ? void 0 : options.blockNumber,
                                contracts: _pairsUniqueAddr.map(function (el) {
                                    return ({
                                        chainId: chainId,
                                        address: factoryAddress,
                                        abi: factoryAbi,
                                        functionName: 'poolsCount',
                                        args: el,
                                    });
                                }),
                            }, function (res, rej) {
                                if (rej)
                                    return undefined;
                                else
                                    return res;
                            })
                            // const callStatePoolsCount = await client.multicall({
                            //   multicallAddress: client.chain?.contracts?.multicall3?.address as Address,
                            //   allowFailure: true,
                            //   contracts: _pairsUniqueAddr.map(
                            //     (el) =>
                            //       ({
                            //         chainId,
                            //         address: factoryAddress,
                            //         abi: factoryAbi,
                            //         functionName: 'poolsCount',
                            //         args: el as [Address, Address],
                            //       } as const)
                            //   ),
                            // })
                        ];
                    case 2:
                        callStatePoolsCount = _k.sent();
                        callStatePoolsCountProcessed = callStatePoolsCount === null || callStatePoolsCount === void 0 ? void 0 : callStatePoolsCount.map(function (s, i) { return [i, (s === null || s === void 0 ? void 0 : s.result) ? parseInt(s.result.toString()) : 0]; }).filter(function (_a) {
                            var length = _a[1];
                            return length;
                        }).map(function (_a) {
                            var i = _a[0], length = _a[1];
                            return [_pairsUniqueAddr[i][0], _pairsUniqueAddr[i][1], BigInt(0), BigInt(length)];
                        });
                        pairsUniqueProcessed = callStatePoolsCount === null || callStatePoolsCount === void 0 ? void 0 : callStatePoolsCount.map(function (s, i) { return [i, (s === null || s === void 0 ? void 0 : s.result) ? parseInt(s.result.toString()) : 0]; }).filter(function (_a) {
                            var length = _a[1];
                            return length;
                        }).map(function (_a) {
                            var i = _a[0];
                            return [_pairsUnique[i][0], _pairsUnique[i][1]];
                        });
                        return [4 /*yield*/, multicallMemoize({
                                multicallAddress: (_f = (_e = (_d = client.chain) === null || _d === void 0 ? void 0 : _d.contracts) === null || _e === void 0 ? void 0 : _e.multicall3) === null || _f === void 0 ? void 0 : _f.address,
                                allowFailure: true,
                                blockNumber: options === null || options === void 0 ? void 0 : options.blockNumber,
                                contracts: callStatePoolsCountProcessed.map(function (args) {
                                    return ({
                                        chainId: chainId,
                                        address: factoryAddress,
                                        abi: factoryAbi,
                                        functionName: 'getPools',
                                        args: args,
                                    });
                                }),
                            }, function (res, rej) {
                                if (rej)
                                    return undefined;
                                else
                                    return res;
                            })
                            // const callStatePools = await client.multicall({
                            //   multicallAddress: client.chain?.contracts?.multicall3?.address as Address,
                            //   allowFailure: true,
                            //   contracts: callStatePoolsCountProcessed.map(
                            //     (args) =>
                            //       ({
                            //         chainId,
                            //         address: factoryAddress,
                            //         abi: factoryAbi,
                            //         functionName: 'getPools',
                            //         args,
                            //       } as const)
                            //   ),
                            // })
                        ];
                    case 3:
                        callStatePools = _k.sent();
                        pools = [];
                        callStatePools.forEach(function (s, i) {
                            if (s === null || s === void 0 ? void 0 : s.result)
                                s.result.forEach(function (address) {
                                    return pools.push({
                                        address: address.toLowerCase(),
                                        token0: pairsUniqueProcessed === null || pairsUniqueProcessed === void 0 ? void 0 : pairsUniqueProcessed[i][0],
                                        token1: pairsUniqueProcessed === null || pairsUniqueProcessed === void 0 ? void 0 : pairsUniqueProcessed[i][1],
                                        type: type,
                                    });
                                });
                        });
                        poolsAddresses = pools.map(function (p) { return p.address; });
                        return [4 /*yield*/, multicallMemoize({
                                multicallAddress: (_j = (_h = (_g = client.chain) === null || _g === void 0 ? void 0 : _g.contracts) === null || _h === void 0 ? void 0 : _h.multicall3) === null || _j === void 0 ? void 0 : _j.address,
                                allowFailure: true,
                                blockNumber: options === null || options === void 0 ? void 0 : options.blockNumber,
                                contracts: poolsAddresses.map(function (address) {
                                    return ({
                                        chainId: chainId,
                                        address: address,
                                        abi: type === 'STABLE_POOL' ? abi_1.tridentStablePoolAbi : abi_1.tridentConstantPoolAbi,
                                        functionName: 'swapFee',
                                    });
                                }),
                            }, function (res, rej) {
                                if (rej)
                                    return undefined;
                                else
                                    return res;
                            })
                            // const fees = await client.multicall({
                            //   multicallAddress: client.chain?.contracts?.multicall3?.address as Address,
                            //   allowFailure: true,
                            //   contracts: poolsAddresses.map(
                            //     (address) =>
                            //       ({
                            //         chainId,
                            //         address: address as Address,
                            //         abi: type === 'STABLE_POOL' ? tridentStablePoolAbi : tridentConstantPoolAbi,
                            //         functionName: 'swapFee',
                            //       } as const)
                            //   ),
                            // })
                        ];
                    case 4:
                        fees = _k.sent();
                        results = [];
                        pools.forEach(function (p, i) {
                            var _a;
                            var fee = (_a = fees === null || fees === void 0 ? void 0 : fees[i]) === null || _a === void 0 ? void 0 : _a.result;
                            if (!fee)
                                return;
                            results.push(__assign(__assign({}, p), { swapFee: Number(fee) / 10000 }));
                        });
                        return [2 /*return*/, results];
                }
            });
        });
    };
    return TridentStaticPoolFetcher;
}());
exports.TridentStaticPoolFetcher = TridentStaticPoolFetcher;
var pairsUnique = function (currencies) {
    var pairsMap = new Map();
    currencies.map(function (_a) {
        var c1 = _a[0], c2 = _a[1];
        if (c1 && c2) {
            var addr1 = c1.wrapped.address;
            var addr2 = c2.wrapped.address;
            if (addr1 !== undefined && addr2 !== undefined) {
                if (addr1.toLowerCase() < addr2.toLowerCase())
                    pairsMap.set(addr1 + addr2, [c1, c2]);
                else
                    pairsMap.set(addr2 + addr1, [c2, c1]);
            }
        }
    });
    return Array.from(pairsMap.values());
};
var tokensUnique = function (_pairsUnique) {
    return Array.from(new Set(_pairsUnique.reduce(function (previousValue, currentValue) { return previousValue.concat(currentValue); }, [])));
};
//# sourceMappingURL=Trident.js.map