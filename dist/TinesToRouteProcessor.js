"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRouteProcessorCode = exports.TinesToRouteProcessor = void 0;
var chain_1 = require("@sushiswap/chain");
var tines_1 = require("@sushiswap/tines");
var HEXer_1 = require("./HEXer");
var PoolCode_1 = require("./pools/PoolCode");
function last(arr) {
    return arr[arr.length - 1];
}
var TokenType;
(function (TokenType) {
    TokenType["ERC20"] = "ERC20";
    TokenType["BENTO"] = "BENTO";
})(TokenType || (TokenType = {}));
function getTokenType(token) {
    return typeof token.chainId === 'string' && token.chainId.startsWith('Bento') ? TokenType.BENTO : TokenType.ERC20;
}
var TinesToRouteProcessor = /** @class */ (function () {
    function TinesToRouteProcessor(routeProcessorAddress, chainId, pools) {
        this.routeProcessorAddress = routeProcessorAddress;
        this.chainId = chainId;
        this.pools = pools;
        this.tokenOutputLegs = new Map();
    }
    TinesToRouteProcessor.prototype.getRouteProcessorCode = function (route, toAddress) {
        var _this = this;
        // 0. Check for no route
        if (route.status === tines_1.RouteStatus.NoWay || route.legs.length === 0)
            return '';
        if (route.legs.length === 1 && route.fromToken.address === '') {
            // very special case
            return this.getRPCodeForsimpleWrapRoute(route, toAddress);
        }
        this.calcTokenOutputLegs(route);
        var res = '0x';
        // 1. Initial distribution
        var _a = this.codeDistributeInitial(route), initialCode = _a[0], exactAmount = _a[1];
        res += initialCode;
        var distributedTokens = new Set([route.fromToken.tokenId]);
        route.legs.forEach(function (l, i) {
            if (i === 0 && l.tokenFrom.address === '') {
                // Native - processed by codeDistributeInitial
                distributedTokens.add(l.tokenTo.tokenId);
                return;
            }
            // 2. Transfer tokens from the routeProcessor contract to the pool if it is neccessary
            if (!distributedTokens.has(l.tokenFrom.tokenId)) {
                res += _this.codeDistributeTokenShares(l.tokenFrom, route);
                distributedTokens.add(l.tokenFrom.tokenId);
            }
            // 3. get pool's output address
            var outAddress = _this.getPoolOutputAddress(l, route, toAddress);
            // 4. Make swap
            res += _this.codeSwap(l, route, outAddress, exactAmount.get(l.poolAddress));
        });
        return res;
    };
    TinesToRouteProcessor.prototype.getRPCodeForsimpleWrapRoute = function (route, toAddress) {
        var hex = new HEXer_1.HEXer()
            .uint8(5) // wrapAndDistributeERC20Amounts
            .address(route.legs[0].poolAddress)
            .uint8(1)
            .address(toAddress)
            .uint(route.amountIn);
        return hex.toString0x();
    };
    TinesToRouteProcessor.prototype.getPoolOutputAddress = function (l, route, toAddress) {
        var outAddress;
        var outputDistribution = this.tokenOutputLegs.get(l.tokenTo.tokenId) || [];
        if (outputDistribution.length === 0) {
            outAddress = toAddress;
        }
        else if (outputDistribution.length === 1) {
            outAddress = this.getPoolCode(outputDistribution[0]).getStartPoint(l, route);
            if (outAddress === PoolCode_1.PoolCode.RouteProcessorAddress)
                outAddress = this.routeProcessorAddress;
        }
        else {
            outAddress = this.routeProcessorAddress;
        }
        return outAddress;
    };
    TinesToRouteProcessor.prototype.getPoolCode = function (l) {
        var pc = this.pools.get(l.poolAddress);
        if (pc === undefined) {
            throw new Error("unknown pool: ".concat(l.poolAddress));
        }
        return pc;
    };
    TinesToRouteProcessor.prototype.codeSwap = function (leg, route, to, exactAmount) {
        var pc = this.getPoolCode(leg);
        return pc.getSwapCodeForRouteProcessor(leg, route, to, exactAmount);
    };
    // Distributes tokens from msg.sender to pools
    TinesToRouteProcessor.prototype.codeDistributeInitial = function (route) {
        var _this = this;
        var fromToken = route.fromToken;
        if (fromToken.address === '') {
            // Native
            fromToken = route.legs[0].tokenTo; // Change to wrapped Native
        }
        var legs = this.tokenOutputLegs.get(fromToken.tokenId);
        var legsAddr = legs.map(function (l) {
            var pc = _this.getPoolCode(l);
            var startPoint = pc.getStartPoint(l, route);
            return [l, startPoint === PoolCode_1.PoolCode.RouteProcessorAddress ? _this.routeProcessorAddress : startPoint];
        });
        var hex = new HEXer_1.HEXer();
        if (getTokenType(fromToken) === TokenType.BENTO)
            hex.uint8(24); // distributeBentoShares
        else if (route.fromToken.address === '') {
            if (this.chainId === chain_1.ChainId.CELO) {
                // Celo is very special - native coin has it's own ERC20 token
                // So, to prevent user from providing appove to RouteProcessor in case if he swaps from CELO,
                // we support payment to RP in native coin and then distribute it as ERC20 tokens
                hex.uint8(7); // distributeERC20AmountsFromRP
            }
            else
                hex.uint8(5).address(route.legs[0].poolAddress); // wrapAndDistributeERC20Amounts
        }
        else
            hex.uint8(3); // distributeERC20Amounts
        hex.uint8(legsAddr.length);
        var inputAmountPrevious = 0n;
        var lastLeg = last(legsAddr)[0];
        var exactAmount = new Map();
        legsAddr.forEach(function (_a) {
            var leg = _a[0], poolAddress = _a[1];
            var amount = leg !== lastLeg
                ? (0, tines_1.getBigInt)(route.amountIn * leg.absolutePortion)
                : (0, tines_1.getBigInt)(route.amountIn) - inputAmountPrevious;
            hex.address(poolAddress).uint(amount);
            inputAmountPrevious = inputAmountPrevious + amount;
            exactAmount.set(leg.poolAddress, amount);
        });
        var code = hex.toString();
        return [code, exactAmount];
    };
    // Distributes tokens from RP to pools
    TinesToRouteProcessor.prototype.codeDistributeTokenShares = function (token, route) {
        var _this = this;
        var legs = this.tokenOutputLegs.get(token.tokenId);
        if (legs.length <= 1) {
            return ''; // No distribution is needed
        }
        var RPStartPointsNum = legs.filter(function (l) {
            var pc = _this.getPoolCode(l);
            var startPoint = pc.getStartPoint(l, route);
            return startPoint === PoolCode_1.PoolCode.RouteProcessorAddress;
        }).length;
        if (RPStartPointsNum > 1) {
            throw new Error('More than one input token is not supported by RouteProcessor');
        }
        var command = getTokenType(token) === TokenType.ERC20
            ? 4 // distributeERC20Shares
            : 25; // distributeBentoPortions
        var hex = new HEXer_1.HEXer()
            .uint8(command)
            .address(token.address)
            .uint8(legs.length - RPStartPointsNum);
        var unmovedPart = 0;
        var unmovedCounter = 0;
        legs.forEach(function (l) {
            var pc = _this.getPoolCode(l);
            var startPoint = pc.getStartPoint(l, route);
            if (startPoint === PoolCode_1.PoolCode.RouteProcessorAddress) {
                unmovedPart += l.swapPortion;
                ++unmovedCounter;
            }
            else {
                var amount = l.swapPortion * (1 - unmovedPart);
                hex.address(startPoint).share16(amount);
            }
        });
        var code = hex.toString();
        console.assert(code.length === (22 + (legs.length - unmovedCounter) * 22) * 2, 'codeDistributeTokenShares unexpected code length');
        return code;
    };
    TinesToRouteProcessor.prototype.calcTokenOutputLegs = function (route) {
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
    return TinesToRouteProcessor;
}());
exports.TinesToRouteProcessor = TinesToRouteProcessor;
function getRouteProcessorCode(route, routeProcessorAddress, toAddress, pools) {
    var rpc = new TinesToRouteProcessor(routeProcessorAddress, route.fromToken.chainId, pools);
    return rpc.getRouteProcessorCode(route, toAddress);
}
exports.getRouteProcessorCode = getRouteProcessorCode;
//# sourceMappingURL=TinesToRouteProcessor.js.map