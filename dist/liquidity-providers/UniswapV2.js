"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UniswapV2Provider = void 0;
const chain_1 = require("@sushiswap/chain");
const LiquidityProvider_1 = require("./LiquidityProvider");
const UniswapV2Base_1 = require("./UniswapV2Base");
class UniswapV2Provider extends UniswapV2Base_1.UniswapV2BaseProvider {
    constructor(chainId, web3Client, databaseClient) {
        const factory = {
            [chain_1.ChainId.ETHEREUM]: '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f',
        };
        const initCodeHash = {
            [chain_1.ChainId.ETHEREUM]: '0x96e8ac4277198ff8b6f785478aa9a39f403cb768dd02cbee326c3e7da348845f',
        };
        super(chainId, web3Client, factory, initCodeHash, databaseClient);
    }
    getType() {
        return LiquidityProvider_1.LiquidityProviders.UniswapV2;
    }
    getPoolProviderName() {
        return 'UniswapV2';
    }
}
exports.UniswapV2Provider = UniswapV2Provider;
//# sourceMappingURL=UniswapV2.js.map