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
exports.TraderJoeProvider = void 0;
var chain_1 = require("@sushiswap/chain");
var LiquidityProvider_1 = require("./LiquidityProvider");
var UniswapV2Base_1 = require("./UniswapV2Base");
var TraderJoeProvider = /** @class */ (function (_super) {
    var _a, _b;
    __extends(TraderJoeProvider, _super);
    function TraderJoeProvider(chainId, web3Client, databaseClient) {
        var factory = (_a = {},
            _a[chain_1.ChainId.AVALANCHE] = '0x9Ad6C38BE94206cA50bb0d90783181662f0Cfa10',
            _a);
        var initCodeHash = (_b = {},
            _b[chain_1.ChainId.AVALANCHE] = '0x0bbca9af0511ad1a1da383135cf3a8d2ac620e549ef9f6ae3a4c33c2fed0af91',
            _b);
        return _super.call(this, chainId, web3Client, factory, initCodeHash, databaseClient) || this;
    }
    TraderJoeProvider.prototype.getType = function () {
        return LiquidityProvider_1.LiquidityProviders.TraderJoe;
    };
    TraderJoeProvider.prototype.getPoolProviderName = function () {
        return 'TraderJoe';
    };
    return TraderJoeProvider;
}(UniswapV2Base_1.UniswapV2BaseProvider));
exports.TraderJoeProvider = TraderJoeProvider;
//# sourceMappingURL=TraderJoe.js.map