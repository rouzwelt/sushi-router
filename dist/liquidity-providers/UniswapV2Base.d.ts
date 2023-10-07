import { ChainId } from '@sushiswap/chain';
import { Token } from '@sushiswap/currency';
import { Address, PublicClient } from 'viem';
import { PoolResponse2 } from '../lib/api';
import type { PoolCode } from '../pools/PoolCode';
import { LiquidityProvider } from './LiquidityProvider';
interface PoolInfo {
    poolCode: PoolCode;
    validUntilTimestamp: number;
}
interface StaticPool {
    address: string;
    token0: Token;
    token1: Token;
    fee: number;
}
export declare abstract class UniswapV2BaseProvider extends LiquidityProvider {
    readonly TOP_POOL_SIZE = 155;
    readonly TOP_POOL_LIQUIDITY_THRESHOLD = 5000;
    readonly ON_DEMAND_POOL_SIZE = 20;
    readonly REFRESH_INITIAL_POOLS_INTERVAL = 60;
    topPools: Map<string, PoolCode>;
    poolsByTrade: Map<string, string[]>;
    onDemandPools: Map<string, PoolInfo>;
    availablePools: Map<string, PoolResponse2>;
    staticPools: Map<string, PoolResponse2>;
    blockListener?: () => void;
    unwatchBlockNumber?: () => void;
    fee: number;
    isInitialized: boolean;
    factory: {
        [chainId: number]: Address;
    };
    initCodeHash: {
        [chainId: number]: string;
    };
    latestPoolCreatedAtTimestamp: Date;
    discoverNewPoolsTimestamp: number;
    refreshAvailablePoolsTimestamp: number;
    constructor(chainId: ChainId, web3Client: PublicClient, factory: {
        [chainId: number]: Address;
    }, initCodeHash: {
        [chainId: number]: string;
    });
    getOnDemandPools(t0: Token, t1: Token, excludePools?: Set<string>, options?: {
        blockNumber?: bigint;
    }): Promise<void>;
    _getPoolAddress(t1: Token, t2: Token): string;
    _getProspectiveTokens(t0: Token, t1: Token): Token[];
    getStaticPools(t1: Token, t2: Token): StaticPool[];
    startFetchPoolsData(): void;
    fetchPoolsForToken(t0: Token, t1: Token, excludePools?: Set<string>): Promise<void>;
    /**
     * The pools returned are the initial pools, plus any on demand pools that have been fetched for the two tokens.
     * @param t0
     * @param t1
     * @returns
     */
    getCurrentPoolList(t0: Token, t1: Token): PoolCode[];
    stopFetchPoolsData(): void;
}
export {};
