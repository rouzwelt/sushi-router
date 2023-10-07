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
Object.defineProperty(exports, "__esModule", { value: true });
exports.JetSwapProvider = void 0;
var chain_1 = require("@sushiswap/chain");
var LiquidityProvider_1 = require("./LiquidityProvider");
var UniswapV2Base_1 = require("./UniswapV2Base");
var JetSwapProvider = /** @class */ (function (_super) {
    var _a, _b;
    __extends(JetSwapProvider, _super);
    function JetSwapProvider(chainId, web3Client, databaseClient) {
        var factory = (_a = {},
            _a[chain_1.ChainId.POLYGON] = '0x668ad0ed2622C62E24f0d5ab6B6Ac1b9D2cD4AC7',
            _a[chain_1.ChainId.BSC] = '0x0eb58E5c8aA63314ff5547289185cC4583DfCBD5',
            _a[chain_1.ChainId.FANTOM] = '0xf6488205957f0b4497053d6422F49e27944eE3Dd',
            _a);
        var initCodeHash = (_b = {},
            _b[chain_1.ChainId.POLYGON] = '0x505c843b83f01afef714149e8b174427d552e1aca4834b4f9b4b525f426ff3c6',
            _b[chain_1.ChainId.BSC] = '0x3125d0a15fa7af49ce234ba1cf5f931bad0504242e0e1ee9fcd7d1d7aa88c651',
            _b[chain_1.ChainId.FANTOM] = '0xa5e6089ea250dac750e4867fc4ce7f2a864bd94446564351fe9329f378963974',
            _b);
        return _super.call(this, chainId, web3Client, factory, initCodeHash, databaseClient) || this;
    }
    JetSwapProvider.prototype.getType = function () {
        return LiquidityProvider_1.LiquidityProviders.JetSwap;
    };
    JetSwapProvider.prototype.getPoolProviderName = function () {
        return 'JetSwap';
    };
    return JetSwapProvider;
}(UniswapV2Base_1.UniswapV2BaseProvider));
exports.JetSwapProvider = JetSwapProvider;
//# sourceMappingURL=JetSwap.js.map