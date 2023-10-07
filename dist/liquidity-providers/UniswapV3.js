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
exports.UniswapV3Provider = void 0;
var chain_1 = require("@sushiswap/chain");
var LiquidityProvider_1 = require("./LiquidityProvider");
var UniswapV3Base_1 = require("./UniswapV3Base");
var UniswapV3Provider = /** @class */ (function (_super) {
    var _a, _b, _c;
    __extends(UniswapV3Provider, _super);
    function UniswapV3Provider(chainId, web3Client, databaseClient) {
        var factory = (_a = {},
            _a[chain_1.ChainId.ETHEREUM] = '0x1F98431c8aD98523631AE4a59f267346ea31F984',
            _a[chain_1.ChainId.POLYGON] = '0x1F98431c8aD98523631AE4a59f267346ea31F984',
            _a[chain_1.ChainId.ARBITRUM] = '0x1F98431c8aD98523631AE4a59f267346ea31F984',
            _a[chain_1.ChainId.OPTIMISM] = '0x1F98431c8aD98523631AE4a59f267346ea31F984',
            _a[chain_1.ChainId.BSC] = '0xdB1d10011AD0Ff90774D0C6Bb92e5C5c8b4461F7',
            _a[chain_1.ChainId.BASE] = '0x33128a8fC17869897dcE68Ed026d694621f6FDfD',
            _a);
        var initCodeHash = (_b = {},
            _b[chain_1.ChainId.ETHEREUM] = '0xe34f199b19b2b4f47f68442619d555527d244f78a3297ea89325f843f87b8b54',
            _b[chain_1.ChainId.POLYGON] = '0xe34f199b19b2b4f47f68442619d555527d244f78a3297ea89325f843f87b8b54',
            _b[chain_1.ChainId.ARBITRUM] = '0xe34f199b19b2b4f47f68442619d555527d244f78a3297ea89325f843f87b8b54',
            _b[chain_1.ChainId.OPTIMISM] = '0xe34f199b19b2b4f47f68442619d555527d244f78a3297ea89325f843f87b8b54',
            _b[chain_1.ChainId.BSC] = '0xe34f199b19b2b4f47f68442619d555527d244f78a3297ea89325f843f87b8b54',
            _b[chain_1.ChainId.BASE] = '0xe34f199b19b2b4f47f68442619d555527d244f78a3297ea89325f843f87b8b54',
            _b);
        var tickLens = (_c = {},
            _c[chain_1.ChainId.ETHEREUM] = '0xbfd8137f7d1516d3ea5ca83523914859ec47f573',
            _c[chain_1.ChainId.POLYGON] = '0xbfd8137f7d1516d3ea5ca83523914859ec47f573',
            _c[chain_1.ChainId.ARBITRUM] = '0xbfd8137f7d1516d3ea5ca83523914859ec47f573',
            _c[chain_1.ChainId.OPTIMISM] = '0xbfd8137f7d1516d3ea5ca83523914859ec47f573',
            _c[chain_1.ChainId.BSC] = '0xD9270014D396281579760619CCf4c3af0501A47C',
            _c[chain_1.ChainId.BASE] = '0x0CdeE061c75D43c82520eD998C23ac2991c9ac6d',
            _c);
        return _super.call(this, chainId, web3Client, factory, initCodeHash, tickLens, databaseClient) || this;
    }
    UniswapV3Provider.prototype.getType = function () {
        return LiquidityProvider_1.LiquidityProviders.UniswapV3;
    };
    UniswapV3Provider.prototype.getPoolProviderName = function () {
        return 'UniswapV3';
    };
    return UniswapV3Provider;
}(UniswapV3Base_1.UniswapV3BaseProvider));
exports.UniswapV3Provider = UniswapV3Provider;
//# sourceMappingURL=UniswapV3.js.map