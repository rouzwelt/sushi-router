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
exports.NetSwapProvider = void 0;
var chain_1 = require("@sushiswap/chain");
var LiquidityProvider_1 = require("./LiquidityProvider");
var UniswapV2Base_1 = require("./UniswapV2Base");
var NetSwapProvider = /** @class */ (function (_super) {
    var _a, _b;
    __extends(NetSwapProvider, _super);
    function NetSwapProvider(chainId, web3Client, databaseClient) {
        var factory = (_a = {},
            _a[chain_1.ChainId.METIS] = '0x70f51d68D16e8f9e418441280342BD43AC9Dff9f',
            _a);
        var initCodeHash = (_b = {},
            _b[chain_1.ChainId.METIS] = '0x966d65068a6a30f10fd1fa814258637a34e059081d79daa94f3e2b6cec48e810',
            _b);
        return _super.call(this, chainId, web3Client, factory, initCodeHash, databaseClient) || this;
    }
    NetSwapProvider.prototype.getType = function () {
        return LiquidityProvider_1.LiquidityProviders.NetSwap;
    };
    NetSwapProvider.prototype.getPoolProviderName = function () {
        return 'NetSwap';
    };
    return NetSwapProvider;
}(UniswapV2Base_1.UniswapV2BaseProvider));
exports.NetSwapProvider = NetSwapProvider;
//# sourceMappingURL=NetSwap.js.map