import { ChainId } from 'sushi/chain';
import { MultiRoute, RouteLeg, RToken } from '@sushiswap/tines';
import { Hex } from 'viem';
import { PoolCode } from './pools/PoolCode';
export declare class TinesToRouteProcessor {
    routeProcessorAddress: string;
    chainId: ChainId;
    pools: Map<string, PoolCode>;
    tokenOutputLegs: Map<string, RouteLeg[]>;
    constructor(routeProcessorAddress: string, chainId: ChainId, pools: Map<string, PoolCode>);
    getRouteProcessorCode(route: MultiRoute, toAddress: string): Hex | '';
    getRPCodeForsimpleWrapRoute(route: MultiRoute, toAddress: string): Hex;
    getPoolOutputAddress(l: RouteLeg, route: MultiRoute, toAddress: string): string;
    getPoolCode(l: RouteLeg): PoolCode;
    codeSwap(leg: RouteLeg, route: MultiRoute, to: string, exactAmount?: bigint): string;
    codeDistributeInitial(route: MultiRoute): [string, Map<string, bigint>];
    codeDistributeTokenShares(token: RToken, route: MultiRoute): string;
    calcTokenOutputLegs(route: MultiRoute): void;
}
export declare function getRouteProcessorCode(route: MultiRoute, routeProcessorAddress: string, toAddress: string, pools: Map<string, PoolCode>): string;
