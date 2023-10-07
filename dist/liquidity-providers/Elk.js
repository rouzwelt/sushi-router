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
exports.ElkProvider = void 0;
var chain_1 = require("@sushiswap/chain");
var LiquidityProvider_1 = require("./LiquidityProvider");
var UniswapV2Base_1 = require("./UniswapV2Base");
var ElkProvider = /** @class */ (function (_super) {
    var _a, _b;
    __extends(ElkProvider, _super);
    function ElkProvider(chainId, web3Client, databaseClient) {
        var factory = (_a = {},
            _a[chain_1.ChainId.AVALANCHE] = '0x091d35d7F63487909C863001ddCA481c6De47091',
            _a[chain_1.ChainId.POLYGON] = '0xE3BD06c7ac7E1CeB17BdD2E5BA83E40D1515AF2a',
            _a[chain_1.ChainId.FANTOM] = '0x7Ba73c99e6f01a37f3e33854c8F544BbbadD3420',
            _a[chain_1.ChainId.GNOSIS] = '0xCB018587dA9590A18f49fFE2b85314c33aF3Ad3B',
            _a[chain_1.ChainId.BSC] = '0x31aFfd875e9f68cd6Cd12Cee8943566c9A4bBA13',
            _a[chain_1.ChainId.MOONRIVER] = '0xd45145f10fD4071dfC9fC3b1aefCd9c83A685e77',
            _a[chain_1.ChainId.TELOS] = '0x47c3163e691966f8c1b93B308A236DDB3C1C592d',
            _a[chain_1.ChainId.FUSE] = '0x779407e40Dad9D70Ba5ADc30E45cC3494ec71ad2',
            _a[chain_1.ChainId.ETHEREUM] = '0x6511eBA915fC1b94b2364289CCa2b27AE5898d80',
            _a[chain_1.ChainId.ARBITRUM] = '0xA59B2044EAFD15ee4deF138D410d764c9023E1F0',
            _a[chain_1.ChainId.OPTIMISM] = '0xedfad3a0F42A8920B011bb0332aDe632e552d846',
            _a[chain_1.ChainId.KAVA] = '0xC012C4b3d253A8F22d5e4ADA67ea2236FF9778fc',
            _a);
        var initCodeHash = (_b = {},
            _b[chain_1.ChainId.AVALANCHE] = '0x84845e7ccb283dec564acfcd3d9287a491dec6d675705545a2ab8be22ad78f31',
            _b[chain_1.ChainId.POLYGON] = '0x84845e7ccb283dec564acfcd3d9287a491dec6d675705545a2ab8be22ad78f31',
            _b[chain_1.ChainId.FANTOM] = '0x84845e7ccb283dec564acfcd3d9287a491dec6d675705545a2ab8be22ad78f31',
            _b[chain_1.ChainId.GNOSIS] = '0x84845e7ccb283dec564acfcd3d9287a491dec6d675705545a2ab8be22ad78f31',
            _b[chain_1.ChainId.BSC] = '0x84845e7ccb283dec564acfcd3d9287a491dec6d675705545a2ab8be22ad78f31',
            _b[chain_1.ChainId.MOONRIVER] = '0x84845e7ccb283dec564acfcd3d9287a491dec6d675705545a2ab8be22ad78f31',
            _b[chain_1.ChainId.TELOS] = '0x84845e7ccb283dec564acfcd3d9287a491dec6d675705545a2ab8be22ad78f31',
            _b[chain_1.ChainId.FUSE] = '0x84845e7ccb283dec564acfcd3d9287a491dec6d675705545a2ab8be22ad78f31',
            _b[chain_1.ChainId.ETHEREUM] = '0x84845e7ccb283dec564acfcd3d9287a491dec6d675705545a2ab8be22ad78f31',
            _b[chain_1.ChainId.ARBITRUM] = '0x84845e7ccb283dec564acfcd3d9287a491dec6d675705545a2ab8be22ad78f31',
            _b[chain_1.ChainId.OPTIMISM] = '0x84845e7ccb283dec564acfcd3d9287a491dec6d675705545a2ab8be22ad78f31',
            _b[chain_1.ChainId.KAVA] = '0x84845e7ccb283dec564acfcd3d9287a491dec6d675705545a2ab8be22ad78f31',
            _b);
        return _super.call(this, chainId, web3Client, factory, initCodeHash, databaseClient) || this;
    }
    ElkProvider.prototype.getType = function () {
        return LiquidityProvider_1.LiquidityProviders.Elk;
    };
    ElkProvider.prototype.getPoolProviderName = function () {
        return 'Elk';
    };
    return ElkProvider;
}(UniswapV2Base_1.UniswapV2BaseProvider));
exports.ElkProvider = ElkProvider;
//# sourceMappingURL=Elk.js.map