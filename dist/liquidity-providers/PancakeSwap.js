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
exports.PancakeSwapProvider = void 0;
var chain_1 = require("@sushiswap/chain");
var LiquidityProvider_1 = require("./LiquidityProvider");
var UniswapV2Base_1 = require("./UniswapV2Base");
var PancakeSwapProvider = /** @class */ (function (_super) {
    var _a, _b;
    __extends(PancakeSwapProvider, _super);
    function PancakeSwapProvider(chainId, web3Client, databaseClient) {
        var _this = this;
        var factory = (_a = {},
            _a[chain_1.ChainId.ETHEREUM] = '0x1097053Fd2ea711dad45caCcc45EfF7548fCB362',
            _a[chain_1.ChainId.BSC] = '0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73',
            _a);
        var initCodeHash = (_b = {},
            _b[chain_1.ChainId.ETHEREUM] = '0x57224589c67f3f30a6b0d7a1b54cf3153ab84563bc609ef41dfb34f8b2974d2d',
            _b[chain_1.ChainId.BSC] = '0x00fb7f630766e6a796048ea87d01acd3068e8ff67d078148a3fa3f4a84f69bd5',
            _b);
        _this = _super.call(this, chainId, web3Client, factory, initCodeHash, databaseClient) || this;
        _this.fee = 0.0025;
        return _this;
    }
    PancakeSwapProvider.prototype.getType = function () {
        return LiquidityProvider_1.LiquidityProviders.PancakeSwap;
    };
    PancakeSwapProvider.prototype.getPoolProviderName = function () {
        return 'PancakeSwap';
    };
    return PancakeSwapProvider;
}(UniswapV2Base_1.UniswapV2BaseProvider));
exports.PancakeSwapProvider = PancakeSwapProvider;
//# sourceMappingURL=PancakeSwap.js.map