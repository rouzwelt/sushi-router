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
exports.CurvePoolCode = void 0;
var HEXer_1 = require("../HEXer");
var liquidity_providers_1 = require("../liquidity-providers");
var PoolCode_1 = require("./PoolCode");
var CurvePoolCode = /** @class */ (function (_super) {
    __extends(CurvePoolCode, _super);
    function CurvePoolCode(pool, liquidityProvider, providerName) {
        return _super.call(this, pool, liquidityProvider, "".concat(providerName, " ").concat(((pool === null || pool === void 0 ? void 0 : pool.fee) || 0) * 100, "%")) || this;
    }
    CurvePoolCode.prototype.getStartPoint = function () {
        return PoolCode_1.PoolCode.RouteProcessorAddress;
    };
    CurvePoolCode.prototype.getSwapCodeForRouteProcessor = function () {
        return 'CurvePool is not supported by RP1';
    };
    CurvePoolCode.prototype.getSwapCodeForRouteProcessor2 = function () {
        return 'CurvePool is not supported by RP2';
    };
    CurvePoolCode.prototype.getSwapCodeForRouteProcessor4 = function (leg, route, to) {
        // supports only 2-token pools currently
        var _this = this;
        var poolType = 0;
        if (leg.tokenFrom.chainId !== undefined) {
            var index = liquidity_providers_1.CURVE_NON_FACTORY_POOLS[leg.tokenFrom.chainId].findIndex(function (_a) {
                var addr = _a[0];
                return addr == _this.pool.address;
            });
            if (index >= 0 && liquidity_providers_1.CURVE_NON_FACTORY_POOLS[leg.tokenFrom.chainId][index][1] !== liquidity_providers_1.CurvePoolType.Legacy)
                poolType = 1;
        }
        var _a = leg.tokenFrom.tokenId == this.pool.token0.tokenId ? [0, 1] : [1, 0], fromIndex = _a[0], toIndex = _a[1];
        var code = new HEXer_1.HEXer()
            .uint8(5) // Curve pool
            .address(this.pool.address)
            .uint8(poolType)
            .uint8(fromIndex)
            .uint8(toIndex)
            .address(to)
            .address(leg.tokenTo.address || '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE')
            .toString();
        return code;
    };
    return CurvePoolCode;
}(PoolCode_1.PoolCode));
exports.CurvePoolCode = CurvePoolCode;
//# sourceMappingURL=CurvePool.js.map