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
exports.TridentCLPoolCode = void 0;
var HEXer_1 = require("../HEXer");
var PoolCode_1 = require("./PoolCode");
var TridentCLPoolCode = /** @class */ (function (_super) {
    __extends(TridentCLPoolCode, _super);
    function TridentCLPoolCode(pool, liquidityProvider, providerName) {
        return _super.call(this, pool, liquidityProvider, "".concat(providerName, " ").concat(pool.fee * 100, "%")) || this;
    }
    TridentCLPoolCode.prototype.getStartPoint = function () {
        return PoolCode_1.PoolCode.RouteProcessorAddress;
    };
    // eslint-disable-next-line unused-imports/no-unused-vars, no-unused-vars, @typescript-eslint/no-unused-vars
    TridentCLPoolCode.prototype.getSwapCodeForRouteProcessor = function (leg, route, to) {
        return 'unsupported';
    };
    TridentCLPoolCode.prototype.getSwapCodeForRouteProcessor2 = function (leg, _route, to) {
        var code = new HEXer_1.HEXer()
            .uint8(5) // TridentCL pool
            .address(this.pool.address)
            .bool(leg.tokenFrom.address == this.pool.token0.address)
            .address(to)
            .toString();
        return code;
    };
    return TridentCLPoolCode;
}(PoolCode_1.PoolCode));
exports.TridentCLPoolCode = TridentCLPoolCode;
//# sourceMappingURL=TridentCLPool.js.map