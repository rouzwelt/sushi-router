import { ChainId } from '@sushiswap/chain';
import { Token, Type } from '@sushiswap/currency';
export declare function getCurrencyCombinations(chainId: ChainId, currencyA: Type, currencyB: Type): [Token, Token][];
export declare function getV3CurrencyCombinations(chainId: ChainId, currencyA: Type, currencyB: Type): [Token, Token][];
export declare function getCurrencyCombinationsEnosys(chainId: ChainId, currencyA: Type, currencyB: Type): [Token, Token][];
