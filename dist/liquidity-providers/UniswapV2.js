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
exports.UniswapV2Provider = void 0;
var chain_1 = require("@sushiswap/chain");
var LiquidityProvider_1 = require("./LiquidityProvider");
var UniswapV2Base_1 = require("./UniswapV2Base");
var UniswapV2Provider = /** @class */ (function (_super) {
    var _a, _b;
    __extends(UniswapV2Provider, _super);
    function UniswapV2Provider(chainId, web3Client, databaseClient) {
        var factory = (_a = {},
            _a[chain_1.ChainId.ETHEREUM] = '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f',
            _a);
        var initCodeHash = (_b = {},
            _b[chain_1.ChainId.ETHEREUM] = '0x96e8ac4277198ff8b6f785478aa9a39f403cb768dd02cbee326c3e7da348845f',
            _b);
        return _super.call(this, chainId, web3Client, factory, initCodeHash, databaseClient) || this;
    }
    UniswapV2Provider.prototype.getType = function () {
        return LiquidityProvider_1.LiquidityProviders.UniswapV2;
    };
    UniswapV2Provider.prototype.getPoolProviderName = function () {
        return 'UniswapV2';
    };
    return UniswapV2Provider;
}(UniswapV2Base_1.UniswapV2BaseProvider));
exports.UniswapV2Provider = UniswapV2Provider;
//# sourceMappingURL=UniswapV2.js.map