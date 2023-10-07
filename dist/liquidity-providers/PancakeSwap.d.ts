import { ChainId } from '@sushiswap/chain';
import { PrismaClient } from '@sushiswap/database';
import { PublicClient } from 'viem';
import { LiquidityProviders } from './LiquidityProvider';
import { UniswapV2BaseProvider } from './UniswapV2Base';
export declare class PancakeSwapProvider extends UniswapV2BaseProvider {
    fee: number;
    constructor(chainId: ChainId, web3Client: PublicClient, databaseClient?: PrismaClient);
    getType(): LiquidityProviders;
    getPoolProviderName(): string;
}
//# sourceMappingURL=PancakeSwap.d.ts.map