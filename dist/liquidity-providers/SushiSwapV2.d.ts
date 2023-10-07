import { ChainId } from '@sushiswap/chain';
import { PublicClient } from 'viem';
import { LiquidityProviders } from './LiquidityProvider';
import { UniswapV2BaseProvider } from './UniswapV2Base';
export declare class SushiSwapV2Provider extends UniswapV2BaseProvider {
    constructor(chainId: ChainId, web3Client: PublicClient);
    getType(): LiquidityProviders;
    getPoolProviderName(): string;
}
