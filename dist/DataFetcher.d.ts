import { ChainId } from '@sushiswap/chain';
import { Type } from '@sushiswap/currency';
import { PublicClient } from 'viem';
import { LiquidityProvider, LiquidityProviders } from './liquidity-providers/LiquidityProvider';
import type { PoolCode } from './pools/PoolCode';
export declare class DataFetcher {
    chainId: ChainId;
    providers: LiquidityProvider[];
    poolCodes: Map<LiquidityProviders, Map<string, PoolCode>>;
    stateId: number;
    web3Client: PublicClient;
    databaseClient: any;
    private static cache;
    static onChain(chainId: ChainId): DataFetcher;
    constructor(chainId: ChainId, web3Client?: PublicClient);
    _providerIsIncluded(lp: LiquidityProviders, liquidity?: LiquidityProviders[]): boolean;
    startDataFetching(providers?: LiquidityProviders[]): void;
    stopDataFetching(): void;
    fetchPoolsForToken(currency0: Type, currency1: Type, excludePools?: Set<string>, options?: {
        blockNumber?: bigint;
        memoize?: boolean;
    }): Promise<void>;
    getCurrentPoolCodeMap(currency0: Type, currency1: Type): Map<string, PoolCode>;
    getCurrentPoolCodeList(currency0: Type, currency1: Type): PoolCode[];
    getLastUpdateBlock(providers?: LiquidityProviders[]): number;
}
