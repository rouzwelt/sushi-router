"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NativeWrapProvider = void 0;
const currency_1 = require("@sushiswap/currency");
const tines_1 = require("@sushiswap/tines");
const NativeWrapBridge_1 = require("../pools/NativeWrapBridge");
const LiquidityProvider_1 = require("./LiquidityProvider");
class NativeWrapProvider extends LiquidityProvider_1.LiquidityProvider {
    constructor(chainId, client) {
        super(chainId, client);
        const native = currency_1.Native.onChain(chainId);
        const nativeRToken = {
            address: '',
            name: native.name,
            symbol: native.symbol,
            chainId: chainId,
            decimals: 18,
        };
        const bridge = new tines_1.BridgeUnlimited(currency_1.WNATIVE_ADDRESS[chainId], nativeRToken, currency_1.WNATIVE[chainId], 0, 50000);
        this.poolCodes = [new NativeWrapBridge_1.NativeWrapBridgePoolCode(bridge, LiquidityProvider_1.LiquidityProviders.NativeWrap)];
        this.lastUpdateBlock = -1;
    }
    getType() {
        return LiquidityProvider_1.LiquidityProviders.NativeWrap;
    }
    getPoolProviderName() {
        return 'NativeWrap';
    }
    startFetchPoolsData() { }
    async fetchPoolsForToken() { }
    getCurrentPoolList() {
        return this.poolCodes;
    }
    stopFetchPoolsData() { }
}
exports.NativeWrapProvider = NativeWrapProvider;
//# sourceMappingURL=NativeWrapProvider.js.map