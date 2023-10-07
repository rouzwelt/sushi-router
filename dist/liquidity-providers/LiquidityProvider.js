"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LiquidityProvider = exports.LiquidityProviders = void 0;
var chain_1 = require("@sushiswap/chain");
var LiquidityProviders;
(function (LiquidityProviders) {
    LiquidityProviders["SushiSwapV2"] = "SushiSwapV2";
    LiquidityProviders["SushiSwapV3"] = "SushiSwapV3";
    LiquidityProviders["UniswapV2"] = "UniswapV2";
    LiquidityProviders["UniswapV3"] = "UniswapV3";
    LiquidityProviders["Trident"] = "Trident";
    LiquidityProviders["QuickSwap"] = "QuickSwap";
    LiquidityProviders["ApeSwap"] = "ApeSwap";
    LiquidityProviders["PancakeSwap"] = "PancakeSwap";
    LiquidityProviders["TraderJoe"] = "TraderJoe";
    LiquidityProviders["Dfyn"] = "Dfyn";
    LiquidityProviders["Elk"] = "Elk";
    LiquidityProviders["JetSwap"] = "JetSwap";
    LiquidityProviders["SpookySwap"] = "SpookySwap";
    LiquidityProviders["NetSwap"] = "NetSwap";
    LiquidityProviders["NativeWrap"] = "NativeWrap";
    LiquidityProviders["HoneySwap"] = "HoneySwap";
    LiquidityProviders["UbeSwap"] = "UbeSwap";
    LiquidityProviders["Biswap"] = "Biswap";
    LiquidityProviders["CurveSwap"] = "CurveSwap";
    LiquidityProviders["DovishV3"] = "DovishV3";
    LiquidityProviders["Wagmi"] = "Wagmi";
    LiquidityProviders["LaserSwap"] = "LaserSwap";
    LiquidityProviders["BaseSwap"] = "BaseSwap";
})(LiquidityProviders || (exports.LiquidityProviders = LiquidityProviders = {}));
var LiquidityProvider = /** @class */ (function () {
    function LiquidityProvider(chainId, client) {
        this.lastUpdateBlock = 0;
        this.ON_DEMAND_POOLS_LIFETIME_IN_SECONDS = 60;
        this.FETCH_AVAILABLE_POOLS_AFTER_SECONDS = 900;
        this.getTradeId = function (t0, t1) {
            return [t0.address.toLowerCase(), t1.address.toLowerCase()].sort(function (first, second) { return (first > second ? -1 : 1); }).join(':');
        };
        this.chainId = chainId;
        this.client = client;
    }
    /**
     * Returns last processed block number
     * @returns last processed block number
     */
    LiquidityProvider.prototype.getLastUpdateBlock = function () {
        return this.lastUpdateBlock;
    };
    /**
     * Logs a message with the following format:
     * <chainId>~<lastUpdateBlock>~<providerName>
     * Example: 1~123456~SushiSwap
     * @returns string
     */
    LiquidityProvider.prototype.getLogPrefix = function () {
        return "".concat(chain_1.chainShortName[this.chainId], "/").concat(this.chainId, "~").concat(this.lastUpdateBlock, "~").concat(this.getType());
    };
    return LiquidityProvider;
}());
exports.LiquidityProvider = LiquidityProvider;
//# sourceMappingURL=LiquidityProvider.js.map