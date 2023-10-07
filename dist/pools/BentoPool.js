"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.BentoPoolCode = void 0;
var tines_1 = require("@sushiswap/tines");
var ethers_1 = require("ethers");
var HEXer_1 = require("../HEXer");
var PoolCode_1 = require("./PoolCode");
function getPoolTypeTicker(pool) {
    if (pool instanceof tines_1.ConstantProductRPool)
        return 'Classic';
    if (pool instanceof tines_1.StableSwapRPool)
        return 'Stable';
    return '';
}
var BentoPoolCode = /** @class */ (function (_super) {
    __extends(BentoPoolCode, _super);
    function BentoPoolCode(pool, liquidityProvider, providerName) {
        return _super.call(this, pool, liquidityProvider, "".concat(providerName, " ").concat(getPoolTypeTicker(pool), " ").concat(((pool === null || pool === void 0 ? void 0 : pool.fee) || 0) * 100, "%")) || this;
    }
    BentoPoolCode.prototype.getSwapCodeForRouteProcessor = function (leg, _route, to) {
        var coder = new ethers_1.ethers.utils.AbiCoder();
        // TODO: add unwrap bento = true variant
        // address tokenIn, address recipient, bool unwrapBento
        var poolData = coder.encode(['address', 'address', 'bool'], [leg.tokenFrom.address, to, false]);
        var code = new HEXer_1.HEXer()
            .uint8(21) // swapTrident
            .address(leg.poolAddress)
            .bytes(poolData)
            .toString();
        return code;
    };
    BentoPoolCode.prototype.getSwapCodeForRouteProcessor2 = function (leg, _route, to) {
        // TODO: add unwrap bento = true optimization
        var coder = new ethers_1.ethers.utils.AbiCoder();
        // address tokenIn, address recipient, bool unwrapBento
        var poolData = coder.encode(['address', 'address', 'bool'], [leg.tokenFrom.address, to, false]);
        var code = new HEXer_1.HEXer()
            .uint8(4) // swapTrident
            .address(leg.poolAddress)
            .bytes(poolData)
            .toString();
        return code;
    };
    return BentoPoolCode;
}(PoolCode_1.PoolCode));
exports.BentoPoolCode = BentoPoolCode;
//# sourceMappingURL=BentoPool.js.map