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
exports.HoneySwapProvider = void 0;
var chain_1 = require("@sushiswap/chain");
var LiquidityProvider_1 = require("./LiquidityProvider");
var UniswapV2Base_1 = require("./UniswapV2Base");
var HoneySwapProvider = /** @class */ (function (_super) {
    var _a, _b;
    __extends(HoneySwapProvider, _super);
    function HoneySwapProvider(chainId, web3Client, databaseClient) {
        var factory = (_a = {},
            _a[chain_1.ChainId.GNOSIS] = '0xA818b4F111Ccac7AA31D0BCc0806d64F2E0737D7',
            _a);
        var initCodeHash = (_b = {},
            _b[chain_1.ChainId.GNOSIS] = '0x3f88503e8580ab941773b59034fb4b2a63e86dbc031b3633a925533ad3ed2b93',
            _b);
        return _super.call(this, chainId, web3Client, factory, initCodeHash, databaseClient) || this;
    }
    HoneySwapProvider.prototype.getType = function () {
        return LiquidityProvider_1.LiquidityProviders.HoneySwap;
    };
    HoneySwapProvider.prototype.getPoolProviderName = function () {
        return 'HoneySwap';
    };
    return HoneySwapProvider;
}(UniswapV2Base_1.UniswapV2BaseProvider));
exports.HoneySwapProvider = HoneySwapProvider;
//# sourceMappingURL=HoneySwap.js.map