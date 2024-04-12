import { http, PublicClient, createPublicClient } from "viem";
import { ChainId } from "./chain";
import { publicClientConfig } from "./config";
import { Type } from "./currency";
// import { BiswapProvider } from "./liquidity-providers";
// import { CurveProvider } from "./liquidity-providers";
// import { DfynProvider } from "./liquidity-providers";
// import { DovishV3Provider } from "./liquidity-providers";
// import { ElkProvider } from "./liquidity-providers";
// import { HoneySwapProvider } from "./liquidity-providers";
// import { JetSwapProvider } from "./liquidity-providers";
// import { LaserSwapV2Provider } from "./liquidity-providers";
import { LiquidityProvider, LiquidityProviders, NativeWrapProvider } from "./liquidity-providers";
// import { NativeWrapProvider } from "./liquidity-providers";
// import { NetSwapProvider } from "./liquidity-providers";
// import { PancakeSwapV2Provider } from "./liquidity-providers";
// import { QuickSwapProvider } from "./liquidity-providers";
// import { SpookySwapProvider } from "./liquidity-providers";
// import { SushiSwapV2Provider } from "./liquidity-providers";
// import { SushiSwapV3Provider } from "./liquidity-providers";
// import { TraderJoeProvider } from "./liquidity-providers";
// import { TridentProvider } from "./liquidity-providers";
// import { UbeSwapProvider } from "./liquidity-providers";
// import { UniswapV2Provider } from "./liquidity-providers";
// import { UniswapV3Provider } from "./liquidity-providers";
import type { PoolCode } from "./pool-codes";

// import { create } from 'viem'
const isTest =
  process.env.APP_ENV === "test" ||
  process.env.TEST === "true" ||
  process.env.NEXT_PUBLIC_TEST === "true";

// Gathers pools info, creates routing in 'incremental' mode
// This means that new routing recalculates each time new pool fetching data comes
export class DataFetcher {
  chainId: ChainId;
  providers: LiquidityProvider[] = [];
  // Provider to poolAddress to PoolCode
  poolCodes: Map<LiquidityProviders, Map<string, PoolCode>> = new Map();
  stateId = 0;
  web3Client: PublicClient;
  // databaseClient: PrismaClient | undefined = undefined

  // TODO: maybe use an actual map
  // private static cache = new Map<number, DataFetcher>()

  private static cache: Record<number, DataFetcher> = {};

  static onChain(chainId: ChainId): DataFetcher {
    const cache = this.cache[chainId];
    if (cache) {
      return cache;
    }
    const dataFetcher = new DataFetcher(chainId);
    this.cache[chainId] = dataFetcher;
    return dataFetcher;
  }

  constructor(chainId: ChainId, publicClient?: PublicClient) {
    this.chainId = chainId;
    if (!publicClient && !publicClientConfig[this.chainId]) {
      throw new Error(`No public client given and no viem config found for chainId ${chainId}`);
    }

    if (publicClient) {
      this.web3Client = publicClient;
    } else if (isTest) {
      this.web3Client = createPublicClient({
        ...publicClientConfig[this.chainId],
        transport: http("http://127.0.0.1:8545"),
        batch: {
          multicall: {
            batchSize: 512,
          },
        },
      });
    } else {
      this.web3Client = createPublicClient(publicClientConfig[this.chainId]);
    }
  }

  _providerIsIncluded(lp: LiquidityProviders, liquidity?: LiquidityProviders[]) {
    if (!liquidity) return true;
    if (lp === LiquidityProviders.NativeWrap) return true;
    return liquidity.some((l) => l === lp);
  }

  _setProviders(providers?: LiquidityProviders[]) {
    // concrete providers
    this.providers = [new NativeWrapProvider(this.chainId, this.web3Client)];
    Object.entries(LiquidityProviders.ALL_CLASSES).forEach(([name, p]) => {
      try {
        // NativeWrap is already included
        if (name !== "NativeWrapProvider") {
          const provider = new p(this.chainId, this.web3Client);
          if (
            // If none passed, include all
            !providers ||
            this._providerIsIncluded(provider.getType(), providers)
          ) {
            this.providers.push(provider);
          }
        }
      } catch (_e: unknown) {
        // console.warn(e)
      }
    });
  }

  // Starts pool data fetching
  startDataFetching(
    providers?: LiquidityProviders[], // all providers if undefined
  ) {
    this.stopDataFetching();
    this._setProviders(providers);
    // console.log(
    //   `${chainShortName[this.chainId]}/${this.chainId} - Included providers: ${this.providers
    //     .map((p) => p.getType())
    //     .join(', ')}`
    // )
    this.providers.forEach((p) => p.startFetchPoolsData());
    this.providers.forEach((p) => p.stopFetchPoolsData());
  }

  // To stop fetch pool data
  stopDataFetching() {
    this.providers.forEach((p) => p.stopFetchPoolsData());
  }

  async fetchPoolsForToken(
    currency0: Type,
    currency1: Type,
    excludePools?: Set<string>,
    options?: { blockNumber?: bigint; memoize?: boolean },
  ): Promise<void> {
    // ensure that we only fetch the native wrap pools if the token is the native currency and wrapped native currency
    if (currency0.wrapped.equals(currency1.wrapped)) {
      const provider = this.providers.find((p) => p.getType() === LiquidityProviders.NativeWrap);
      if (provider) {
        try {
          await provider.fetchPoolsForToken(
            currency0.wrapped,
            currency1.wrapped,
            excludePools,
            options,
          );
        } catch {
          /**/
        }
      }
    } else {
      const [token0, token1] =
        currency0.wrapped.equals(currency1.wrapped) ||
        currency0.wrapped.sortsBefore(currency1.wrapped)
          ? [currency0.wrapped, currency1.wrapped]
          : [currency1.wrapped, currency0.wrapped];
      await Promise.allSettled(
        this.providers.map((p) => p.fetchPoolsForToken(token0, token1, excludePools, options)),
      );
    }
  }

  getCurrentPoolCodeMap(currency0: Type, currency1: Type): Map<string, PoolCode> {
    const result: Map<string, PoolCode> = new Map();
    this.providers.forEach((p) => {
      const poolCodes = p.getCurrentPoolList(currency0.wrapped, currency1.wrapped);
      poolCodes.forEach((pc) => result.set(pc.pool.uniqueID(), pc));
    });

    return result;
  }

  getCurrentPoolCodeList(currency0: Type, currency1: Type): PoolCode[] {
    const pcMap = this.getCurrentPoolCodeMap(currency0.wrapped, currency1.wrapped);
    return Array.from(pcMap.values());
  }

  // returns the last processed by all LP block number
  getLastUpdateBlock(providers?: LiquidityProviders[]): number {
    let lastUpdateBlock: number | undefined;
    this.providers.forEach((p) => {
      if (this._providerIsIncluded(p.getType(), providers)) {
        const last = p.getLastUpdateBlock();
        if (last < 0) return;
        if (lastUpdateBlock === undefined) lastUpdateBlock = last;
        else lastUpdateBlock = Math.min(lastUpdateBlock, last);
      }
    });
    return lastUpdateBlock === undefined ? 0 : lastUpdateBlock;
  }
}
