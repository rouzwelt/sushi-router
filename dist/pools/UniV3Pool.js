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
exports.UniV3PoolCode = void 0;
var HEXer_1 = require("../HEXer");
var PoolCode_1 = require("./PoolCode");
var UniV3PoolCode = /** @class */ (function (_super) {
    __extends(UniV3PoolCode, _super);
    function UniV3PoolCode(pool, liquidityProvider, providerName) {
        return _super.call(this, pool, liquidityProvider, "".concat(providerName, " ").concat(((pool === null || pool === void 0 ? void 0 : pool.fee) || 0) * 100, "%")) || this;
    }
    UniV3PoolCode.prototype.getStartPoint = function () {
        return PoolCode_1.PoolCode.RouteProcessorAddress;
    };
    // eslint-disable-next-line unused-imports/no-unused-vars, no-unused-vars, @typescript-eslint/no-unused-vars
    UniV3PoolCode.prototype.getSwapCodeForRouteProcessor = function (leg, route, to) {
        return 'unsupported';
    };
    UniV3PoolCode.prototype.getSwapCodeForRouteProcessor2 = function (leg, _route, to) {
        var code = new HEXer_1.HEXer()
            .uint8(1) // uniV3 pool
            .address(this.pool.address)
            .bool(leg.tokenFrom.address == this.pool.token0.address)
            .address(to)
            .toString();
        return code;
    };
    return UniV3PoolCode;
}(PoolCode_1.PoolCode));
exports.UniV3PoolCode = UniV3PoolCode;
//# sourceMappingURL=UniV3Pool.js.map