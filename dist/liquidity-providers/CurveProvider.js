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
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurveProvider = exports.getAllSupportedCurvePools = exports.CURVE_FACTORY_ADDRESSES = exports.CURVE_NON_FACTORY_POOLS = exports.CurvePoolType = exports.sETH = void 0;
var chain_1 = require("@sushiswap/chain");
var currency_1 = require("@sushiswap/currency");
var currency_2 = require("@sushiswap/currency");
var currency_3 = require("@sushiswap/currency");
var currency_4 = require("@sushiswap/currency");
var currency_5 = require("@sushiswap/currency");
var currency_6 = require("@sushiswap/currency");
var currency_7 = require("@sushiswap/currency");
var tines_1 = require("@sushiswap/tines");
var viem_1 = require("viem");
var getCurrencyCombinations_1 = require("../getCurrencyCombinations");
var CurvePool_1 = require("../pools/CurvePool");
var LiquidityProvider_1 = require("./LiquidityProvider");
var stETH = new currency_1.Token({
    chainId: 1,
    address: '0xae7ab96520DE3A18E5e111B5EaAb095312D7fE84',
    decimals: 18,
    symbol: 'stETH',
    name: 'Liquid staked Ether 2.0',
});
var sBTC = new currency_1.Token({
    chainId: 1,
    address: '0xfe18be6b3bd88a2d2a7f928d00292e7a9963cfc6',
    decimals: 18,
    symbol: 'sBTC',
    name: 'Synth sBTC',
});
exports.sETH = new currency_1.Token({
    chainId: 1,
    address: '0x5e74c9036fb86bd7ecdcb084a0673efc32ea31cb',
    decimals: 18,
    symbol: 'sETH',
    name: 'Synth sETH',
});
var rETH = new currency_1.Token({
    chainId: 1,
    address: '0x9559Aaa82d9649C7A7b220E7c461d2E74c9a3593',
    decimals: 18,
    symbol: 'rETH',
    name: 'StaFi',
});
var ankrETH = new currency_1.Token({
    chainId: 1,
    address: '0xE95A203B1a91a908F9B9CE46459d101078c2c3cb',
    decimals: 18,
    symbol: 'ankrETH',
    name: 'Ankr Staked ETH',
});
var frxETH = new currency_1.Token({
    chainId: 1,
    address: '0x5e8422345238f34275888049021821e8e08caa1f',
    decimals: 18,
    symbol: 'frxETH',
    name: 'Frax Ether',
});
var sEUR = new currency_1.Token({
    chainId: 1,
    address: '0xd71ecff9342a5ced620049e616c5035f1db98620',
    decimals: 18,
    symbol: 'sEUR',
    name: 'Synth sEUR',
});
var EURS = new currency_1.Token({
    chainId: 1,
    address: '0xdb25f211ab05b1c97d595516f45794528a807ad8',
    decimals: 2,
    symbol: 'EURS',
    name: 'STASIS EURS',
});
var aDAI = new currency_1.Token({
    chainId: 1,
    address: '0x028171bCA77440897B824Ca71D1c56caC55b68A3',
    decimals: 18,
    symbol: 'aDAI',
    name: 'Aave interest bearing DAI',
});
var aSUSD = new currency_1.Token({
    chainId: 1,
    address: '0x6C5024Cd4F8A59110119C56f8933403A539555EB',
    decimals: 18,
    symbol: 'aSUSD',
    name: 'Aave interest bearing SUSD',
});
var cUSDC = new currency_1.Token({
    chainId: 1,
    address: '0x39AA39c021dfbaE8faC545936693aC917d5E7563',
    decimals: 8,
    symbol: 'cUSDC',
    name: 'Compound USD Coin',
});
var cDAI = new currency_1.Token({
    chainId: 1,
    address: '0x5d3a536E4D6DbD6114cc1Ead35777bAB948E3643',
    decimals: 8,
    symbol: 'cDAI',
    name: 'Compound Dai',
});
var sLINK = new currency_1.Token({
    chainId: 1,
    address: '0xbBC455cb4F1B9e4bFC4B73970d360c8f032EfEE6',
    decimals: 18,
    symbol: 'sLINK',
    name: 'Synth sLINK',
});
var HBTC = new currency_1.Token({
    chainId: 1,
    address: '0x0316EB71485b0Ab14103307bf65a021042c6d380',
    decimals: 18,
    symbol: 'HBTS',
    name: 'Huobi BTC',
});
var CurvePoolType;
(function (CurvePoolType) {
    CurvePoolType["Legacy"] = "Legacy";
    CurvePoolType["LegacyV2"] = "LegacyV2";
    CurvePoolType["LegacyV3"] = "LegacyV3";
    CurvePoolType["Factory"] = "Factory";
})(CurvePoolType || (exports.CurvePoolType = CurvePoolType = {}));
var ETH = currency_5.Native.onChain(chain_1.ChainId.ETHEREUM);
exports.CURVE_NON_FACTORY_POOLS = (_a = {},
    _a[chain_1.ChainId.ETHEREUM] = [
        ['0xdc24316b9ae028f1497c275eb9192a3ea0f67022', CurvePoolType.Legacy, ETH, stETH],
        [
            '0xdcef968d416a41cdac0ed8702fac8128a64241a2',
            CurvePoolType.Legacy,
            currency_2.FRAX[chain_1.ChainId.ETHEREUM],
            currency_3.USDC[chain_1.ChainId.ETHEREUM],
        ],
        ['0xf253f83aca21aabd2a20553ae0bf7f65c755a07f', CurvePoolType.Legacy, currency_4.WBTC[chain_1.ChainId.ETHEREUM], sBTC],
        ['0xc5424b857f758e906013f3555dad202e4bdb4567', CurvePoolType.Legacy, ETH, exports.sETH],
        ['0xa1f8a6807c402e4a15ef4eba36528a3fed24e577', CurvePoolType.Legacy, ETH, frxETH],
        ['0x0ce6a5ff5217e38315f87032cf90686c96627caa', CurvePoolType.Legacy, EURS, sEUR],
        ['0xa96a65c051bf88b4095ee1f2451c2a9d43f53ae2', CurvePoolType.Legacy, ETH, ankrETH],
        ['0xeb16ae0052ed37f479f7fe63849198df1765a733', CurvePoolType.Legacy, aDAI, aSUSD],
        ['0xf9440930043eb3997fc70e1339dbb11f341de7a8', CurvePoolType.Legacy, ETH, rETH],
        ['0xa2b47e3d5c44877cca798226b7b8118f9bfb7a56', CurvePoolType.LegacyV2, cDAI, cUSDC],
        ['0xf178c0b5bb7e7abf4e12a4838c7b7c5ba2c623c0', CurvePoolType.Legacy, currency_6.LINK[chain_1.ChainId.ETHEREUM], sLINK],
        ['0x4ca9b3063ec5866a4b82e437059d2c43d1be596f', CurvePoolType.LegacyV3, HBTC, currency_4.WBTC[chain_1.ChainId.ETHEREUM]],
        [
            '0x93054188d876f558f4a66b2ef1d97d16edf0895b',
            CurvePoolType.LegacyV2,
            currency_7.renBTC[chain_1.ChainId.ETHEREUM],
            currency_4.WBTC[chain_1.ChainId.ETHEREUM],
        ],
        // Low liquidity ['0xfd5db7463a3ab53fd211b4af195c5bccc1a03890', CurvePoolType.Legacy],
    ],
    _a);
exports.CURVE_FACTORY_ADDRESSES = (_b = {},
    _b[chain_1.ChainId.ETHEREUM] = [
    // '0x0959158b6040d32d04c301a72cbfd6b39e21c9ae',  // Metapools only - uncomment when we support them
    // '0xb9fc157394af804a3578134a6585c0dc9cc990d4',  // Metapools only - uncomment when we support them
    //'0xf18056bbd320e96a48e3fbf8bc061322531aac99', for crypto2 pools only
    ],
    _b);
var factoryABI = (0, viem_1.parseAbi)([
    'function pool_count() pure returns (uint256)',
    'function pool_list(uint256) pure returns (address)',
    'function find_pool_for_coins(address, address, uint256) view returns (address)',
    //'function get_n_coins(address) pure returns (uint256)',
]);
function getAllSupportedCurvePools(publicClient) {
    return __awaiter(this, void 0, void 0, function () {
        var result, chainId, promises;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    result = new Map();
                    return [4 /*yield*/, publicClient.getChainId()];
                case 1:
                    chainId = _a.sent();
                    promises = exports.CURVE_FACTORY_ADDRESSES[chainId].map(function (factory) { return __awaiter(_this, void 0, void 0, function () {
                        var factoryContract, poolNum, i, poolAddress;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    factoryContract = (0, viem_1.getContract)({
                                        address: factory,
                                        abi: factoryABI,
                                        publicClient: publicClient,
                                    });
                                    return [4 /*yield*/, factoryContract.read.pool_count()];
                                case 1:
                                    poolNum = _a.sent();
                                    i = 0n;
                                    _a.label = 2;
                                case 2:
                                    if (!(i < poolNum)) return [3 /*break*/, 5];
                                    return [4 /*yield*/, factoryContract.read.pool_list([i])];
                                case 3:
                                    poolAddress = _a.sent();
                                    result.set(poolAddress, CurvePoolType.Factory);
                                    _a.label = 4;
                                case 4:
                                    ++i;
                                    return [3 /*break*/, 2];
                                case 5: return [2 /*return*/];
                            }
                        });
                    }); });
                    return [4 /*yield*/, Promise.all(promises)];
                case 2:
                    _a.sent();
                    exports.CURVE_NON_FACTORY_POOLS[chainId].forEach(function (pool) {
                        return result.set(pool[0], pool[1]);
                    });
                    return [2 /*return*/, result];
            }
        });
    });
}
exports.getAllSupportedCurvePools = getAllSupportedCurvePools;
var curvePoolABI = (_c = {},
    _c[CurvePoolType.Factory] = (0, viem_1.parseAbi)([
        'function A() pure returns (uint256)',
        'function fee() pure returns (uint256)',
        'function coins(uint256) pure returns (address)',
        'function balances(uint256) pure returns (uint256)',
    ]),
    _c[CurvePoolType.Legacy] = (0, viem_1.parseAbi)([
        'function A() pure returns (uint256)',
        'function fee() pure returns (uint256)',
        'function coins(uint256) pure returns (address)',
        'function balances(uint256) pure returns (uint256)',
    ]),
    _c[CurvePoolType.LegacyV2] = (0, viem_1.parseAbi)([
        'function A() pure returns (uint256)',
        'function fee() pure returns (uint256)',
        'function coins(int128) pure returns (address)',
        'function balances(int128) pure returns (uint256)',
    ]),
    _c[CurvePoolType.LegacyV3] = (0, viem_1.parseAbi)([
        'function A() pure returns (uint256)',
        'function fee() pure returns (uint256)',
        'function coins(uint256) pure returns (address)',
        'function balances(uint256) pure returns (uint256)',
    ]),
    _c);
/*
async function getCurvePoolCode(publicClient: PublicClient, poolAddress: string, poolType: CurvePoolType, token0: Type, token1: Type): Promise<PoolCode> {
  const poolContract = getContract({
    address: poolAddress as '0x${string}',
    abi: curvePoolABI[poolType],
    publicClient,
  })

  const userAddress = await user.getAddress()
  const tokenContracts = []
  const tokenTines: RToken[] = []
  for (let i = 0; i < 100; ++i) {
    let token
    try {
      token = await poolContract.coins(i)
    } catch (e) {
      break
    }
    if (token == '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE') {
      // native
      tokenContracts.push(undefined)
      tokenTines.push({ address: token, name: token, symbol: token, chainId: 1, decimals: 18 })
    } else {
      const res = await setTokenBalance(token, userAddress, initialBalance)
      expect(res).equal(true, 'Wrong setTokenBalance for ' + token)

      const tokenContract = new Contract(token, erc20Abi, user)
      try {
        await tokenContract.approve(poolAddress, initialBalance.toString())
      } catch (_) {
        // in try block because crv token (0xD533a949740bb3306d119CC777fa900bA034cd52) doesn't allow re-approve (((
      }
      tokenContracts.push(tokenContract)

      const decimals = await tokenContract.decimals()
      tokenTines.push({ address: token, name: token, symbol: token, chainId: 1, decimals })
    }
}*/
var CurveProvider = /** @class */ (function (_super) {
    __extends(CurveProvider, _super);
    function CurveProvider() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.foundPools = [];
        return _this;
    }
    CurveProvider.prototype.getType = function () {
        return LiquidityProvider_1.LiquidityProviders.CurveSwap;
    };
    /**
     * The name of liquidity provider to be used for pool naming. For example, 'SushiSwap'
     */
    CurveProvider.prototype.getPoolProviderName = function () {
        return 'Curve';
    };
    /**
     * Initiates event listeners for top pools
     */
    CurveProvider.prototype.startFetchPoolsData = function () {
        // simple implementation - no prefetching
    };
    CurveProvider.prototype.getPoolsForTokens = function (t0, t1, excludePools, options) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function () {
            var pools, currencyCombinations, _loop_1, this_1, i;
            var _this = this;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        pools = new Map();
                        currencyCombinations = (0, getCurrencyCombinations_1.getCurrencyCombinations)(this.chainId, t0, t1);
                        _loop_1 = function (i) {
                            var calls, newFoundPools;
                            return __generator(this, function (_e) {
                                switch (_e.label) {
                                    case 0:
                                        calls = exports.CURVE_FACTORY_ADDRESSES[this_1.chainId].flatMap(function (factory) {
                                            return currencyCombinations.map(function (_a) {
                                                var t0 = _a[0], t1 = _a[1];
                                                return ({
                                                    address: factory,
                                                    chainId: _this.chainId,
                                                    abi: factoryABI,
                                                    functionName: 'find_pool_for_coins',
                                                    args: [t0.address, t1.address, BigInt(i)],
                                                });
                                            });
                                        });
                                        return [4 /*yield*/, this_1.client.multicall({
                                                multicallAddress: (_c = (_b = (_a = this_1.client.chain) === null || _a === void 0 ? void 0 : _a.contracts) === null || _b === void 0 ? void 0 : _b.multicall3) === null || _c === void 0 ? void 0 : _c.address,
                                                allowFailure: true,
                                                contracts: calls,
                                                blockNumber: options === null || options === void 0 ? void 0 : options.blockNumber
                                            })];
                                    case 1:
                                        newFoundPools = _e.sent();
                                        newFoundPools.forEach(function (pool, i) {
                                            if (pool.status === 'success' && (excludePools === null || excludePools === void 0 ? void 0 : excludePools.has(pool.result)) !== true)
                                                pools.set(pool.result, __spreadArray([CurvePoolType.Factory], currencyCombinations[i], true));
                                        });
                                        currencyCombinations = newFoundPools
                                            .map(function (pool, i) { return (pool.status === 'success' ? currencyCombinations[i] : undefined); })
                                            .filter(function (c) { return c !== undefined; });
                                        return [2 /*return*/];
                                }
                            });
                        };
                        this_1 = this;
                        i = 0;
                        _d.label = 1;
                    case 1:
                        if (!(currencyCombinations.length > 0)) return [3 /*break*/, 4];
                        return [5 /*yield**/, _loop_1(i)];
                    case 2:
                        _d.sent();
                        _d.label = 3;
                    case 3:
                        ++i;
                        return [3 /*break*/, 1];
                    case 4:
                        exports.CURVE_NON_FACTORY_POOLS[this.chainId].forEach(function (pool) {
                            if ((excludePools === null || excludePools === void 0 ? void 0 : excludePools.has(pool[0])) !== true)
                                pools.set(pool[0], [pool[1], pool[2], pool[3]]);
                        });
                        return [2 /*return*/, pools];
                }
            });
        });
    };
    CurveProvider.prototype.getPoolRatio = function (pools) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function () {
            var ratios_1;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        if (!(this.chainId === chain_1.ChainId.ETHEREUM)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.client.multicall({
                                multicallAddress: (_c = (_b = (_a = this.client.chain) === null || _a === void 0 ? void 0 : _a.contracts) === null || _b === void 0 ? void 0 : _b.multicall3) === null || _c === void 0 ? void 0 : _c.address,
                                allowFailure: true,
                                contracts: [
                                    {
                                        address: '0xE95A203B1a91a908F9B9CE46459d101078c2c3cb',
                                        //chainId: this.chainId,
                                        abi: (0, viem_1.parseAbi)(['function ratio() pure returns (uint256)']),
                                        functionName: 'ratio',
                                    },
                                    {
                                        address: '0x9559aaa82d9649c7a7b220e7c461d2e74c9a3593',
                                        //chainId: this.chainId,
                                        abi: (0, viem_1.parseAbi)(['function getExchangeRate() pure returns (uint256)']),
                                        functionName: 'getExchangeRate',
                                    },
                                    {
                                        address: '0x39aa39c021dfbae8fac545936693ac917d5e7563',
                                        //chainId: this.chainId,
                                        abi: (0, viem_1.parseAbi)(['function exchangeRateCurrent() pure returns (uint256)']),
                                        functionName: 'exchangeRateCurrent',
                                    },
                                    {
                                        address: '0x5d3a536E4D6DbD6114cc1Ead35777bAB948E3643',
                                        //chainId: this.chainId,
                                        abi: (0, viem_1.parseAbi)(['function exchangeRateCurrent() pure returns (uint256)']),
                                        functionName: 'exchangeRateCurrent',
                                    },
                                ],
                            })];
                    case 1:
                        ratios_1 = _d.sent();
                        return [2 /*return*/, pools.map(function (_a) {
                                var poolAddress = _a[0];
                                // collection of freaks
                                switch (poolAddress.toLowerCase()) {
                                    case '0xa96a65c051bf88b4095ee1f2451c2a9d43f53ae2': {
                                        //ankrETH pool
                                        var _ratio = ratios_1[0].result;
                                        return _ratio !== undefined ? 1e18 / Number(_ratio) : undefined;
                                    }
                                    case '0xf9440930043eb3997fc70e1339dbb11f341de7a8': {
                                        // rETH pool
                                        var _ratio = ratios_1[1].result;
                                        return _ratio !== undefined ? Number(_ratio) / 1e18 : undefined;
                                    }
                                    case '0xa2b47e3d5c44877cca798226b7b8118f9bfb7a56': {
                                        // compound pool cUSDC-cDAI
                                        var _ratio0 = ratios_1[2].result;
                                        var _ratio1 = ratios_1[3].result;
                                        return _ratio0 !== undefined && _ratio1 !== undefined
                                            ? (Number(_ratio0) * 1e12) / Number(_ratio1)
                                            : undefined;
                                    }
                                    default:
                                        return 1;
                                }
                            })];
                    case 2: return [2 /*return*/, pools.map(function () { return 1; })];
                }
            });
        });
    };
    CurveProvider.prototype.getCurvePoolCodes = function (pools) {
        return __awaiter(this, void 0, void 0, function () {
            var poolArray, poolsMulticall, A, fee, balance0, balance1, ratio, poolCodes;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        poolArray = Array.from(pools.entries());
                        poolsMulticall = function (functionName, args) {
                            var _a, _b, _c;
                            return _this.client.multicall({
                                multicallAddress: (_c = (_b = (_a = _this.client.chain) === null || _a === void 0 ? void 0 : _a.contracts) === null || _b === void 0 ? void 0 : _b.multicall3) === null || _c === void 0 ? void 0 : _c.address,
                                allowFailure: true,
                                contracts: poolArray.map(function (_a) {
                                    var address = _a[0], poolType = _a[1][0];
                                    return ({
                                        address: address,
                                        // //chainId: this.chainId,
                                        abi: curvePoolABI[poolType],
                                        functionName: functionName,
                                        args: args,
                                        // rome-ignore lint/suspicious/noExplicitAny: any
                                    });
                                }),
                            });
                        };
                        return [4 /*yield*/, poolsMulticall('A')];
                    case 1:
                        A = _a.sent();
                        return [4 /*yield*/, poolsMulticall('fee')];
                    case 2:
                        fee = _a.sent();
                        return [4 /*yield*/, poolsMulticall('balances', [0n])];
                    case 3:
                        balance0 = _a.sent();
                        return [4 /*yield*/, poolsMulticall('balances', [1n])];
                    case 4:
                        balance1 = _a.sent();
                        return [4 /*yield*/, this.getPoolRatio(poolArray)];
                    case 5:
                        ratio = _a.sent();
                        poolCodes = poolArray.map(function (_a, i) {
                            var poolAddress = _a[0], _b = _a[1], token0 = _b[1], token1 = _b[2];
                            var _fee = fee[i].result;
                            var _A = A[i].result;
                            var _balance0 = balance0[i].result;
                            var _balance1 = balance1[i].result;
                            var _ratio = ratio[i];
                            if (_fee === undefined ||
                                _A === undefined ||
                                _balance0 === undefined ||
                                _balance1 === undefined ||
                                _ratio === undefined)
                                return;
                            var poolTines = new tines_1.CurvePool(poolAddress, token0, token1, Number(_fee) / 1e10, Number(_A), BigInt(_balance0.toString()), BigInt(_balance1.toString()), _ratio);
                            return new CurvePool_1.CurvePoolCode(poolTines, _this.getType(), _this.getPoolProviderName());
                        });
                        return [2 /*return*/, poolCodes.filter(function (p) { return p !== undefined; })];
                }
            });
        });
    };
    /**
     * Fetches relevant pools for the given tokens
     * @param t0 Token
     * @param t1 Token
     */
    CurveProvider.prototype.fetchPoolsForToken = function (t0, t1, excludePools, options) {
        return __awaiter(this, void 0, void 0, function () {
            var pools, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.getPoolsForTokens(t0, t1, excludePools, options)];
                    case 1:
                        pools = _b.sent();
                        _a = this;
                        return [4 /*yield*/, this.getCurvePoolCodes(pools)
                            //console.log(JSON.stringify(this.foundPools, undefined, '   '))
                        ];
                    case 2:
                        _a.foundPools = _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Returns a list of PoolCode
     * @returns PoolCode[]
     */
    CurveProvider.prototype.getCurrentPoolList = function () {
        return this.foundPools;
    };
    CurveProvider.prototype.stopFetchPoolsData = function () {
        // nothing at start - nothing at stop
    };
    return CurveProvider;
}(LiquidityProvider_1.LiquidityProvider));
exports.CurveProvider = CurveProvider;
//# sourceMappingURL=CurveProvider.js.map