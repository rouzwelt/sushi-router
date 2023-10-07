"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LiquidityProvider = exports.LiquidityProviders = void 0;
const chain_1 = require("@sushiswap/chain");
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
class LiquidityProvider {
    constructor(chainId, client) {
        this.lastUpdateBlock = 0;
        this.ON_DEMAND_POOLS_LIFETIME_IN_SECONDS = 60;
        this.FETCH_AVAILABLE_POOLS_AFTER_SECONDS = 900;
        this.getTradeId = (t0, t1) => [t0.address.toLowerCase(), t1.address.toLowerCase()].sort((first, second) => (first > second ? -1 : 1)).join(':');
        this.chainId = chainId;
        this.client = client;
    }
    /**
     * Returns last processed block number
     * @returns last processed block number
     */
    getLastUpdateBlock() {
        return this.lastUpdateBlock;
    }
    /**
     * Logs a message with the following format:
     * <chainId>~<lastUpdateBlock>~<providerName>
     * Example: 1~123456~SushiSwap
     * @returns string
     */
    getLogPrefix() {
        return `${chain_1.chainShortName[this.chainId]}/${this.chainId}~${this.lastUpdateBlock}~${this.getType()}`;
    }
}
exports.LiquidityProvider = LiquidityProvider;
//# sourceMappingURL=LiquidityProvider.js.map