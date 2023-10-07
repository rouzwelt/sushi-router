"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HoneySwapProvider = void 0;
const chain_1 = require("@sushiswap/chain");
const LiquidityProvider_1 = require("./LiquidityProvider");
const UniswapV2Base_1 = require("./UniswapV2Base");
class HoneySwapProvider extends UniswapV2Base_1.UniswapV2BaseProvider {
    constructor(chainId, web3Client, databaseClient) {
        const factory = {
            [chain_1.ChainId.GNOSIS]: '0xA818b4F111Ccac7AA31D0BCc0806d64F2E0737D7',
        };
        const initCodeHash = {
            [chain_1.ChainId.GNOSIS]: '0x3f88503e8580ab941773b59034fb4b2a63e86dbc031b3633a925533ad3ed2b93',
        };
        super(chainId, web3Client, factory, initCodeHash, databaseClient);
    }
    getType() {
        return LiquidityProvider_1.LiquidityProviders.HoneySwap;
    }
    getPoolProviderName() {
        return 'HoneySwap';
    }
}
exports.HoneySwapProvider = HoneySwapProvider;
//# sourceMappingURL=HoneySwap.js.map