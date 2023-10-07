import { Token, Type } from '@sushiswap/currency';
import { PublicClient } from 'viem';
import { PoolCode } from '../pools/PoolCode';
import { LiquidityProvider, LiquidityProviders } from './LiquidityProvider';
export declare const sETH: Token;
export declare enum CurvePoolType {
    Legacy = "Legacy",
    LegacyV2 = "LegacyV2",
    LegacyV3 = "LegacyV3",
    Factory = "Factory"
}
export declare const CURVE_NON_FACTORY_POOLS: Record<number, [string, CurvePoolType, Type, Type][]>;
export declare const CURVE_FACTORY_ADDRESSES: {
    1: any[];
};
export declare function getAllSupportedCurvePools(publicClient: PublicClient): Promise<Map<string, CurvePoolType>>;
export declare class CurveProvider extends LiquidityProvider {
    foundPools: PoolCode[];
    getType(): LiquidityProviders;
    /**
     * The name of liquidity provider to be used for pool naming. For example, 'SushiSwap'
     */
    getPoolProviderName(): string;
    /**
     * Initiates event listeners for top pools
     */
    startFetchPoolsData(): void;
    getPoolsForTokens(t0: Token, t1: Token, excludePools?: Set<string>): Promise<Map<string, [CurvePoolType, Type, Type]>>;
    getPoolRatio(pools: [string, [CurvePoolType, Type, Type]][]): Promise<(number | undefined)[]>;
    getCurvePoolCodes(pools: Map<string, [CurvePoolType, Type, Type]>): Promise<PoolCode[]>;
    /**
     * Fetches relevant pools for the given tokens
     * @param t0 Token
     * @param t1 Token
     */
    fetchPoolsForToken(t0: Token, t1: Token, excludePools?: Set<string>): Promise<void>;
    /**
     * Returns a list of PoolCode
     * @returns PoolCode[]
     */
    getCurrentPoolList(): PoolCode[];
    stopFetchPoolsData(): void;
}
