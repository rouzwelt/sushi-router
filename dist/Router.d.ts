import { ChainId } from 'sushi/chain';
import { Type } from 'sushi/currency';
import { MultiRoute, RPool } from '@sushiswap/tines';
import { Address, Hex } from 'viem';
import { LiquidityProviders } from './liquidity-providers/LiquidityProvider';
import { PoolCode } from './pools/PoolCode';
import { PermitData, RouterLiquiditySource } from './TinesToRouteProcessor2';
export interface RPParams {
    tokenIn: Address;
    amountIn: bigint;
    tokenOut: Address;
    amountOutMin: bigint;
    to: Address;
    routeCode: Hex;
    value?: bigint;
}
export type PoolFilter = (list: RPool) => boolean;
export declare class Router {
    static findRouteType(poolCodesMap: Map<string, PoolCode>, addresses: string[]): "Internal" | "Mix" | "External" | "Unknown";
    static findSushiRoute(poolCodesMap: Map<string, PoolCode>, chainId: ChainId, fromToken: Type, amountIn: bigint, toToken: Type, gasPrice: number): MultiRoute;
    static findSpecialRoute(poolCodesMap: Map<string, PoolCode>, chainId: ChainId, fromToken: Type, amountIn: bigint, toToken: Type, gasPrice: number, maxPriceImpact?: number): MultiRoute;
    static findBestRoute(poolCodesMap: Map<string, PoolCode>, chainId: ChainId, fromToken: Type, amountIn: bigint, toToken: Type, gasPrice: number, providers?: LiquidityProviders[], // all providers if undefined
    poolFilter?: PoolFilter): MultiRoute;
    static routeProcessorParams(poolCodesMap: Map<string, PoolCode>, route: MultiRoute, fromToken: Type, toToken: Type, to: Address, RPAddr: Address, maxPriceImpact?: number): RPParams;
    static routeProcessor2Params(poolCodesMap: Map<string, PoolCode>, route: MultiRoute, fromToken: Type, toToken: Type, to: Address, RPAddr: Address, permits?: PermitData[], maxPriceImpact?: number, source?: RouterLiquiditySource): RPParams;
    static routeProcessor3Params: typeof Router.routeProcessor2Params;
    static routeProcessor3_1Params: typeof Router.routeProcessor2Params;
    static routeProcessor3_2Params: typeof Router.routeProcessor2Params;
    static routeProcessor4Params(poolCodesMap: Map<string, PoolCode>, route: MultiRoute, fromToken: Type, toToken: Type, to: Address, RPAddr: Address, permits?: PermitData[], maxPriceImpact?: number): RPParams;
    static routeToHumanString(poolCodesMap: Map<string, PoolCode>, route: MultiRoute, fromToken: Type, toToken: Type, shiftPrimary?: string, shiftSub?: string): string;
}
export declare function tokenQuantityString(token: Type, amount: bigint): string;
