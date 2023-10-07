"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SushiSwapV3Provider = void 0;
const chain_1 = require("@sushiswap/chain");
const LiquidityProvider_1 = require("./LiquidityProvider");
const UniswapV3Base_1 = require("./UniswapV3Base");
class SushiSwapV3Provider extends UniswapV3Base_1.UniswapV3BaseProvider {
    constructor(chainId, web3Client, databaseClient) {
        const factory = {
            [chain_1.ChainId.ARBITRUM_NOVA]: '0xaa26771d497814E81D305c511Efbb3ceD90BF5bd',
            [chain_1.ChainId.ARBITRUM]: '0x1af415a1EbA07a4986a52B6f2e7dE7003D82231e',
            [chain_1.ChainId.AVALANCHE]: '0x3e603C14aF37EBdaD31709C4f848Fc6aD5BEc715',
            [chain_1.ChainId.BSC]: '0x126555dd55a39328F69400d6aE4F782Bd4C34ABb',
            [chain_1.ChainId.ETHEREUM]: '0xbACEB8eC6b9355Dfc0269C18bac9d6E2Bdc29C4F',
            [chain_1.ChainId.FANTOM]: '0x7770978eED668a3ba661d51a773d3a992Fc9DDCB',
            [chain_1.ChainId.FUSE]: '0x1b9d177CcdeA3c79B6c8F40761fc8Dc9d0500EAa',
            [chain_1.ChainId.GNOSIS]: '0xf78031CBCA409F2FB6876BDFDBc1b2df24cF9bEf',
            [chain_1.ChainId.MOONRIVER]: '0x2F255d3f3C0A3726c6c99E74566c4b18E36E3ce6',
            [chain_1.ChainId.OPTIMISM]: '0x9c6522117e2ed1fE5bdb72bb0eD5E3f2bdE7DBe0',
            [chain_1.ChainId.POLYGON]: '0x917933899c6a5F8E37F31E19f92CdBFF7e8FF0e2',
            [chain_1.ChainId.BOBA]: '0x0BE808376Ecb75a5CF9bB6D237d16cd37893d904',
            [chain_1.ChainId.POLYGON_ZKEVM]: '0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506',
            [chain_1.ChainId.THUNDERCORE]: '0xc35DADB65012eC5796536bD9864eD8773aBc74C4',
            [chain_1.ChainId.CORE]: '0xc35DADB65012eC5796536bD9864eD8773aBc74C4',
            [chain_1.ChainId.BASE]: '0xc35DADB65012eC5796536bD9864eD8773aBc74C4',
        };
        const initCodeHash = {
            [chain_1.ChainId.ARBITRUM_NOVA]: '0xe34f199b19b2b4f47f68442619d555527d244f78a3297ea89325f843f87b8b54',
            [chain_1.ChainId.ARBITRUM]: '0xe34f199b19b2b4f47f68442619d555527d244f78a3297ea89325f843f87b8b54',
            [chain_1.ChainId.AVALANCHE]: '0xe34f199b19b2b4f47f68442619d555527d244f78a3297ea89325f843f87b8b54',
            [chain_1.ChainId.BSC]: '0xe34f199b19b2b4f47f68442619d555527d244f78a3297ea89325f843f87b8b54',
            [chain_1.ChainId.ETHEREUM]: '0xe34f199b19b2b4f47f68442619d555527d244f78a3297ea89325f843f87b8b54',
            [chain_1.ChainId.FANTOM]: '0xe34f199b19b2b4f47f68442619d555527d244f78a3297ea89325f843f87b8b54',
            [chain_1.ChainId.FUSE]: '0xe34f199b19b2b4f47f68442619d555527d244f78a3297ea89325f843f87b8b54',
            [chain_1.ChainId.GNOSIS]: '0xe34f199b19b2b4f47f68442619d555527d244f78a3297ea89325f843f87b8b54',
            [chain_1.ChainId.MOONRIVER]: '0xe34f199b19b2b4f47f68442619d555527d244f78a3297ea89325f843f87b8b54',
            [chain_1.ChainId.OPTIMISM]: '0xe34f199b19b2b4f47f68442619d555527d244f78a3297ea89325f843f87b8b54',
            [chain_1.ChainId.POLYGON]: '0xe34f199b19b2b4f47f68442619d555527d244f78a3297ea89325f843f87b8b54',
            [chain_1.ChainId.BOBA]: '0xe34f199b19b2b4f47f68442619d555527d244f78a3297ea89325f843f87b8b54',
            [chain_1.ChainId.POLYGON_ZKEVM]: '0xe34f199b19b2b4f47f68442619d555527d244f78a3297ea89325f843f87b8b54',
            [chain_1.ChainId.THUNDERCORE]: '0xe34f199b19b2b4f47f68442619d555527d244f78a3297ea89325f843f87b8b54',
            [chain_1.ChainId.CORE]: '0xe34f199b19b2b4f47f68442619d555527d244f78a3297ea89325f843f87b8b54',
            [chain_1.ChainId.BASE]: '0xe34f199b19b2b4f47f68442619d555527d244f78a3297ea89325f843f87b8b54',
        };
        const tickLens = {
            [chain_1.ChainId.ARBITRUM_NOVA]: '0xF60e5f4A44a510742457D8064ffd360B12d8D9AF',
            [chain_1.ChainId.ARBITRUM]: '0x8516944E89f296eb6473d79aED1Ba12088016c9e',
            [chain_1.ChainId.AVALANCHE]: '0xDdC1b5920723F774d2Ec2C3c9355251A20819776',
            [chain_1.ChainId.BSC]: '0x10c19390E1Ac2Fd6D0c3643a2320b0abA38E5bAA',
            [chain_1.ChainId.ETHEREUM]: '0xFB70AD5a200d784E7901230E6875d91d5Fa6B68c',
            [chain_1.ChainId.FANTOM]: '0xD75F5369724b513b497101fb15211160c1d96550',
            [chain_1.ChainId.FUSE]: '0xf78031CBCA409F2FB6876BDFDBc1b2df24cF9bEf',
            [chain_1.ChainId.GNOSIS]: '0xaa26771d497814E81D305c511Efbb3ceD90BF5bd',
            [chain_1.ChainId.MOONRIVER]: '0x6E9Aed2C4cF5ed7E8AB851435225fE1601a1Bc56',
            [chain_1.ChainId.OPTIMISM]: '0x0367a647A68f304f2A6e453c25033a4249d7F2C6',
            [chain_1.ChainId.POLYGON]: '0x9fdeA1412e50D78B25aCE4f96d35801647Fdf7dA',
            [chain_1.ChainId.BOBA]: '0x9B3fF703FA9C8B467F5886d7b61E61ba07a9b51c',
            [chain_1.ChainId.POLYGON_ZKEVM]: '0x0BE808376Ecb75a5CF9bB6D237d16cd37893d904',
            [chain_1.ChainId.THUNDERCORE]: '0x0BE808376Ecb75a5CF9bB6D237d16cd37893d904',
            [chain_1.ChainId.CORE]: '0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506',
            [chain_1.ChainId.BASE]: '0xF4d73326C13a4Fc5FD7A064217e12780e9Bd62c3'
        };
        super(chainId, web3Client, factory, initCodeHash, tickLens, databaseClient);
    }
    getType() {
        return LiquidityProvider_1.LiquidityProviders.SushiSwapV3;
    }
    getPoolProviderName() {
        return 'SushiSwapV3';
    }
}
exports.SushiSwapV3Provider = SushiSwapV3Provider;
//# sourceMappingURL=SushiSwapV3.js.map