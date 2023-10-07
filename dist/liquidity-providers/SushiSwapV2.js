"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SushiSwapV2Provider = void 0;
const v2_sdk_1 = require("@sushiswap/v2-sdk");
const LiquidityProvider_1 = require("./LiquidityProvider");
const UniswapV2Base_1 = require("./UniswapV2Base");
class SushiSwapV2Provider extends UniswapV2Base_1.UniswapV2BaseProvider {
    constructor(chainId, web3Client, databaseClient) {
        const factory = v2_sdk_1.SUSHISWAP_V2_FACTORY_ADDRESS;
        super(chainId, web3Client, factory, v2_sdk_1.SUSHISWAP_V2_INIT_CODE_HASH, databaseClient);
    }
    getType() {
        return LiquidityProvider_1.LiquidityProviders.SushiSwapV2;
    }
    getPoolProviderName() {
        return 'SushiSwapV2';
    }
}
exports.SushiSwapV2Provider = SushiSwapV2Provider;
//# sourceMappingURL=SushiSwapV2.js.map