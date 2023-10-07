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
exports.BiswapProvider = void 0;
var chain_1 = require("@sushiswap/chain");
var LiquidityProvider_1 = require("./LiquidityProvider");
var UniswapV2Base_1 = require("./UniswapV2Base");
var BiswapProvider = /** @class */ (function (_super) {
    var _a, _b;
    __extends(BiswapProvider, _super);
    function BiswapProvider(chainId, web3Client, databaseClient) {
        var _this = this;
        var factory = (_a = {},
            _a[chain_1.ChainId.BSC] = '0x858E3312ed3A876947EA49d572A7C42DE08af7EE',
            _a);
        var initCodeHash = (_b = {},
            _b[chain_1.ChainId.BSC] = '0xfea293c909d87cd4153593f077b76bb7e94340200f4ee84211ae8e4f9bd7ffdf',
            _b);
        _this = _super.call(this, chainId, web3Client, factory, initCodeHash, databaseClient) || this;
        _this.fee = 0.002;
        return _this;
    }
    BiswapProvider.prototype.getType = function () {
        return LiquidityProvider_1.LiquidityProviders.Biswap;
    };
    BiswapProvider.prototype.getPoolProviderName = function () {
        return 'Biswap';
    };
    return BiswapProvider;
}(UniswapV2Base_1.UniswapV2BaseProvider));
exports.BiswapProvider = BiswapProvider;
//# sourceMappingURL=Biswap.js.map