"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PoolCode = void 0;
// RPool extention for RP coding
var PoolCode = exports.PoolCode = /** @class */ (function () {
    function PoolCode(pool, liquidityProvider, poolName) {
        this.pool = pool;
        this.liquidityProvider = liquidityProvider;
        this.poolName = poolName;
    }
    // the address where should be swap amount of liquidity before the swap
    // returns RouteProcessorAddress if it is a RouteProcessor
    PoolCode.prototype.getStartPoint = function (_leg, _route) {
        return this.pool.address;
    };
    PoolCode.prototype.getSwapCodeForRouteProcessor2 = function (_leg, _route, _to) {
        return 'unimplemented';
    };
    PoolCode.prototype.getSwapCodeForRouteProcessor4 = function (leg, route, to) {
        return this.getSwapCodeForRouteProcessor2(leg, route, to);
    };
    PoolCode.RouteProcessorAddress = 'RouteProcessor';
    return PoolCode;
}());
//# sourceMappingURL=PoolCode.js.map