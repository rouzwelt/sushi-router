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
exports.SushiSwapV2Provider = void 0;
var v2_sdk_1 = require("@sushiswap/v2-sdk");
var LiquidityProvider_1 = require("./LiquidityProvider");
var UniswapV2Base_1 = require("./UniswapV2Base");
var SushiSwapV2Provider = /** @class */ (function (_super) {
    __extends(SushiSwapV2Provider, _super);
    function SushiSwapV2Provider(chainId, web3Client, databaseClient) {
        var factory = v2_sdk_1.SUSHISWAP_V2_FACTORY_ADDRESS;
        return _super.call(this, chainId, web3Client, factory, v2_sdk_1.SUSHISWAP_V2_INIT_CODE_HASH, databaseClient) || this;
    }
    SushiSwapV2Provider.prototype.getType = function () {
        return LiquidityProvider_1.LiquidityProviders.SushiSwapV2;
    };
    SushiSwapV2Provider.prototype.getPoolProviderName = function () {
        return 'SushiSwapV2';
    };
    return SushiSwapV2Provider;
}(UniswapV2Base_1.UniswapV2BaseProvider));
exports.SushiSwapV2Provider = SushiSwapV2Provider;
//# sourceMappingURL=SushiSwapV2.js.map