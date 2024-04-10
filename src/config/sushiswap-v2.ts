import { ChainId } from '../chain'

export const SUSHISWAP_V2_SUPPORTED_CHAIN_IDS = [
  ChainId.ARBITRUM,
  ChainId.ARBITRUM_NOVA,
  ChainId.AVALANCHE,
  ChainId.AVALANCHE_TESTNET,
  ChainId.BASE,
  ChainId.BOBA,
  ChainId.BOBA_AVAX,
  ChainId.BOBA_BNB,
  ChainId.BSC,
  ChainId.BSC_TESTNET,
  ChainId.CELO,
  ChainId.ETHEREUM,
  ChainId.FANTOM,
  // ChainId.FANTOM_TESTNET,
  ChainId.FUSE,
  ChainId.GNOSIS,
  ChainId.HAQQ,
  ChainId.HARMONY,
  // ChainId.HARMONY_TESTNET,
  ChainId.HECO,
  // ChainId.HECO_TESTNET,
  ChainId.MOONBEAM,
  ChainId.MOONRIVER,
  ChainId.OKEX,
  // ChainId.OKEX_TESTNET,
  ChainId.PALM,
  ChainId.POLYGON,
  ChainId.POLYGON_TESTNET,
  ChainId.TELOS,
  ChainId.SCROLL,
  ChainId.KAVA,
  ChainId.METIS,
  ChainId.BTTC,
  ChainId.FILECOIN,
  ChainId.ZETACHAIN,
  ChainId.CORE,
  ChainId.THUNDERCORE,
  ChainId.HAQQ,
  ChainId.OPTIMISM,
  ChainId.LINEA,
  ChainId.POLYGON_ZKEVM,
  ChainId.BLAST,
  // Eth testnets
  // ChainId.ROPSTEN,
  // ChainId.RINKEBY,
  // ChainId.GÖRLI,
  // ChainId.KOVAN,
]

export const SushiSwapV2ChainIds = SUSHISWAP_V2_SUPPORTED_CHAIN_IDS

export type SushiSwapV2ChainId =
  (typeof SUSHISWAP_V2_SUPPORTED_CHAIN_IDS)[number]

export const isSushiSwapV2ChainId = (
  chainId: ChainId,
): chainId is SushiSwapV2ChainId =>
  SUSHISWAP_V2_SUPPORTED_CHAIN_IDS.includes(chainId as SushiSwapV2ChainId)

export const SUSHISWAP_V2_INIT_CODE_HASH: Record<
  SushiSwapV2ChainId,
  `0x${string}`
> = {
  [ChainId.ETHEREUM]:
    '0xe18a34eb0e04b04f7a0ac29a6e80748dca96319b42c54d679cb821dca90c6303',
  // [ChainId.ROPSTEN]:
  //   '0xe18a34eb0e04b04f7a0ac29a6e80748dca96319b42c54d679cb821dca90c6303',
  // [ChainId.RINKEBY]:
  //   '0xe18a34eb0e04b04f7a0ac29a6e80748dca96319b42c54d679cb821dca90c6303',
  // [ChainId.GÖRLI]:
  //   '0xe18a34eb0e04b04f7a0ac29a6e80748dca96319b42c54d679cb821dca90c6303',
  // [ChainId.KOVAN]:
  //   '0xe18a34eb0e04b04f7a0ac29a6e80748dca96319b42c54d679cb821dca90c6303',
  [ChainId.FANTOM]:
    '0xe18a34eb0e04b04f7a0ac29a6e80748dca96319b42c54d679cb821dca90c6303',
  [ChainId.POLYGON]:
    '0xe18a34eb0e04b04f7a0ac29a6e80748dca96319b42c54d679cb821dca90c6303',
  [ChainId.POLYGON_TESTNET]:
    '0xe18a34eb0e04b04f7a0ac29a6e80748dca96319b42c54d679cb821dca90c6303',
  [ChainId.GNOSIS]:
    '0xe18a34eb0e04b04f7a0ac29a6e80748dca96319b42c54d679cb821dca90c6303',
  [ChainId.BSC]:
    '0xe18a34eb0e04b04f7a0ac29a6e80748dca96319b42c54d679cb821dca90c6303',
  [ChainId.BSC_TESTNET]:
    '0xe18a34eb0e04b04f7a0ac29a6e80748dca96319b42c54d679cb821dca90c6303',
  [ChainId.ARBITRUM]:
    '0xe18a34eb0e04b04f7a0ac29a6e80748dca96319b42c54d679cb821dca90c6303',
  [ChainId.AVALANCHE]:
    '0xe18a34eb0e04b04f7a0ac29a6e80748dca96319b42c54d679cb821dca90c6303',
  [ChainId.AVALANCHE_TESTNET]:
    '0xe18a34eb0e04b04f7a0ac29a6e80748dca96319b42c54d679cb821dca90c6303',
  [ChainId.HECO]:
    '0xe18a34eb0e04b04f7a0ac29a6e80748dca96319b42c54d679cb821dca90c6303',
  // [ChainId.HECO_TESTNET]:
  //   '0xe18a34eb0e04b04f7a0ac29a6e80748dca96319b42c54d679cb821dca90c6303',
  [ChainId.HARMONY]:
    '0xe18a34eb0e04b04f7a0ac29a6e80748dca96319b42c54d679cb821dca90c6303',
  // [ChainId.HARMONY_TESTNET]:
  //   '0xe18a34eb0e04b04f7a0ac29a6e80748dca96319b42c54d679cb821dca90c6303',
  [ChainId.OKEX]:
    '0xe18a34eb0e04b04f7a0ac29a6e80748dca96319b42c54d679cb821dca90c6303',
  // [ChainId.OKEX_TESTNET]:
  //   '0xe18a34eb0e04b04f7a0ac29a6e80748dca96319b42c54d679cb821dca90c6303',
  [ChainId.CELO]:
    '0xe18a34eb0e04b04f7a0ac29a6e80748dca96319b42c54d679cb821dca90c6303',
  [ChainId.PALM]:
    '0xe18a34eb0e04b04f7a0ac29a6e80748dca96319b42c54d679cb821dca90c6303',
  [ChainId.MOONRIVER]:
    '0xe18a34eb0e04b04f7a0ac29a6e80748dca96319b42c54d679cb821dca90c6303',
  [ChainId.FUSE]:
    '0x1901958ef8b470f2c0a3875a79ee0bd303866d85102c0f1ea820d317024d50b5',
  [ChainId.TELOS]:
    '0xe18a34eb0e04b04f7a0ac29a6e80748dca96319b42c54d679cb821dca90c6303',
  [ChainId.MOONBEAM]:
    '0xe18a34eb0e04b04f7a0ac29a6e80748dca96319b42c54d679cb821dca90c6303',
  [ChainId.ARBITRUM_NOVA]:
    '0xe18a34eb0e04b04f7a0ac29a6e80748dca96319b42c54d679cb821dca90c6303',
  [ChainId.BOBA]:
    '0xe18a34eb0e04b04f7a0ac29a6e80748dca96319b42c54d679cb821dca90c6303',
  [ChainId.BOBA_AVAX]:
    '0xe18a34eb0e04b04f7a0ac29a6e80748dca96319b42c54d679cb821dca90c6303',
  [ChainId.BOBA_BNB]:
    '0xe18a34eb0e04b04f7a0ac29a6e80748dca96319b42c54d679cb821dca90c6303',
  [ChainId.BASE]:
    '0xe18a34eb0e04b04f7a0ac29a6e80748dca96319b42c54d679cb821dca90c6303',
  [ChainId.SCROLL]:
    '0xe18a34eb0e04b04f7a0ac29a6e80748dca96319b42c54d679cb821dca90c6303',
  [ChainId.KAVA]:
    '0xe18a34eb0e04b04f7a0ac29a6e80748dca96319b42c54d679cb821dca90c6303',
  [ChainId.METIS]:
    '0xe18a34eb0e04b04f7a0ac29a6e80748dca96319b42c54d679cb821dca90c6303',
  [ChainId.BTTC]:
    '0xe18a34eb0e04b04f7a0ac29a6e80748dca96319b42c54d679cb821dca90c6303',
  [ChainId.FILECOIN]:
    '0xe18a34eb0e04b04f7a0ac29a6e80748dca96319b42c54d679cb821dca90c6303',
  [ChainId.ZETACHAIN]:
    '0xe18a34eb0e04b04f7a0ac29a6e80748dca96319b42c54d679cb821dca90c6303',
  [ChainId.HAQQ]:
    '0xe18a34eb0e04b04f7a0ac29a6e80748dca96319b42c54d679cb821dca90c6303',
  [ChainId.CORE]:
    '0xe18a34eb0e04b04f7a0ac29a6e80748dca96319b42c54d679cb821dca90c6303',
  [ChainId.THUNDERCORE]:
    '0xe18a34eb0e04b04f7a0ac29a6e80748dca96319b42c54d679cb821dca90c6303',
  [ChainId.OPTIMISM]:
    '0xe18a34eb0e04b04f7a0ac29a6e80748dca96319b42c54d679cb821dca90c6303',
  [ChainId.LINEA]:
    '0xe18a34eb0e04b04f7a0ac29a6e80748dca96319b42c54d679cb821dca90c6303',
  [ChainId.POLYGON_ZKEVM]:
    '0xe18a34eb0e04b04f7a0ac29a6e80748dca96319b42c54d679cb821dca90c6303',
  [ChainId.BLAST]:
    '0x0871b2842bc5ad89183710ec5587b7e7e285f1212e8960a4941335bab95cf6af',
}

export const SUSHISWAP_V2_FACTORY_ADDRESS: Record<
  SushiSwapV2ChainId,
  `0x${string}`
> = {
  [ChainId.ETHEREUM]: '0xC0AEe478e3658e2610c5F7A4A2E1777cE9e4f2Ac',
  // [ChainId.ROPSTEN]: '0xc35DADB65012eC5796536bD9864eD8773aBc74C4',
  // [ChainId.RINKEBY]: '0xc35DADB65012eC5796536bD9864eD8773aBc74C4',
  // [ChainId.GÖRLI]: '0xc35DADB65012eC5796536bD9864eD8773aBc74C4',
  // [ChainId.KOVAN]: '0xc35DADB65012eC5796536bD9864eD8773aBc74C4',
  [ChainId.FANTOM]: '0xc35DADB65012eC5796536bD9864eD8773aBc74C4',
  [ChainId.POLYGON]: '0xc35DADB65012eC5796536bD9864eD8773aBc74C4',
  [ChainId.POLYGON_TESTNET]: '0xc35DADB65012eC5796536bD9864eD8773aBc74C4',
  [ChainId.GNOSIS]: '0xc35DADB65012eC5796536bD9864eD8773aBc74C4',
  [ChainId.BSC]: '0xc35DADB65012eC5796536bD9864eD8773aBc74C4',
  [ChainId.BSC_TESTNET]: '0xc35DADB65012eC5796536bD9864eD8773aBc74C4',
  [ChainId.ARBITRUM]: '0xc35DADB65012eC5796536bD9864eD8773aBc74C4',
  [ChainId.AVALANCHE]: '0xc35DADB65012eC5796536bD9864eD8773aBc74C4',
  [ChainId.AVALANCHE_TESTNET]: '0xd00ae08403B9bbb9124bB305C09058E32C39A48c',
  [ChainId.HAQQ]: '0xB45e53277a7e0F1D35f2a77160e91e25507f1763',
  [ChainId.HECO]: '0xc35DADB65012eC5796536bD9864eD8773aBc74C4',
  // [ChainId.HECO_TESTNET]: '0xc35DADB65012eC5796536bD9864eD8773aBc74C4',
  [ChainId.HARMONY]: '0xc35DADB65012eC5796536bD9864eD8773aBc74C4',
  // [ChainId.HARMONY_TESTNET]: '0xc35DADB65012eC5796536bD9864eD8773aBc74C4',
  [ChainId.OKEX]: '0xc35DADB65012eC5796536bD9864eD8773aBc74C4',
  // [ChainId.OKEX_TESTNET]: '0xc35DADB65012eC5796536bD9864eD8773aBc74C4',
  [ChainId.CELO]: '0xc35DADB65012eC5796536bD9864eD8773aBc74C4',
  [ChainId.PALM]: '0xc35DADB65012eC5796536bD9864eD8773aBc74C4',
  [ChainId.MOONRIVER]: '0xc35DADB65012eC5796536bD9864eD8773aBc74C4',
  [ChainId.FUSE]: '0x43eA90e2b786728520e4f930d2A71a477BF2737C',
  [ChainId.TELOS]: '0xc35DADB65012eC5796536bD9864eD8773aBc74C4',
  [ChainId.MOONBEAM]: '0xc35DADB65012eC5796536bD9864eD8773aBc74C4',
  [ChainId.ARBITRUM_NOVA]: '0xc35DADB65012eC5796536bD9864eD8773aBc74C4',
  [ChainId.BOBA]: '0xc35DADB65012eC5796536bD9864eD8773aBc74C4',
  [ChainId.BOBA_AVAX]: '0xc35DADB65012eC5796536bD9864eD8773aBc74C4',
  [ChainId.BOBA_BNB]: '0xc35DADB65012eC5796536bD9864eD8773aBc74C4',
  [ChainId.BASE]: '0x71524B4f93c58fcbF659783284E38825f0622859',
  [ChainId.SCROLL]: '0xB45e53277a7e0F1D35f2a77160e91e25507f1763',
  [ChainId.KAVA]: '0xD408a20f1213286fB3158a2bfBf5bFfAca8bF269',
  [ChainId.METIS]: '0x580ED43F3BBa06555785C81c2957efCCa71f7483',
  [ChainId.BTTC]: '0xB45e53277a7e0F1D35f2a77160e91e25507f1763',
  [ChainId.FILECOIN]: '0x9B3336186a38E1b6c21955d112dbb0343Ee061eE',
  [ChainId.ZETACHAIN]: '0x33d91116e0370970444B0281AB117e161fEbFcdD',
  [ChainId.CORE]: '0xB45e53277a7e0F1D35f2a77160e91e25507f1763',
  [ChainId.THUNDERCORE]: '0xB45e53277a7e0F1D35f2a77160e91e25507f1763',
  [ChainId.OPTIMISM]: '0xFbc12984689e5f15626Bad03Ad60160Fe98B303C',
  [ChainId.LINEA]: '0xFbc12984689e5f15626Bad03Ad60160Fe98B303C',
  [ChainId.POLYGON_ZKEVM]: '0xB45e53277a7e0F1D35f2a77160e91e25507f1763',
  [ChainId.BLAST]: '0x42Fa929fc636e657AC568C0b5Cf38E203b67aC2b',
}

export const SUSHISWAP_V2_ROUTER_ADDRESS: Record<
  SushiSwapV2ChainId,
  `0x${string}`
> = {
  [ChainId.ETHEREUM]: '0xd9e1cE17f2641f24aE83637ab66a2cca9C378B9F',
  // [ChainId.ROPSTEN]: '0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506',
  // [ChainId.RINKEBY]: '0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506',
  // [ChainId.GÖRLI]: '0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506',
  // [ChainId.KOVAN]: '0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506',
  [ChainId.FANTOM]: '0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506',
  // [ChainId.FANTOM_TESTNET]: '',
  [ChainId.POLYGON]: '0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506',
  [ChainId.POLYGON_TESTNET]: '0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506',
  [ChainId.GNOSIS]: '0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506',
  [ChainId.BSC]: '0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506',
  [ChainId.BSC_TESTNET]: '0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506',
  [ChainId.ARBITRUM]: '0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506',
  // [ChainId.ARBITRUM_TESTNET]: '',
  [ChainId.AVALANCHE]: '0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506',
  [ChainId.AVALANCHE_TESTNET]: '0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506',
  [ChainId.HECO]: '0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506',
  // [ChainId.HECO_TESTNET]: '0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506',
  [ChainId.HARMONY]: '0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506',
  // [ChainId.HARMONY_TESTNET]: '0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506',
  [ChainId.OKEX]: '0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506',
  // [ChainId.OKEX_TESTNET]: '0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506',
  [ChainId.CELO]: '0xB45e53277a7e0F1D35f2a77160e91e25507f1763',
  [ChainId.PALM]: '0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506',
  [ChainId.MOONRIVER]: '0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506',
  [ChainId.FUSE]: '0xF4d73326C13a4Fc5FD7A064217e12780e9Bd62c3',
  [ChainId.TELOS]: '0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506',
  [ChainId.MOONBEAM]: '0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506',
  [ChainId.ARBITRUM_NOVA]: '0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506',
  [ChainId.BOBA]: '0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506',
  [ChainId.BOBA_AVAX]: '0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506',
  [ChainId.BOBA_BNB]: '0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506',
  [ChainId.BASE]: '0x6BDED42c6DA8FBf0d2bA55B2fa120C5e0c8D7891',
  [ChainId.SCROLL]: '0x9B3336186a38E1b6c21955d112dbb0343Ee061eE',
  [ChainId.KAVA]: '0x1719DEf1BF8422a777f2442bcE704AC4Fb20c7f0',
  [ChainId.METIS]: '0xbF3B71decBCEFABB3210B9D8f18eC22e0556f5F0',
  [ChainId.BTTC]: '0x9B3336186a38E1b6c21955d112dbb0343Ee061eE',
  [ChainId.FILECOIN]: '0x46B3fDF7b5CDe91Ac049936bF0bDb12c5d22202e',
  [ChainId.HAQQ]: '0x9B3336186a38E1b6c21955d112dbb0343Ee061eE',
  [ChainId.ZETACHAIN]: '0x1f2FCf1d036b375b384012e61D3AA33F8C256bbE',
  [ChainId.CORE]: '0x9B3336186a38E1b6c21955d112dbb0343Ee061eE',
  [ChainId.THUNDERCORE]: '0x9B3336186a38E1b6c21955d112dbb0343Ee061eE',
  [ChainId.OPTIMISM]: '0x2ABf469074dc0b54d793850807E6eb5Faf2625b1',
  [ChainId.LINEA]: '0x2ABf469074dc0b54d793850807E6eb5Faf2625b1',
  [ChainId.POLYGON_ZKEVM]: '0x9B3336186a38E1b6c21955d112dbb0343Ee061eE',
  [ChainId.BLAST]: '0x54CF3d259a06601b5bC45F61A16443ed5404DD64',
}
