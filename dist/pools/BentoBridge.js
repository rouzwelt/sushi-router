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
exports.BentoBridgePoolCode = void 0;
var HEXer_1 = require("../HEXer");
var Bridge_1 = require("./Bridge");
var PoolCode_1 = require("./PoolCode");
var BentoBridgePoolCode = /** @class */ (function (_super) {
    __extends(BentoBridgePoolCode, _super);
    function BentoBridgePoolCode(pool, liquidityProvider, _providerName, bentoBoxAddress) {
        var _this = _super.call(this, pool, liquidityProvider, Bridge_1.Bridge.BentoBox) || this;
        _this.bentoBoxAddress = bentoBoxAddress;
        return _this;
    }
    BentoBridgePoolCode.prototype.getStartPoint = function (leg) {
        if (leg.tokenFrom.chainId === this.pool.token0.chainId) {
            // bento deposit
            return this.bentoBoxAddress;
        }
        else {
            return 'RouteProcessor';
        }
    };
    BentoBridgePoolCode.prototype.getSwapCodeForRouteProcessor = function (leg, route, to, exactAmount) {
        if (leg.tokenFrom.chainId === this.pool.token0.chainId) {
            // bento deposit
            if (leg.tokenFrom.tokenId === route.fromToken.tokenId) {
                // input token with exactAmount
                if (exactAmount !== undefined) {
                    var code = new HEXer_1.HEXer()
                        .uint8(20) // bentoDepositAmountFromBento
                        .address(to)
                        .uint(exactAmount)
                        .toString();
                    console.assert(code.length === 53 * 2, 'BentoBridge deposit unexpected code length');
                    return code;
                }
                else {
                    throw new Error("Bento deposit from input token can't work without exact amount");
                }
            }
            else {
                // deposit in the middle of a route
                var code = new HEXer_1.HEXer()
                    .uint8(26) // bentoDepositAllFromBento
                    .address(to)
                    .address(leg.tokenFrom.address)
                    .toString();
                console.assert(code.length === 41 * 2, 'BentoBridge deposit unexpected code length');
                return code;
            }
        }
        else {
            // bento withdraw
            if (leg.tokenFrom.tokenId === route.fromToken.tokenId) {
                // input token with exactAmount
                if (exactAmount !== undefined) {
                    var code = new HEXer_1.HEXer()
                        .uint8(23) // bentoWithdrawShareFromRP
                        .address(to)
                        .uint(exactAmount)
                        .toString();
                    console.assert(code.length === 53 * 2, 'BentoBridge withdraw unexpected code length');
                    return code;
                }
                else {
                    throw new Error("Bento withdraw from input token can't work without exact amount");
                }
            }
            else {
                // withdraw in the middle of a route
                var code = new HEXer_1.HEXer()
                    .uint8(27) // bentoWithdrawAllFromRP
                    .address(leg.tokenFrom.address)
                    .address(to)
                    .toString();
                console.assert(code.length === 41 * 2, 'BentoBridge deposit unexpected code length');
                return code;
            }
        }
    };
    BentoBridgePoolCode.prototype.getSwapCodeForRouteProcessor2 = function (leg, _route, to) {
        var code = new HEXer_1.HEXer()
            .uint8(3) // bentoBridge
            .uint8(leg.tokenFrom.chainId === this.pool.token0.chainId ? 1 : 0) // direction = deposit/withdraw
            .address(to)
            .toString();
        return code;
    };
    return BentoBridgePoolCode;
}(PoolCode_1.PoolCode));
exports.BentoBridgePoolCode = BentoBridgePoolCode;
//# sourceMappingURL=BentoBridge.js.map