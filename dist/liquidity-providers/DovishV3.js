"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DovishV3Provider = void 0;
const chain_1 = require("@sushiswap/chain");
const LiquidityProvider_1 = require("./LiquidityProvider");
const UniswapV3Base_1 = require("./UniswapV3Base");
class DovishV3Provider extends UniswapV3Base_1.UniswapV3BaseProvider {
    constructor(chainId, web3Client, databaseClient) {
        const factory = {
            [chain_1.ChainId.POLYGON_ZKEVM]: '0xdE474Db1Fa59898BC91314328D29507AcD0D593c',
        };
        const initCodeHash = {
            [chain_1.ChainId.POLYGON_ZKEVM]: '0xd3e7f58b9af034cfa7a0597e539bae7c6b393817a47a6fc1e1503cd6eaffe22a',
        };
        const tickLens = {
            [chain_1.ChainId.POLYGON_ZKEVM]: '0x0e88C06437891D2a56352eaa2bf0d107472eC0f4',
        };
        super(chainId, web3Client, factory, initCodeHash, tickLens, databaseClient);
    }
    getType() {
        return LiquidityProvider_1.LiquidityProviders.DovishV3;
    }
    getPoolProviderName() {
        return 'DovishV3';
    }
}
exports.DovishV3Provider = DovishV3Provider;
//# sourceMappingURL=DovishV3.js.map