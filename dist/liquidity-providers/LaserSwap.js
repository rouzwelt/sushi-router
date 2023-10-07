"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LaserSwapV2Provider = void 0;
const chain_1 = require("@sushiswap/chain");
const LiquidityProvider_1 = require("./LiquidityProvider");
const UniswapV2Base_1 = require("./UniswapV2Base");
class LaserSwapV2Provider extends UniswapV2Base_1.UniswapV2BaseProvider {
    constructor(chainId, web3Client, databaseClient) {
        const factory = {
            [chain_1.ChainId.THUNDERCORE]: '0x23c7FA9A9f81B322684F25b8079e22C37e00b46b',
        };
        const initCodeHash = {
            [chain_1.ChainId.THUNDERCORE]: '0x9d026965f89efe44dcdcb857289f65e798b9012bfc276b63ec2a4d9f7761e8a7',
        };
        super(chainId, web3Client, factory, initCodeHash, databaseClient);
        this.fee = 0.0025;
    }
    getType() {
        return LiquidityProvider_1.LiquidityProviders.LaserSwap;
    }
    getPoolProviderName() {
        return 'LaserSwap';
    }
}
exports.LaserSwapV2Provider = LaserSwapV2Provider;
//# sourceMappingURL=LaserSwap.js.map