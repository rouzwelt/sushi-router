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
exports.ApeSwapProvider = void 0;
var chain_1 = require("@sushiswap/chain");
var LiquidityProvider_1 = require("./LiquidityProvider");
var UniswapV2Base_1 = require("./UniswapV2Base");
var ApeSwapProvider = /** @class */ (function (_super) {
    var _a, _b;
    __extends(ApeSwapProvider, _super);
    function ApeSwapProvider(chainId, web3Client, databaseClient) {
        var factory = (_a = {},
            _a[chain_1.ChainId.ETHEREUM] = '0xBAe5dc9B19004883d0377419FeF3c2C8832d7d7B',
            _a[chain_1.ChainId.POLYGON] = '0xCf083Be4164828f00cAE704EC15a36D711491284',
            _a[chain_1.ChainId.BSC] = '0x0841BD0B734E4F5853f0dD8d7Ea041c241fb0Da6',
            _a[chain_1.ChainId.TELOS] = '0x411172Dfcd5f68307656A1ff35520841C2F7fAec',
            _a);
        var initCodeHash = (_b = {},
            _b[chain_1.ChainId.ETHEREUM] = '0xe2200989b6f9506f3beca7e9c844741b3ad1a88ad978b6b0973e96d3ca4707aa',
            _b[chain_1.ChainId.POLYGON] = '0x511f0f358fe530cda0859ec20becf391718fdf5a329be02f4c95361f3d6a42d8',
            _b[chain_1.ChainId.BSC] = '0xf4ccce374816856d11f00e4069e7cada164065686fbef53c6167a63ec2fd8c5b',
            _b[chain_1.ChainId.TELOS] = '0x7d4b9bb0d5808344c0184aada7d10aae8f6b0cc8ceb5eba8dd084f63b8c32099',
            _b);
        return _super.call(this, chainId, web3Client, factory, initCodeHash, databaseClient) || this;
    }
    ApeSwapProvider.prototype.getType = function () {
        return LiquidityProvider_1.LiquidityProviders.ApeSwap;
    };
    ApeSwapProvider.prototype.getPoolProviderName = function () {
        return 'ApeSwap';
    };
    return ApeSwapProvider;
}(UniswapV2Base_1.UniswapV2BaseProvider));
exports.ApeSwapProvider = ApeSwapProvider;
//# sourceMappingURL=ApeSwap.js.map