import { ChainId } from '@sushiswap/chain';
import { Token } from '@sushiswap/currency';
import { Address, PublicClient } from 'viem';
export interface TridentStaticPool {
    address: Address;
    token0: Token;
    token1: Token;
    type: 'STABLE_POOL' | 'CONSTANT_PRODUCT_POOL';
    swapFee?: number;
}
export declare class TridentStaticPoolFetcher {
    static getStaticPools(client: PublicClient, chainId: ChainId, t1: Token, t2: Token, options?: {
        blockNumber?: bigint;
    }): Promise<[TridentStaticPool[], TridentStaticPool[]]>;
    private static getPools;
}
//# sourceMappingURL=Trident.d.ts.map