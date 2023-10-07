"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NetSwapProvider = void 0;
const chain_1 = require("@sushiswap/chain");
const LiquidityProvider_1 = require("./LiquidityProvider");
const UniswapV2Base_1 = require("./UniswapV2Base");
class NetSwapProvider extends UniswapV2Base_1.UniswapV2BaseProvider {
    constructor(chainId, web3Client, databaseClient) {
        const factory = {
            [chain_1.ChainId.METIS]: '0x70f51d68D16e8f9e418441280342BD43AC9Dff9f',
        };
        const initCodeHash = {
            [chain_1.ChainId.METIS]: '0x966d65068a6a30f10fd1fa814258637a34e059081d79daa94f3e2b6cec48e810',
        };
        super(chainId, web3Client, factory, initCodeHash, databaseClient);
    }
    getType() {
        return LiquidityProvider_1.LiquidityProviders.NetSwap;
    }
    getPoolProviderName() {
        return 'NetSwap';
    }
}
exports.NetSwapProvider = NetSwapProvider;
//# sourceMappingURL=NetSwap.js.map