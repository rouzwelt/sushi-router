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
exports.DovishV3Provider = void 0;
var chain_1 = require("@sushiswap/chain");
var LiquidityProvider_1 = require("./LiquidityProvider");
var UniswapV3Base_1 = require("./UniswapV3Base");
var DovishV3Provider = /** @class */ (function (_super) {
    var _a, _b, _c;
    __extends(DovishV3Provider, _super);
    function DovishV3Provider(chainId, web3Client, databaseClient) {
        var factory = (_a = {},
            _a[chain_1.ChainId.POLYGON_ZKEVM] = '0xdE474Db1Fa59898BC91314328D29507AcD0D593c',
            _a);
        var initCodeHash = (_b = {},
            _b[chain_1.ChainId.POLYGON_ZKEVM] = '0xd3e7f58b9af034cfa7a0597e539bae7c6b393817a47a6fc1e1503cd6eaffe22a',
            _b);
        var tickLens = (_c = {},
            _c[chain_1.ChainId.POLYGON_ZKEVM] = '0x0e88C06437891D2a56352eaa2bf0d107472eC0f4',
            _c);
        return _super.call(this, chainId, web3Client, factory, initCodeHash, tickLens, databaseClient) || this;
    }
    DovishV3Provider.prototype.getType = function () {
        return LiquidityProvider_1.LiquidityProviders.DovishV3;
    };
    DovishV3Provider.prototype.getPoolProviderName = function () {
        return 'DovishV3';
    };
    return DovishV3Provider;
}(UniswapV3Base_1.UniswapV3BaseProvider));
exports.DovishV3Provider = DovishV3Provider;
//# sourceMappingURL=DovishV3.js.map