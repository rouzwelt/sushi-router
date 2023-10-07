import { ChainId } from '@sushiswap/chain';
import { PrismaClient } from '@sushiswap/database';
import { PublicClient } from 'viem';
import { LiquidityProviders } from './LiquidityProvider';
import { UniswapV3BaseProvider } from './UniswapV3Base';
export declare class UniswapV3Provider extends UniswapV3BaseProvider {
    constructor(chainId: ChainId, web3Client: PublicClient, databaseClient?: PrismaClient);
    getType(): LiquidityProviders;
    getPoolProviderName(): string;
}
//# sourceMappingURL=UniswapV3.d.ts.map