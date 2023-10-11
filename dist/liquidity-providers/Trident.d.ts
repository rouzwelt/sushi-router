import { BentoBoxChainId } from '@sushiswap/bentobox-sdk';
import type { ChainId } from 'sushi/chain';
import { Token } from 'sushi/currency';
import { RToken } from '@sushiswap/tines';
import { TridentChainId } from '@sushiswap/trident-sdk';
import { Address, PublicClient } from 'viem';
import { PoolResponse2 } from '../lib/api';
import type { PoolCode } from '../pools/PoolCode';
import { LiquidityProvider, LiquidityProviders } from './LiquidityProvider';
export declare function convertToNumbers(arr: bigint[]): (number | undefined)[];
export declare function getBentoChainId(chainId: string | number | undefined): string;
export declare function convertTokenToBento(token: Token): RToken;
interface PoolInfo {
    poolCode: PoolCode;
    validUntilTimestamp: number;
}
export declare class TridentProvider extends LiquidityProvider {
    chainId: Extract<ChainId, BentoBoxChainId & TridentChainId>;
    readonly TOP_POOL_SIZE = 155;
    readonly TOP_POOL_LIQUIDITY_THRESHOLD = 1000;
    readonly ON_DEMAND_POOL_SIZE = 20;
    readonly REFRESH_INITIAL_POOLS_INTERVAL = 60;
    isInitialized: boolean;
    topClassicPools: Map<Address, PoolCode>;
    topStablePools: Map<Address, PoolCode>;
    onDemandClassicPools: Map<Address, PoolInfo>;
    onDemandStablePools: Map<Address, PoolInfo>;
    poolsByTrade: Map<string, string[]>;
    availablePools: Map<string, PoolResponse2>;
    bridges: Map<string, PoolCode>;
    bentoBox: Record<122 | 2222 | 128 | 1 | 43288 | 56288 | 199 | 42170 | 42161 | 43114 | 288 | 56 | 42220 | 250 | 100 | 1666600000 | 1088 | 1284 | 1285 | 10 | 137, `0x${string}`>;
    constantProductPoolFactory: {
        readonly 42161: "0xc79Ae87E9f55761c08e346B98dDdf070C9872787";
        readonly 43114: "0xb84a043bc4fCA97B7a74eD7dAaB1Bf12A8DF929F";
        readonly 56: "0x3D2f8ae0344d38525d2AE96Ab750B83480c0844F";
        readonly 199: "0x752Dc00ABa9c930c84aC81D288dB5E2a02Afe633";
        readonly 1: "0xD75F5369724b513b497101fb15211160c1d96550";
        readonly 250: "0x2c8C987C4777AB740d20Cb581f5d381BE95A4A4a";
        readonly 100: "0xF4d73326C13a4Fc5FD7A064217e12780e9Bd62c3";
        readonly 2222: "0x0769fd68dFb93167989C6f7254cd0D766Fb2841F";
        readonly 1088: "0x0769fd68dFb93167989C6f7254cd0D766Fb2841F";
        readonly 10: "0x93395129bd3fcf49d95730D3C2737c17990fF328";
        readonly 137: "0x28890e3C0aA9B4b48b1a716f46C9abc9B12abfab";
    };
    stablePoolFactory: {
        readonly 42161: "0xc2fB256ABa36852DCcEA92181eC6b355f09A0288";
        readonly 43114: "0x7770978eED668a3ba661d51a773d3a992Fc9DDCB";
        readonly 56: "0xA4C0363edD74F55AC8f316a3Bf447F8aa09607D3";
        readonly 199: "0x120140d0c1EBC938befc84840575EcDc5fE55aFe";
        readonly 1: "0xC040F84Cf7046409f92d578eF9040fE45E6ef4be";
        readonly 250: "0x97a32B4f8486735075f2cBEcff64208fBF2e610A";
        readonly 100: "0x1b9d177CcdeA3c79B6c8F40761fc8Dc9d0500EAa";
        readonly 2222: "0x9B3fF703FA9C8B467F5886d7b61E61ba07a9b51c";
        readonly 1088: "0x2f686751b19a9d91cc3d57d90150Bc767f050066";
        readonly 10: "0x827179dD56d07A7eeA32e3873493835da2866976";
        readonly 137: "0x2A0Caa28331bC6a18FF195f06694f90671dE70f2";
    };
    latestPoolCreatedAtTimestamp: Date;
    discoverNewPoolsTimestamp: number;
    refreshAvailablePoolsTimestamp: number;
    blockListener?: () => void;
    unwatchBlockNumber?: () => void;
    constructor(chainId: Extract<ChainId, BentoBoxChainId & TridentChainId>, web3Client: PublicClient);
    getType(): LiquidityProviders;
    getPoolProviderName(): string;
    getOnDemandPools(t0: Token, t1: Token, excludePools?: Set<string>, options?: {
        blockNumber?: bigint;
        memoize?: boolean;
    }): Promise<void>;
    startFetchPoolsData(): void;
    fetchPoolsForToken(t0: Token, t1: Token, excludePools?: Set<string>, options?: {
        blockNumber?: bigint;
        memoize?: boolean;
    }): Promise<void>;
    getCurrentPoolList(t0: Token, t1: Token): PoolCode[];
    stopFetchPoolsData(): void;
    private poolResponseToSortedTokens;
}
export {};
