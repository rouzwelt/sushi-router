"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.DfynProvider = void 0;
var chain_1 = require("@sushiswap/chain");
var LiquidityProvider_1 = require("./LiquidityProvider");
var UniswapV2Base_1 = require("./UniswapV2Base");
var DfynProvider = /** @class */ (function (_super) {
    var _a, _b;
    __extends(DfynProvider, _super);
    function DfynProvider(chainId, web3Client, databaseClient) {
        var factory = (_a = {},
            _a[chain_1.ChainId.POLYGON] = '0xE7Fb3e833eFE5F9c441105EB65Ef8b261266423B',
            _a[chain_1.ChainId.FANTOM] = '0xd9820a17053d6314B20642E465a84Bf01a3D64f5',
            _a[chain_1.ChainId.OKEX] = '0xE7Fb3e833eFE5F9c441105EB65Ef8b261266423B',
            _a[chain_1.ChainId.ARBITRUM] = '0xA102072A4C07F06EC3B4900FDC4C7B80b6c57429',
            _a);
        var initCodeHash = (_b = {},
            _b[chain_1.ChainId.POLYGON] = '0xf187ed688403aa4f7acfada758d8d53698753b998a3071b06f1b777f4330eaf3',
            _b[chain_1.ChainId.FANTOM] = '0xd3ab2c392f54feb4b3b2a677f449b133c188ad2f1015eff3e94ea9315282c5f5',
            _b[chain_1.ChainId.OKEX] = '0xd9fecb0a9f5bfd6ce2daf90b441ed5860c3fed2fcde57ba9819eb98d2422e418',
            _b[chain_1.ChainId.ARBITRUM] = '0xd49917af2b31d70ba7bea89230a93b55d3b6a99aacd03a72c288dfe524ec2f36',
            _b);
        return _super.call(this, chainId, web3Client, factory, initCodeHash, databaseClient) || this;
    }
    DfynProvider.prototype.getType = function () {
        return LiquidityProvider_1.LiquidityProviders.Dfyn;
    };
    DfynProvider.prototype.getPoolProviderName = function () {
        return 'Dfyn';
    };
    return DfynProvider;
}(UniswapV2Base_1.UniswapV2BaseProvider));
exports.DfynProvider = DfynProvider;
//# sourceMappingURL=Dfyn.js.map