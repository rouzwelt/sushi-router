"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PancakeSwapProvider = void 0;
const chain_1 = require("@sushiswap/chain");
const LiquidityProvider_1 = require("./LiquidityProvider");
const UniswapV2Base_1 = require("./UniswapV2Base");
class PancakeSwapProvider extends UniswapV2Base_1.UniswapV2BaseProvider {
    constructor(chainId, web3Client, databaseClient) {
        const factory = {
            [chain_1.ChainId.ETHEREUM]: '0x1097053Fd2ea711dad45caCcc45EfF7548fCB362',
            [chain_1.ChainId.BSC]: '0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73',
        };
        const initCodeHash = {
            [chain_1.ChainId.ETHEREUM]: '0x57224589c67f3f30a6b0d7a1b54cf3153ab84563bc609ef41dfb34f8b2974d2d',
            [chain_1.ChainId.BSC]: '0x00fb7f630766e6a796048ea87d01acd3068e8ff67d078148a3fa3f4a84f69bd5',
        };
        super(chainId, web3Client, factory, initCodeHash, databaseClient);
        this.fee = 0.0025;
    }
    getType() {
        return LiquidityProvider_1.LiquidityProviders.PancakeSwap;
    }
    getPoolProviderName() {
        return 'PancakeSwap';
    }
}
exports.PancakeSwapProvider = PancakeSwapProvider;
//# sourceMappingURL=PancakeSwap.js.map