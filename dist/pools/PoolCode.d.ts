import type { MultiRoute, RouteLeg, RPool } from '@sushiswap/tines';
import { LiquidityProviders } from '../liquidity-providers';
export declare abstract class PoolCode {
    pool: RPool;
    liquidityProvider: LiquidityProviders;
    poolName: string;
    constructor(pool: RPool, liquidityProvider: LiquidityProviders, poolName: string);
    static RouteProcessorAddress: string;
    getStartPoint(_leg: RouteLeg, _route: MultiRoute): string;
    abstract getSwapCodeForRouteProcessor(leg: RouteLeg, route: MultiRoute, to: string, exactAmount?: bigint): string;
    getSwapCodeForRouteProcessor2(_leg: RouteLeg, _route: MultiRoute, _to: string): string;
    getSwapCodeForRouteProcessor4(leg: RouteLeg, route: MultiRoute, to: string): string;
}
