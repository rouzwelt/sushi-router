"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DfynProvider = void 0;
const chain_1 = require("@sushiswap/chain");
const LiquidityProvider_1 = require("./LiquidityProvider");
const UniswapV2Base_1 = require("./UniswapV2Base");
class DfynProvider extends UniswapV2Base_1.UniswapV2BaseProvider {
    constructor(chainId, web3Client, databaseClient) {
        const factory = {
            [chain_1.ChainId.POLYGON]: '0xE7Fb3e833eFE5F9c441105EB65Ef8b261266423B',
            [chain_1.ChainId.FANTOM]: '0xd9820a17053d6314B20642E465a84Bf01a3D64f5',
            [chain_1.ChainId.OKEX]: '0xE7Fb3e833eFE5F9c441105EB65Ef8b261266423B',
            [chain_1.ChainId.ARBITRUM]: '0xA102072A4C07F06EC3B4900FDC4C7B80b6c57429',
        };
        const initCodeHash = {
            [chain_1.ChainId.POLYGON]: '0xf187ed688403aa4f7acfada758d8d53698753b998a3071b06f1b777f4330eaf3',
            [chain_1.ChainId.FANTOM]: '0xd3ab2c392f54feb4b3b2a677f449b133c188ad2f1015eff3e94ea9315282c5f5',
            [chain_1.ChainId.OKEX]: '0xd9fecb0a9f5bfd6ce2daf90b441ed5860c3fed2fcde57ba9819eb98d2422e418',
            [chain_1.ChainId.ARBITRUM]: '0xd49917af2b31d70ba7bea89230a93b55d3b6a99aacd03a72c288dfe524ec2f36',
        };
        super(chainId, web3Client, factory, initCodeHash, databaseClient);
    }
    getType() {
        return LiquidityProvider_1.LiquidityProviders.Dfyn;
    }
    getPoolProviderName() {
        return 'Dfyn';
    }
}
exports.DfynProvider = DfynProvider;
//# sourceMappingURL=Dfyn.js.map