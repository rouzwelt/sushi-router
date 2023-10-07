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
exports.SpookySwapProvider = void 0;
var chain_1 = require("@sushiswap/chain");
var LiquidityProvider_1 = require("./LiquidityProvider");
var UniswapV2Base_1 = require("./UniswapV2Base");
var SpookySwapProvider = /** @class */ (function (_super) {
    var _a, _b;
    __extends(SpookySwapProvider, _super);
    function SpookySwapProvider(chainId, web3Client, databaseClient) {
        var factory = (_a = {},
            _a[chain_1.ChainId.FANTOM] = '0x152eE697f2E276fA89E96742e9bB9aB1F2E61bE3',
            _a);
        var initCodeHash = (_b = {},
            _b[chain_1.ChainId.FANTOM] = '0xcdf2deca40a0bd56de8e3ce5c7df6727e5b1bf2ac96f283fa9c4b3e6b42ea9d2',
            _b);
        return _super.call(this, chainId, web3Client, factory, initCodeHash, databaseClient) || this;
    }
    SpookySwapProvider.prototype.getType = function () {
        return LiquidityProvider_1.LiquidityProviders.SpookySwap;
    };
    SpookySwapProvider.prototype.getPoolProviderName = function () {
        return 'SpookySwap';
    };
    return SpookySwapProvider;
}(UniswapV2Base_1.UniswapV2BaseProvider));
exports.SpookySwapProvider = SpookySwapProvider;
//# sourceMappingURL=SpookySwap.js.map