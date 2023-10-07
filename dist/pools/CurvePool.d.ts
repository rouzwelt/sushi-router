import type { CurvePool, MultiRoute, RouteLeg } from '@sushiswap/tines';
import { LiquidityProviders } from '../liquidity-providers';
import { PoolCode } from './PoolCode';
export declare class CurvePoolCode extends PoolCode {
    constructor(pool: CurvePool, liquidityProvider: LiquidityProviders, providerName: string);
    getStartPoint(): string;
    getSwapCodeForRouteProcessor(): string;
    getSwapCodeForRouteProcessor2(): string;
    getSwapCodeForRouteProcessor4(leg: RouteLeg, route: MultiRoute, to: string): string;
}
//# sourceMappingURL=CurvePool.d.ts.map