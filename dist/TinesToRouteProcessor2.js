"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRouteProcessor2Code = exports.TinesToRouteProcessor2 = exports.RouterLiquiditySource = exports.getTokenType = exports.TokenType = void 0;
const tines_1 = require("@sushiswap/tines");
const HEXer_1 = require("./HEXer");
const PoolCode_1 = require("./pools/PoolCode");
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
class TinesToRouteProcessor2 {
    //presendedLegs: Set<RouteLeg> = new Set()
    constructor(routeProcessorAddress, chainId, pools) {
        this.tokenOutputLegs = new Map();
        this.routeProcessorAddress = routeProcessorAddress;
        this.chainId = chainId;
        this.pools = pools;
    }
    getRouteProcessorCode(route, toAddress, permits = [], source = RouterLiquiditySource.Sender) {
        // 0. Check for no route
        if (route.status === tines_1.RouteStatus.NoWay || route.legs.length === 0)
            return '';
        //this.presendedLegs = new Set()
        this.calcTokenOutputLegs(route);
        let res = '0x';
        res += this.processPermits(permits);
        const processedTokens = new Set();
        route.legs.forEach((l, i) => {
            const token = l.tokenFrom;
            if (processedTokens.has(token.tokenId))
                return;
            processedTokens.add(token.tokenId);
            if (i > 0) {
                if (token.address === '')
                    throw new Error(`unexpected native inside the route: ${token.symbol}`);
                if (this.isOnePoolOptimization(token, route))
                    res += this.processOnePoolCode(token, route, toAddress);
                else if (getTokenType(token) === TokenType.ERC20)
                    res += this.processERC20Code(true, token, route, toAddress);
                else
                    res += this.processBentoCode(token, route, toAddress);
            }
            else {
                if (token.address === '')
                    res += this.processNativeCode(token, route, toAddress);
                else
                    res += this.processERC20Code(source === RouterLiquiditySource.Self, token, route, toAddress);
            }
        });
        return res;
    }
    processPermits(permits) {
        const hex = new HEXer_1.HEXer();
        permits.forEach((p) => {
            hex
                .uint8(6) // applyPermit commandCode
                .uint(p.value)
                .uint(p.deadline)
                .uint8(p.v)
                .bytes32(p.r)
                .bytes32(p.s);
        });
        return hex.toString();
    }
    processNativeCode(token, route, toAddress) {
        const outputLegs = this.tokenOutputLegs.get(token.tokenId);
        if (!outputLegs || outputLegs.length !== 1) {
            throw new Error(`Not 1 output pool for native token: ${outputLegs?.length}`);
        }
        const hex = new HEXer_1.HEXer()
            .uint8(3) // processNative commandCode
            .uint8(outputLegs.length);
        outputLegs.forEach((l) => {
            hex.share16(l.swapPortion).hexData(this.swapCode(l, route, toAddress));
        });
        return hex.toString();
    }
    processERC20Code(fromMe, token, route, toAddress) {
        const outputLegs = this.tokenOutputLegs.get(token.tokenId);
        if (!outputLegs || outputLegs.length === 0) {
            throw new Error(`No output legs for token ${token.symbol}`);
        }
        const hex = new HEXer_1.HEXer()
            .uint8(fromMe ? 1 : 2) // processMyERC20 : processUserERC20 commandCode
            .address(token.address)
            .uint8(outputLegs.length);
        outputLegs.forEach((l) => {
            hex.share16(l.swapPortion).hexData(this.swapCode(l, route, toAddress));
        });
        return hex.toString();
    }
    processOnePoolCode(token, route, toAddress) {
        const outputLegs = this.tokenOutputLegs.get(token.tokenId);
        if (!outputLegs || outputLegs.length !== 1) {
            throw new Error(`1 output leg expected ${outputLegs?.length}`);
        }
        const hex = new HEXer_1.HEXer()
            .uint8(4) // processOnePool commandCode
            .address(token.address)
            .hexData(this.swapCode(outputLegs[0], route, toAddress));
        return hex.toString();
    }
    processBentoCode(token, route, toAddress) {
        const outputLegs = this.tokenOutputLegs.get(token.tokenId);
        if (!outputLegs || outputLegs.length === 0) {
            throw new Error(`No output legs for token ${outputLegs?.length}`);
        }
        const hex = new HEXer_1.HEXer()
            .uint8(5) // processInsideBento commandCode
            .address(token.address)
            .uint8(outputLegs.length);
        outputLegs.forEach((l) => {
            hex.share16(l.swapPortion).hexData(this.swapCode(l, route, toAddress));
        });
        return hex.toString();
    }
    swapCode(leg, route, toAddress) {
        const pc = this.getPoolCode(leg);
        const to = this.getPoolOutputAddress(leg, route, toAddress);
        return pc.getSwapCodeForRouteProcessor2(leg, route, to); //, this.presendedLegs.has(leg))
    }
    getPoolOutputAddress(l, route, toAddress) {
        let outAddress;
        const outputDistribution = this.tokenOutputLegs.get(l.tokenTo.tokenId) || [];
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
    }
    isOnePoolOptimization(token, route) {
        const outputDistribution = this.tokenOutputLegs.get(token.tokenId) || [];
        if (outputDistribution.length !== 1)
            return false;
        const startPoint = this.getPoolCode(outputDistribution[0]).getStartPoint(outputDistribution[0], route);
        return startPoint === outputDistribution[0].poolAddress;
    }
    getPoolCode(l) {
        const pc = this.pools.get(l.poolAddress);
        if (pc === undefined) {
            throw new Error(`unknown pool: ${l.poolAddress}`);
        }
        return pc;
    }
    calcTokenOutputLegs(route) {
        const res = new Map();
        route.legs.forEach((l) => {
            const tokenId = l.tokenFrom.tokenId?.toString();
            if (tokenId === undefined) {
                console.assert(0, 'Unseted tokenId');
            }
            else {
                const legsOutput = res.get(tokenId) || [];
                legsOutput.push(l);
                res.set(tokenId, legsOutput);
            }
        });
        this.tokenOutputLegs = res;
    }
}
exports.TinesToRouteProcessor2 = TinesToRouteProcessor2;
function getRouteProcessor2Code(route, routeProcessorAddress, toAddress, pools, permits = [], source = RouterLiquiditySource.Sender) {
    const rpc = new TinesToRouteProcessor2(routeProcessorAddress, route.fromToken.chainId, pools);
    return rpc.getRouteProcessorCode(route, toAddress, permits, source);
}
exports.getRouteProcessor2Code = getRouteProcessor2Code;
//# sourceMappingURL=TinesToRouteProcessor2.js.map