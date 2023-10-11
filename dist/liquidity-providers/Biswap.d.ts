import { ChainId } from 'sushi/chain';
import { PublicClient } from 'viem';
import { LiquidityProviders } from './LiquidityProvider';
import { UniswapV2BaseProvider } from './UniswapV2Base';
export declare class BiswapProvider extends UniswapV2BaseProvider {
    fee: number;
    constructor(chainId: ChainId, web3Client: PublicClient);
    getType(): LiquidityProviders;
    getPoolProviderName(): string;
}
