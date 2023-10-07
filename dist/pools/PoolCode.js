"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PoolCode = void 0;
// RPool extention for RP coding
class PoolCode {
    constructor(pool, liquidityProvider, poolName) {
        this.pool = pool;
        this.liquidityProvider = liquidityProvider;
        this.poolName = poolName;
    }
    // the address where should be swap amount of liquidity before the swap
    // returns RouteProcessorAddress if it is a RouteProcessor
    getStartPoint(_leg, _route) {
        return this.pool.address;
    }
    getSwapCodeForRouteProcessor2(_leg, _route, _to) {
        return 'unimplemented';
    }
    getSwapCodeForRouteProcessor4(leg, route, to) {
        return this.getSwapCodeForRouteProcessor2(leg, route, to);
    }
}
exports.PoolCode = PoolCode;
PoolCode.RouteProcessorAddress = 'RouteProcessor';
//# sourceMappingURL=PoolCode.js.map