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
exports.SushiSwapV3Provider = void 0;
var chain_1 = require("@sushiswap/chain");
var LiquidityProvider_1 = require("./LiquidityProvider");
var UniswapV3Base_1 = require("./UniswapV3Base");
var SushiSwapV3Provider = /** @class */ (function (_super) {
    var _a, _b, _c;
    __extends(SushiSwapV3Provider, _super);
    function SushiSwapV3Provider(chainId, web3Client, databaseClient) {
        var factory = (_a = {},
            _a[chain_1.ChainId.ARBITRUM_NOVA] = '0xaa26771d497814E81D305c511Efbb3ceD90BF5bd',
            _a[chain_1.ChainId.ARBITRUM] = '0x1af415a1EbA07a4986a52B6f2e7dE7003D82231e',
            _a[chain_1.ChainId.AVALANCHE] = '0x3e603C14aF37EBdaD31709C4f848Fc6aD5BEc715',
            _a[chain_1.ChainId.BSC] = '0x126555dd55a39328F69400d6aE4F782Bd4C34ABb',
            _a[chain_1.ChainId.ETHEREUM] = '0xbACEB8eC6b9355Dfc0269C18bac9d6E2Bdc29C4F',
            _a[chain_1.ChainId.FANTOM] = '0x7770978eED668a3ba661d51a773d3a992Fc9DDCB',
            _a[chain_1.ChainId.FUSE] = '0x1b9d177CcdeA3c79B6c8F40761fc8Dc9d0500EAa',
            _a[chain_1.ChainId.GNOSIS] = '0xf78031CBCA409F2FB6876BDFDBc1b2df24cF9bEf',
            _a[chain_1.ChainId.MOONRIVER] = '0x2F255d3f3C0A3726c6c99E74566c4b18E36E3ce6',
            _a[chain_1.ChainId.OPTIMISM] = '0x9c6522117e2ed1fE5bdb72bb0eD5E3f2bdE7DBe0',
            _a[chain_1.ChainId.POLYGON] = '0x917933899c6a5F8E37F31E19f92CdBFF7e8FF0e2',
            _a[chain_1.ChainId.BOBA] = '0x0BE808376Ecb75a5CF9bB6D237d16cd37893d904',
            _a[chain_1.ChainId.POLYGON_ZKEVM] = '0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506',
            _a[chain_1.ChainId.THUNDERCORE] = '0xc35DADB65012eC5796536bD9864eD8773aBc74C4',
            _a[chain_1.ChainId.CORE] = '0xc35DADB65012eC5796536bD9864eD8773aBc74C4',
            _a[chain_1.ChainId.BASE] = '0xc35DADB65012eC5796536bD9864eD8773aBc74C4',
            _a);
        var initCodeHash = (_b = {},
            _b[chain_1.ChainId.ARBITRUM_NOVA] = '0xe34f199b19b2b4f47f68442619d555527d244f78a3297ea89325f843f87b8b54',
            _b[chain_1.ChainId.ARBITRUM] = '0xe34f199b19b2b4f47f68442619d555527d244f78a3297ea89325f843f87b8b54',
            _b[chain_1.ChainId.AVALANCHE] = '0xe34f199b19b2b4f47f68442619d555527d244f78a3297ea89325f843f87b8b54',
            _b[chain_1.ChainId.BSC] = '0xe34f199b19b2b4f47f68442619d555527d244f78a3297ea89325f843f87b8b54',
            _b[chain_1.ChainId.ETHEREUM] = '0xe34f199b19b2b4f47f68442619d555527d244f78a3297ea89325f843f87b8b54',
            _b[chain_1.ChainId.FANTOM] = '0xe34f199b19b2b4f47f68442619d555527d244f78a3297ea89325f843f87b8b54',
            _b[chain_1.ChainId.FUSE] = '0xe34f199b19b2b4f47f68442619d555527d244f78a3297ea89325f843f87b8b54',
            _b[chain_1.ChainId.GNOSIS] = '0xe34f199b19b2b4f47f68442619d555527d244f78a3297ea89325f843f87b8b54',
            _b[chain_1.ChainId.MOONRIVER] = '0xe34f199b19b2b4f47f68442619d555527d244f78a3297ea89325f843f87b8b54',
            _b[chain_1.ChainId.OPTIMISM] = '0xe34f199b19b2b4f47f68442619d555527d244f78a3297ea89325f843f87b8b54',
            _b[chain_1.ChainId.POLYGON] = '0xe34f199b19b2b4f47f68442619d555527d244f78a3297ea89325f843f87b8b54',
            _b[chain_1.ChainId.BOBA] = '0xe34f199b19b2b4f47f68442619d555527d244f78a3297ea89325f843f87b8b54',
            _b[chain_1.ChainId.POLYGON_ZKEVM] = '0xe34f199b19b2b4f47f68442619d555527d244f78a3297ea89325f843f87b8b54',
            _b[chain_1.ChainId.THUNDERCORE] = '0xe34f199b19b2b4f47f68442619d555527d244f78a3297ea89325f843f87b8b54',
            _b[chain_1.ChainId.CORE] = '0xe34f199b19b2b4f47f68442619d555527d244f78a3297ea89325f843f87b8b54',
            _b[chain_1.ChainId.BASE] = '0xe34f199b19b2b4f47f68442619d555527d244f78a3297ea89325f843f87b8b54',
            _b);
        var tickLens = (_c = {},
            _c[chain_1.ChainId.ARBITRUM_NOVA] = '0xF60e5f4A44a510742457D8064ffd360B12d8D9AF',
            _c[chain_1.ChainId.ARBITRUM] = '0x8516944E89f296eb6473d79aED1Ba12088016c9e',
            _c[chain_1.ChainId.AVALANCHE] = '0xDdC1b5920723F774d2Ec2C3c9355251A20819776',
            _c[chain_1.ChainId.BSC] = '0x10c19390E1Ac2Fd6D0c3643a2320b0abA38E5bAA',
            _c[chain_1.ChainId.ETHEREUM] = '0xFB70AD5a200d784E7901230E6875d91d5Fa6B68c',
            _c[chain_1.ChainId.FANTOM] = '0xD75F5369724b513b497101fb15211160c1d96550',
            _c[chain_1.ChainId.FUSE] = '0xf78031CBCA409F2FB6876BDFDBc1b2df24cF9bEf',
            _c[chain_1.ChainId.GNOSIS] = '0xaa26771d497814E81D305c511Efbb3ceD90BF5bd',
            _c[chain_1.ChainId.MOONRIVER] = '0x6E9Aed2C4cF5ed7E8AB851435225fE1601a1Bc56',
            _c[chain_1.ChainId.OPTIMISM] = '0x0367a647A68f304f2A6e453c25033a4249d7F2C6',
            _c[chain_1.ChainId.POLYGON] = '0x9fdeA1412e50D78B25aCE4f96d35801647Fdf7dA',
            _c[chain_1.ChainId.BOBA] = '0x9B3fF703FA9C8B467F5886d7b61E61ba07a9b51c',
            _c[chain_1.ChainId.POLYGON_ZKEVM] = '0x0BE808376Ecb75a5CF9bB6D237d16cd37893d904',
            _c[chain_1.ChainId.THUNDERCORE] = '0x0BE808376Ecb75a5CF9bB6D237d16cd37893d904',
            _c[chain_1.ChainId.CORE] = '0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506',
            _c[chain_1.ChainId.BASE] = '0xF4d73326C13a4Fc5FD7A064217e12780e9Bd62c3',
            _c);
        return _super.call(this, chainId, web3Client, factory, initCodeHash, tickLens, databaseClient) || this;
    }
    SushiSwapV3Provider.prototype.getType = function () {
        return LiquidityProvider_1.LiquidityProviders.SushiSwapV3;
    };
    SushiSwapV3Provider.prototype.getPoolProviderName = function () {
        return 'SushiSwapV3';
    };
    return SushiSwapV3Provider;
}(UniswapV3Base_1.UniswapV3BaseProvider));
exports.SushiSwapV3Provider = SushiSwapV3Provider;
//# sourceMappingURL=SushiSwapV3.js.map