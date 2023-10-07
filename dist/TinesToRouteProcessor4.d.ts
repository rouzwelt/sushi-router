import { MultiRoute } from '@sushiswap/tines';
import { PoolCode } from './pools/PoolCode';
import { PermitData } from './TinesToRouteProcessor2';
export declare function getRouteProcessor4Code(route: MultiRoute, routeProcessorAddress: string, toAddress: string, pools: Map<string, PoolCode>, permits?: PermitData[]): string;
