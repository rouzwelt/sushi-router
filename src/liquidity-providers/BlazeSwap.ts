import { ChainId } from '@sushiswap/chain'
import { PublicClient } from 'viem'

import { LiquidityProviders } from './LiquidityProvider'
import { UniswapV2BaseProvider } from './UniswapV2Base'

export class BlazeSwapProvider extends UniswapV2BaseProvider {
  constructor(chainId: ChainId, web3Client: PublicClient, 
  ) {
    const factory = {
      14: '0x440602f459D7Dd500a74528003e6A20A46d6e2A6',
    } as const
    const initCodeHash = {
      14: '0xbf4c1c435583a2bb8d763765a34a46e376071c3b3d80e5bbac0950aeecdf31cb',
    } as const
    super(chainId, web3Client, factory, initCodeHash, 
    )
  }
  getType(): LiquidityProviders {
    return LiquidityProviders.BlazeSwap
  }
  getPoolProviderName(): string {
    return 'BlazeSwap'
  }
}
