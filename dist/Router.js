"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenQuantityString = exports.Router = void 0;
const chain_1 = require("@sushiswap/chain");
const currency_1 = require("@sushiswap/currency");
const tines_1 = require("@sushiswap/tines");
const convert_1 = require("./lib/convert");
const LiquidityProvider_1 = require("./liquidity-providers/LiquidityProvider");
const Bridge_1 = require("./pools/Bridge");
const TinesToRouteProcessor_1 = require("./TinesToRouteProcessor");
const TinesToRouteProcessor2_1 = require("./TinesToRouteProcessor2");
const TinesToRouteProcessor4_1 = require("./TinesToRouteProcessor4");
function TokenToRToken(t) {
    if (t instanceof currency_1.Token)
        return t;
    const nativeRToken = {
        address: '',
        name: t.name,
        symbol: t.symbol,
        chainId: t.chainId,
        decimals: 18,
    };
    return nativeRToken;
}
class Router {
    static findRouteType(poolCodesMap, addresses) {
        if (addresses?.every((address) => {
            const poolName = poolCodesMap.get(address)?.poolName;
            return (poolName?.startsWith('Wrap') ||
                poolName?.startsWith(LiquidityProvider_1.LiquidityProviders.SushiSwapV2) ||
                poolName?.startsWith(LiquidityProvider_1.LiquidityProviders.SushiSwapV3) ||
                poolName?.startsWith(LiquidityProvider_1.LiquidityProviders.Trident) ||
                poolName?.startsWith(Bridge_1.Bridge.BentoBox));
        })) {
            return 'Internal';
        }
        else if (addresses?.some((address) => {
            const poolName = poolCodesMap.get(address)?.poolName;
            return (!poolName?.startsWith('Wrap') &&
                (poolName?.startsWith(LiquidityProvider_1.LiquidityProviders.SushiSwapV2) ||
                    poolName?.startsWith(LiquidityProvider_1.LiquidityProviders.SushiSwapV3) ||
                    poolName?.startsWith(LiquidityProvider_1.LiquidityProviders.Trident) ||
                    poolName?.startsWith(Bridge_1.Bridge.BentoBox)));
        }) &&
            addresses?.some((address) => {
                const poolName = poolCodesMap.get(address)?.poolName;
                return (!poolName?.startsWith('Wrap') &&
                    (!poolName?.startsWith(LiquidityProvider_1.LiquidityProviders.SushiSwapV2) ||
                        !poolName?.startsWith(LiquidityProvider_1.LiquidityProviders.SushiSwapV3) ||
                        !poolName?.startsWith(LiquidityProvider_1.LiquidityProviders.Trident) ||
                        !poolName?.startsWith(Bridge_1.Bridge.BentoBox)));
            })) {
            return 'Mix';
        }
        else if (addresses?.some((address) => {
            const poolName = poolCodesMap.get(address)?.poolName;
            return (poolName?.startsWith('Wrap') ||
                (!poolName?.startsWith(LiquidityProvider_1.LiquidityProviders.SushiSwapV2) &&
                    !poolName?.startsWith(LiquidityProvider_1.LiquidityProviders.SushiSwapV3) &&
                    !poolName?.startsWith(LiquidityProvider_1.LiquidityProviders.Trident) &&
                    !poolName?.startsWith(Bridge_1.Bridge.BentoBox)));
        })) {
            return 'External';
        }
        return 'Unknown';
    }
    static findSushiRoute(poolCodesMap, chainId, fromToken, amountIn, toToken, gasPrice) {
        return Router.findBestRoute(poolCodesMap, chainId, fromToken, amountIn, toToken, gasPrice, [
            LiquidityProvider_1.LiquidityProviders.NativeWrap,
            LiquidityProvider_1.LiquidityProviders.SushiSwapV2,
            LiquidityProvider_1.LiquidityProviders.SushiSwapV3,
            LiquidityProvider_1.LiquidityProviders.Trident,
        ]);
    }
    static findSpecialRoute(poolCodesMap, chainId, fromToken, amountIn, toToken, gasPrice, maxPriceImpact = 1 // 1%
    ) {
        // Find preferrable route
        const preferrableRoute = Router.findBestRoute(poolCodesMap, chainId, fromToken, amountIn, toToken, gasPrice, [
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
    }
    static findBestRoute(poolCodesMap, chainId, fromToken, amountIn, toToken, gasPrice, providers, // all providers if undefined
    poolFilter) {
        const networks = [
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
        let poolCodes = Array.from(poolCodesMap.values());
        if (providers) {
            poolCodes = poolCodes.filter((pc) => [...providers, LiquidityProvider_1.LiquidityProviders.NativeWrap].includes(pc.liquidityProvider));
        }
        let pools = Array.from(poolCodes).map((pc) => pc.pool);
        if (poolFilter)
            pools = pools.filter(poolFilter);
        const route = (0, tines_1.findMultiRouteExactIn)(TokenToRToken(fromToken), TokenToRToken(toToken), amountIn, pools, networks, gasPrice);
        return {
            ...route,
            legs: route.legs.map((l) => ({
                ...l,
                poolName: poolCodesMap.get(l.poolAddress)?.poolName ?? 'Unknown Pool',
            })),
        };
    }
    static routeProcessorParams(poolCodesMap, route, fromToken, toToken, to, RPAddr, maxPriceImpact = 0.005) {
        const tokenIn = fromToken instanceof currency_1.Token
            ? fromToken.address
            : fromToken.chainId === chain_1.ChainId.CELO
                ? currency_1.WNATIVE_ADDRESS[chain_1.ChainId.CELO] /*CELO native coin has ERC20 interface*/
                : '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE';
        const tokenOut = toToken instanceof currency_1.Token ? toToken.address : '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE';
        const amountOutMin = (route.amountOutBI * (0, tines_1.getBigInt)((1 - maxPriceImpact) * 1000000)) / 1000000n;
        return {
            tokenIn,
            amountIn: route.amountInBI,
            tokenOut,
            amountOutMin,
            to,
            routeCode: (0, TinesToRouteProcessor_1.getRouteProcessorCode)(route, RPAddr, to, poolCodesMap),
            value: fromToken instanceof currency_1.Token ? undefined : route.amountInBI,
        };
    }
    static routeProcessor2Params(poolCodesMap, route, fromToken, toToken, to, RPAddr, permits = [], maxPriceImpact = 0.005, source = TinesToRouteProcessor2_1.RouterLiquiditySource.Sender) {
        const tokenIn = fromToken instanceof currency_1.Token ? fromToken.address : '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE';
        const tokenOut = toToken instanceof currency_1.Token ? toToken.address : '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE';
        const amountOutMin = (route.amountOutBI * (0, tines_1.getBigInt)((1 - maxPriceImpact) * 1000000)) / 1000000n;
        return {
            tokenIn,
            amountIn: source === TinesToRouteProcessor2_1.RouterLiquiditySource.Sender ? route.amountInBI : 0n,
            tokenOut,
            amountOutMin,
            to,
            routeCode: (0, TinesToRouteProcessor2_1.getRouteProcessor2Code)(route, RPAddr, to, poolCodesMap, permits, source),
            value: fromToken instanceof currency_1.Token ? undefined : route.amountInBI,
        };
    }
    static routeProcessor3Params(poolCodesMap, route, fromToken, toToken, to, RPAddr, permits = [], maxPriceImpact = 0.005, source = TinesToRouteProcessor2_1.RouterLiquiditySource.Sender) {
        return Router.routeProcessor2Params(poolCodesMap, route, fromToken, toToken, to, RPAddr, permits, maxPriceImpact, source);
    }
    static routeProcessor4Params(poolCodesMap, route, fromToken, toToken, to, RPAddr, permits = [], maxPriceImpact = 0.005) {
        const tokenIn = fromToken instanceof currency_1.Token ? fromToken.address : '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE';
        const tokenOut = toToken instanceof currency_1.Token ? toToken.address : '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE';
        const amountOutMin = (route.amountOutBI * (0, tines_1.getBigInt)((1 - maxPriceImpact) * 1000000)) / 1000000n;
        return {
            tokenIn,
            amountIn: route.amountInBI,
            tokenOut,
            amountOutMin,
            to,
            routeCode: (0, TinesToRouteProcessor4_1.getRouteProcessor4Code)(route, RPAddr, to, poolCodesMap, permits),
            value: fromToken instanceof currency_1.Token ? undefined : route.amountInBI,
        };
    }
    // Human-readable route printing
    static routeToHumanString(poolCodesMap, route, fromToken, toToken, shiftPrimary = '', shiftSub = '    ') {
        let res = '';
        res += `${shiftPrimary}Route Status: ${route.status}\n`;
        res += `${shiftPrimary}Input: ${route.amountIn / 10 ** fromToken.decimals} ${fromToken.symbol}\n`;
        route.legs.forEach((l, i) => {
            res += `${shiftSub}${i + 1}. ${l.tokenFrom.symbol} ${Math.round(l.absolutePortion * 100)}% -> [${poolCodesMap.get(l.poolAddress)?.poolName}] -> ${l.tokenTo.symbol}\n`;
            //console.log(l.poolAddress, l.assumedAmountIn, l.assumedAmountOut)
        });
        const output = parseInt(route.amountOutBI.toString()) / 10 ** toToken.decimals;
        res += `${shiftPrimary}Output: ${output} ${route.toToken.symbol}`;
        return res;
    }
}
exports.Router = Router;
function tokenQuantityString(token, amount) {
    const denominator = 10n ** BigInt(token.decimals);
    const integer = amount / denominator;
    const fractional = amount - integer * denominator;
    if (fractional === 0n)
        return `${integer} ${token.symbol}`;
    const paddedFractional = fractional.toString().padStart(token.decimals, '0');
    return `${integer}.${paddedFractional} ${token.symbol}`;
}
exports.tokenQuantityString = tokenQuantityString;
//# sourceMappingURL=Router.js.map