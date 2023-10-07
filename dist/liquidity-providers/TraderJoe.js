"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TraderJoeProvider = void 0;
const chain_1 = require("@sushiswap/chain");
const LiquidityProvider_1 = require("./LiquidityProvider");
const UniswapV2Base_1 = require("./UniswapV2Base");
class TraderJoeProvider extends UniswapV2Base_1.UniswapV2BaseProvider {
    constructor(chainId, web3Client, databaseClient) {
        const factory = {
            [chain_1.ChainId.AVALANCHE]: '0x9Ad6C38BE94206cA50bb0d90783181662f0Cfa10',
        };
        const initCodeHash = {
            [chain_1.ChainId.AVALANCHE]: '0x0bbca9af0511ad1a1da383135cf3a8d2ac620e549ef9f6ae3a4c33c2fed0af91',
        };
        super(chainId, web3Client, factory, initCodeHash, databaseClient);
    }
    getType() {
        return LiquidityProvider_1.LiquidityProviders.TraderJoe;
    }
    getPoolProviderName() {
        return 'TraderJoe';
    }
}
exports.TraderJoeProvider = TraderJoeProvider;
//# sourceMappingURL=TraderJoe.js.map