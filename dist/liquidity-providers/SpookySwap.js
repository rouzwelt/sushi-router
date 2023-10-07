"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpookySwapProvider = void 0;
const chain_1 = require("@sushiswap/chain");
const LiquidityProvider_1 = require("./LiquidityProvider");
const UniswapV2Base_1 = require("./UniswapV2Base");
class SpookySwapProvider extends UniswapV2Base_1.UniswapV2BaseProvider {
    constructor(chainId, web3Client, databaseClient) {
        const factory = {
            [chain_1.ChainId.FANTOM]: '0x152eE697f2E276fA89E96742e9bB9aB1F2E61bE3',
        };
        const initCodeHash = {
            [chain_1.ChainId.FANTOM]: '0xcdf2deca40a0bd56de8e3ce5c7df6727e5b1bf2ac96f283fa9c4b3e6b42ea9d2',
        };
        super(chainId, web3Client, factory, initCodeHash, databaseClient);
    }
    getType() {
        return LiquidityProvider_1.LiquidityProviders.SpookySwap;
    }
    getPoolProviderName() {
        return 'SpookySwap';
    }
}
exports.SpookySwapProvider = SpookySwapProvider;
//# sourceMappingURL=SpookySwap.js.map