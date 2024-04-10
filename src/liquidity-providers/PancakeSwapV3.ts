import { PublicClient } from 'viem'
import { ChainId } from './../chain'
import { LiquidityProviders } from './LiquidityProvider'
import { UniswapV3BaseProvider } from './UniswapV3Base'

export class PancakeSwapV3 extends UniswapV3BaseProvider {
  constructor(chainId: ChainId, web3Client: PublicClient) {
    const factory = {
      [ChainId.ARBITRUM]: '0x0BFbCF9fa4f9C56B0F40a671Ad40E0805A091865',
      [ChainId.BASE]: '0x0BFbCF9fa4f9C56B0F40a671Ad40E0805A091865',
      [ChainId.BSC]: '0x0BFbCF9fa4f9C56B0F40a671Ad40E0805A091865',
      [ChainId.ETHEREUM]: '0x0BFbCF9fa4f9C56B0F40a671Ad40E0805A091865',
      [ChainId.LINEA]: '0x0BFbCF9fa4f9C56B0F40a671Ad40E0805A091865',
      [ChainId.POLYGON_ZKEVM]: '0x0BFbCF9fa4f9C56B0F40a671Ad40E0805A091865',
    } as const
    const initCodeHash = {
      [ChainId.ARBITRUM]: '0x6ce8eb472fa82df5469c6ab6d485f17c3ad13c8cd7af59b3d4a8026c5ce0f7e2',
      [ChainId.BASE]: '0x6ce8eb472fa82df5469c6ab6d485f17c3ad13c8cd7af59b3d4a8026c5ce0f7e2',
      [ChainId.BSC]: '0x6ce8eb472fa82df5469c6ab6d485f17c3ad13c8cd7af59b3d4a8026c5ce0f7e2',
      [ChainId.ETHEREUM]: '0x6ce8eb472fa82df5469c6ab6d485f17c3ad13c8cd7af59b3d4a8026c5ce0f7e2',
      [ChainId.LINEA]: '0x6ce8eb472fa82df5469c6ab6d485f17c3ad13c8cd7af59b3d4a8026c5ce0f7e2',
      [ChainId.POLYGON_ZKEVM]: '0x6ce8eb472fa82df5469c6ab6d485f17c3ad13c8cd7af59b3d4a8026c5ce0f7e2',
    } as const

    const tickLens = {
      [ChainId.ARBITRUM]: '0x9a489505a00cE272eAa5e07Dba6491314CaE3796',
      [ChainId.BASE]: '0x9a489505a00cE272eAa5e07Dba6491314CaE3796',
      [ChainId.BSC]: '0x9a489505a00cE272eAa5e07Dba6491314CaE3796',
      [ChainId.ETHEREUM]: '0x9a489505a00cE272eAa5e07Dba6491314CaE3796',
      [ChainId.LINEA]: '0x9a489505a00cE272eAa5e07Dba6491314CaE3796',
      [ChainId.POLYGON_ZKEVM]: '0x9a489505a00cE272eAa5e07Dba6491314CaE3796',
    } as const
    super(chainId, web3Client, factory, initCodeHash, tickLens)
  }
  getType(): LiquidityProviders {
    return LiquidityProviders.SushiSwapV3
  }
  getPoolProviderName(): string {
    return 'SushiSwapV3'
  }
}
