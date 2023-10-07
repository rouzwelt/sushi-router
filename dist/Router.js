"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenQuantityString = exports.Router = void 0;
var chain_1 = require("@sushiswap/chain");
var currency_1 = require("@sushiswap/currency");
var tines_1 = require("@sushiswap/tines");
var convert_1 = require("./lib/convert");
var LiquidityProvider_1 = require("./liquidity-providers/LiquidityProvider");
var Bridge_1 = require("./pools/Bridge");
var TinesToRouteProcessor_1 = require("./TinesToRouteProcessor");
var TinesToRouteProcessor2_1 = require("./TinesToRouteProcessor2");
var TinesToRouteProcessor4_1 = require("./TinesToRouteProcessor4");
function TokenToRToken(t) {
    if (t instanceof currency_1.Token)
        return t;
    var nativeRToken = {
        address: '',
        name: t.name,
        symbol: t.symbol,
        chainId: t.chainId,
        decimals: 18,
    };
    return nativeRToken;
}
var Router = /** @class */ (function () {
    function Router() {
    }
    Router.findRouteType = function (poolCodesMap, addresses) {
        if (addresses === null || addresses === void 0 ? void 0 : addresses.every(function (address) {
            var _a;
            var poolName = (_a = poolCodesMap.get(address)) === null || _a === void 0 ? void 0 : _a.poolName;
            return ((poolName === null || poolName === void 0 ? void 0 : poolName.startsWith('Wrap')) ||
                (poolName === null || poolName === void 0 ? void 0 : poolName.startsWith(LiquidityProvider_1.LiquidityProviders.SushiSwapV2)) ||
                (poolName === null || poolName === void 0 ? void 0 : poolName.startsWith(LiquidityProvider_1.LiquidityProviders.SushiSwapV3)) ||
                (poolName === null || poolName === void 0 ? void 0 : poolName.startsWith(LiquidityProvider_1.LiquidityProviders.Trident)) ||
                (poolName === null || poolName === void 0 ? void 0 : poolName.startsWith(Bridge_1.Bridge.BentoBox)));
        })) {
            return 'Internal';
        }
        else if ((addresses === null || addresses === void 0 ? void 0 : addresses.some(function (address) {
            var _a;
            var poolName = (_a = poolCodesMap.get(address)) === null || _a === void 0 ? void 0 : _a.poolName;
            return (!(poolName === null || poolName === void 0 ? void 0 : poolName.startsWith('Wrap')) &&
                ((poolName === null || poolName === void 0 ? void 0 : poolName.startsWith(LiquidityProvider_1.LiquidityProviders.SushiSwapV2)) ||
                    (poolName === null || poolName === void 0 ? void 0 : poolName.startsWith(LiquidityProvider_1.LiquidityProviders.SushiSwapV3)) ||
                    (poolName === null || poolName === void 0 ? void 0 : poolName.startsWith(LiquidityProvider_1.LiquidityProviders.Trident)) ||
                    (poolName === null || poolName === void 0 ? void 0 : poolName.startsWith(Bridge_1.Bridge.BentoBox))));
        })) &&
            (addresses === null || addresses === void 0 ? void 0 : addresses.some(function (address) {
                var _a;
                var poolName = (_a = poolCodesMap.get(address)) === null || _a === void 0 ? void 0 : _a.poolName;
                return (!(poolName === null || poolName === void 0 ? void 0 : poolName.startsWith('Wrap')) &&
                    (!(poolName === null || poolName === void 0 ? void 0 : poolName.startsWith(LiquidityProvider_1.LiquidityProviders.SushiSwapV2)) ||
                        !(poolName === null || poolName === void 0 ? void 0 : poolName.startsWith(LiquidityProvider_1.LiquidityProviders.SushiSwapV3)) ||
                        !(poolName === null || poolName === void 0 ? void 0 : poolName.startsWith(LiquidityProvider_1.LiquidityProviders.Trident)) ||
                        !(poolName === null || poolName === void 0 ? void 0 : poolName.startsWith(Bridge_1.Bridge.BentoBox))));
            }))) {
            return 'Mix';
        }
        else if (addresses === null || addresses === void 0 ? void 0 : addresses.some(function (address) {
            var _a;
            var poolName = (_a = poolCodesMap.get(address)) === null || _a === void 0 ? void 0 : _a.poolName;
            return ((poolName === null || poolName === void 0 ? void 0 : poolName.startsWith('Wrap')) ||
                (!(poolName === null || poolName === void 0 ? void 0 : poolName.startsWith(LiquidityProvider_1.LiquidityProviders.SushiSwapV2)) &&
                    !(poolName === null || poolName === void 0 ? void 0 : poolName.startsWith(LiquidityProvider_1.LiquidityProviders.SushiSwapV3)) &&
                    !(poolName === null || poolName === void 0 ? void 0 : poolName.startsWith(LiquidityProvider_1.LiquidityProviders.Trident)) &&
                    !(poolName === null || poolName === void 0 ? void 0 : poolName.startsWith(Bridge_1.Bridge.BentoBox))));
        })) {
            return 'External';
        }
        return 'Unknown';
    };
    Router.findSushiRoute = function (poolCodesMap, chainId, fromToken, amountIn, toToken, gasPrice) {
        return Router.findBestRoute(poolCodesMap, chainId, fromToken, amountIn, toToken, gasPrice, [
            LiquidityProvider_1.LiquidityProviders.NativeWrap,
            LiquidityProvider_1.LiquidityProviders.SushiSwapV2,
            LiquidityProvider_1.LiquidityProviders.SushiSwapV3,
            LiquidityProvider_1.LiquidityProviders.Trident,
        ]);
    };
    Router.findSpecialRoute = function (poolCodesMap, chainId, fromToken, amountIn, toToken, gasPrice, maxPriceImpact // 1%
    ) {
        if (maxPriceImpact === void 0) { maxPriceImpact = 1; }
        // Find preferrable route
        var preferrableRoute = Router.findBestRoute(poolCodesMap, chainId, fromToken, amountIn, toToken, gasPrice, [
            LiquidityProvider_1.LiquidityProviders.NativeWrap,
            LiquidityProvider_1.LiquidityProviders.SushiSwapV2,
            LiquidityProvider_1.LiquidityProviders.SushiSwapV3,
            LiquidityProvider_1.LiquidityProviders.Trident,
        ]);
        // If the route is successful and the price impact is less than maxPriceImpact, then return the route
        if (preferrableRoute.status === tines_1.RouteStatus.Success &&
            preferrableRoute.priceImpact !== undefined &&
            preferrableRoute.priceImpact < maxPriceImpact / 100) {
            return preferrableRoute;
        }
        // Otherwise, find the route using all possible liquidity providers
        return Router.findBestRoute(poolCodesMap, chainId, fromToken, amountIn, toToken, gasPrice);
    };
    Router.findBestRoute = function (poolCodesMap, chainId, fromToken, amountIn, toToken, gasPrice, providers, // all providers if undefined
    poolFilter) {
        var networks = [
            {
                chainId: chainId,
                baseToken: currency_1.WNATIVE[chainId],
                gasPrice: gasPrice,
            },
            {
                chainId: (0, convert_1.getBentoChainId)(chainId),
                baseToken: (0, convert_1.convertTokenToBento)(currency_1.WNATIVE[chainId]),
                gasPrice: gasPrice,
            },
        ];
        var poolCodes = Array.from(poolCodesMap.values());
        if (providers) {
            poolCodes = poolCodes.filter(function (pc) { return __spreadArray(__spreadArray([], providers, true), [LiquidityProvider_1.LiquidityProviders.NativeWrap], false).includes(pc.liquidityProvider); });
        }
        var pools = Array.from(poolCodes).map(function (pc) { return pc.pool; });
        if (poolFilter)
            pools = pools.filter(poolFilter);
        var route = (0, tines_1.findMultiRouteExactIn)(TokenToRToken(fromToken), TokenToRToken(toToken), amountIn, pools, networks, gasPrice);
        return __assign(__assign({}, route), { legs: route.legs.map(function (l) {
                var _a, _b;
                return (__assign(__assign({}, l), { poolName: (_b = (_a = poolCodesMap.get(l.poolAddress)) === null || _a === void 0 ? void 0 : _a.poolName) !== null && _b !== void 0 ? _b : 'Unknown Pool' }));
            }) });
    };
    Router.routeProcessorParams = function (poolCodesMap, route, fromToken, toToken, to, RPAddr, maxPriceImpact) {
        if (maxPriceImpact === void 0) { maxPriceImpact = 0.005; }
        var tokenIn = fromToken instanceof currency_1.Token
            ? fromToken.address
            : fromToken.chainId === chain_1.ChainId.CELO
                ? currency_1.WNATIVE_ADDRESS[chain_1.ChainId.CELO] /*CELO native coin has ERC20 interface*/
                : '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE';
        var tokenOut = toToken instanceof currency_1.Token ? toToken.address : '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE';
        var amountOutMin = (route.amountOutBI * (0, tines_1.getBigInt)((1 - maxPriceImpact) * 1000000)) / 1000000n;
        return {
            tokenIn: tokenIn,
            amountIn: route.amountInBI,
            tokenOut: tokenOut,
            amountOutMin: amountOutMin,
            to: to,
            routeCode: (0, TinesToRouteProcessor_1.getRouteProcessorCode)(route, RPAddr, to, poolCodesMap),
            value: fromToken instanceof currency_1.Token ? undefined : route.amountInBI,
        };
    };
    Router.routeProcessor2Params = function (poolCodesMap, route, fromToken, toToken, to, RPAddr, permits, maxPriceImpact, source) {
        if (permits === void 0) { permits = []; }
        if (maxPriceImpact === void 0) { maxPriceImpact = 0.005; }
        if (source === void 0) { source = TinesToRouteProcessor2_1.RouterLiquiditySource.Sender; }
        var tokenIn = fromToken instanceof currency_1.Token ? fromToken.address : '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE';
        var tokenOut = toToken instanceof currency_1.Token ? toToken.address : '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE';
        var amountOutMin = (route.amountOutBI * (0, tines_1.getBigInt)((1 - maxPriceImpact) * 1000000)) / 1000000n;
        return {
            tokenIn: tokenIn,
            amountIn: source === TinesToRouteProcessor2_1.RouterLiquiditySource.Sender ? route.amountInBI : 0n,
            tokenOut: tokenOut,
            amountOutMin: amountOutMin,
            to: to,
            routeCode: (0, TinesToRouteProcessor2_1.getRouteProcessor2Code)(route, RPAddr, to, poolCodesMap, permits, source),
            value: fromToken instanceof currency_1.Token ? undefined : route.amountInBI,
        };
    };
    Router.routeProcessor3Params = function (poolCodesMap, route, fromToken, toToken, to, RPAddr, permits, maxPriceImpact, source) {
        if (permits === void 0) { permits = []; }
        if (maxPriceImpact === void 0) { maxPriceImpact = 0.005; }
        if (source === void 0) { source = TinesToRouteProcessor2_1.RouterLiquiditySource.Sender; }
        return Router.routeProcessor2Params(poolCodesMap, route, fromToken, toToken, to, RPAddr, permits, maxPriceImpact, source);
    };
    Router.routeProcessor4Params = function (poolCodesMap, route, fromToken, toToken, to, RPAddr, permits, maxPriceImpact) {
        if (permits === void 0) { permits = []; }
        if (maxPriceImpact === void 0) { maxPriceImpact = 0.005; }
        var tokenIn = fromToken instanceof currency_1.Token ? fromToken.address : '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE';
        var tokenOut = toToken instanceof currency_1.Token ? toToken.address : '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE';
        var amountOutMin = (route.amountOutBI * (0, tines_1.getBigInt)((1 - maxPriceImpact) * 1000000)) / 1000000n;
        return {
            tokenIn: tokenIn,
            amountIn: route.amountInBI,
            tokenOut: tokenOut,
            amountOutMin: amountOutMin,
            to: to,
            routeCode: (0, TinesToRouteProcessor4_1.getRouteProcessor4Code)(route, RPAddr, to, poolCodesMap, permits),
            value: fromToken instanceof currency_1.Token ? undefined : route.amountInBI,
        };
    };
    // Human-readable route printing
    Router.routeToHumanString = function (poolCodesMap, route, fromToken, toToken, shiftPrimary, shiftSub) {
        if (shiftPrimary === void 0) { shiftPrimary = ''; }
        if (shiftSub === void 0) { shiftSub = '    '; }
        var res = '';
        res += "".concat(shiftPrimary, "Route Status: ").concat(route.status, "\n");
        res += "".concat(shiftPrimary, "Input: ").concat(route.amountIn / Math.pow(10, fromToken.decimals), " ").concat(fromToken.symbol, "\n");
        route.legs.forEach(function (l, i) {
            var _a;
            res += "".concat(shiftSub).concat(i + 1, ". ").concat(l.tokenFrom.symbol, " ").concat(Math.round(l.absolutePortion * 100), "% -> [").concat((_a = poolCodesMap.get(l.poolAddress)) === null || _a === void 0 ? void 0 : _a.poolName, "] -> ").concat(l.tokenTo.symbol, "\n");
            //console.log(l.poolAddress, l.assumedAmountIn, l.assumedAmountOut)
        });
        var output = parseInt(route.amountOutBI.toString()) / Math.pow(10, toToken.decimals);
        res += "".concat(shiftPrimary, "Output: ").concat(output, " ").concat(route.toToken.symbol);
        return res;
    };
    return Router;
}());
exports.Router = Router;
function tokenQuantityString(token, amount) {
    var denominator = Math.pow(10n, BigInt(token.decimals));
    var integer = amount / denominator;
    var fractional = amount - integer * denominator;
    if (fractional === 0n)
        return "".concat(integer, " ").concat(token.symbol);
    var paddedFractional = fractional.toString().padStart(token.decimals, '0');
    return "".concat(integer, ".").concat(paddedFractional, " ").concat(token.symbol);
}
exports.tokenQuantityString = tokenQuantityString;
//# sourceMappingURL=Router.js.map