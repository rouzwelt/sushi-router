import type { MultiRoute, RouteLeg, UniV3Pool } from '@sushiswap/tines';
import { LiquidityProviders } from '../liquidity-providers';
import { PoolCode } from './PoolCode';
export declare class TridentCLPoolCode extends PoolCode {
    constructor(pool: UniV3Pool, liquidityProvider: LiquidityProviders, providerName: string);
    getStartPoint(): string;
    getSwapCodeForRouteProcessor(leg: RouteLeg, route: MultiRoute, to: string): string;
    getSwapCodeForRouteProcessor2(leg: RouteLeg, _route: MultiRoute, to: string): string;
}
