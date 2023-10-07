"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UbeSwapProvider = void 0;
const chain_1 = require("@sushiswap/chain");
const LiquidityProvider_1 = require("./LiquidityProvider");
const UniswapV2Base_1 = require("./UniswapV2Base");
class UbeSwapProvider extends UniswapV2Base_1.UniswapV2BaseProvider {
    constructor(chainId, web3Client, databaseClient) {
        const factory = {
            [chain_1.ChainId.CELO]: '0x62d5b84bE28a183aBB507E125B384122D2C25fAE',
        };
        const initCodeHash = {
            [chain_1.ChainId.CELO]: '0xb3b8ff62960acea3a88039ebcf80699f15786f1b17cebd82802f7375827a339c',
        };
        super(chainId, web3Client, factory, initCodeHash, databaseClient);
    }
    getType() {
        return LiquidityProvider_1.LiquidityProviders.UbeSwap;
    }
    getPoolProviderName() {
        return 'UbeSwap';
    }
}
exports.UbeSwapProvider = UbeSwapProvider;
//# sourceMappingURL=UbeSwap.js.map