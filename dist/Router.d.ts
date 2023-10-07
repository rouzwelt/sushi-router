import { ChainId } from '@sushiswap/chain';
import { Type } from '@sushiswap/currency';
import { MultiRoute, RPool } from '@sushiswap/tines';
import { BigNumber } from 'ethers';
import { LiquidityProviders } from './liquidity-providers/LiquidityProvider';
import { PoolCode } from './pools/PoolCode';
import { PermitData } from './TinesToRouteProcessor2';
export interface RPParams {
    tokenIn: string;
    amountIn: BigNumber;
    tokenOut: string;
    amountOutMin: BigNumber;
    to: string;
    routeCode: string;
    value?: BigNumber;
}
export type PoolFilter = (list: RPool) => boolean;
export declare class Router {
    static findSushiRoute(poolCodesMap: Map<string, PoolCode>, chainId: ChainId, fromToken: Type, amountIn: BigNumber, toToken: Type, gasPrice: number): MultiRoute;
    static findSpecialRoute(poolCodesMap: Map<string, PoolCode>, chainId: ChainId, fromToken: Type, amountIn: BigNumber, toToken: Type, gasPrice: number, maxPriceImpact?: number): MultiRoute;
    static findBestRoute(poolCodesMap: Map<string, PoolCode>, chainId: ChainId, fromToken: Type, amountIn: BigNumber, toToken: Type, gasPrice: number, providers?: LiquidityProviders[], // all providers if undefined
    poolFilter?: PoolFilter): MultiRoute;
    static routeProcessorParams(poolCodesMap: Map<string, PoolCode>, route: MultiRoute, fromToken: Type, toToken: Type, to: string, RPAddr: string, maxPriceImpact?: number): RPParams;
    static routeProcessor2Params(poolCodesMap: Map<string, PoolCode>, route: MultiRoute, fromToken: Type, toToken: Type, to: string, RPAddr: string, permits?: PermitData[], maxPriceImpact?: number): RPParams;
    static routeProcessor4Params(poolCodesMap: Map<string, PoolCode>, route: MultiRoute, fromToken: Type, toToken: Type, to: string, RPAddr: string, permits?: PermitData[], maxPriceImpact?: number): RPParams;
    static routeToHumanString(poolCodesMap: Map<string, PoolCode>, route: MultiRoute, fromToken: Type, toToken: Type, shiftPrimary?: string, shiftSub?: string): string;
}
export declare function tokenQuantityString(token: Type, amount: BigNumber): string;
