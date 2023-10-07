import type { BridgeBento, MultiRoute, RouteLeg } from '@sushiswap/tines';
import type { BigNumber } from 'ethers';
import { LiquidityProviders } from '../liquidity-providers';
import { PoolCode } from './PoolCode';
export declare class BentoBridgePoolCode extends PoolCode {
    bentoBoxAddress: string;
    constructor(pool: BridgeBento, liquidityProvider: LiquidityProviders, _providerName: string, bentoBoxAddress: `0x${string}`);
    getStartPoint(leg: RouteLeg): string;
    getSwapCodeForRouteProcessor(leg: RouteLeg, route: MultiRoute, to: string, exactAmount?: BigNumber): string;
    getSwapCodeForRouteProcessor2(leg: RouteLeg, _route: MultiRoute, to: string): string;
}
