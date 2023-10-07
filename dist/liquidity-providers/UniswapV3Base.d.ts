import { ChainId } from '@sushiswap/chain';
import { Token } from '@sushiswap/currency';
import { PrismaClient } from '@sushiswap/database';
import { FeeAmount } from '@sushiswap/v3-sdk';
import { Address, PublicClient } from 'viem';
import type { PoolCode } from '../pools/PoolCode';
import { LiquidityProvider } from './LiquidityProvider';
interface StaticPool {
    address: Address;
    token0: Token;
    token1: Token;
    fee: FeeAmount;
}
export declare const NUMBER_OF_SURROUNDING_TICKS = 1000;
type PoolFilter = {
    has: (arg: string) => boolean;
};
export declare abstract class UniswapV3BaseProvider extends LiquidityProvider {
    poolsByTrade: Map<string, string[]>;
    pools: Map<string, PoolCode>;
    blockListener?: () => void;
    unwatchBlockNumber?: () => void;
    isInitialized: boolean;
    factory: Record<number, Address>;
    initCodeHash: Record<number, string>;
    tickLens: Record<number, string>;
    databaseClient: PrismaClient | undefined;
    constructor(chainId: ChainId, web3Client: PublicClient, factory: Record<number, Address>, initCodeHash: Record<number, string>, tickLens: Record<number, string>, databaseClient?: PrismaClient);
    fetchPoolsForToken(t0: Token, t1: Token, excludePools?: Set<string> | PoolFilter, options?: {
        blockNumber?: bigint;
    }): Promise<void>;
    getStaticPools(t1: Token, t2: Token): StaticPool[];
    startFetchPoolsData(): void;
    getCurrentPoolList(): PoolCode[];
    stopFetchPoolsData(): void;
}
export {};
//# sourceMappingURL=UniswapV3Base.d.ts.map