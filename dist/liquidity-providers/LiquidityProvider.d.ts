import { ChainId } from '@sushiswap/chain';
import type { Token } from '@sushiswap/currency';
import { PublicClient } from 'viem';
import type { PoolCode } from '../pools/PoolCode';
export declare enum LiquidityProviders {
    SushiSwapV2 = "SushiSwapV2",
    SushiSwapV3 = "SushiSwapV3",
    UniswapV2 = "UniswapV2",
    UniswapV3 = "UniswapV3",
    Trident = "Trident",
    QuickSwap = "QuickSwap",
    ApeSwap = "ApeSwap",
    PancakeSwap = "PancakeSwap",
    TraderJoe = "TraderJoe",
    Dfyn = "Dfyn",
    Elk = "Elk",
    JetSwap = "JetSwap",
    SpookySwap = "SpookySwap",
    NetSwap = "NetSwap",
    NativeWrap = "NativeWrap",
    HoneySwap = "HoneySwap",
    UbeSwap = "UbeSwap",
    Biswap = "Biswap",
    CurveSwap = "CurveSwap",
    DovishV3 = "DovishV3",
    LaserSwap = "LaserSwap",
    Enosys = "Enosys",
    Camelot = "Camelot"
}
export declare abstract class LiquidityProvider {
    chainId: ChainId;
    client: PublicClient;
    lastUpdateBlock: number;
    readonly ON_DEMAND_POOLS_LIFETIME_IN_SECONDS = 60;
    readonly FETCH_AVAILABLE_POOLS_AFTER_SECONDS = 900;
    constructor(chainId: ChainId, client: PublicClient);
    abstract getType(): LiquidityProviders;
    /**
     * The name of liquidity provider to be used for pool naming. For example, 'SushiSwap'
     */
    abstract getPoolProviderName(): string;
    /**
     * Initiates event listeners for top pools
     */
    abstract startFetchPoolsData(): void;
    /**
     * Fetches relevant pools for the given tokens
     * @param t0 Token
     * @param t1 Token
     */
    abstract fetchPoolsForToken(t0: Token, t1: Token, excludePools?: Set<string>, options?: {
        blockNumber?: bigint;
        memoize?: boolean;
    }): Promise<void>;
    /**
     * Returns a list of PoolCode
     * @param t0 Token
     * @param t1 Token
     * @returns PoolCode[]
     */
    abstract getCurrentPoolList(t0: Token, t1: Token): PoolCode[];
    abstract stopFetchPoolsData(): void;
    /**
     * Returns last processed block number
     * @returns last processed block number
     */
    getLastUpdateBlock(): number;
    /**
     * Logs a message with the following format:
     * <chainId>~<lastUpdateBlock>~<providerName>
     * Example: 1~123456~SushiSwap
     * @returns string
     */
    getLogPrefix(): string;
    getTradeId: (t0: Token, t1: Token) => string;
}
