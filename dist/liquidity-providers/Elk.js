"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ElkProvider = void 0;
const chain_1 = require("@sushiswap/chain");
const LiquidityProvider_1 = require("./LiquidityProvider");
const UniswapV2Base_1 = require("./UniswapV2Base");
class ElkProvider extends UniswapV2Base_1.UniswapV2BaseProvider {
    constructor(chainId, web3Client, databaseClient) {
        const factory = {
            [chain_1.ChainId.AVALANCHE]: '0x091d35d7F63487909C863001ddCA481c6De47091',
            [chain_1.ChainId.POLYGON]: '0xE3BD06c7ac7E1CeB17BdD2E5BA83E40D1515AF2a',
            [chain_1.ChainId.FANTOM]: '0x7Ba73c99e6f01a37f3e33854c8F544BbbadD3420',
            [chain_1.ChainId.GNOSIS]: '0xCB018587dA9590A18f49fFE2b85314c33aF3Ad3B',
            [chain_1.ChainId.BSC]: '0x31aFfd875e9f68cd6Cd12Cee8943566c9A4bBA13',
            [chain_1.ChainId.MOONRIVER]: '0xd45145f10fD4071dfC9fC3b1aefCd9c83A685e77',
            [chain_1.ChainId.TELOS]: '0x47c3163e691966f8c1b93B308A236DDB3C1C592d',
            [chain_1.ChainId.FUSE]: '0x779407e40Dad9D70Ba5ADc30E45cC3494ec71ad2',
            [chain_1.ChainId.ETHEREUM]: '0x6511eBA915fC1b94b2364289CCa2b27AE5898d80',
            [chain_1.ChainId.ARBITRUM]: '0xA59B2044EAFD15ee4deF138D410d764c9023E1F0',
            [chain_1.ChainId.OPTIMISM]: '0xedfad3a0F42A8920B011bb0332aDe632e552d846',
            [chain_1.ChainId.KAVA]: '0xC012C4b3d253A8F22d5e4ADA67ea2236FF9778fc',
            // [ChainId.BTTC]: '0xc06348AEE3f3E92eE452816E0D3F25C919F6fB04'
            // [ChainId.HARMONY]: '0xCdde1AbfF5Ae3Cbfbdb55c1e866Ac56380e18720',
            // [ChainId.HECO]: '0x997fCE9164D630CC58eE366d4D275B9D773d54A4',
            // [ChainId.OKEX]: '0x1116f8B82028324f2065078b4ff6b47F1Cc22B97',
        };
        const initCodeHash = {
            [chain_1.ChainId.AVALANCHE]: '0x84845e7ccb283dec564acfcd3d9287a491dec6d675705545a2ab8be22ad78f31',
            [chain_1.ChainId.POLYGON]: '0x84845e7ccb283dec564acfcd3d9287a491dec6d675705545a2ab8be22ad78f31',
            [chain_1.ChainId.FANTOM]: '0x84845e7ccb283dec564acfcd3d9287a491dec6d675705545a2ab8be22ad78f31',
            [chain_1.ChainId.GNOSIS]: '0x84845e7ccb283dec564acfcd3d9287a491dec6d675705545a2ab8be22ad78f31',
            [chain_1.ChainId.BSC]: '0x84845e7ccb283dec564acfcd3d9287a491dec6d675705545a2ab8be22ad78f31',
            [chain_1.ChainId.MOONRIVER]: '0x84845e7ccb283dec564acfcd3d9287a491dec6d675705545a2ab8be22ad78f31',
            [chain_1.ChainId.TELOS]: '0x84845e7ccb283dec564acfcd3d9287a491dec6d675705545a2ab8be22ad78f31',
            [chain_1.ChainId.FUSE]: '0x84845e7ccb283dec564acfcd3d9287a491dec6d675705545a2ab8be22ad78f31',
            [chain_1.ChainId.ETHEREUM]: '0x84845e7ccb283dec564acfcd3d9287a491dec6d675705545a2ab8be22ad78f31',
            [chain_1.ChainId.ARBITRUM]: '0x84845e7ccb283dec564acfcd3d9287a491dec6d675705545a2ab8be22ad78f31',
            [chain_1.ChainId.OPTIMISM]: '0x84845e7ccb283dec564acfcd3d9287a491dec6d675705545a2ab8be22ad78f31',
            [chain_1.ChainId.KAVA]: '0x84845e7ccb283dec564acfcd3d9287a491dec6d675705545a2ab8be22ad78f31',
            // [ChainId.BTTC]: '0x84845e7ccb283dec564acfcd3d9287a491dec6d675705545a2ab8be22ad78f31',
            // [ChainId.HARMONY]: '0x84845e7ccb283dec564acfcd3d9287a491dec6d675705545a2ab8be22ad78f31',
            // [ChainId.HECO]: '0x84845e7ccb283dec564acfcd3d9287a491dec6d675705545a2ab8be22ad78f31',
            // [ChainId.OKEX]: '0x84845e7ccb283dec564acfcd3d9287a491dec6d675705545a2ab8be22ad78f31',
        };
        super(chainId, web3Client, factory, initCodeHash, databaseClient);
    }
    getType() {
        return LiquidityProvider_1.LiquidityProviders.Elk;
    }
    getPoolProviderName() {
        return 'Elk';
    }
}
exports.ElkProvider = ElkProvider;
//# sourceMappingURL=Elk.js.map