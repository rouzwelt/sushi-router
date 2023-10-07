import { ChainId } from '@sushiswap/chain';
import { MultiRoute, RouteLeg, RToken } from '@sushiswap/tines';
import { BigNumber } from 'ethers';
import { PoolCode } from './pools/PoolCode';
export declare class TinesToRouteProcessor {
    routeProcessorAddress: string;
    chainId: ChainId;
    pools: Map<string, PoolCode>;
    tokenOutputLegs: Map<string, RouteLeg[]>;
    constructor(routeProcessorAddress: string, chainId: ChainId, pools: Map<string, PoolCode>);
    getRouteProcessorCode(route: MultiRoute, toAddress: string): string;
    getRPCodeForsimpleWrapRoute(route: MultiRoute, toAddress: string): string;
    getPoolOutputAddress(l: RouteLeg, route: MultiRoute, toAddress: string): string;
    getPoolCode(l: RouteLeg): PoolCode;
    codeSwap(leg: RouteLeg, route: MultiRoute, to: string, exactAmount?: BigNumber): string;
    codeDistributeInitial(route: MultiRoute): [string, Map<string, BigNumber>];
    codeDistributeTokenShares(token: RToken, route: MultiRoute): string;
    calcTokenOutputLegs(route: MultiRoute): void;
}
export declare function getRouteProcessorCode(route: MultiRoute, routeProcessorAddress: string, toAddress: string, pools: Map<string, PoolCode>): string;
