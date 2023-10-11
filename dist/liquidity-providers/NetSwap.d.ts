import { ChainId } from 'sushi/chain';
import { PublicClient } from 'viem';
import { LiquidityProviders } from './LiquidityProvider';
import { UniswapV2BaseProvider } from './UniswapV2Base';
export declare class NetSwapProvider extends UniswapV2BaseProvider {
    constructor(chainId: ChainId, web3Client: PublicClient);
    getType(): LiquidityProviders;
    getPoolProviderName(): string;
}
