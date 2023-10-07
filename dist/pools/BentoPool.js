"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BentoPoolCode = void 0;
const tines_1 = require("@sushiswap/tines");
const ethers_1 = require("ethers");
const HEXer_1 = require("../HEXer");
const PoolCode_1 = require("./PoolCode");
function getPoolTypeTicker(pool) {
    if (pool instanceof tines_1.ConstantProductRPool)
        return 'Classic';
    if (pool instanceof tines_1.StableSwapRPool)
        return 'Stable';
    return '';
}
class BentoPoolCode extends PoolCode_1.PoolCode {
    constructor(pool, liquidityProvider, providerName) {
        super(pool, liquidityProvider, `${providerName} ${getPoolTypeTicker(pool)} ${(pool?.fee || 0) * 100}%`);
    }
    getSwapCodeForRouteProcessor(leg, _route, to) {
        const coder = new ethers_1.ethers.utils.AbiCoder();
        // TODO: add unwrap bento = true variant
        // address tokenIn, address recipient, bool unwrapBento
        const poolData = coder.encode(['address', 'address', 'bool'], [leg.tokenFrom.address, to, false]);
        const code = new HEXer_1.HEXer()
            .uint8(21) // swapTrident
            .address(leg.poolAddress)
            .bytes(poolData)
            .toString();
        return code;
    }
    getSwapCodeForRouteProcessor2(leg, _route, to) {
        // TODO: add unwrap bento = true optimization
        const coder = new ethers_1.ethers.utils.AbiCoder();
        // address tokenIn, address recipient, bool unwrapBento
        const poolData = coder.encode(['address', 'address', 'bool'], [leg.tokenFrom.address, to, false]);
        const code = new HEXer_1.HEXer()
            .uint8(4) // swapTrident
            .address(leg.poolAddress)
            .bytes(poolData)
            .toString();
        return code;
    }
}
exports.BentoPoolCode = BentoPoolCode;
//# sourceMappingURL=BentoPool.js.map