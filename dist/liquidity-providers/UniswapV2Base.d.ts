import { ChainId } from '@sushiswap/chain';
import { Token } from '@sushiswap/currency';
import { PrismaClient } from '@sushiswap/database';
import { Address, Hex, PublicClient } from 'viem';
import { PoolResponse2 } from '../lib/api';
import type { PoolCode } from '../pools/PoolCode';
import { LiquidityProvider } from './LiquidityProvider';
interface PoolInfo {
    poolCode: PoolCode;
    validUntilTimestamp: number;
}
interface StaticPool {
    address: Address;
    token0: Token;
    token1: Token;
    fee: number;
}
export declare abstract class UniswapV2BaseProvider extends LiquidityProvider {
    readonly TOP_POOL_SIZE = 155;
    readonly TOP_POOL_LIQUIDITY_THRESHOLD = 5000;
    readonly ON_DEMAND_POOL_SIZE = 20;
    readonly REFRESH_INITIAL_POOLS_INTERVAL = 60;
    topPools: Map<Address, PoolCode>;
    poolsByTrade: Map<string, Address[]>;
    onDemandPools: Map<Address, PoolInfo>;
    availablePools: Map<Address, PoolResponse2>;
    staticPools: Map<Address, PoolResponse2>;
    blockListener?: () => void;
    unwatchBlockNumber?: () => void;
    fee: number;
    isInitialized: boolean;
    factory: Record<number, Address>;
    initCodeHash: Record<number, Hex>;
    latestPoolCreatedAtTimestamp: Date;
    discoverNewPoolsTimestamp: number;
    refreshAvailablePoolsTimestamp: number;
    databaseClient: PrismaClient | undefined;
    constructor(chainId: ChainId, web3Client: PublicClient, factory: Record<number, Address>, initCodeHash: Record<number, Hex>, databaseClient?: PrismaClient);
    initialize(): Promise<any[]>;
    private getInitialPools;
    getOnDemandPools(t0: Token, t1: Token, excludePools?: Set<string>, options?: {
        blockNumber?: bigint;
    }): Promise<void>;
    updatePools(): Promise<void>;
    private discoverNewPools;
    private updateAvailablePools;
    private prioritizeTopPools;
    private updatePoolWithReserves;
    _getPoolAddress(t1: Token, t2: Token): Address;
    _getProspectiveTokens(t0: Token, t1: Token): Token[];
    getStaticPools(t1: Token, t2: Token): StaticPool[];
    startFetchPoolsData(): void;
    private removeStalePools;
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
//# sourceMappingURL=UniswapV2Base.d.ts.map