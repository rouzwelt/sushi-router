import { ChainId } from '@sushiswap/chain'
// import { PrismaClient } from '@sushiswap/database'
import { PublicClient } from 'viem'

import { LiquidityProviders } from './LiquidityProvider'
import { UniswapV2BaseProvider } from './UniswapV2Base'

export class UniswapV2Provider extends UniswapV2BaseProvider {
  constructor(chainId: ChainId, web3Client: PublicClient, 
    // databaseClient?: PrismaClient
  ) {
    const factory = {
      [ChainId.ETHEREUM]: '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f',
      [ChainId.POLYGON]: '0x9e5A52f57b3038F1B8EeE45F28b3C1967e22799C',
      [ChainId.ARBITRUM]: '0x6EcCab422D763aC031210895C81787E87B43A652',
      [ChainId.BSC]: '0x8909Dc15e40173Ff4699343b6eB8132c65e18eC6',
      [ChainId.AVALANCHE]: '0x9e5A52f57b3038F1B8EeE45F28b3C1967e22799C',
      [ChainId.OPTIMISM]: '0x0c3c1c532F1e39EdF36BE9Fe0bE1410313E074Bf',
    } as const
    const initCodeHash = {
      [ChainId.ETHEREUM]: '0x96e8ac4277198ff8b6f785478aa9a39f403cb768dd02cbee326c3e7da348845f',
      [ChainId.POLYGON]: '0x96e8ac4277198ff8b6f785478aa9a39f403cb768dd02cbee326c3e7da348845f',
      [ChainId.ARBITRUM]: '0x203292ba0dd502af6ebb95c15c6066e85a0c955009d304f8524c41a5851c6e98',
      [ChainId.BSC]: '0x96e8ac4277198ff8b6f785478aa9a39f403cb768dd02cbee326c3e7da348845f',
      [ChainId.AVALANCHE]: '0x96e8ac4277198ff8b6f785478aa9a39f403cb768dd02cbee326c3e7da348845f',
      [ChainId.OPTIMISM]: '0x96e8ac4277198ff8b6f785478aa9a39f403cb768dd02cbee326c3e7da348845f',
    } as const
    super(chainId, web3Client, factory, initCodeHash, 
      // databaseClient
    )
  }
  getType(): LiquidityProviders {
    return LiquidityProviders.UniswapV2
  }
  getPoolProviderName(): string {
    return 'UniswapV2'
  }
}
