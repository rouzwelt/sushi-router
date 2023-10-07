"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConstantProductPoolCode = void 0;
const HEXer_1 = require("../HEXer");
const PoolCode_1 = require("./PoolCode");
class ConstantProductPoolCode extends PoolCode_1.PoolCode {
    constructor(pool, liquidityProvider, providerName) {
        super(pool, liquidityProvider, `${providerName} ${(pool?.fee || 0) * 100}%`);
    }
    getSwapCodeForRouteProcessor(leg, _route, to) {
        // swapUniswapPool = 0x20(address pool, address tokenIn, bool direction, address to)
        const code = new HEXer_1.HEXer()
            .uint8(10) // swapUniswapPool
            .address(this.pool.address)
            .address(leg.tokenFrom.address)
            .bool(leg.tokenFrom.address === this.pool.token0.address)
            .address(to)
            .toString();
        console.assert(code.length === 62 * 2, 'getSwapCodeForRouteProcessor unexpected code length');
        return code;
    }
    getSwapCodeForRouteProcessor2(leg, _route, to) {
        const code = new HEXer_1.HEXer()
            .uint8(0) // uniV2 pool
            .address(this.pool.address)
            .bool(leg.tokenFrom.address === this.pool.token0.address)
            .address(to)
            //.bool(presended)
            .toString();
        return code;
    }
    getSwapCodeForRouteProcessor4(leg, _route, to) {
        const code = new HEXer_1.HEXer()
            .uint8(0) // uniV2 pool
            .address(this.pool.address)
            .bool(leg.tokenFrom.address === this.pool.token0.address)
            .address(to)
            .uint24(Math.round(leg.poolFee * 1000000)) // new part - before fee was always 0.3%
            .toString();
        return code;
    }
}
exports.ConstantProductPoolCode = ConstantProductPoolCode;
//# sourceMappingURL=ConstantProductPool.js.map