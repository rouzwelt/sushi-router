import type { BridgeUnlimited, MultiRoute, RouteLeg } from '@sushiswap/tines';
import { LiquidityProviders } from '../liquidity-providers';
import { PoolCode } from './PoolCode';
export declare class NativeWrapBridgePoolCode extends PoolCode {
    constructor(pool: BridgeUnlimited, liquidityProvider: LiquidityProviders);
    getStartPoint(): string;
    getSwapCodeForRouteProcessor(leg: RouteLeg): string;
    getSwapCodeForRouteProcessor2(leg: RouteLeg, _route: MultiRoute, to: string): string;
}
