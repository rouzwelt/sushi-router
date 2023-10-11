import { ChainId } from 'sushi/chain';
import { PublicClient } from 'viem';
import { LiquidityProviders } from './LiquidityProvider';
import { UniswapV3BaseProvider } from './UniswapV3Base';
export declare class UniswapV3Provider extends UniswapV3BaseProvider {
    constructor(chainId: ChainId, web3Client: PublicClient);
    getType(): LiquidityProviders;
    getPoolProviderName(): string;
}
