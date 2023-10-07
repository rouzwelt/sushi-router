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
exports.getRouteProcessor4Code = void 0;
var tines_1 = require("@sushiswap/tines");
var TinesToRouteProcessor2_1 = require("./TinesToRouteProcessor2");
var TinesToRouteProcessor4 = /** @class */ (function (_super) {
    __extends(TinesToRouteProcessor4, _super);
    function TinesToRouteProcessor4(routeProcessorAddress, chainId, pools) {
        return _super.call(this, routeProcessorAddress, chainId, pools) || this;
    }
    TinesToRouteProcessor4.prototype.getRouteProcessorCode = function (route, toAddress, permits) {
        var _this = this;
        if (permits === void 0) { permits = []; }
        // 0. Check for no route
        if (route.status === tines_1.RouteStatus.NoWay || route.legs.length === 0)
            return '';
        //this.presendedLegs = new Set()
        this.calcTokenOutputLegs(route);
        var res = '0x';
        res += this.processPermits(permits);
        var processedTokens = new Set();
        route.legs.forEach(function (l, i) {
            var token = l.tokenFrom;
            if (processedTokens.has(token.tokenId))
                return;
            processedTokens.add(token.tokenId);
            if (_this.isOnePoolOptimization(token, route))
                res += _this.processOnePoolCode(token, route, toAddress);
            else {
                switch ((0, TinesToRouteProcessor2_1.getTokenType)(token)) {
                    case TinesToRouteProcessor2_1.TokenType.NATIVE:
                        res += _this.processNativeCode(token, route, toAddress);
                        break;
                    case TinesToRouteProcessor2_1.TokenType.ERC20:
                        res += _this.processERC20Code(i > 0, token, route, toAddress);
                        break;
                    case TinesToRouteProcessor2_1.TokenType.BENTO:
                        res += _this.processBentoCode(token, route, toAddress);
                        break;
                    default:
                        throw new Error("Unknown token type of token ".concat(token.symbol));
                }
            }
        });
        return res;
    };
    TinesToRouteProcessor4.prototype.isOnePoolOptimization = function (token, route) {
        if ((0, TinesToRouteProcessor2_1.getTokenType)(token) === TinesToRouteProcessor2_1.TokenType.NATIVE)
            return false;
        var outputDistribution = this.tokenOutputLegs.get(token.tokenId) || [];
        if (outputDistribution.length !== 1)
            return false;
        if (token.tokenId === route.fromToken.tokenId)
            return false;
        var startPoint = this.getPoolCode(outputDistribution[0]).getStartPoint(outputDistribution[0], route);
        return startPoint === outputDistribution[0].poolAddress;
    };
    TinesToRouteProcessor4.prototype.swapCode = function (leg, route, toAddress) {
        var pc = this.getPoolCode(leg);
        var to = this.getPoolOutputAddress(leg, route, toAddress);
        return pc.getSwapCodeForRouteProcessor4(leg, route, to);
    };
    return TinesToRouteProcessor4;
}(TinesToRouteProcessor2_1.TinesToRouteProcessor2));
function getRouteProcessor4Code(route, routeProcessorAddress, toAddress, pools, permits) {
    if (permits === void 0) { permits = []; }
    var rpc = new TinesToRouteProcessor4(routeProcessorAddress, route.fromToken.chainId, pools);
    return rpc.getRouteProcessorCode(route, toAddress, permits);
}
exports.getRouteProcessor4Code = getRouteProcessor4Code;
//# sourceMappingURL=TinesToRouteProcessor4.js.map