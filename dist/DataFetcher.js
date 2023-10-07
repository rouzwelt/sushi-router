"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataFetcher = void 0;
const bentobox_1 = require("@sushiswap/bentobox");
const viem_config_1 = require("@sushiswap/viem-config");
const viem_1 = require("viem");
const ApeSwap_1 = require("./liquidity-providers/ApeSwap");
const Biswap_1 = require("./liquidity-providers/Biswap");
const CurveProvider_1 = require("./liquidity-providers/CurveProvider");
const Dfyn_1 = require("./liquidity-providers/Dfyn");
const DovishV3_1 = require("./liquidity-providers/DovishV3");
const Elk_1 = require("./liquidity-providers/Elk");
const HoneySwap_1 = require("./liquidity-providers/HoneySwap");
const JetSwap_1 = require("./liquidity-providers/JetSwap");
const LaserSwap_1 = require("./liquidity-providers/LaserSwap");
const LiquidityProvider_1 = require("./liquidity-providers/LiquidityProvider");
const NativeWrapProvider_1 = require("./liquidity-providers/NativeWrapProvider");
const NetSwap_1 = require("./liquidity-providers/NetSwap");
const PancakeSwap_1 = require("./liquidity-providers/PancakeSwap");
const QuickSwap_1 = require("./liquidity-providers/QuickSwap");
const SpookySwap_1 = require("./liquidity-providers/SpookySwap");
const SushiSwapV2_1 = require("./liquidity-providers/SushiSwapV2");
const SushiSwapV3_1 = require("./liquidity-providers/SushiSwapV3");
const TraderJoe_1 = require("./liquidity-providers/TraderJoe");
const Trident_1 = require("./liquidity-providers/Trident");
const UbeSwap_1 = require("./liquidity-providers/UbeSwap");
const UniswapV2_1 = require("./liquidity-providers/UniswapV2");
const UniswapV3_1 = require("./liquidity-providers/UniswapV3");
const trident_sdk_1 = require("./trident-sdk");
// import { create } from 'viem'
const isTest = process.env.NODE_ENV === 'test' || process.env.NEXT_PUBLIC_TEST === 'true';
// Gathers pools info, creates routing in 'incremental' mode
// This means that new routing recalculates each time new pool fetching data comes
class DataFetcher {
    static onChain(chainId) {
        if (chainId in this.cache) {
            return this.cache[chainId];
        }
        this.cache[chainId] = new DataFetcher(chainId);
        return this.cache[chainId];
    }
    constructor(chainId, web3Client, databaseClient) {
        this.providers = [];
        // Provider to poolAddress to PoolCode
        this.poolCodes = new Map();
        this.stateId = 0;
        this.databaseClient = undefined;
        this.chainId = chainId;
        if (!web3Client && !viem_config_1.config[chainId]) {
            throw new Error(`No viem client or config for chainId ${chainId}`);
        }
        if (web3Client) {
            this.web3Client = web3Client;
        }
        else {
            this.web3Client = (0, viem_1.createPublicClient)({
                ...viem_config_1.config[chainId],
                transport: isTest ? (0, viem_1.http)('http://127.0.0.1:8545') : viem_config_1.config[chainId].transport,
                pollingInterval: 8000,
                batch: {
                    multicall: {
                        batchSize: 512,
                    },
                },
            });
        }
        this.databaseClient = databaseClient;
    }
    _providerIsIncluded(lp, liquidity) {
        if (!liquidity)
            return true;
        if (lp === LiquidityProvider_1.LiquidityProviders.NativeWrap)
            return true;
        return liquidity.some((l) => l === lp);
    }
    // Starts pool data fetching
    startDataFetching(providers // all providers if undefined
    ) {
        this.stopDataFetching();
        this.poolCodes = new Map();
        this.providers = [new NativeWrapProvider_1.NativeWrapProvider(this.chainId, this.web3Client)];
        if (this._providerIsIncluded(LiquidityProvider_1.LiquidityProviders.SushiSwapV2, providers)) {
            try {
                const provider = new SushiSwapV2_1.SushiSwapV2Provider(this.chainId, this.web3Client, this.databaseClient);
                this.providers.push(provider);
            }
            catch (e) {
                // console.warn(e.message)
            }
        }
        if (this._providerIsIncluded(LiquidityProvider_1.LiquidityProviders.Trident, providers) &&
            (0, bentobox_1.isBentoBoxV1ChainId)(this.chainId) &&
            ((0, trident_sdk_1.isTridentConstantPoolFactoryChainId)(this.chainId) || (0, trident_sdk_1.isTridentStablePoolFactoryChainId)(this.chainId))) {
            try {
                const provider = new Trident_1.TridentProvider(this.chainId, this.web3Client, this.databaseClient);
                this.providers.push(provider);
            }
            catch (e) {
                // console.warn(e.message)
            }
        }
        if (this._providerIsIncluded(LiquidityProvider_1.LiquidityProviders.SushiSwapV3, providers)) {
            try {
                const provider = new SushiSwapV3_1.SushiSwapV3Provider(this.chainId, this.web3Client, this.databaseClient);
                this.providers.push(provider);
            }
            catch (e) {
                // console.warn(e.message)
            }
        }
        if (this._providerIsIncluded(LiquidityProvider_1.LiquidityProviders.UniswapV3, providers)) {
            try {
                const provider = new UniswapV3_1.UniswapV3Provider(this.chainId, this.web3Client, this.databaseClient);
                this.providers.push(provider);
            }
            catch (e) {
                // console.warn(e.message)
            }
        }
        if (this._providerIsIncluded(LiquidityProvider_1.LiquidityProviders.ApeSwap, providers)) {
            try {
                const provider = new ApeSwap_1.ApeSwapProvider(this.chainId, this.web3Client, this.databaseClient);
                this.providers.push(provider);
            }
            catch (e) {
                // console.warn(e.message)
            }
        }
        if (this._providerIsIncluded(LiquidityProvider_1.LiquidityProviders.Biswap, providers)) {
            try {
                const provider = new Biswap_1.BiswapProvider(this.chainId, this.web3Client, this.databaseClient);
                this.providers.push(provider);
            }
            catch (e) {
                // console.warn(e.message)
            }
        }
        if (this._providerIsIncluded(LiquidityProvider_1.LiquidityProviders.Dfyn, providers)) {
            try {
                const provider = new Dfyn_1.DfynProvider(this.chainId, this.web3Client, this.databaseClient);
                this.providers.push(provider);
            }
            catch (e) {
                // console.warn(e.message)
            }
        }
        if (this._providerIsIncluded(LiquidityProvider_1.LiquidityProviders.Elk, providers)) {
            try {
                const provider = new Elk_1.ElkProvider(this.chainId, this.web3Client, this.databaseClient);
                this.providers.push(provider);
            }
            catch (e) {
                // console.warn(e.message)
            }
        }
        if (this._providerIsIncluded(LiquidityProvider_1.LiquidityProviders.HoneySwap, providers)) {
            try {
                const provider = new HoneySwap_1.HoneySwapProvider(this.chainId, this.web3Client, this.databaseClient);
                this.providers.push(provider);
            }
            catch (e) {
                // console.warn(e.message)
            }
        }
        if (this._providerIsIncluded(LiquidityProvider_1.LiquidityProviders.JetSwap, providers)) {
            try {
                const provider = new JetSwap_1.JetSwapProvider(this.chainId, this.web3Client, this.databaseClient);
                this.providers.push(provider);
            }
            catch (e) {
                // console.warn(e.message)
            }
        }
        if (this._providerIsIncluded(LiquidityProvider_1.LiquidityProviders.NetSwap, providers)) {
            try {
                const provider = new NetSwap_1.NetSwapProvider(this.chainId, this.web3Client, this.databaseClient);
                this.providers.push(provider);
            }
            catch (e) {
                // console.warn(e.message)
            }
        }
        if (this._providerIsIncluded(LiquidityProvider_1.LiquidityProviders.PancakeSwap, providers)) {
            try {
                const provider = new PancakeSwap_1.PancakeSwapProvider(this.chainId, this.web3Client, this.databaseClient);
                this.providers.push(provider);
            }
            catch (e) {
                // console.warn(e.message)
            }
        }
        if (this._providerIsIncluded(LiquidityProvider_1.LiquidityProviders.QuickSwap, providers)) {
            try {
                const provider = new QuickSwap_1.QuickSwapProvider(this.chainId, this.web3Client, this.databaseClient);
                this.providers.push(provider);
            }
            catch (e) {
                // console.warn(e.message)
            }
        }
        if (this._providerIsIncluded(LiquidityProvider_1.LiquidityProviders.SpookySwap, providers)) {
            try {
                const provider = new SpookySwap_1.SpookySwapProvider(this.chainId, this.web3Client, this.databaseClient);
                this.providers.push(provider);
            }
            catch (e) {
                // console.warn(e.message)
            }
        }
        if (this._providerIsIncluded(LiquidityProvider_1.LiquidityProviders.TraderJoe, providers)) {
            try {
                const provider = new TraderJoe_1.TraderJoeProvider(this.chainId, this.web3Client, this.databaseClient);
                this.providers.push(provider);
            }
            catch (e) {
                // console.warn(e.message)
            }
        }
        if (this._providerIsIncluded(LiquidityProvider_1.LiquidityProviders.UbeSwap, providers)) {
            try {
                const provider = new UbeSwap_1.UbeSwapProvider(this.chainId, this.web3Client, this.databaseClient);
                this.providers.push(provider);
            }
            catch (e) {
                // console.warn(e.message)
            }
        }
        if (this._providerIsIncluded(LiquidityProvider_1.LiquidityProviders.UniswapV2, providers)) {
            try {
                const provider = new UniswapV2_1.UniswapV2Provider(this.chainId, this.web3Client, this.databaseClient);
                this.providers.push(provider);
            }
            catch (e) {
                // console.warn(e.message)
            }
        }
        if (this._providerIsIncluded(LiquidityProvider_1.LiquidityProviders.CurveSwap, providers)) {
            try {
                const provider = new CurveProvider_1.CurveProvider(this.chainId, this.web3Client);
                this.providers.push(provider);
            }
            catch (e) {
                // console.warn(e.message)
            }
        }
        if (this._providerIsIncluded(LiquidityProvider_1.LiquidityProviders.DovishV3, providers)) {
            try {
                const provider = new DovishV3_1.DovishV3Provider(this.chainId, this.web3Client);
                this.providers.push(provider);
            }
            catch (e) {
                // console.warn(e.message)
            }
        }
        if (this._providerIsIncluded(LiquidityProvider_1.LiquidityProviders.LaserSwap, providers)) {
            try {
                const provider = new LaserSwap_1.LaserSwapV2Provider(this.chainId, this.web3Client);
                this.providers.push(provider);
            }
            catch (e) {
                // console.warn(e.message)
            }
        }
        // console.log(
        //   `${chainShortName[this.chainId]}/${this.chainId} - Included providers: ${this.providers
        //     .map((p) => p.getType())
        //     .join(', ')}`
        // )
        this.providers.forEach((p) => p.startFetchPoolsData());
    }
    // To stop fetch pool data
    stopDataFetching() {
        this.providers.forEach((p) => p.stopFetchPoolsData());
    }
    async fetchPoolsForToken(currency0, currency1, excludePools, options) {
        // ensure that we only fetch the native wrap pools if the token is the native currency and wrapped native currency
        if (currency0.wrapped.equals(currency1.wrapped)) {
            const provider = this.providers.find((p) => p.getType() === LiquidityProvider_1.LiquidityProviders.NativeWrap);
            if (provider) {
                try {
                    await provider.fetchPoolsForToken(currency0.wrapped, currency1.wrapped, excludePools, options);
                }
                catch { /**/ }
            }
        }
        else {
            const [token0, token1] = currency0.wrapped.equals(currency1.wrapped) || currency0.wrapped.sortsBefore(currency1.wrapped)
                ? [currency0.wrapped, currency1.wrapped]
                : [currency1.wrapped, currency0.wrapped];
            await Promise.allSettled(this.providers.map((p) => p.fetchPoolsForToken(token0, token1, excludePools, options)));
        }
    }
    getCurrentPoolCodeMap(currency0, currency1) {
        const result = new Map();
        this.providers.forEach((p) => {
            const poolCodes = p.getCurrentPoolList(currency0.wrapped, currency1.wrapped);
            poolCodes.forEach((pc) => result.set(pc.pool.address, pc));
        });
        return result;
    }
    getCurrentPoolCodeList(currency0, currency1) {
        const pcMap = this.getCurrentPoolCodeMap(currency0.wrapped, currency1.wrapped);
        return Array.from(pcMap.values());
    }
    // returns the last processed by all LP block number
    getLastUpdateBlock(providers) {
        let lastUpdateBlock;
        this.providers.forEach((p) => {
            if (this._providerIsIncluded(p.getType(), providers)) {
                const last = p.getLastUpdateBlock();
                if (last < 0)
                    return;
                if (lastUpdateBlock === undefined)
                    lastUpdateBlock = last;
                else
                    lastUpdateBlock = Math.min(lastUpdateBlock, last);
            }
        });
        return lastUpdateBlock === undefined ? 0 : lastUpdateBlock;
    }
}
exports.DataFetcher = DataFetcher;
// TODO: maybe use an actual map
// private static cache = new Map<number, DataFetcher>()
DataFetcher.cache = {};
//# sourceMappingURL=DataFetcher.js.map