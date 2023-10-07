import { Fee, Pool } from '@sushiswap/base-sdk';
import { Amount, Price, Share, Token } from '@sushiswap/currency';
import { SerializedConstantPool } from './zod';
export declare class TridentConstantPool implements Pool {
    readonly liquidityToken: Token;
    readonly swapGasCost = 60000n;
    readonly minLiquidity = 1000n;
    readonly fee: Fee;
    readonly twap: boolean;
    private readonly tokenAmounts;
    private readonly MAX_FEE;
    static getAddress(tokenA: Token, tokenB: Token, fee: Fee, twap: boolean): string;
    constructor(AmountA: Amount<Token>, AmountB: Amount<Token>, fee: Fee, twap: boolean);
    /**
     * Returns true if the token is either token0 or token1
     * @param token to check
     */
    involvesToken(token: Token): boolean;
    /**
     * Returns the current mid price of the pair in terms of token0, i.e. the ratio of reserve1 to reserve0
     */
    get token0Price(): Price<Token, Token>;
    /**
     * Returns the current mid price of the pair in terms of token1, i.e. the ratio of reserve0 to reserve1
     */
    get token1Price(): Price<Token, Token>;
    /**
     * Return the price of the given token in terms of the other token in the pair.
     * @param token token to return price of
     */
    priceOf(token: Token): Price<Token, Token>;
    /**
     * Returns the chain ID of the tokens in the pair.
     */
    get chainId(): number;
    get token0(): Token;
    get token1(): Token;
    get reserve0(): Amount<Token>;
    get reserve1(): Amount<Token>;
    get assets(): Token[];
    get reserves(): Amount<Token>[];
    get kLast(): bigint;
    reserveOf(token: Token): Amount<Token>;
    getOutputAmount(inputAmount: Amount<Token>): [Amount<Token>, TridentConstantPool];
    getInputAmount(outputAmount: Amount<Token>): [Amount<Token>, TridentConstantPool];
    getNonOptimalMintFee(amount0: bigint, amount1: bigint, reserve0: bigint, reserve1: bigint): [bigint, bigint];
    getMintFee(reserve0: bigint, reserve1: bigint, totalSupply: bigint): bigint;
    getLiquidityMinted(totalSupply: Amount<Token>, tokenAmountA: Amount<Token> | Share<Token>, tokenAmountB: Amount<Token> | Share<Token>): Amount<Token>;
    getLiquidityValue(token: Token, totalSupply: Amount<Token>, liquidity: Amount<Token>): Amount<Token>;
    getAmountOut(amountIn: bigint, reserveAmountIn: bigint, reserveAmountOut: bigint): bigint;
    getLiquidityValueSingleToken(token: Token, totalSupply: Amount<Token>, liquidity: Amount<Token>): Amount<Token>;
    serialize(): SerializedConstantPool;
    static deserialize(pool: SerializedConstantPool): TridentConstantPool;
}
//# sourceMappingURL=TridentConstantPool.d.ts.map