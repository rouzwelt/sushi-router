"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BiswapProvider = void 0;
const chain_1 = require("@sushiswap/chain");
const LiquidityProvider_1 = require("./LiquidityProvider");
const UniswapV2Base_1 = require("./UniswapV2Base");
class BiswapProvider extends UniswapV2Base_1.UniswapV2BaseProvider {
    constructor(chainId, web3Client, databaseClient) {
        const factory = {
            [chain_1.ChainId.BSC]: '0x858E3312ed3A876947EA49d572A7C42DE08af7EE',
        };
        const initCodeHash = {
            [chain_1.ChainId.BSC]: '0xfea293c909d87cd4153593f077b76bb7e94340200f4ee84211ae8e4f9bd7ffdf',
        };
        super(chainId, web3Client, factory, initCodeHash, databaseClient);
        this.fee = 0.002;
    }
    getType() {
        return LiquidityProvider_1.LiquidityProviders.Biswap;
    }
    getPoolProviderName() {
        return 'Biswap';
    }
}
exports.BiswapProvider = BiswapProvider;
//# sourceMappingURL=Biswap.js.map