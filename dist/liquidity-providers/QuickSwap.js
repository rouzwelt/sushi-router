"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuickSwapProvider = void 0;
const chain_1 = require("@sushiswap/chain");
const LiquidityProvider_1 = require("./LiquidityProvider");
const UniswapV2Base_1 = require("./UniswapV2Base");
class QuickSwapProvider extends UniswapV2Base_1.UniswapV2BaseProvider {
    constructor(chainId, web3Client, databaseClient) {
        const factory = {
            [chain_1.ChainId.POLYGON]: '0x5757371414417b8C6CAad45bAeF941aBc7d3Ab32',
        };
        const initCodeHash = {
            [chain_1.ChainId.POLYGON]: '0x96e8ac4277198ff8b6f785478aa9a39f403cb768dd02cbee326c3e7da348845f',
        };
        super(chainId, web3Client, factory, initCodeHash, databaseClient);
    }
    getType() {
        return LiquidityProvider_1.LiquidityProviders.QuickSwap;
    }
    getPoolProviderName() {
        return 'QuickSwap';
    }
}
exports.QuickSwapProvider = QuickSwapProvider;
//# sourceMappingURL=QuickSwap.js.map