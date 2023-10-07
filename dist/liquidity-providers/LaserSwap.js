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
exports.LaserSwapV2Provider = void 0;
var chain_1 = require("@sushiswap/chain");
var LiquidityProvider_1 = require("./LiquidityProvider");
var UniswapV2Base_1 = require("./UniswapV2Base");
var LaserSwapV2Provider = /** @class */ (function (_super) {
    var _a, _b;
    __extends(LaserSwapV2Provider, _super);
    function LaserSwapV2Provider(chainId, web3Client, databaseClient) {
        var _this = this;
        var factory = (_a = {},
            _a[chain_1.ChainId.THUNDERCORE] = '0x23c7FA9A9f81B322684F25b8079e22C37e00b46b',
            _a);
        var initCodeHash = (_b = {},
            _b[chain_1.ChainId.THUNDERCORE] = '0x9d026965f89efe44dcdcb857289f65e798b9012bfc276b63ec2a4d9f7761e8a7',
            _b);
        _this = _super.call(this, chainId, web3Client, factory, initCodeHash, databaseClient) || this;
        _this.fee = 0.0025;
        return _this;
    }
    LaserSwapV2Provider.prototype.getType = function () {
        return LiquidityProvider_1.LiquidityProviders.LaserSwap;
    };
    LaserSwapV2Provider.prototype.getPoolProviderName = function () {
        return 'LaserSwap';
    };
    return LaserSwapV2Provider;
}(UniswapV2Base_1.UniswapV2BaseProvider));
exports.LaserSwapV2Provider = LaserSwapV2Provider;
//# sourceMappingURL=LaserSwap.js.map