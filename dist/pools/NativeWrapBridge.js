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
exports.NativeWrapBridgePoolCode = void 0;
var chain_1 = require("@sushiswap/chain");
var HEXer_1 = require("../HEXer");
var PoolCode_1 = require("./PoolCode");
var NativeWrapBridgePoolCode = /** @class */ (function (_super) {
    __extends(NativeWrapBridgePoolCode, _super);
    function NativeWrapBridgePoolCode(pool, liquidityProvider) {
        return _super.call(this, pool, liquidityProvider, 'Wrap') || this;
    }
    NativeWrapBridgePoolCode.prototype.getStartPoint = function () {
        return PoolCode_1.PoolCode.RouteProcessorAddress;
    };
    NativeWrapBridgePoolCode.prototype.getSwapCodeForRouteProcessor = function (leg) {
        if (leg.tokenFrom.tokenId == this.pool.token0.tokenId) {
            // wrap - deposit. not used normally
            var code = new HEXer_1.HEXer().uint8(5).address(this.pool.address).uint8(0).toString(); // wrapAndDistributeERC20Amounts;
            return code;
        }
        else {
            // unwrap - withdraw
            var code = new HEXer_1.HEXer().uint8(6).address(this.pool.address).toString(); // unwrapNative(address receiver, unwrap token)
            return code;
        }
    };
    NativeWrapBridgePoolCode.prototype.getSwapCodeForRouteProcessor2 = function (leg, _route, to) {
        var fake = leg.tokenFrom.chainId == chain_1.ChainId.CELO ? 2 : 0; // no real wrap at celo - fake wrap code is generated
        if (leg.tokenFrom.tokenId == this.pool.token0.tokenId) {
            // wrap - deposit
            var code = new HEXer_1.HEXer()
                .uint8(2) // wrapNative pool type
                .uint8(1 + fake) // wrap action
                .address(to) // where to transfer native coin after unwrapping
                .address(this.pool.address) // wrap token
                .toString();
            return code;
        }
        else {
            // unwrap - withdraw
            var code = new HEXer_1.HEXer()
                .uint8(2) // wrapNative pool type
                .uint8(0 + fake) // unwrap action
                .address(to) // where to transfer native coin after unwrapping
                //.address(this.pool.address) - don't need because processToken knows the token
                .toString();
            return code;
        }
    };
    return NativeWrapBridgePoolCode;
}(PoolCode_1.PoolCode));
exports.NativeWrapBridgePoolCode = NativeWrapBridgePoolCode;
//# sourceMappingURL=NativeWrapBridge.js.map