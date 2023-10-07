import type { ConstantProductRPool, MultiRoute, RouteLeg } from '@sushiswap/tines';
import { LiquidityProviders } from '../liquidity-providers';
import { PoolCode } from './PoolCode';
export declare class ConstantProductPoolCode extends PoolCode {
    constructor(pool: ConstantProductRPool, liquidityProvider: LiquidityProviders, providerName: string);
    getSwapCodeForRouteProcessor(leg: RouteLeg, _route: MultiRoute, to: string): string;
    getSwapCodeForRouteProcessor2(leg: RouteLeg, _route: MultiRoute, to: string): string;
    getSwapCodeForRouteProcessor4(leg: RouteLeg, _route: MultiRoute, to: string): string;
}
