import { ChainId } from '@sushiswap/chain';
import { MultiRoute, RouteLeg, RToken } from '@sushiswap/tines';
import { BigNumber } from 'ethers';
import { PoolCode } from './pools/PoolCode';
export declare enum TokenType {
    NATIVE = "NATIVE",
    ERC20 = "ERC20",
    'BENTO' = "BENTO"
}
export interface PermitData {
    value: BigNumber;
    deadline: BigNumber;
    v: number;
    r: string;
    s: string;
}
export declare function getTokenType(token: RToken): TokenType;
export declare class TinesToRouteProcessor2 {
    routeProcessorAddress: string;
    chainId: ChainId;
    pools: Map<string, PoolCode>;
    tokenOutputLegs: Map<string, RouteLeg[]>;
    constructor(routeProcessorAddress: string, chainId: ChainId, pools: Map<string, PoolCode>);
    getRouteProcessorCode(route: MultiRoute, toAddress: string, permits?: PermitData[]): string;
    processPermits(permits: PermitData[]): string;
    processNativeCode(token: RToken, route: MultiRoute, toAddress: string): string;
    processERC20Code(fromMe: boolean, token: RToken, route: MultiRoute, toAddress: string): string;
    processOnePoolCode(token: RToken, route: MultiRoute, toAddress: string): string;
    processBentoCode(token: RToken, route: MultiRoute, toAddress: string): string;
    swapCode(leg: RouteLeg, route: MultiRoute, toAddress: string): string;
    getPoolOutputAddress(l: RouteLeg, route: MultiRoute, toAddress: string): string;
    isOnePoolOptimization(token: RToken, route: MultiRoute): boolean;
    getPoolCode(l: RouteLeg): PoolCode;
    calcTokenOutputLegs(route: MultiRoute): void;
}
export declare function getRouteProcessor2Code(route: MultiRoute, routeProcessorAddress: string, toAddress: string, pools: Map<string, PoolCode>, permits?: PermitData[]): string;
