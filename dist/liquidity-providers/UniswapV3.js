"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UniswapV3Provider = void 0;
const chain_1 = require("@sushiswap/chain");
const LiquidityProvider_1 = require("./LiquidityProvider");
const UniswapV3Base_1 = require("./UniswapV3Base");
class UniswapV3Provider extends UniswapV3Base_1.UniswapV3BaseProvider {
    constructor(chainId, web3Client, databaseClient) {
        const factory = {
            [chain_1.ChainId.ETHEREUM]: '0x1F98431c8aD98523631AE4a59f267346ea31F984',
            [chain_1.ChainId.POLYGON]: '0x1F98431c8aD98523631AE4a59f267346ea31F984',
            [chain_1.ChainId.ARBITRUM]: '0x1F98431c8aD98523631AE4a59f267346ea31F984',
            [chain_1.ChainId.OPTIMISM]: '0x1F98431c8aD98523631AE4a59f267346ea31F984',
            [chain_1.ChainId.BSC]: '0xdB1d10011AD0Ff90774D0C6Bb92e5C5c8b4461F7',
            [chain_1.ChainId.BASE]: '0x33128a8fC17869897dcE68Ed026d694621f6FDfD',
        };
        const initCodeHash = {
            [chain_1.ChainId.ETHEREUM]: '0xe34f199b19b2b4f47f68442619d555527d244f78a3297ea89325f843f87b8b54',
            [chain_1.ChainId.POLYGON]: '0xe34f199b19b2b4f47f68442619d555527d244f78a3297ea89325f843f87b8b54',
            [chain_1.ChainId.ARBITRUM]: '0xe34f199b19b2b4f47f68442619d555527d244f78a3297ea89325f843f87b8b54',
            [chain_1.ChainId.OPTIMISM]: '0xe34f199b19b2b4f47f68442619d555527d244f78a3297ea89325f843f87b8b54',
            [chain_1.ChainId.BSC]: '0xe34f199b19b2b4f47f68442619d555527d244f78a3297ea89325f843f87b8b54',
            [chain_1.ChainId.BASE]: '0xe34f199b19b2b4f47f68442619d555527d244f78a3297ea89325f843f87b8b54',
        };
        const tickLens = {
            [chain_1.ChainId.ETHEREUM]: '0xbfd8137f7d1516d3ea5ca83523914859ec47f573',
            [chain_1.ChainId.POLYGON]: '0xbfd8137f7d1516d3ea5ca83523914859ec47f573',
            [chain_1.ChainId.ARBITRUM]: '0xbfd8137f7d1516d3ea5ca83523914859ec47f573',
            [chain_1.ChainId.OPTIMISM]: '0xbfd8137f7d1516d3ea5ca83523914859ec47f573',
            [chain_1.ChainId.BSC]: '0xD9270014D396281579760619CCf4c3af0501A47C',
            [chain_1.ChainId.BASE]: '0x0CdeE061c75D43c82520eD998C23ac2991c9ac6d',
        };
        super(chainId, web3Client, factory, initCodeHash, tickLens, databaseClient);
    }
    getType() {
        return LiquidityProvider_1.LiquidityProviders.UniswapV3;
    }
    getPoolProviderName() {
        return 'UniswapV3';
    }
}
exports.UniswapV3Provider = UniswapV3Provider;
//# sourceMappingURL=UniswapV3.js.map