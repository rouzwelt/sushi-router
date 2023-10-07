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
exports.ConstantProductPoolCode = void 0;
var HEXer_1 = require("../HEXer");
var PoolCode_1 = require("./PoolCode");
var ConstantProductPoolCode = /** @class */ (function (_super) {
    __extends(ConstantProductPoolCode, _super);
    function ConstantProductPoolCode(pool, liquidityProvider, providerName) {
        return _super.call(this, pool, liquidityProvider, "".concat(providerName, " ").concat(((pool === null || pool === void 0 ? void 0 : pool.fee) || 0) * 100, "%")) || this;
    }
    ConstantProductPoolCode.prototype.getSwapCodeForRouteProcessor = function (leg, _route, to) {
        // swapUniswapPool = 0x20(address pool, address tokenIn, bool direction, address to)
        var code = new HEXer_1.HEXer()
            .uint8(10) // swapUniswapPool
            .address(this.pool.address)
            .address(leg.tokenFrom.address)
            .bool(leg.tokenFrom.address === this.pool.token0.address)
            .address(to)
            .toString();
        console.assert(code.length === 62 * 2, 'getSwapCodeForRouteProcessor unexpected code length');
        return code;
    };
    ConstantProductPoolCode.prototype.getSwapCodeForRouteProcessor2 = function (leg, _route, to) {
        var code = new HEXer_1.HEXer()
            .uint8(0) // uniV2 pool
            .address(this.pool.address)
            .bool(leg.tokenFrom.address === this.pool.token0.address)
            .address(to)
            //.bool(presended)
            .toString();
        return code;
    };
    ConstantProductPoolCode.prototype.getSwapCodeForRouteProcessor4 = function (leg, _route, to) {
        var code = new HEXer_1.HEXer()
            .uint8(0) // uniV2 pool
            .address(this.pool.address)
            .bool(leg.tokenFrom.address === this.pool.token0.address)
            .address(to)
            .uint24(Math.round(leg.poolFee * 1000000)) // new part - before fee was always 0.3%
            .toString();
        return code;
    };
    return ConstantProductPoolCode;
}(PoolCode_1.PoolCode));
exports.ConstantProductPoolCode = ConstantProductPoolCode;
//# sourceMappingURL=ConstantProductPool.js.map