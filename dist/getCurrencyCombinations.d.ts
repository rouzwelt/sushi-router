import { ChainId } from 'sushi/chain';
import { Token, Type } from 'sushi/currency';
export declare function getCurrencyCombinations(chainId: ChainId, currencyA: Type, currencyB: Type): [Token, Token][];
export declare function getV3CurrencyCombinations(chainId: ChainId, currencyA: Type, currencyB: Type): [Token, Token][];
