import { MultiRoute, RouteLeg, RPool } from '@sushiswap/tines';
import { LiquidityProviders } from '../liquidity-providers';
import { PoolCode } from './PoolCode';
export declare class BentoPoolCode extends PoolCode {
    constructor(pool: RPool, liquidityProvider: LiquidityProviders, providerName: string);
    getSwapCodeForRouteProcessor(leg: RouteLeg, _route: MultiRoute, to: string): string;
    getSwapCodeForRouteProcessor2(leg: RouteLeg, _route: MultiRoute, to: string): string;
}
//# sourceMappingURL=BentoPool.d.ts.map