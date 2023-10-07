"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JetSwapProvider = void 0;
const chain_1 = require("@sushiswap/chain");
const LiquidityProvider_1 = require("./LiquidityProvider");
const UniswapV2Base_1 = require("./UniswapV2Base");
class JetSwapProvider extends UniswapV2Base_1.UniswapV2BaseProvider {
    constructor(chainId, web3Client, databaseClient) {
        const factory = {
            [chain_1.ChainId.POLYGON]: '0x668ad0ed2622C62E24f0d5ab6B6Ac1b9D2cD4AC7',
            [chain_1.ChainId.BSC]: '0x0eb58E5c8aA63314ff5547289185cC4583DfCBD5',
            [chain_1.ChainId.FANTOM]: '0xf6488205957f0b4497053d6422F49e27944eE3Dd',
        };
        const initCodeHash = {
            [chain_1.ChainId.POLYGON]: '0x505c843b83f01afef714149e8b174427d552e1aca4834b4f9b4b525f426ff3c6',
            [chain_1.ChainId.BSC]: '0x3125d0a15fa7af49ce234ba1cf5f931bad0504242e0e1ee9fcd7d1d7aa88c651',
            [chain_1.ChainId.FANTOM]: '0xa5e6089ea250dac750e4867fc4ce7f2a864bd94446564351fe9329f378963974',
        };
        super(chainId, web3Client, factory, initCodeHash, databaseClient);
    }
    getType() {
        return LiquidityProvider_1.LiquidityProviders.JetSwap;
    }
    getPoolProviderName() {
        return 'JetSwap';
    }
}
exports.JetSwapProvider = JetSwapProvider;
//# sourceMappingURL=JetSwap.js.map