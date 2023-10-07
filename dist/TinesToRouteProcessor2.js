"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRouteProcessor2Code = exports.TinesToRouteProcessor2 = exports.RouterLiquiditySource = exports.getTokenType = exports.TokenType = void 0;
var tines_1 = require("@sushiswap/tines");
var HEXer_1 = require("./HEXer");
var PoolCode_1 = require("./pools/PoolCode");
var TokenType;
(function (TokenType) {
    TokenType["NATIVE"] = "NATIVE";
    TokenType["ERC20"] = "ERC20";
    TokenType["BENTO"] = "BENTO";
})(TokenType || (exports.TokenType = TokenType = {}));
function getTokenType(token) {
    if (token.address === '')
        return TokenType.NATIVE;
    return typeof token.chainId === 'string' && token.chainId.startsWith('Bento') ? TokenType.BENTO : TokenType.ERC20;
}
exports.getTokenType = getTokenType;
var RouterLiquiditySource;
(function (RouterLiquiditySource) {
    RouterLiquiditySource["Sender"] = "Sender";
    RouterLiquiditySource["Self"] = "Self";
})(RouterLiquiditySource || (exports.RouterLiquiditySource = RouterLiquiditySource = {}));
var TinesToRouteProcessor2 = /** @class */ (function () {
    //presendedLegs: Set<RouteLeg> = new Set()
    function TinesToRouteProcessor2(routeProcessorAddress, chainId, pools) {
        this.tokenOutputLegs = new Map();
        this.routeProcessorAddress = routeProcessorAddress;
        this.chainId = chainId;
        this.pools = pools;
    }
    TinesToRouteProcessor2.prototype.getRouteProcessorCode = function (route, toAddress, permits, source) {
        var _this = this;
        if (permits === void 0) { permits = []; }
        if (source === void 0) { source = RouterLiquiditySource.Sender; }
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
            if (i > 0) {
                if (token.address === '')
                    throw new Error("unexpected native inside the route: ".concat(token.symbol));
                if (_this.isOnePoolOptimization(token, route))
                    res += _this.processOnePoolCode(token, route, toAddress);
                else if (getTokenType(token) === TokenType.ERC20)
                    res += _this.processERC20Code(true, token, route, toAddress);
                else
                    res += _this.processBentoCode(token, route, toAddress);
            }
            else {
                if (token.address === '')
                    res += _this.processNativeCode(token, route, toAddress);
                else
                    res += _this.processERC20Code(source === RouterLiquiditySource.Self, token, route, toAddress);
            }
        });
        return res;
    };
    TinesToRouteProcessor2.prototype.processPermits = function (permits) {
        var hex = new HEXer_1.HEXer();
        permits.forEach(function (p) {
            hex
                .uint8(6) // applyPermit commandCode
                .uint(p.value)
                .uint(p.deadline)
                .uint8(p.v)
                .bytes32(p.r)
                .bytes32(p.s);
        });
        return hex.toString();
    };
    TinesToRouteProcessor2.prototype.processNativeCode = function (token, route, toAddress) {
        var _this = this;
        var outputLegs = this.tokenOutputLegs.get(token.tokenId);
        if (!outputLegs || outputLegs.length !== 1) {
            throw new Error("Not 1 output pool for native token: ".concat(outputLegs === null || outputLegs === void 0 ? void 0 : outputLegs.length));
        }
        var hex = new HEXer_1.HEXer()
            .uint8(3) // processNative commandCode
            .uint8(outputLegs.length);
        outputLegs.forEach(function (l) {
            hex.share16(l.swapPortion).hexData(_this.swapCode(l, route, toAddress));
        });
        return hex.toString();
    };
    TinesToRouteProcessor2.prototype.processERC20Code = function (fromMe, token, route, toAddress) {
        var _this = this;
        var outputLegs = this.tokenOutputLegs.get(token.tokenId);
        if (!outputLegs || outputLegs.length === 0) {
            throw new Error("No output legs for token ".concat(token.symbol));
        }
        var hex = new HEXer_1.HEXer()
            .uint8(fromMe ? 1 : 2) // processMyERC20 : processUserERC20 commandCode
            .address(token.address)
            .uint8(outputLegs.length);
        outputLegs.forEach(function (l) {
            hex.share16(l.swapPortion).hexData(_this.swapCode(l, route, toAddress));
        });
        return hex.toString();
    };
    TinesToRouteProcessor2.prototype.processOnePoolCode = function (token, route, toAddress) {
        var outputLegs = this.tokenOutputLegs.get(token.tokenId);
        if (!outputLegs || outputLegs.length !== 1) {
            throw new Error("1 output leg expected ".concat(outputLegs === null || outputLegs === void 0 ? void 0 : outputLegs.length));
        }
        var hex = new HEXer_1.HEXer()
            .uint8(4) // processOnePool commandCode
            .address(token.address)
            .hexData(this.swapCode(outputLegs[0], route, toAddress));
        return hex.toString();
    };
    TinesToRouteProcessor2.prototype.processBentoCode = function (token, route, toAddress) {
        var _this = this;
        var outputLegs = this.tokenOutputLegs.get(token.tokenId);
        if (!outputLegs || outputLegs.length === 0) {
            throw new Error("No output legs for token ".concat(outputLegs === null || outputLegs === void 0 ? void 0 : outputLegs.length));
        }
        var hex = new HEXer_1.HEXer()
            .uint8(5) // processInsideBento commandCode
            .address(token.address)
            .uint8(outputLegs.length);
        outputLegs.forEach(function (l) {
            hex.share16(l.swapPortion).hexData(_this.swapCode(l, route, toAddress));
        });
        return hex.toString();
    };
    TinesToRouteProcessor2.prototype.swapCode = function (leg, route, toAddress) {
        var pc = this.getPoolCode(leg);
        var to = this.getPoolOutputAddress(leg, route, toAddress);
        return pc.getSwapCodeForRouteProcessor2(leg, route, to); //, this.presendedLegs.has(leg))
    };
    TinesToRouteProcessor2.prototype.getPoolOutputAddress = function (l, route, toAddress) {
        var outAddress;
        var outputDistribution = this.tokenOutputLegs.get(l.tokenTo.tokenId) || [];
        if (outputDistribution.length === 0) {
            outAddress = toAddress;
        }
        else if (outputDistribution.length === 1) {
            outAddress = this.getPoolCode(outputDistribution[0]).getStartPoint(l, route);
            if (outAddress === PoolCode_1.PoolCode.RouteProcessorAddress)
                outAddress = this.routeProcessorAddress;
            //else this.presendedLegs.add(outputDistribution[0])
        }
        else {
            outAddress = this.routeProcessorAddress;
        }
        return outAddress;
    };
    TinesToRouteProcessor2.prototype.isOnePoolOptimization = function (token, route) {
        var outputDistribution = this.tokenOutputLegs.get(token.tokenId) || [];
        if (outputDistribution.length !== 1)
            return false;
        var startPoint = this.getPoolCode(outputDistribution[0]).getStartPoint(outputDistribution[0], route);
        return startPoint === outputDistribution[0].poolAddress;
    };
    TinesToRouteProcessor2.prototype.getPoolCode = function (l) {
        var pc = this.pools.get(l.poolAddress);
        if (pc === undefined) {
            throw new Error("unknown pool: ".concat(l.poolAddress));
        }
        return pc;
    };
    TinesToRouteProcessor2.prototype.calcTokenOutputLegs = function (route) {
        var res = new Map();
        route.legs.forEach(function (l) {
            var _a;
            var tokenId = (_a = l.tokenFrom.tokenId) === null || _a === void 0 ? void 0 : _a.toString();
            if (tokenId === undefined) {
                console.assert(0, 'Unseted tokenId');
            }
            else {
                var legsOutput = res.get(tokenId) || [];
                legsOutput.push(l);
                res.set(tokenId, legsOutput);
            }
        });
        this.tokenOutputLegs = res;
    };
    return TinesToRouteProcessor2;
}());
exports.TinesToRouteProcessor2 = TinesToRouteProcessor2;
function getRouteProcessor2Code(route, routeProcessorAddress, toAddress, pools, permits, source) {
    if (permits === void 0) { permits = []; }
    if (source === void 0) { source = RouterLiquiditySource.Sender; }
    var rpc = new TinesToRouteProcessor2(routeProcessorAddress, route.fromToken.chainId, pools);
    return rpc.getRouteProcessorCode(route, toAddress, permits, source);
}
exports.getRouteProcessor2Code = getRouteProcessor2Code;
//# sourceMappingURL=TinesToRouteProcessor2.js.map