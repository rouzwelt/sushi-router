"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurvePoolCode = void 0;
const HEXer_1 = require("../HEXer");
const liquidity_providers_1 = require("../liquidity-providers");
const PoolCode_1 = require("./PoolCode");
class CurvePoolCode extends PoolCode_1.PoolCode {
    constructor(pool, liquidityProvider, providerName) {
        super(pool, liquidityProvider, `${providerName} ${(pool?.fee || 0) * 100}%`);
    }
    getStartPoint() {
        return PoolCode_1.PoolCode.RouteProcessorAddress;
    }
    getSwapCodeForRouteProcessor() {
        return 'CurvePool is not supported by RP1';
    }
    getSwapCodeForRouteProcessor2() {
        return 'CurvePool is not supported by RP2';
    }
    getSwapCodeForRouteProcessor4(leg, route, to) {
        // supports only 2-token pools currently
        let poolType = 0;
        if (leg.tokenFrom.chainId !== undefined) {
            const index = liquidity_providers_1.CURVE_NON_FACTORY_POOLS[leg.tokenFrom.chainId].findIndex(([addr]) => addr == this.pool.address);
            if (index >= 0 && liquidity_providers_1.CURVE_NON_FACTORY_POOLS[leg.tokenFrom.chainId][index][1] !== liquidity_providers_1.CurvePoolType.Legacy)
                poolType = 1;
        }
        const [fromIndex, toIndex] = leg.tokenFrom.tokenId == this.pool.token0.tokenId ? [0, 1] : [1, 0];
        const code = new HEXer_1.HEXer()
            .uint8(5) // Curve pool
            .address(this.pool.address)
            .uint8(poolType)
            .uint8(fromIndex)
            .uint8(toIndex)
            .address(to)
            .address(leg.tokenTo.address || '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE')
            .toString();
        return code;
    }
}
exports.CurvePoolCode = CurvePoolCode;
//# sourceMappingURL=CurvePool.js.map