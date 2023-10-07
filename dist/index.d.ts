declare module "DataFetcher.test" {
    export {};
}
declare module "getCurrencyCombinations" {
    import { ChainId } from '@sushiswap/chain';
    import { Token, Type } from '@sushiswap/currency';
    export function getCurrencyCombinations(chainId: ChainId, currencyA: Type, currencyB: Type): [Token, Token][];
    export function getV3CurrencyCombinations(chainId: ChainId, currencyA: Type, currencyB: Type): [Token, Token][];
}
declare module "HEXer" {
    import type { BigNumber } from 'ethers';
    export class HEXer {
        private hex;
        constructor();
        toString(): string;
        toHexString(): `0x${string}`;
        toString0x(): `0x${string}`;
        uint8(data: number): HEXer;
        bool(data: boolean): HEXer;
        uint16(data: number): HEXer;
        uint24(data: number): HEXer;
        share16(share: number): HEXer;
        uint32(data: number): HEXer;
        uint256(data: BigNumber | number): HEXer;
        uint(data: BigNumber | number): HEXer;
        address(addr: string): HEXer;
        hexData(data: string): HEXer;
        bytes(data: string): HEXer;
        bytes32(data: string): HEXer;
    }
}
declare module "pools/CurvePool" {
    import type { CurvePool, MultiRoute, RouteLeg } from '@sushiswap/tines';
    import { LiquidityProviders } from "liquidity-providers/index";
    import { PoolCode } from "pools/PoolCode";
    export class CurvePoolCode extends PoolCode {
        constructor(pool: CurvePool, liquidityProvider: LiquidityProviders, providerName: string);
        getStartPoint(): string;
        getSwapCodeForRouteProcessor(): string;
        getSwapCodeForRouteProcessor2(): string;
        getSwapCodeForRouteProcessor4(leg: RouteLeg, route: MultiRoute, to: string): string;
    }
}
declare module "liquidity-providers/CurveProvider" {
    import { Token, Type } from '@sushiswap/currency';
    import { PublicClient } from 'viem';
    import { PoolCode } from "pools/PoolCode";
    import { LiquidityProvider, LiquidityProviders } from "liquidity-providers/LiquidityProvider";
    export const sETH: Token;
    export enum CurvePoolType {
        Legacy = "Legacy",
        LegacyV2 = "LegacyV2",
        LegacyV3 = "LegacyV3",
        Factory = "Factory"
    }
    export const CURVE_NON_FACTORY_POOLS: Record<number, [string, CurvePoolType, Type, Type][]>;
    export const CURVE_FACTORY_ADDRESSES: {
        1: any[];
    };
    export function getAllSupportedCurvePools(publicClient: PublicClient): Promise<Map<string, CurvePoolType>>;
    export class CurveProvider extends LiquidityProvider {
        foundPools: PoolCode[];
        getType(): LiquidityProviders;
        /**
         * The name of liquidity provider to be used for pool naming. For example, 'SushiSwap'
         */
        getPoolProviderName(): string;
        /**
         * Initiates event listeners for top pools
         */
        startFetchPoolsData(): void;
        getPoolsForTokens(t0: Token, t1: Token, excludePools?: Set<string>): Promise<Map<string, [CurvePoolType, Type, Type]>>;
        getPoolRatio(pools: [string, [CurvePoolType, Type, Type]][]): Promise<(number | undefined)[]>;
        getCurvePoolCodes(pools: Map<string, [CurvePoolType, Type, Type]>): Promise<PoolCode[]>;
        /**
         * Fetches relevant pools for the given tokens
         * @param t0 Token
         * @param t1 Token
         */
        fetchPoolsForToken(t0: Token, t1: Token, excludePools?: Set<string>): Promise<void>;
        /**
         * Returns a list of PoolCode
         * @returns PoolCode[]
         */
        getCurrentPoolList(): PoolCode[];
        stopFetchPoolsData(): void;
    }
}
declare module "pools/NativeWrapBridge" {
    import type { BridgeUnlimited, MultiRoute, RouteLeg } from '@sushiswap/tines';
    import { LiquidityProviders } from "liquidity-providers/index";
    import { PoolCode } from "pools/PoolCode";
    export class NativeWrapBridgePoolCode extends PoolCode {
        constructor(pool: BridgeUnlimited, liquidityProvider: LiquidityProviders);
        getStartPoint(): string;
        getSwapCodeForRouteProcessor(leg: RouteLeg): string;
        getSwapCodeForRouteProcessor2(leg: RouteLeg, _route: MultiRoute, to: string): string;
    }
}
declare module "liquidity-providers/NativeWrapProvider" {
    import type { ChainId } from '@sushiswap/chain';
    import { PublicClient } from 'viem';
    import type { PoolCode } from "pools/PoolCode";
    import { LiquidityProvider, LiquidityProviders } from "liquidity-providers/LiquidityProvider";
    export class NativeWrapProvider extends LiquidityProvider {
        poolCodes: PoolCode[];
        constructor(chainId: ChainId, client: PublicClient);
        getType(): LiquidityProviders;
        getPoolProviderName(): string;
        startFetchPoolsData(): void;
        fetchPoolsForToken(): Promise<void>;
        getCurrentPoolList(): PoolCode[];
        stopFetchPoolsData(): void;
    }
}
declare module "pools/UniV3Pool" {
    import type { MultiRoute, RouteLeg, UniV3Pool } from '@sushiswap/tines';
    import { LiquidityProviders } from "liquidity-providers/index";
    import { PoolCode } from "pools/PoolCode";
    export class UniV3PoolCode extends PoolCode {
        constructor(pool: UniV3Pool, liquidityProvider: LiquidityProviders, providerName: string);
        getStartPoint(): string;
        getSwapCodeForRouteProcessor(leg: RouteLeg, route: MultiRoute, to: string): string;
        getSwapCodeForRouteProcessor2(leg: RouteLeg, _route: MultiRoute, to: string): string;
    }
}
declare module "liquidity-providers/UniswapV3Base" {
    import { ChainId } from '@sushiswap/chain';
    import { Token } from '@sushiswap/currency';
    import { FeeAmount } from '@sushiswap/v3-sdk';
    import { Address, PublicClient } from 'viem';
    import type { PoolCode } from "pools/PoolCode";
    import { LiquidityProvider } from "liquidity-providers/LiquidityProvider";
    interface StaticPool {
        address: Address;
        token0: Token;
        token1: Token;
        fee: FeeAmount;
    }
    export const NUMBER_OF_SURROUNDING_TICKS = 1000;
    export abstract class UniswapV3BaseProvider extends LiquidityProvider {
        poolsByTrade: Map<string, string[]>;
        pools: Map<string, PoolCode>;
        blockListener?: () => void;
        unwatchBlockNumber?: () => void;
        isInitialized: boolean;
        factory: {
            [chainId: number]: Address;
        };
        initCodeHash: {
            [chainId: number]: string;
        };
        tickLens: {
            [chainId: number]: string;
        };
        constructor(chainId: ChainId, web3Client: PublicClient, factory: {
            [chainId: number]: Address;
        }, initCodeHash: {
            [chainId: number]: string;
        }, tickLens: {
            [chainId: number]: string;
        });
        fetchPoolsForToken(t0: Token, t1: Token, excludePools?: Set<string>, options?: {
            blockNumber?: bigint;
        }): Promise<void>;
        getStaticPools(t1: Token, t2: Token): StaticPool[];
        startFetchPoolsData(): void;
        getCurrentPoolList(): PoolCode[];
        stopFetchPoolsData(): void;
    }
}
declare module "liquidity-providers/index" {
    export * from "liquidity-providers/CurveProvider";
    export * from "liquidity-providers/LiquidityProvider";
    export * from "liquidity-providers/NativeWrapProvider";
    export { NUMBER_OF_SURROUNDING_TICKS } from "liquidity-providers/UniswapV3Base";
}
declare module "pools/PoolCode" {
    import type { MultiRoute, RouteLeg, RPool } from '@sushiswap/tines';
    import type { BigNumber } from 'ethers';
    import { LiquidityProviders } from "liquidity-providers/index";
    export abstract class PoolCode {
        pool: RPool;
        liquidityProvider: LiquidityProviders;
        poolName: string;
        constructor(pool: RPool, liquidityProvider: LiquidityProviders, poolName: string);
        static RouteProcessorAddress: string;
        getStartPoint(_leg: RouteLeg, _route: MultiRoute): string;
        abstract getSwapCodeForRouteProcessor(leg: RouteLeg, route: MultiRoute, to: string, exactAmount?: BigNumber): string;
        getSwapCodeForRouteProcessor2(_leg: RouteLeg, _route: MultiRoute, _to: string): string;
        getSwapCodeForRouteProcessor4(leg: RouteLeg, route: MultiRoute, to: string): string;
    }
}
declare module "liquidity-providers/LiquidityProvider" {
    import { ChainId } from '@sushiswap/chain';
    import type { Token } from '@sushiswap/currency';
    import { PublicClient } from 'viem';
    import type { PoolCode } from "pools/PoolCode";
    export enum LiquidityProviders {
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
        LaserSwap = "LaserSwap"
    }
    export abstract class LiquidityProvider {
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
}
declare module "lib/api" {
    import { Token } from '@sushiswap/currency';
    export interface PoolResponse2 {
        type: string;
        address: string;
        twapEnabled: boolean;
        swapFee: number;
        liquidityUSD: string;
        isWhitelisted: true;
        token0: {
            symbol: string;
            address: string;
            status: string;
            id: string;
            name: string;
            decimals: number;
            isFeeOnTransfer: boolean;
            isCommon: boolean;
        };
        token1: {
            symbol: string;
            address: string;
            status: string;
            id: string;
            name: string;
            decimals: number;
            isFeeOnTransfer: boolean;
            isCommon: boolean;
        };
    }
    export function filterOnDemandPools(pools: PoolResponse2[], token0Address: string, token1Address: string, topPoolAddresses: string[], size: number): PoolResponse2[];
    export function filterTopPools(pools: PoolResponse2[], size: number): PoolResponse2[];
    export function mapToken(chainId: number, { address, decimals, symbol, name, }: {
        address: string;
        decimals: number;
        symbol: string;
        name: string;
    }): Token;
}
declare module "pools/ConstantProductPool" {
    import type { ConstantProductRPool, MultiRoute, RouteLeg } from '@sushiswap/tines';
    import { LiquidityProviders } from "liquidity-providers/index";
    import { PoolCode } from "pools/PoolCode";
    export class ConstantProductPoolCode extends PoolCode {
        constructor(pool: ConstantProductRPool, liquidityProvider: LiquidityProviders, providerName: string);
        getSwapCodeForRouteProcessor(leg: RouteLeg, _route: MultiRoute, to: string): string;
        getSwapCodeForRouteProcessor2(leg: RouteLeg, _route: MultiRoute, to: string): string;
        getSwapCodeForRouteProcessor4(leg: RouteLeg, _route: MultiRoute, to: string): string;
    }
}
declare module "liquidity-providers/UniswapV2Base" {
    import { ChainId } from '@sushiswap/chain';
    import { Token } from '@sushiswap/currency';
    import { Address, PublicClient } from 'viem';
    import { PoolResponse2 } from "lib/api";
    import type { PoolCode } from "pools/PoolCode";
    import { LiquidityProvider } from "liquidity-providers/LiquidityProvider";
    interface PoolInfo {
        poolCode: PoolCode;
        validUntilTimestamp: number;
    }
    interface StaticPool {
        address: string;
        token0: Token;
        token1: Token;
        fee: number;
    }
    export abstract class UniswapV2BaseProvider extends LiquidityProvider {
        readonly TOP_POOL_SIZE = 155;
        readonly TOP_POOL_LIQUIDITY_THRESHOLD = 5000;
        readonly ON_DEMAND_POOL_SIZE = 20;
        readonly REFRESH_INITIAL_POOLS_INTERVAL = 60;
        topPools: Map<string, PoolCode>;
        poolsByTrade: Map<string, string[]>;
        onDemandPools: Map<string, PoolInfo>;
        availablePools: Map<string, PoolResponse2>;
        staticPools: Map<string, PoolResponse2>;
        blockListener?: () => void;
        unwatchBlockNumber?: () => void;
        fee: number;
        isInitialized: boolean;
        factory: {
            [chainId: number]: Address;
        };
        initCodeHash: {
            [chainId: number]: string;
        };
        latestPoolCreatedAtTimestamp: Date;
        discoverNewPoolsTimestamp: number;
        refreshAvailablePoolsTimestamp: number;
        constructor(chainId: ChainId, web3Client: PublicClient, factory: {
            [chainId: number]: Address;
        }, initCodeHash: {
            [chainId: number]: string;
        });
        getOnDemandPools(t0: Token, t1: Token, excludePools?: Set<string>, options?: {
            blockNumber?: bigint;
        }): Promise<void>;
        _getPoolAddress(t1: Token, t2: Token): string;
        _getProspectiveTokens(t0: Token, t1: Token): Token[];
        getStaticPools(t1: Token, t2: Token): StaticPool[];
        startFetchPoolsData(): void;
        fetchPoolsForToken(t0: Token, t1: Token, excludePools?: Set<string>): Promise<void>;
        /**
         * The pools returned are the initial pools, plus any on demand pools that have been fetched for the two tokens.
         * @param t0
         * @param t1
         * @returns
         */
        getCurrentPoolList(t0: Token, t1: Token): PoolCode[];
        stopFetchPoolsData(): void;
    }
}
declare module "liquidity-providers/ApeSwap" {
    import { ChainId } from '@sushiswap/chain';
    import { PublicClient } from 'viem';
    import { LiquidityProviders } from "liquidity-providers/LiquidityProvider";
    import { UniswapV2BaseProvider } from "liquidity-providers/UniswapV2Base";
    export class ApeSwapProvider extends UniswapV2BaseProvider {
        constructor(chainId: ChainId, web3Client: PublicClient);
        getType(): LiquidityProviders;
        getPoolProviderName(): string;
    }
}
declare module "liquidity-providers/Biswap" {
    import { ChainId } from '@sushiswap/chain';
    import { PublicClient } from 'viem';
    import { LiquidityProviders } from "liquidity-providers/LiquidityProvider";
    import { UniswapV2BaseProvider } from "liquidity-providers/UniswapV2Base";
    export class BiswapProvider extends UniswapV2BaseProvider {
        fee: number;
        constructor(chainId: ChainId, web3Client: PublicClient);
        getType(): LiquidityProviders;
        getPoolProviderName(): string;
    }
}
declare module "liquidity-providers/Dfyn" {
    import { ChainId } from '@sushiswap/chain';
    import { PublicClient } from 'viem';
    import { LiquidityProviders } from "liquidity-providers/LiquidityProvider";
    import { UniswapV2BaseProvider } from "liquidity-providers/UniswapV2Base";
    export class DfynProvider extends UniswapV2BaseProvider {
        constructor(chainId: ChainId, web3Client: PublicClient);
        getType(): LiquidityProviders;
        getPoolProviderName(): string;
    }
}
declare module "liquidity-providers/DovishV3" {
    import { ChainId } from '@sushiswap/chain';
    import { PublicClient } from 'viem';
    import { LiquidityProviders } from "liquidity-providers/LiquidityProvider";
    import { UniswapV3BaseProvider } from "liquidity-providers/UniswapV3Base";
    export class DovishV3Provider extends UniswapV3BaseProvider {
        constructor(chainId: ChainId, web3Client: PublicClient);
        getType(): LiquidityProviders;
        getPoolProviderName(): string;
    }
}
declare module "liquidity-providers/Elk" {
    import { ChainId } from '@sushiswap/chain';
    import { PublicClient } from 'viem';
    import { LiquidityProviders } from "liquidity-providers/LiquidityProvider";
    import { UniswapV2BaseProvider } from "liquidity-providers/UniswapV2Base";
    export class ElkProvider extends UniswapV2BaseProvider {
        constructor(chainId: ChainId, web3Client: PublicClient);
        getType(): LiquidityProviders;
        getPoolProviderName(): string;
    }
}
declare module "liquidity-providers/HoneySwap" {
    import { ChainId } from '@sushiswap/chain';
    import { PublicClient } from 'viem';
    import { LiquidityProviders } from "liquidity-providers/LiquidityProvider";
    import { UniswapV2BaseProvider } from "liquidity-providers/UniswapV2Base";
    export class HoneySwapProvider extends UniswapV2BaseProvider {
        constructor(chainId: ChainId, web3Client: PublicClient);
        getType(): LiquidityProviders;
        getPoolProviderName(): string;
    }
}
declare module "liquidity-providers/JetSwap" {
    import { ChainId } from '@sushiswap/chain';
    import { PublicClient } from 'viem';
    import { LiquidityProviders } from "liquidity-providers/LiquidityProvider";
    import { UniswapV2BaseProvider } from "liquidity-providers/UniswapV2Base";
    export class JetSwapProvider extends UniswapV2BaseProvider {
        constructor(chainId: ChainId, web3Client: PublicClient);
        getType(): LiquidityProviders;
        getPoolProviderName(): string;
    }
}
declare module "liquidity-providers/LaserSwap" {
    import { ChainId } from '@sushiswap/chain';
    import { PublicClient } from 'viem';
    import { LiquidityProviders } from "liquidity-providers/LiquidityProvider";
    import { UniswapV2BaseProvider } from "liquidity-providers/UniswapV2Base";
    export class LaserSwapV2Provider extends UniswapV2BaseProvider {
        fee: number;
        constructor(chainId: ChainId, web3Client: PublicClient);
        getType(): LiquidityProviders;
        getPoolProviderName(): string;
    }
}
declare module "liquidity-providers/NetSwap" {
    import { ChainId } from '@sushiswap/chain';
    import { PublicClient } from 'viem';
    import { LiquidityProviders } from "liquidity-providers/LiquidityProvider";
    import { UniswapV2BaseProvider } from "liquidity-providers/UniswapV2Base";
    export class NetSwapProvider extends UniswapV2BaseProvider {
        constructor(chainId: ChainId, web3Client: PublicClient);
        getType(): LiquidityProviders;
        getPoolProviderName(): string;
    }
}
declare module "liquidity-providers/PancakeSwap" {
    import { ChainId } from '@sushiswap/chain';
    import { PublicClient } from 'viem';
    import { LiquidityProviders } from "liquidity-providers/LiquidityProvider";
    import { UniswapV2BaseProvider } from "liquidity-providers/UniswapV2Base";
    export class PancakeSwapProvider extends UniswapV2BaseProvider {
        fee: number;
        constructor(chainId: ChainId, web3Client: PublicClient);
        getType(): LiquidityProviders;
        getPoolProviderName(): string;
    }
}
declare module "liquidity-providers/QuickSwap" {
    import { ChainId } from '@sushiswap/chain';
    import { PublicClient } from 'viem';
    import { LiquidityProviders } from "liquidity-providers/LiquidityProvider";
    import { UniswapV2BaseProvider } from "liquidity-providers/UniswapV2Base";
    export class QuickSwapProvider extends UniswapV2BaseProvider {
        constructor(chainId: ChainId, web3Client: PublicClient);
        getType(): LiquidityProviders;
        getPoolProviderName(): string;
    }
}
declare module "liquidity-providers/SpookySwap" {
    import { ChainId } from '@sushiswap/chain';
    import { PublicClient } from 'viem';
    import { LiquidityProviders } from "liquidity-providers/LiquidityProvider";
    import { UniswapV2BaseProvider } from "liquidity-providers/UniswapV2Base";
    export class SpookySwapProvider extends UniswapV2BaseProvider {
        constructor(chainId: ChainId, web3Client: PublicClient);
        getType(): LiquidityProviders;
        getPoolProviderName(): string;
    }
}
declare module "liquidity-providers/SushiSwapV2" {
    import { ChainId } from '@sushiswap/chain';
    import { PublicClient } from 'viem';
    import { LiquidityProviders } from "liquidity-providers/LiquidityProvider";
    import { UniswapV2BaseProvider } from "liquidity-providers/UniswapV2Base";
    export class SushiSwapV2Provider extends UniswapV2BaseProvider {
        constructor(chainId: ChainId, web3Client: PublicClient);
        getType(): LiquidityProviders;
        getPoolProviderName(): string;
    }
}
declare module "liquidity-providers/SushiSwapV3" {
    import { ChainId } from '@sushiswap/chain';
    import { PublicClient } from 'viem';
    import { LiquidityProviders } from "liquidity-providers/LiquidityProvider";
    import { UniswapV3BaseProvider } from "liquidity-providers/UniswapV3Base";
    export class SushiSwapV3Provider extends UniswapV3BaseProvider {
        constructor(chainId: ChainId, web3Client: PublicClient);
        getType(): LiquidityProviders;
        getPoolProviderName(): string;
    }
}
declare module "liquidity-providers/TraderJoe" {
    import { ChainId } from '@sushiswap/chain';
    import { PublicClient } from 'viem';
    import { LiquidityProviders } from "liquidity-providers/LiquidityProvider";
    import { UniswapV2BaseProvider } from "liquidity-providers/UniswapV2Base";
    export class TraderJoeProvider extends UniswapV2BaseProvider {
        constructor(chainId: ChainId, web3Client: PublicClient);
        getType(): LiquidityProviders;
        getPoolProviderName(): string;
    }
}
declare module "pools/Bridge" {
    export const Bridge: {
        readonly BentoBox: "BentoBox Bridge";
    };
    export type Bridge = (typeof Bridge)[keyof typeof Bridge];
}
declare module "pools/BentoBridge" {
    import type { BridgeBento, MultiRoute, RouteLeg } from '@sushiswap/tines';
    import type { BigNumber } from 'ethers';
    import { LiquidityProviders } from "liquidity-providers/index";
    import { PoolCode } from "pools/PoolCode";
    export class BentoBridgePoolCode extends PoolCode {
        bentoBoxAddress: string;
        constructor(pool: BridgeBento, liquidityProvider: LiquidityProviders, _providerName: string, bentoBoxAddress: `0x${string}`);
        getStartPoint(leg: RouteLeg): string;
        getSwapCodeForRouteProcessor(leg: RouteLeg, route: MultiRoute, to: string, exactAmount?: BigNumber): string;
        getSwapCodeForRouteProcessor2(leg: RouteLeg, _route: MultiRoute, to: string): string;
    }
}
declare module "pools/BentoPool" {
    import { MultiRoute, RouteLeg, RPool } from '@sushiswap/tines';
    import { LiquidityProviders } from "liquidity-providers/index";
    import { PoolCode } from "pools/PoolCode";
    export class BentoPoolCode extends PoolCode {
        constructor(pool: RPool, liquidityProvider: LiquidityProviders, providerName: string);
        getSwapCodeForRouteProcessor(leg: RouteLeg, _route: MultiRoute, to: string): string;
        getSwapCodeForRouteProcessor2(leg: RouteLeg, _route: MultiRoute, to: string): string;
    }
}
declare module "static-pool-fetcher/Trident" {
    import { ChainId } from '@sushiswap/chain';
    import { Token } from '@sushiswap/currency';
    import { PublicClient } from 'viem';
    export interface TridentStaticPool {
        address: string;
        token0: Token;
        token1: Token;
        type: 'STABLE_POOL' | 'CONSTANT_PRODUCT_POOL';
        swapFee?: number;
    }
    export class TridentStaticPoolFetcher {
        static getStaticPools(client: PublicClient, chainId: ChainId, t1: Token, t2: Token): Promise<[TridentStaticPool[], TridentStaticPool[]]>;
        private static getPools;
    }
}
declare module "liquidity-providers/Trident" {
    import { BentoBoxV1ChainId } from '@sushiswap/bentobox';
    import type { ChainId } from '@sushiswap/chain';
    import { Token } from '@sushiswap/currency';
    import { RToken } from '@sushiswap/tines';
    import { ConstantProductPoolFactoryChainId, StablePoolFactoryChainId } from '@sushiswap/trident-core';
    import { BigNumber } from 'ethers';
    import { PublicClient } from 'viem';
    import { PoolResponse2 } from "lib/api";
    import type { PoolCode } from "pools/PoolCode";
    import { LiquidityProvider, LiquidityProviders } from "liquidity-providers/LiquidityProvider";
    export function convertToNumbers(arr: BigNumber[]): (number | undefined)[];
    export function getBentoChainId(chainId: string | number | undefined): string;
    export function convertTokenToBento(token: Token): RToken;
    interface PoolInfo {
        poolCode: PoolCode;
        validUntilTimestamp: number;
    }
    export class TridentProvider extends LiquidityProvider {
        chainId: Extract<ChainId, BentoBoxV1ChainId & ConstantProductPoolFactoryChainId & StablePoolFactoryChainId>;
        readonly TOP_POOL_SIZE = 155;
        readonly TOP_POOL_LIQUIDITY_THRESHOLD = 1000;
        readonly ON_DEMAND_POOL_SIZE = 20;
        readonly REFRESH_INITIAL_POOLS_INTERVAL = 60;
        isInitialized: boolean;
        topClassicPools: Map<string, PoolCode>;
        topStablePools: Map<string, PoolCode>;
        onDemandClassicPools: Map<string, PoolInfo>;
        onDemandStablePools: Map<string, PoolInfo>;
        poolsByTrade: Map<string, string[]>;
        availablePools: Map<string, PoolResponse2>;
        bridges: Map<string, PoolCode>;
        bentoBox: {
            readonly "1": "0xF5BCE5077908a1b7370B9ae04AdC565EBd643966";
            readonly "4": "0xF5BCE5077908a1b7370B9ae04AdC565EBd643966";
            readonly "5": "0xF5BCE5077908a1b7370B9ae04AdC565EBd643966";
            readonly "10": "0xc35DADB65012eC5796536bD9864eD8773aBc74C4";
            readonly "56": "0xF5BCE5077908a1b7370B9ae04AdC565EBd643966";
            readonly "97": "0xF5BCE5077908a1b7370B9ae04AdC565EBd643966";
            readonly "100": "0xE2d7F5dd869Fc7c126D21b13a9080e75a4bDb324";
            readonly "122": "0x0BE808376Ecb75a5CF9bB6D237d16cd37893d904";
            readonly "128": "0xF5BCE5077908a1b7370B9ae04AdC565EBd643966";
            readonly "137": "0x0319000133d3AdA02600f0875d2cf03D442C3367";
            readonly "199": "0x8dacffa7F69Ce572992132697252E16254225D38";
            readonly "250": "0xF5BCE5077908a1b7370B9ae04AdC565EBd643966";
            readonly "288": "0x0769fd68dFb93167989C6f7254cd0D766Fb2841F";
            readonly "1088": "0xc35DADB65012eC5796536bD9864eD8773aBc74C4";
            readonly "1284": "0x80C7DD17B01855a6D2347444a0FCC36136a314de";
            readonly "1285": "0x145d82bCa93cCa2AE057D1c6f26245d1b9522E6F";
            readonly "2222": "0xc35DADB65012eC5796536bD9864eD8773aBc74C4";
            readonly "42161": "0x74c764D41B77DBbb4fe771daB1939B00b146894A";
            readonly "42170": "0xbE811A0D44E2553d25d11CB8DC0d3F0D0E6430E6";
            readonly "42220": "0x0711B6026068f736bae6B213031fCE978D48E026";
            readonly "43114": "0x0711B6026068f736bae6B213031fCE978D48E026";
            readonly "43288": "0x0769fd68dFb93167989C6f7254cd0D766Fb2841F";
            readonly "56288": "0x0769fd68dFb93167989C6f7254cd0D766Fb2841F";
            readonly "59140": "0xc35DADB65012eC5796536bD9864eD8773aBc74C4";
            readonly "80001": "0xF5BCE5077908a1b7370B9ae04AdC565EBd643966";
            readonly "84531": "0xc35DADB65012eC5796536bD9864eD8773aBc74C4";
            readonly "534353": "0xc35DADB65012eC5796536bD9864eD8773aBc74C4";
            readonly "1666600000": "0x6b2A3FF504798886862Ca5ce501e080947A506A2";
        };
        constantProductPoolFactory: {
            readonly "1": "0xD75F5369724b513b497101fb15211160c1d96550";
            readonly "10": "0x93395129bd3fcf49d95730D3C2737c17990fF328";
            readonly "56": "0x3D2f8ae0344d38525d2AE96Ab750B83480c0844F";
            readonly "100": "0xF4d73326C13a4Fc5FD7A064217e12780e9Bd62c3";
            readonly "137": "0x28890e3C0aA9B4b48b1a716f46C9abc9B12abfab";
            readonly "199": "0x752Dc00ABa9c930c84aC81D288dB5E2a02Afe633";
            readonly "250": "0x2c8C987C4777AB740d20Cb581f5d381BE95A4A4a";
            readonly "1088": "0x0769fd68dFb93167989C6f7254cd0D766Fb2841F";
            readonly "2222": "0x0769fd68dFb93167989C6f7254cd0D766Fb2841F";
            readonly "42161": "0xc79Ae87E9f55761c08e346B98dDdf070C9872787";
            readonly "43114": "0xb84a043bc4fCA97B7a74eD7dAaB1Bf12A8DF929F";
        };
        stablePoolFactory: {
            readonly "1": "0xC040F84Cf7046409f92d578eF9040fE45E6ef4be";
            readonly "10": "0x827179dD56d07A7eeA32e3873493835da2866976";
            readonly "56": "0xA4C0363edD74F55AC8f316a3Bf447F8aa09607D3";
            readonly "100": "0x1b9d177CcdeA3c79B6c8F40761fc8Dc9d0500EAa";
            readonly "137": "0x2A0Caa28331bC6a18FF195f06694f90671dE70f2";
            readonly "199": "0x120140d0c1EBC938befc84840575EcDc5fE55aFe";
            readonly "250": "0x97a32B4f8486735075f2cBEcff64208fBF2e610A";
            readonly "1088": "0x2f686751b19a9d91cc3d57d90150Bc767f050066";
            readonly "2222": "0x9B3fF703FA9C8B467F5886d7b61E61ba07a9b51c";
            readonly "42161": "0xc2fB256ABa36852DCcEA92181eC6b355f09A0288";
            readonly "43114": "0x7770978eED668a3ba661d51a773d3a992Fc9DDCB";
        };
        latestPoolCreatedAtTimestamp: Date;
        discoverNewPoolsTimestamp: number;
        refreshAvailablePoolsTimestamp: number;
        blockListener?: () => void;
        unwatchBlockNumber?: () => void;
        constructor(chainId: Extract<ChainId, BentoBoxV1ChainId & ConstantProductPoolFactoryChainId & StablePoolFactoryChainId>, web3Client: PublicClient);
        getType(): LiquidityProviders;
        getPoolProviderName(): string;
        initPools(pools: PoolResponse2[]): Promise<void>;
        getOnDemandPools(t0: Token, t1: Token, excludePools?: Set<string>, options?: {
            blockNumber?: bigint;
        }): Promise<void>;
        startFetchPoolsData(): void;
        fetchPoolsForToken(t0: Token, t1: Token, excludePools?: Set<string>): Promise<void>;
        getCurrentPoolList(t0: Token, t1: Token): PoolCode[];
        stopFetchPoolsData(): void;
        private poolResponseToSortedTokens;
    }
}
declare module "liquidity-providers/UbeSwap" {
    import { ChainId } from '@sushiswap/chain';
    import { PublicClient } from 'viem';
    import { LiquidityProviders } from "liquidity-providers/LiquidityProvider";
    import { UniswapV2BaseProvider } from "liquidity-providers/UniswapV2Base";
    export class UbeSwapProvider extends UniswapV2BaseProvider {
        constructor(chainId: ChainId, web3Client: PublicClient);
        getType(): LiquidityProviders;
        getPoolProviderName(): string;
    }
}
declare module "liquidity-providers/UniswapV2" {
    import { ChainId } from '@sushiswap/chain';
    import { PublicClient } from 'viem';
    import { LiquidityProviders } from "liquidity-providers/LiquidityProvider";
    import { UniswapV2BaseProvider } from "liquidity-providers/UniswapV2Base";
    export class UniswapV2Provider extends UniswapV2BaseProvider {
        constructor(chainId: ChainId, web3Client: PublicClient);
        getType(): LiquidityProviders;
        getPoolProviderName(): string;
    }
}
declare module "liquidity-providers/UniswapV3" {
    import { ChainId } from '@sushiswap/chain';
    import { PublicClient } from 'viem';
    import { LiquidityProviders } from "liquidity-providers/LiquidityProvider";
    import { UniswapV3BaseProvider } from "liquidity-providers/UniswapV3Base";
    export class UniswapV3Provider extends UniswapV3BaseProvider {
        constructor(chainId: ChainId, web3Client: PublicClient);
        getType(): LiquidityProviders;
        getPoolProviderName(): string;
    }
}
declare module "DataFetcher" {
    import { ChainId } from '@sushiswap/chain';
    import { Type } from '@sushiswap/currency';
    import { PublicClient } from 'viem';
    import { LiquidityProvider, LiquidityProviders } from "liquidity-providers/LiquidityProvider";
    import type { PoolCode } from "pools/PoolCode";
    export class DataFetcher {
        chainId: ChainId;
        providers: LiquidityProvider[];
        poolCodes: Map<LiquidityProviders, Map<string, PoolCode>>;
        stateId: number;
        web3Client: PublicClient;
        databaseClient: any;
        private static cache;
        static onChain(chainId: ChainId): DataFetcher;
        constructor(chainId: ChainId, web3Client?: PublicClient);
        _providerIsIncluded(lp: LiquidityProviders, liquidity?: LiquidityProviders[]): boolean;
        startDataFetching(providers?: LiquidityProviders[]): void;
        stopDataFetching(): void;
        fetchPoolsForToken(currency0: Type, currency1: Type, excludePools?: Set<string>, options?: {
            blockNumber?: bigint;
        }): Promise<void>;
        getCurrentPoolCodeMap(currency0: Type, currency1: Type): Map<string, PoolCode>;
        getCurrentPoolCodeList(currency0: Type, currency1: Type): PoolCode[];
        getLastUpdateBlock(providers?: LiquidityProviders[]): number;
    }
}
declare module "lib/convert" {
    import { Token } from '@sushiswap/currency';
    import { RToken } from '@sushiswap/tines';
    export function getBentoChainId(chainId: string | number | undefined): string;
    export function convertTokenToBento(token: Token): RToken;
}
declare module "TinesToRouteProcessor" {
    import { ChainId } from '@sushiswap/chain';
    import { MultiRoute, RouteLeg, RToken } from '@sushiswap/tines';
    import { BigNumber } from 'ethers';
    import { PoolCode } from "pools/PoolCode";
    export class TinesToRouteProcessor {
        routeProcessorAddress: string;
        chainId: ChainId;
        pools: Map<string, PoolCode>;
        tokenOutputLegs: Map<string, RouteLeg[]>;
        constructor(routeProcessorAddress: string, chainId: ChainId, pools: Map<string, PoolCode>);
        getRouteProcessorCode(route: MultiRoute, toAddress: string): string;
        getRPCodeForsimpleWrapRoute(route: MultiRoute, toAddress: string): string;
        getPoolOutputAddress(l: RouteLeg, route: MultiRoute, toAddress: string): string;
        getPoolCode(l: RouteLeg): PoolCode;
        codeSwap(leg: RouteLeg, route: MultiRoute, to: string, exactAmount?: BigNumber): string;
        codeDistributeInitial(route: MultiRoute): [string, Map<string, BigNumber>];
        codeDistributeTokenShares(token: RToken, route: MultiRoute): string;
        calcTokenOutputLegs(route: MultiRoute): void;
    }
    export function getRouteProcessorCode(route: MultiRoute, routeProcessorAddress: string, toAddress: string, pools: Map<string, PoolCode>): string;
}
declare module "TinesToRouteProcessor2" {
    import { ChainId } from '@sushiswap/chain';
    import { MultiRoute, RouteLeg, RToken } from '@sushiswap/tines';
    import { BigNumber } from 'ethers';
    import { PoolCode } from "pools/PoolCode";
    export enum TokenType {
        NATIVE = "NATIVE",
        ERC20 = "ERC20",
        'BENTO' = "BENTO"
    }
    export interface PermitData {
        value: BigNumber;
        deadline: BigNumber;
        v: number;
        r: string;
        s: string;
    }
    export function getTokenType(token: RToken): TokenType;
    export class TinesToRouteProcessor2 {
        routeProcessorAddress: string;
        chainId: ChainId;
        pools: Map<string, PoolCode>;
        tokenOutputLegs: Map<string, RouteLeg[]>;
        constructor(routeProcessorAddress: string, chainId: ChainId, pools: Map<string, PoolCode>);
        getRouteProcessorCode(route: MultiRoute, toAddress: string, permits?: PermitData[]): string;
        processPermits(permits: PermitData[]): string;
        processNativeCode(token: RToken, route: MultiRoute, toAddress: string): string;
        processERC20Code(fromMe: boolean, token: RToken, route: MultiRoute, toAddress: string): string;
        processOnePoolCode(token: RToken, route: MultiRoute, toAddress: string): string;
        processBentoCode(token: RToken, route: MultiRoute, toAddress: string): string;
        swapCode(leg: RouteLeg, route: MultiRoute, toAddress: string): string;
        getPoolOutputAddress(l: RouteLeg, route: MultiRoute, toAddress: string): string;
        isOnePoolOptimization(token: RToken, route: MultiRoute): boolean;
        getPoolCode(l: RouteLeg): PoolCode;
        calcTokenOutputLegs(route: MultiRoute): void;
    }
    export function getRouteProcessor2Code(route: MultiRoute, routeProcessorAddress: string, toAddress: string, pools: Map<string, PoolCode>, permits?: PermitData[]): string;
}
declare module "TinesToRouteProcessor4" {
    import { MultiRoute } from '@sushiswap/tines';
    import { PoolCode } from "pools/PoolCode";
    import { PermitData } from "TinesToRouteProcessor2";
    export function getRouteProcessor4Code(route: MultiRoute, routeProcessorAddress: string, toAddress: string, pools: Map<string, PoolCode>, permits?: PermitData[]): string;
}
declare module "Router" {
    import { ChainId } from '@sushiswap/chain';
    import { Type } from '@sushiswap/currency';
    import { MultiRoute, RPool } from '@sushiswap/tines';
    import { BigNumber } from 'ethers';
    import { LiquidityProviders } from "liquidity-providers/LiquidityProvider";
    import { PoolCode } from "pools/PoolCode";
    import { PermitData } from "TinesToRouteProcessor2";
    export interface RPParams {
        tokenIn: string;
        amountIn: BigNumber;
        tokenOut: string;
        amountOutMin: BigNumber;
        to: string;
        routeCode: string;
        value?: BigNumber;
    }
    export type PoolFilter = (list: RPool) => boolean;
    export class Router {
        static findSushiRoute(poolCodesMap: Map<string, PoolCode>, chainId: ChainId, fromToken: Type, amountIn: BigNumber, toToken: Type, gasPrice: number): MultiRoute;
        static findSpecialRoute(poolCodesMap: Map<string, PoolCode>, chainId: ChainId, fromToken: Type, amountIn: BigNumber, toToken: Type, gasPrice: number, maxPriceImpact?: number): MultiRoute;
        static findBestRoute(poolCodesMap: Map<string, PoolCode>, chainId: ChainId, fromToken: Type, amountIn: BigNumber, toToken: Type, gasPrice: number, providers?: LiquidityProviders[], // all providers if undefined
        poolFilter?: PoolFilter): MultiRoute;
        static routeProcessorParams(poolCodesMap: Map<string, PoolCode>, route: MultiRoute, fromToken: Type, toToken: Type, to: string, RPAddr: string, maxPriceImpact?: number): RPParams;
        static routeProcessor2Params(poolCodesMap: Map<string, PoolCode>, route: MultiRoute, fromToken: Type, toToken: Type, to: string, RPAddr: string, permits?: PermitData[], maxPriceImpact?: number): RPParams;
        static routeProcessor4Params(poolCodesMap: Map<string, PoolCode>, route: MultiRoute, fromToken: Type, toToken: Type, to: string, RPAddr: string, permits?: PermitData[], maxPriceImpact?: number): RPParams;
        static routeToHumanString(poolCodesMap: Map<string, PoolCode>, route: MultiRoute, fromToken: Type, toToken: Type, shiftPrimary?: string, shiftSub?: string): string;
    }
    export function tokenQuantityString(token: Type, amount: BigNumber): string;
}
declare module "Sankey.AnyChart" {
    import { MultiRoute } from '@sushiswap/tines';
    export function getRoutingAnyChartSankeyData(route: MultiRoute): {
        from: string;
        to: string;
        value: number;
    }[];
}
declare module "pools/TridentCLPool" {
    import type { MultiRoute, RouteLeg, UniV3Pool } from '@sushiswap/tines';
    import { LiquidityProviders } from "liquidity-providers/index";
    import { PoolCode } from "pools/PoolCode";
    export class TridentCLPoolCode extends PoolCode {
        constructor(pool: UniV3Pool, liquidityProvider: LiquidityProviders, providerName: string);
        getStartPoint(): string;
        getSwapCodeForRouteProcessor(leg: RouteLeg, route: MultiRoute, to: string): string;
        getSwapCodeForRouteProcessor2(leg: RouteLeg, _route: MultiRoute, to: string): string;
    }
}
declare module "index" {
    export * from "DataFetcher";
    export * from "getCurrencyCombinations";
    export * from "HEXer";
    export * from "liquidity-providers/index";
    export * from "pools/BentoBridge";
    export * from "pools/BentoPool";
    export * from "pools/Bridge";
    export * from "pools/ConstantProductPool";
    export * from "pools/CurvePool";
    export * from "pools/NativeWrapBridge";
    export * from "pools/PoolCode";
    export * from "pools/TridentCLPool";
    export * from "pools/UniV3Pool";
    export * from "Router";
    export * from "Sankey.AnyChart";
    export * from "TinesToRouteProcessor2";
}
declare module "legacy/TridentBase" {
    export {};
}
declare module "legacy/TridentClassic" {
    export {};
}
declare module "legacy/TridentStable" {
    export {};
}
declare module "lib/database" { }
