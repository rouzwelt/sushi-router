import { ChainId } from '@sushiswap/chain';
import z from 'zod';
import { Fraction, JSBI, BigintIsh, Rounding } from '@sushiswap/math';
type Type = Native | Token;
declare const nativeSchema: z.ZodObject<{
    isNative: z.ZodLiteral<true>;
    name: z.ZodOptional<z.ZodString>;
    symbol: z.ZodOptional<z.ZodString>;
    decimals: z.ZodNumber;
    chainId: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    decimals: number;
    chainId: number;
    isNative: true;
    name?: string | undefined;
    symbol?: string | undefined;
}, {
    decimals: number;
    chainId: number;
    isNative: true;
    name?: string | undefined;
    symbol?: string | undefined;
}>;
declare const tokenSchema: z.ZodObject<{
    isNative: z.ZodLiteral<false>;
    name: z.ZodOptional<z.ZodString>;
    symbol: z.ZodOptional<z.ZodString>;
    decimals: z.ZodNumber;
    chainId: z.ZodNumber;
    address: z.ZodString;
}, "strip", z.ZodTypeAny, {
    decimals: number;
    chainId: number;
    address: string;
    isNative: false;
    name?: string | undefined;
    symbol?: string | undefined;
}, {
    decimals: number;
    chainId: number;
    address: string;
    isNative: false;
    name?: string | undefined;
    symbol?: string | undefined;
}>;
declare const amountSchema: z.ZodObject<{
    amount: z.ZodString;
    currency: z.ZodDiscriminatedUnion<"isNative", [
        z.ZodObject<{
            isNative: z.ZodLiteral<true>;
            name: z.ZodOptional<z.ZodString>;
            symbol: z.ZodOptional<z.ZodString>;
            decimals: z.ZodNumber;
            chainId: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            decimals: number;
            chainId: number;
            isNative: true;
            name?: string | undefined;
            symbol?: string | undefined;
        }, {
            decimals: number;
            chainId: number;
            isNative: true;
            name?: string | undefined;
            symbol?: string | undefined;
        }>,
        z.ZodObject<{
            isNative: z.ZodLiteral<false>;
            name: z.ZodOptional<z.ZodString>;
            symbol: z.ZodOptional<z.ZodString>;
            decimals: z.ZodNumber;
            chainId: z.ZodNumber;
            address: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            decimals: number;
            chainId: number;
            address: string;
            isNative: false;
            name?: string | undefined;
            symbol?: string | undefined;
        }, {
            decimals: number;
            chainId: number;
            address: string;
            isNative: false;
            name?: string | undefined;
            symbol?: string | undefined;
        }>
    ]>;
}, "strip", z.ZodTypeAny, {
    amount: string;
    currency: {
        decimals: number;
        chainId: number;
        isNative: true;
        name?: string | undefined;
        symbol?: string | undefined;
    } | {
        decimals: number;
        chainId: number;
        address: string;
        isNative: false;
        name?: string | undefined;
        symbol?: string | undefined;
    };
}, {
    amount: string;
    currency: {
        decimals: number;
        chainId: number;
        isNative: true;
        name?: string | undefined;
        symbol?: string | undefined;
    } | {
        decimals: number;
        chainId: number;
        address: string;
        isNative: false;
        name?: string | undefined;
        symbol?: string | undefined;
    };
}>;
type SerializedNative = z.infer<typeof nativeSchema>;
type SerializedToken = z.infer<typeof tokenSchema>;
type SerializedAmount = z.infer<typeof amountSchema>;
declare class Native extends Currency {
    readonly id: string;
    readonly isNative: true;
    readonly isToken: false;
    readonly symbol: string;
    readonly name: string;
    protected constructor(native: {
        chainId: number;
        decimals: number;
        symbol: string;
        name: string;
    });
    get wrapped(): Token;
    private static cache;
    static onChain(chainId: number): Native;
    equals(other: Type): boolean;
    serialize(): SerializedNative;
    static deserialize(native: SerializedNative): Native;
}
/**
 * A currency is any fungible financial instrument, including Ether, all ERC20 tokens, and other chain-native currencies
 */
declare abstract class Currency {
    /**
     * Returns whether the currency is native to the chain and must be wrapped (e.g. Ether)
     */
    abstract readonly isNative: boolean;
    /**
     * Returns whether the currency is a token that is usable in Uniswap without wrapping
     */
    abstract readonly isToken: boolean;
    /**
     * The chain ID on which this currency resides
     */
    readonly chainId: ChainId;
    /**
     * The decimals used in representing currency amounts
     */
    readonly decimals: number;
    /**
     * The symbol of the currency, i.e. a short textual non-unique identifier
     */
    readonly symbol?: string;
    /**
     * The name of the currency, i.e. a descriptive textual non-unique identifier
     */
    readonly name?: string;
    /**
     * Constructs an instance of the abstract class `Currency`.
     * @param chainId the chain ID on which this currency resides
     * @param decimals decimals of the currency
     * @param symbol symbol of the currency
     * @param name of the currency
     * @param rebase of the currency
     */
    protected constructor({ chainId, decimals, symbol, name, }: {
        chainId: number | string;
        decimals: number | string;
        symbol?: string;
        name?: string;
    });
    /**
     * Returns whether this currency is functionally equivalent to the other currency
     * @param other the other currency
     */
    abstract equals(other: Native | Token): boolean;
    /**
     * Return the wrapped version of this currency
     */
    abstract get wrapped(): Token;
}
/**
 * Represents an ERC20 token with a unique address and some metadata.
 */
declare class Token extends Currency {
    readonly id: string;
    readonly isNative: false;
    readonly isToken: true;
    /**
     * The contract address on the chain on which this token lives
     */
    readonly address: string;
    constructor({ chainId, address, decimals, symbol, name, }: {
        chainId: number | string;
        address: string;
        decimals: number;
        symbol?: string;
        name?: string;
    });
    /**
     * Returns true if the two tokens are equivalent, i.e. have the same chainId and address.
     * @param other other token to compare
     */
    equals(other: Type): boolean;
    /**
     * Returns true if the address of this token sorts before the address of the other token
     * @param other other token to compare
     * @throws if the tokens have the same address
     * @throws if the tokens are on different chains
     */
    sortsBefore(other: Token): boolean;
    /**
     * Return this token, which does not need to be wrapped
     */
    get wrapped(): Token;
    /**
     * Serialize to JSON object
     */
    serialize(): SerializedToken;
    static deserialize({ name, symbol, address, decimals, chainId }: SerializedToken): Token;
}
declare function addressMapToTokenMap({ decimals, symbol, name }: {
    decimals: number;
    symbol?: string;
    name?: string;
}, map: Record<number | string, string>): {
    [k: string]: Token;
};
declare class Share<T extends Type> extends Fraction {
    readonly currency: T;
    readonly scale: JSBI;
    static fromRawShare<T extends Type>(currency: T, rawShare?: BigintIsh): Share<T>;
    protected constructor(currency: T, numerator: BigintIsh, denominator?: BigintIsh);
    toAmount(rebase: {
        base: JSBI;
        elastic: JSBI;
    }, roundUp?: boolean): Amount<T>;
    /**
     * Construct a currency share with a denominator that is not equal to 1
     * @param currency the currency
     * @param numerator the numerator of the fractional token share
     * @param denominator the denominator of the fractional token share
     */
    static fromFractionalShare<T extends Type>(currency: T, numerator: BigintIsh, denominator: BigintIsh): Share<T>;
    add(other: Share<T>): Share<T>;
    subtract(other: Share<T>): Share<T>;
    multiply(other: Fraction | BigintIsh): Share<T>;
    divide(other: Fraction | BigintIsh): Share<T>;
    toSignificant(significantDigits?: number, format?: object, rounding?: Rounding): string;
    toFixed(decimalPlaces?: number, format?: object, rounding?: Rounding): string;
    toExact(format?: object): string;
}
declare class Amount<T extends Type> extends Fraction {
    readonly currency: T;
    readonly scale: JSBI;
    /**
     * Returns a new currency amount instance from the unitless amount of token, i.e. the raw amount
     * @param currency the currency in the amount
     * @param rawAmount the raw token or ether amount
     */
    static fromRawAmount<T extends Type>(currency: T, rawAmount: BigintIsh): Amount<T>;
    static fromShare<T extends Type>(currency: T, shares: BigintIsh, rebase: {
        base: JSBI;
        elastic: JSBI;
    }, roundUp?: boolean): Amount<T>;
    toShare(rebase: {
        base: JSBI;
        elastic: JSBI;
    }, roundUp?: boolean): Share<T>;
    /**
     * Construct a currency amount with a denominator that is not equal to 1
     * @param currency the currency
     * @param numerator the numerator of the fractional token amount
     * @param denominator the denominator of the fractional token amount
     */
    static fromFractionalAmount<T extends Type>(currency: T, numerator: BigintIsh, denominator: BigintIsh): Amount<T>;
    protected constructor(currency: T, numerator: BigintIsh, denominator?: BigintIsh);
    add(other: Amount<T>): Amount<T>;
    subtract(other: Amount<T>): Amount<T>;
    multiply(other: Fraction | BigintIsh): Amount<T>;
    divide(other: Fraction | BigintIsh): Amount<T>;
    toSignificant(significantDigits?: number, format?: object, rounding?: Rounding): string;
    toFixed(decimalPlaces?: number, format?: object, rounding?: Rounding): string;
    toHex(): string;
    toExact(format?: object): string;
    get wrapped(): Amount<Token>;
    serialize(): SerializedAmount;
    static deserialize<T extends Type>(amount: SerializedAmount): Amount<T>;
}
declare const MANA_ADDRESS: {
    readonly 137: "0xA1c57f48F0Deb89f569dFbE6E2B7f46D33606fD4";
};
declare const MKR_ADDRESS: {
    readonly 1: "0x9f8F72aA9304c8B593d555F12eF6589cC3A579A2";
    readonly 137: "0x6f7C932e7684666C9fd1d44527765433e01fF61d";
    readonly 43114: "0x88128fd4b259552a9a1d457f435a6527aab72d42";
    readonly 42161: "0x2e9a6Df78E42a30712c10a9Dc4b1C8656f8F2879";
};
declare const YFI_ADDRESS: {
    readonly 1: "0x0bc529c00C6401aEF6D220BE8C6Ea1667F6Ad93e";
    readonly 137: "0xDA537104D6A5edd53c6fBba9A898708E465260b6";
    readonly 100: "0xbf65bfcb5da067446CeE6A706ba3Fe2fB1a9fdFd";
    readonly 1666600000: "0xa0dc05F84A27FcCBD341305839019aB86576bc07";
    readonly 43114: "0x9eAaC1B23d935365bD7b542Fe22cEEe2922f52dc";
    readonly 250: "0x29b0Da86e484E1C0029B56e817912d778aC0EC69";
    readonly 42161: "0x82e3a8f066a6989666b031d916c43672085b1582";
};
declare const ENJ_ADDRESS: {
    readonly 1: "0xF629cBd94d3791C9250152BD8dfBDF380E2a3B9c";
    readonly 1666600000: "0xadbd41bFb4389dE499535C14A8a3A12Fead8F66A";
};
declare const CRV_ADDRESS: {
    readonly 1: "0xD533a949740bb3306d119CC777fa900bA034cd52";
    readonly 137: "0x172370d5Cd63279eFa6d502DAB29171933a610AF";
    readonly 250: "0x1E4F97b9f9F913c46F1632781732927B9019C68b";
    readonly 42161: "0x11cdb42b0eb46d95f990bedd4695a6e3fa034978";
    readonly 10: "0x0994206dfE8De6Ec6920FF4D779B0d950605Fb53";
};
declare const GALA_ADDRESS: {
    readonly 1: "0x15D4c048F83bd7e37d49eA4C83a07267Ec4203dA";
};
declare const MATIC_ADDRESS: {
    1101: string;
};
declare const GNO_ADDRESS: {
    readonly 100: "0x9C58BAcC331c9aa871AFD802DB6379a98e80CEdb";
};
declare const ARB_ADDRESS: {
    readonly 42161: "0x912CE59144191C1204E64559FE8253a0e49E6548";
    readonly 42170: "0xf823C3cD3CeBE0a1fA952ba88Dc9EEf8e0Bf46AD";
    readonly 1: "0xB50721BCf8d664c30412Cfbc6cf7a15145234ad1";
};
declare const KP3R_ADDRESS: {
    readonly 1: "0x1cEB5cB57C4D4E2b2433641b95Dd330A33185A44";
};
declare const LDO_ADDRESS: {
    readonly 1: "0x5A98FcBEA516Cf06857215779Fd812CA3beF1B32";
};
declare const APE_ADDRESS: {
    readonly 1: "0x4d224452801ACEd8B2F0aebE155379bb5D594381";
};
declare const PRIMATE_ADDRESS: {
    readonly 1: "0x46e98FFE40E408bA6412bEb670507e083C8B95ff";
};
declare const rETH2_ADDRESS: {
    readonly 1: "0x20BC832ca081b91433ff6c17f85701B6e92486c5";
};
declare const sETH2_ADDRESS: {
    readonly 1: "0xFe2e637202056d30016725477c5da089Ab0A043A";
};
declare const SWISE_ADDRESS: {
    readonly 1: "0x48C3399719B582dD63eB5AADf12A40B4C3f52FA2";
};
declare const FEI_ADDRESS: {
    readonly 1: "0x956F47F50A910163D8BF957Cf5846D573E7f87CA";
};
declare const TRIBE_ADDRESS: {
    readonly 1: "0xc7283b66Eb1EB5FB86327f08e1B5816b0720212B";
};
declare const renBTC_ADDRESS: {
    readonly 1: "0xEB4C2781e4ebA804CE9a9803C67d0893436bB27D";
};
declare const NFTX_ADDRESS: {
    readonly 1: "0x87d73E916D7057945c9BcD8cdd94e42A6F47f776";
};
declare const OHM_ADDRESS: {
    readonly 1: "0x64aa3364F17a4D01c6f1751Fd97C2BD3D7e7f1D5";
};
declare const SNX_ADDRESS: {
    readonly 1: "0xC011a73ee8576Fb46F5E1c5751cA3B9Fe0af2a6F";
    readonly 137: "0x50B728D8D964fd00C2d0AAD81718b71311feF68a";
    readonly 250: "0x56ee926bD8c72B2d5fa1aF4d9E4Cbb515a1E3Adc";
    readonly 1666600000: "0x7b9c523d59AeFd362247Bd5601A89722e3774dD2";
    readonly 43114: "0xBeC243C995409E6520D7C41E404da5dEba4b209B";
    readonly 10: "0x8700dAec35aF8Ff88c16BdF0418774CB3D7599B4";
};
declare const FTM_ADDRESS: {
    readonly 1: "0x4E15361FD6b4BB609Fa63C81A2be19d873717870";
};
declare const WBTC_ADDRESS: {
    readonly 43114: "0x50b7545627a5162F82A992c33b87aDc75187B218";
    readonly 42161: "0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f";
    readonly 1: "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599";
    readonly 250: "0x321162Cd933E2Be498Cd2267a90534A804051b11";
    readonly 137: "0x1BFD67037B42Cf73acF2047067bd4F2C47D9BfD6";
    readonly 10: "0x68f180fcCe6836688e9084f035309E29Bf0A2095";
    readonly 42170: "0x1d05e4e72cD994cdF976181CfB0707345763564d";
    readonly 288: "0xdc0486f8bf31DF57a952bcd3c1d3e166e3d9eC8b";
    readonly 2222: "0x818ec0A7Fe18Ff94269904fCED6AE3DaE6d6dC0b";
    readonly 1088: "0xa5B55ab1dAF0F8e1EFc0eB1931a957fd89B918f4";
    readonly 122: "0x33284f95ccb7B948d9D352e1439561CF83d8d00d";
    readonly 1101: "0xEA034fb02eB1808C2cc3adbC15f447B93CbE08e1";
    readonly 108: "0x18fB0A62f207A2a082cA60aA78F47a1af4985190";
};
declare const UNI_ADDRESS: {
    readonly 1: "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984";
    readonly 100: "0x4537e328Bf7e4eFA29D05CAeA260D7fE26af9D74";
    readonly 10: "0x6fd9d7AD17242c41f7131d257212c54A0e816691";
    readonly 43114: "0x8eBAf22B6F053dFFeaf46f4Dd9eFA95D89ba8580";
    readonly 56: "0xBf5140A22578168FD562DCcF235E5D43A02ce9B1";
    readonly 137: "0xb33EaAd8d922B1083446DC23f610c2567fB5180f";
    readonly 128: "0x22C54cE8321A4015740eE1109D9cBc25815C46E6";
    readonly 1666600000: "0x90D81749da8867962c760414C1C25ec926E889b6";
    readonly 42161: "0xFa7F8980b0f1E64A2062791cc3b0871572f1F7f0";
};
declare const BUSD_ADDRESS: {
    readonly 56: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56";
    readonly 108: "0xbeb0131d95ac3f03fd15894d0ade5dbf7451d171";
};
declare const MAI_ADDRESS: {
    readonly 137: "0xa3Fa99A148fA48D14Ed51d610c367C61876997F1";
    readonly 250: "0xfB98B335551a418cD0737375a2ea0ded62Ea213b";
    readonly 43114: "0x5c49b268c9841AFF1Cc3B0a418ff5c3442eE3F3b";
    readonly 1285: "0xFb2019DfD635a03cfFF624D210AEe6AF2B00fC2C";
    readonly 1666600000: "0x3F56e0c36d275367b8C502090EDF38289b3dEa0d";
    readonly 42161: "0x3F56e0c36d275367b8C502090EDF38289b3dEa0d";
    readonly 288: "0x3F56e0c36d275367b8C502090EDF38289b3dEa0d";
    readonly 100: "0x3F56e0c36d275367b8C502090EDF38289b3dEa0d";
    readonly 1088: "0xdFA46478F9e5EA86d57387849598dbFB2e964b02";
    readonly 56: "0x3F56e0c36d275367b8C502090EDF38289b3dEa0d";
    readonly 42220: "0xB9C8F0d3254007eE4b98970b94544e473Cd610EC";
    readonly 10: "0xdFA46478F9e5EA86d57387849598dbFB2e964b02";
    readonly 1284: "0xdFA46478F9e5EA86d57387849598dbFB2e964b02";
    readonly 2222: "0xb84Df10966a5D7e1ab46D9276F55d57bD336AFC7";
    readonly 1: "0x8D6CeBD76f18E1558D4DB88138e2DeFB3909fAD6";
};
declare const TUSD_ADDRESS: {
    readonly 1: "0x0000000000085d4780B73119b644AE5ecd22b376";
};
declare const ANKR_ADDRESS: {
    readonly 1: "0x8290333ceF9e6D528dD5618Fb97a76f268f3EDD4";
};
declare const AAVE_ADDRESS: {
    readonly 1: "0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9";
    readonly 137: "0xD6DF932A45C0f255f85145f286eA0b292B21C90B";
    readonly 250: "0x6a07A792ab2965C72a5B8088d3a069A7aC3a993B";
    readonly 1666600000: "0xcF323Aad9E522B93F11c352CaA519Ad0E14eB40F";
    readonly 43114: "0x63a72806098Bd3D9520cC43356dD78afe5D386D9";
    readonly 56: "0xfb6115445Bff7b52FeB98650C87f44907E58f802";
    readonly 10: "0x76FB31fb4af56892A25e32cFC43De717950c9278";
};
declare const COMP_ADDRESS: {
    readonly 1: "0xc00e94Cb662C3520282E6f5717214004A7f26888";
};
declare const JPY_ADDRESS: {
    readonly 1: "0x431D5dfF03120AFA4bDf332c61A6e1766eF37BDB";
    readonly 137: "0x6AE7Dfc73E0dDE2aa99ac063DcF7e8A63265108c";
    readonly 43114: "0x431D5dfF03120AFA4bDf332c61A6e1766eF37BDB";
    readonly 100: "0x431D5dfF03120AFA4bDf332c61A6e1766eF37BDB";
};
declare const LUSD_ADDRESS: {
    readonly 1: "0x5f98805A4E8be255a32880FDeC7F6728C6568bA0";
    readonly 10: "0xc40F949F8a4e094D1b49a23ea9241D289B7b2819";
};
declare const WETH9_ADDRESS: {
    readonly 1: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
    readonly 3: "0xc778417E063141139Fce010982780140Aa0cD5Ab";
    readonly 4: "0xc778417E063141139Fce010982780140Aa0cD5Ab";
    readonly 5: "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6";
    readonly 42: "0xd0A1E359811322d97991E03f863a0C30C2cF029C";
    readonly 42161: "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1";
    readonly 79377087078960: "0xf8456e5e6A225C2C1D74D8C9a4cB2B1d5dc1153b";
    readonly 56: "0x2170Ed0880ac9A755fd29B2688956BD959F933F8";
    readonly 250: "0x74b23882a30290451A17c44f4F05243b6b58C76d";
    readonly 137: "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619";
    readonly 80001: "0x714550C2C1Ea08688607D86ed8EeF4f5E4F22323";
    readonly 66: "0x2170Ed0880ac9A755fd29B2688956BD959F933F8";
    readonly 128: "0x64FF637fB478863B7468bc97D30a5bF3A428a1fD";
    readonly 1666600000: "0x6983D1E6DEf3690C4d616b13597A09e6193EA013";
    readonly 100: "0x6A023CCd1ff6F2045C3309768eAd9E68F978f6e1";
    readonly 43114: "0x49D5c2BdFfac6CE2BFdB6640F4F80f226bc10bAB";
    readonly 11297108109: "0x726138359C17F1E56bA8c4F737a7CAf724F6010b";
    readonly 42220: "0x122013fd7dF1C6F636a5bb8f03108E876548b455";
    readonly 1285: "0x639A647fbe20b6c8ac19E48E2de44ea792c62c5C";
    readonly 40: "0xfA9343C3897324496A05fC75abeD6bAC29f8A40f";
    readonly 122: "0xa722c13135930332Eb3d749B2F0906559D2C5b99";
    readonly 1284: "0x30D2a9F5FDf90ACe8c17952cbb4eE48a55D916A7";
    readonly 10: "0x4200000000000000000000000000000000000006";
    readonly 1088: "0x420000000000000000000000000000000000000A";
    readonly 2222: "0xE3F5a90F9cb311505cd691a46596599aA1A0AD7D";
    readonly 42170: "0x722E8BdD2ce80A4422E880164f2079488e115365";
    readonly 288: "0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000";
    readonly 199: "0x1249C65AfB11D179FFB3CE7D4eEDd1D9b98AD006";
    readonly 108: "0x6576Bb918709906DcbFDCeae4bB1e6df7C8a1077";
    readonly 1101: "0x4F9A0e7FD2Bf6067db6994CF12E4495Df938E6e9";
};
declare const WNATIVE_ADDRESS: {
    readonly 1: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
    readonly 3: "0xc778417E063141139Fce010982780140Aa0cD5Ab";
    readonly 4: "0xc778417E063141139Fce010982780140Aa0cD5Ab";
    readonly 5: "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6";
    readonly 42: "0xd0A1E359811322d97991E03f863a0C30C2cF029C";
    readonly 10: "0x4200000000000000000000000000000000000006";
    readonly 42161: "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1";
    readonly 79377087078960: "0xf8456e5e6A225C2C1D74D8C9a4cB2B1d5dc1153b";
    readonly 250: "0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83";
    readonly 4002: "0xf1277d1Ed8AD466beddF92ef448A132661956621";
    readonly 137: "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270";
    readonly 80001: "0x5B67676a984807a212b1c59eBFc9B3568a474F0a";
    readonly 100: "0xe91D153E0b41518A2Ce8Dd3D7944Fa863463a97d";
    readonly 56: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c";
    readonly 97: "0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd";
    readonly 43114: "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7";
    readonly 43113: "0xd00ae08403B9bbb9124bB305C09058E32C39A48c";
    readonly 128: "0x5545153CCFcA01fbd7Dd11C0b23ba694D9509A6F";
    readonly 256: "0x5B2DA6F42CA09C77D577a12BeaD0446148830687";
    readonly 1666600000: "0xcF664087a5bB0237a0BAd6742852ec6c8d69A27a";
    readonly 1666700000: "0x7a2afac38517d512E55C0bCe3b6805c10a04D60F";
    readonly 66: "0x8F8526dbfd6E38E3D8307702cA8469Bae6C56C15";
    readonly 65: "0x2219845942d28716c0F7C605765fABDcA1a7d9E0";
    readonly 11297108109: "0xF98cABF0a963452C5536330408B2590567611a71";
    readonly 42220: "0x471EcE3750Da237f93B8E339c536989b8978a438";
    readonly 1285: "0xf50225a84382c74CbdeA10b0c176f71fc3DE0C4d";
    readonly 122: "0x0BE9e53fd7EDaC9F859882AfdDa116645287C629";
    readonly 40: "0xD102cE6A4dB07D247fcc28F366A623Df0938CA9E";
    readonly 1284: "0xAcc15dC74880C9944775448304B263D191c6077F";
    readonly 2222: "0xc86c7C0eFbd6A49B35E8714C5f59D99De09A225b";
    readonly 1088: "0x75cb093E4D61d2A2e65D8e0BBb01DE8d89b53481";
    readonly 42170: "0x722E8BdD2ce80A4422E880164f2079488e115365";
    readonly 288: "0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000";
    readonly 43288: "0x26c319B7B2cF823365414d082698C8ac90cbBA63";
    readonly 56288: "0xC58aaD327D6D58D979882601ba8DDa0685B505eA";
    readonly 199: "0x23181F21DEa5936e24163FFABa4Ea3B316B57f3C";
    readonly 1101: "0x4F9A0e7FD2Bf6067db6994CF12E4495Df938E6e9";
    readonly 108: "0x413cEFeA29F2d07B8F2acFA69d92466B9535f717";
};
declare const SUSHI_ADDRESS: {
    readonly 1: "0x6B3595068778DD592e39A122f4f5a5cF09C90fE2";
    readonly 3: "0x0769fd68dFb93167989C6f7254cd0D766Fb2841F";
    readonly 4: "0x0769fd68dFb93167989C6f7254cd0D766Fb2841F";
    readonly 5: "0x0769fd68dFb93167989C6f7254cd0D766Fb2841F";
    readonly 42: "0x0769fd68dFb93167989C6f7254cd0D766Fb2841F";
    readonly 250: "0xae75A438b2E0cB8Bb01Ec1E1e376De11D44477CC";
    readonly 137: "0x0b3F868E0BE5597D5DB7fEB59E1CADBb0fdDa50a";
    readonly 100: "0x2995D1317DcD4f0aB89f4AE60F3f020A4F17C7CE";
    readonly 56: "0x986cdF0fd180b40c4D6aEAA01Ab740B996D8b782";
    readonly 42161: "0xd4d42F0b6DEF4CE0383636770eF773390d85c61A";
    readonly 43114: "0x37B608519F91f70F2EeB0e5Ed9AF4061722e4F76";
    readonly 128: "0x52E00B2dA5Bd7940fFe26B609A42F957f31118D5";
    readonly 1666600000: "0xBEC775Cb42AbFa4288dE81F387a9b1A3c4Bc552A";
    readonly 66: "0x2218E0D5E0173769F5b4939a3aE423f7e5E4EAB7";
    readonly 1285: "0xf390830DF829cf22c53c8840554B98eafC5dCBc2";
    readonly 42220: "0x29dFce9c22003A4999930382Fd00f9Fd6133Acd1";
    readonly 40: "0x922D641a426DcFFaeF11680e5358F34d97d112E1";
    readonly 122: "0x90708b20ccC1eb95a4FA7C8b18Fd2C22a0Ff9E78";
    readonly 1284: "0x2C78f1b70Ccf63CDEe49F9233e9fAa99D43AA07e";
    readonly 2222: "0x7C598c96D02398d89FbCb9d41Eab3DF0C16F227D";
    readonly 1088: "0x17Ee7E4dA37B01FC1bcc908fA63DF343F23B4B7C";
    readonly 288: "0x5fFccc55C0d2fd6D3AC32C26C020B3267e933F1b";
    readonly 42170: "0xfe60A48a0bCf4636aFEcC9642a145D2F241A7011";
    readonly 199: "0x53C56ece35f8CaB135e13D6d00499Dfc7c07A92e";
    readonly 10: "0x3eaEb77b03dBc0F6321AE1b72b2E9aDb0F60112B";
    readonly 108: "0xABd380327Fe66724FFDa91A87c772FB8D00bE488";
};
declare const XSUSHI_ADDRESS: {
    readonly 1: "0x8798249c2E607446EfB7Ad49eC89dD1865Ff4272";
};
declare const USDC_ADDRESS: {
    readonly 1: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";
    readonly 4: "0x1717A0D5C8705EE89A8aD6E808268D6A826C97A4";
    readonly 3: "0x0D9C8723B343A8368BebE0B5E89273fF8D712e3C";
    readonly 42: "0xb7a4F3E9097C08dA09517b5aB877F7a917224ede";
    readonly 137: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174";
    readonly 80001: "0x742DfA5Aa70a8212857966D491D67B09Ce7D6ec7";
    readonly 250: "0x04068DA6C83AFCFA0e13ba15A6696662335D5B75";
    readonly 56: "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d";
    readonly 1666600000: "0x985458E523dB3d53125813eD68c274899e9DfAb4";
    readonly 128: "0x9362Bbef4B8313A8Aa9f0c9808B80577Aa26B73B";
    readonly 66: "0xc946DAf81b08146B1C7A8Da2A851Ddf2B3EAaf85";
    readonly 100: "0xDDAfbb505ad214D7b80b1f830fcCc89B60fb7A83";
    readonly 42161: "0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8";
    readonly 43114: "0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E";
    readonly 1285: "0xE3F5a90F9cb311505cd691a46596599aA1A0AD7D";
    readonly 42220: "0xef4229c8c3250C675F21BCefa42f58EfbfF6002a";
    readonly 40: "0x818ec0A7Fe18Ff94269904fCED6AE3DaE6d6dC0b";
    readonly 122: "0x620fd5fa44BE6af63715Ef4E65DDFA0387aD13F5";
    readonly 1284: "0x8f552a71EFE5eeFc207Bf75485b356A0b3f01eC9";
    readonly 10: "0x7F5c764cBc14f9669B88837ca1490cCa17c31607";
    readonly 2222: "0xfA9343C3897324496A05fC75abeD6bAC29f8A40f";
    readonly 1088: "0xEA32A96608495e54156Ae48931A7c20f0dcc1a21";
    readonly 42170: "0x750ba8b76187092B0D1E87E28daaf484d1b5273b";
    readonly 288: "0x66a2A913e447d6b4BF33EFbec43aAeF87890FBbc";
    readonly 43288: "0x12bb1A120dcF8Cb7152eDAC9f04d176DD7f41F7e";
    readonly 56288: "0x9F98f9F312D23d078061962837042b8918e6aff2";
    readonly 199: "0xAE17940943BA9440540940DB0F1877f101D39e8b";
    readonly 1101: "0xA8CE8aee21bC2A48a5EF670afCc9274C7bbbC035";
    readonly 108: "0x22e89898A04eaf43379BeB70bf4E38b1faf8A31e";
};
declare const USDT_ADDRESS: {
    readonly 1: "0xdAC17F958D2ee523a2206206994597C13D831ec7";
    readonly 3: "0x110a13FC3efE6A245B50102D2d79B3E76125Ae83";
    readonly 42: "0x07de306FF27a2B630B1141956844eB1552B956B5";
    readonly 137: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F";
    readonly 250: "0x049d68029688eAbF473097a2fC38ef61633A3C7A";
    readonly 56: "0x55d398326f99059fF775485246999027B3197955";
    readonly 97: "0xF49E250aEB5abDf660d643583AdFd0be41464EfD";
    readonly 1666600000: "0x3C2B8Be99c50593081EAA2A724F0B8285F5aba8f";
    readonly 128: "0xa71EdC38d189767582C38A3145b5873052c3e47a";
    readonly 66: "0x382bB369d343125BfB2117af9c149795C6C65C50";
    readonly 100: "0x4ECaBa5870353805a9F068101A40E0f32ed605C6";
    readonly 42161: "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9";
    readonly 43114: "0x9702230A8Ea53601f5cD2dc00fDBc13d4dF4A8c7";
    readonly 42220: "0x88eeC49252c8cbc039DCdB394c0c2BA2f1637EA0";
    readonly 1285: "0xB44a9B6905aF7c801311e8F4E76932ee959c663C";
    readonly 40: "0xeFAeeE334F0Fd1712f9a8cc375f427D9Cdd40d73";
    readonly 122: "0xFaDbBF8Ce7D5b7041bE672561bbA99f79c532e10";
    readonly 1284: "0x8e70cd5b4ff3f62659049e74b6649c6603a0e594";
    readonly 10: "0x94b008aA00579c1307B0EF2c499aD98a8ce58e58";
    readonly 2222: "0xB44a9B6905aF7c801311e8F4E76932ee959c663C";
    readonly 1088: "0xbB06DCA3AE6887fAbF931640f67cab3e3a16F4dC";
    readonly 42170: "0xeD9d63a96c27f87B07115b56b2e3572827f21646";
    readonly 288: "0x5DE1677344D3Cb0D7D465c10b72A8f60699C062d";
    readonly 43288: "0xfaA13D82756f1e0e4dec9416b83121db3Fc35199";
    readonly 56288: "0x1E633Dcd0d3D349126983D58988051F7c62c543D";
    readonly 199: "0xE887512ab8BC60BcC9224e1c3b5Be68E26048B8B";
    readonly 1101: "0x1E4a5963aBFD975d8c9021ce480b42188849D41d";
    readonly 108: "0x4f3C8E20942461e2c3Bdd8311AC57B0c222f2b82";
};
declare const DAI_ADDRESS: {
    readonly 1: "0x6B175474E89094C44Da98b954EedeAC495271d0F";
    readonly 3: "0xc2118d4d90b274016cB7a54c03EF52E6c537D957";
    readonly 42: "0x4F96Fe3b7A6Cf9725f59d353F723c1bDb64CA6Aa";
    readonly 137: "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063";
    readonly 250: "0x8D11eC38a3EB5E956B052f67Da8Bdc9bef8Abf3E";
    readonly 56: "0x1AF3F329e8BE154074D8769D1FFa4eE058B1DBc3";
    readonly 1666600000: "0xEf977d2f931C1978Db5F6747666fa1eACB0d0339";
    readonly 128: "0x3D760a45D0887DFD89A2F5385a236B29Cb46ED2a";
    readonly 66: "0x21cDE7E32a6CAF4742d00d44B07279e7596d26B9";
    readonly 100: "0xe91D153E0b41518A2Ce8Dd3D7944Fa863463a97d";
    readonly 42161: "0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1";
    readonly 43114: "0xd586E7F844cEa2F87f50152665BCbc2C279D8d70";
    readonly 42220: "0x90Ca507a5D4458a4C6C6249d186b6dCb02a5BCCd";
    readonly 1285: "0x80A16016cC4A2E6a2CACA8a4a498b1699fF0f844";
    readonly 122: "0x94Ba7A27c7A95863d1bdC7645AC2951E0cca06bA";
    readonly 1284: "0xc234A67a4F840E61adE794be47de455361b52413";
    readonly 10: "0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1";
    readonly 2222: "0x765277EebeCA2e31912C9946eAe1021199B39C61";
    readonly 1088: "0x4c078361FC9BbB78DF910800A991C7c3DD2F6ce0";
    readonly 42170: "0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1";
    readonly 288: "0xf74195Bb8a5cf652411867c5C2C5b8C2a402be35";
    readonly 1101: "0xC5015b9d9161Dca7e18e32f6f25C4aD850731Fd4";
};
declare const MIM_ADDRESS: {
    readonly 1: "0x99D8a9C45b2ecA8864373A26D1459e3Dff1e17F3";
    readonly 250: "0x82f0B8B456c1A451378467398982d4834b6829c1";
    readonly 56: "0xfE19F0B51438fd612f6FD59C1dbB3eA319f433Ba";
    readonly 42161: "0xFEa7a6a0B346362BF88A9e4A88416B77a57D6c2A";
    readonly 43114: "0x130966628846BFd36ff31a822705796e8cb8C18D";
    readonly 137: "0x49a0400587A7F65072c87c4910449fDcC5c47242";
    readonly 1285: "0x0caE51e1032e8461f4806e26332c030E34De3aDb";
};
declare const FRAX_ADDRESS: {
    readonly 1: "0x853d955aCEf822Db058eb8505911ED77F175b99e";
    readonly 250: "0xdc301622e621166BD8E82f2cA0A26c13Ad0BE355";
    readonly 56: "0x90C97F71E18723b0Cf0dfa30ee176Ab653E89F40";
    readonly 42161: "0x17FC002b466eEc40DaE837Fc4bE5c67993ddBd6F";
    readonly 43114: "0xD24C2Ad096400B6FBcd2ad8B24E7acBc21A1da64";
    readonly 137: "0x45c32fA6DF82ead1e2EF74d17b76547EDdFaFF89";
    readonly 1285: "0x1A93B23281CC1CDE4C4741353F3064709A16197d";
    readonly 1284: "0x322E86852e492a7Ee17f28a78c663da38FB33bfb";
    readonly 1666600000: "0xFa7191D292d5633f702B0bd7E3E3BcCC0e633200";
    readonly 288: "0xAb2AF3A98D229b7dAeD7305Bb88aD0BA2c42f9cA";
    readonly 10: "0x2E3D870790dC77A83DD1d18184Acc7439A53f475";
};
declare const FXS_ADDRESS: {
    readonly 1: "0x3432B6A60D23Ca0dFCa7761B7ab56459D9C964D0";
    readonly 250: "0x7d016eec9c25232b01F23EF992D98ca97fc2AF5a";
    readonly 56: "0xe48A3d7d0Bc88d552f730B62c006bC925eadB9eE";
    readonly 42161: "0x9d2F299715D94d8A7E6F5eaa8E654E8c74a988A7";
    readonly 43114: "0x214DB107654fF987AD859F34125307783fC8e387";
    readonly 137: "0x3e121107F6F22DA4911079845a470757aF4e1A1b";
    readonly 1285: "0x6f1D1Ee50846Fcbc3de91723E61cb68CFa6D0E98";
    readonly 1284: "0x2CC0A9D8047A5011dEfe85328a6f26968C8aaA1C";
    readonly 1666600000: "0x0767D8E1b05eFA8d6A301a65b324B6b66A1CC14c";
    readonly 288: "0xdc1664458d2f0B6090bEa60A8793A4E66c2F1c00";
    readonly 10: "0x67CCEA5bb16181E7b4109c9c2143c24a1c2205Be";
};
declare const BCT_ADDRESS: {
    readonly 137: "0x2F800Db0fdb5223b3C3f354886d907A671414A7F";
};
declare const KLIMA_ADDRESS: {
    readonly 137: "0x4e78011Ce80ee02d2c3e649Fb657E45898257815";
};
declare const QUICK_ADDRESS: {
    readonly 137: "0x831753dd7087cac61ab5644b308642cc1c33dc13";
};
declare const OP_ADDRESS: {
    readonly 10: "0x4200000000000000000000000000000000000042";
};
declare const LINK_ADDRESS: {
    readonly 1: "0x514910771AF9Ca656af840dff83E8264EcF986CA";
    readonly 137: "0x53E0bca35eC356BD5ddDFebbD1Fc0fD03FaBad39";
    readonly 100: "0xE2e73A1c69ecF83F464EFCE6A5be353a37cA09b2";
    readonly 56: "0xF8A0BF9cF54Bb92F17374d9e9A321E6a111a51bD";
    readonly 128: "0x9e004545c59D359F6B7BFB06a26390b087717b42";
    readonly 10: "0x350a791Bfc2C21F9Ed5d10980Dad2e2638ffa7f6";
    readonly 1666600000: "0x218532a12a389a4a92fC0C5Fb22901D1c19198aA";
    readonly 43114: "0x5947BB275c521040051D82396192181b413227A3";
    readonly 42161: "0xf97f4df75117a78c1A5a0DBb814Af92458539FB4";
    readonly 250: "0xb3654dc3D10Ea7645f8319668E8F54d2574FBdC8";
};
declare const AGEUR_ADDRESS: {
    readonly 1: "0x1a7e4e63778B4f12a199C062f3eFdD288afCBce8";
    readonly 56: "0x12f31B73D812C6Bb0d735a218c086d44D5fe5f89";
    readonly 42161: "0xFA5Ed56A203466CbBC2430a43c66b9D8723528E7";
    readonly 43114: "0xAEC8318a9a59bAEb39861d10ff6C7f7bf1F96C57";
    readonly 137: "0xE0B52e49357Fd4DAf2c15e02058DCE6BC0057db4";
    readonly 10: "0x9485aca5bbBE1667AD97c7fE7C4531a624C8b1ED";
    readonly 100: "0x4b1E2c2762667331Bc91648052F646d1b0d35984";
    readonly 42220: "0xC16B81Af351BA9e64C1a069E3Ab18c244A1E3049";
};
declare const TOKEN_MAP: Record<string, {
    chainId: number;
    tokenAddress: string;
}[]>;
declare const MANA: Record<137, Token>;
declare const MKR: Record<137 | 1 | 43114 | 42161, Token>;
declare const YFI: Record<137 | 1 | 43114 | 42161 | 100 | 1666600000 | 250, Token>;
declare const ENJ: Record<1 | 1666600000, Token>;
declare const CRV: Record<137 | 1 | 42161 | 250 | 10, Token>;
declare const SNX: Record<137 | 1 | 43114 | 1666600000 | 250 | 10, Token>;
declare const GALA: Record<1, Token>;
declare const MATIC: Record<1101, Token>;
declare const GNO: Record<100, Token>;
declare const ARB: Record<1 | 42161 | 42170, Token>;
declare const KP3R: Record<1, Token>;
declare const LDO: Record<1, Token>;
declare const APE: Record<1, Token>;
declare const PRIMATE: Record<1, Token>;
declare const rETH2: Record<1, Token>;
declare const sETH2: Record<1, Token>;
declare const SWISE: Record<1, Token>;
declare const FEI: Record<1, Token>;
declare const TRIBE: Record<1, Token>;
declare const renBTC: Record<1, Token>;
declare const NFTX: Record<1, Token>;
declare const OHM: Record<1, Token>;
declare const WBTC: Record<137 | 1 | 43114 | 42161 | 250 | 10 | 1101 | 42170 | 288 | 2222 | 1088 | 122 | 108, Token>;
declare const UNI: Record<137 | 1 | 43114 | 42161 | 100 | 1666600000 | 10 | 56 | 128, Token>;
declare const BUSD: Record<108 | 56, Token>;
declare const MAI: Record<137 | 1 | 43114 | 42161 | 100 | 1666600000 | 250 | 10 | 288 | 2222 | 1088 | 56 | 1285 | 42220 | 1284, Token>;
declare const TUSD: Record<1, Token>;
declare const AGEUR: Record<137 | 1 | 43114 | 42161 | 100 | 10 | 56 | 42220, Token>;
declare const ANKR: Record<1, Token>;
declare const AAVE: Record<137 | 1 | 43114 | 1666600000 | 250 | 10 | 56, Token>;
declare const COMP: Record<1, Token>;
declare const JPY: Record<137 | 1 | 43114 | 100, Token>;
declare const LUSD: Record<1 | 10, Token>;
declare const WETH9: Record<137 | 1 | 43114 | 42161 | 100 | 1666600000 | 250 | 10 | 1101 | 42170 | 288 | 2222 | 1088 | 122 | 108 | 56 | 128 | 1285 | 42220 | 1284 | 3 | 4 | 5 | 42 | 79377087078960 | 80001 | 66 | 11297108109 | 40 | 199, Token>;
declare const WNATIVE: {
    readonly 1: Token;
    readonly 3: Token;
    readonly 4: Token;
    readonly 5: Token;
    readonly 42: Token;
    readonly 10: Token;
    readonly 250: Token;
    readonly 4002: Token;
    readonly 137: Token;
    readonly 80001: Token;
    readonly 100: Token;
    readonly 56: Token;
    readonly 97: Token;
    readonly 42161: Token;
    readonly 79377087078960: Token;
    readonly 42170: Token;
    readonly 43114: Token;
    readonly 43113: Token;
    readonly 128: Token;
    readonly 256: Token;
    readonly 1666600000: Token;
    readonly 1666700000: Token;
    readonly 66: Token;
    readonly 65: Token;
    readonly 42220: Token;
    readonly 11297108109: Token;
    readonly 1285: Token;
    readonly 122: Token;
    readonly 40: Token;
    readonly 1284: Token;
    readonly 2222: Token;
    readonly 1088: Token;
    readonly 288: Token;
    readonly 43288: Token;
    readonly 56288: Token;
    readonly 199: Token;
    readonly 108: Token;
    readonly 1101: Token;
};
declare const SUSHI: Record<137 | 1 | 43114 | 42161 | 100 | 1666600000 | 250 | 10 | 42170 | 288 | 2222 | 1088 | 122 | 108 | 56 | 128 | 1285 | 42220 | 1284 | 3 | 4 | 5 | 42 | 66 | 40 | 199, Token>;
declare const XSUSHI: Record<1, Token>;
declare const USDC: Record<keyof typeof USDC_ADDRESS, Token>;
declare const USDT: Record<keyof typeof USDT_ADDRESS, Token>;
declare const DAI: Record<137 | 1 | 43114 | 42161 | 100 | 1666600000 | 250 | 10 | 1101 | 42170 | 288 | 2222 | 1088 | 122 | 56 | 128 | 1285 | 42220 | 1284 | 3 | 42 | 66, Token>;
declare const MIM: Record<137 | 1 | 43114 | 42161 | 250 | 56 | 1285, Token>;
declare const FRAX: Record<137 | 1 | 43114 | 42161 | 1666600000 | 250 | 10 | 288 | 56 | 1285 | 1284, Token>;
declare const FXS: Record<137 | 1 | 43114 | 42161 | 1666600000 | 250 | 10 | 288 | 56 | 1285 | 1284, Token>;
declare const BCT: Record<137, Token>;
declare const KLIMA: Record<137, Token>;
declare const QUICK: Record<137, Token>;
declare const OP: Record<10, Token>;
declare const LINK: Record<137 | 1 | 43114 | 42161 | 100 | 1666600000 | 250 | 10 | 56 | 128, Token>;
declare const defaultQuoteCurrency: {
    readonly 1: Token;
    readonly 3: Token;
    readonly 4: Token;
    readonly 5: Token;
    readonly 42: Token;
    readonly 137: Token;
    readonly 250: Token;
    readonly 100: Token;
    readonly 56: Token;
    readonly 42161: Token;
    readonly 42170: Token;
    readonly 43114: Token;
    readonly 128: Token;
    readonly 1666600000: Token;
    readonly 66: Token;
    readonly 42220: Token;
    readonly 1285: Token;
    readonly 122: Token;
    readonly 40: Token;
    readonly 1284: Token;
    readonly 10: Token;
    readonly 2222: Token;
    readonly 1088: Token;
    readonly 288: Token;
    readonly 43288: Token;
    readonly 56288: Token;
    readonly 199: Token;
    readonly 108: Token;
    readonly 1101: Token;
};
declare const nativeCurrencyIds: {
    readonly 1: "ETH";
    readonly 3: "ETH";
    readonly 4: "ETH";
    readonly 5: "ETH";
    readonly 42: "ETH";
    readonly 137: "MATIC";
    readonly 80001: "MATIC";
    readonly 250: "FTM";
    readonly 4002: "FTM";
    readonly 100: "XDAI";
    readonly 56: "BNB";
    readonly 97: "BNB";
    readonly 42161: "ETH";
    readonly 42170: "ETH";
    readonly 79377087078960: "ETH";
    readonly 43114: "AVAX";
    readonly 43113: "AVAX";
    readonly 128: "HT";
    readonly 256: "HT";
    readonly 1666600000: "ONE";
    readonly 1666700000: "ONE";
    readonly 66: "OKT";
    readonly 65: "OKT";
    readonly 42220: "CELO";
    readonly 11297108109: "PALM";
    readonly 1285: "MOVR";
    readonly 122: "FUSE";
    readonly 40: "TLOS";
    readonly 1284: "GLMR";
    readonly 10: "ETH";
    readonly 2222: "KAVA";
    readonly 1088: "METIS";
    readonly 288: "ETH";
    readonly 43288: "BOBA";
    readonly 56288: "BOBA";
    readonly 199: "BTT";
    readonly 108: "TT";
    readonly 1101: "ETH";
};
declare class Price<TBase extends Type, TQuote extends Type> extends Fraction {
    readonly baseCurrency: TBase;
    readonly quoteCurrency: TQuote;
    readonly scalar: Fraction;
    /**
     * Construct a price, either with the base and quote currency amount, or the
     * @param args
     */
    constructor(...args: [TBase, TQuote, BigintIsh, BigintIsh] | [
        {
            baseAmount: Amount<TBase>;
            quoteAmount: Amount<TQuote>;
        }
    ]);
    /**
     * Flip the price, switching the base and quote currency
     */
    invert(): Price<TQuote, TBase>;
    /**
     * Multiply the price by another price, returning a new price. The other price must have the same base currency as this price's quote currency
     * @param other the other price
     */
    multiply<TOtherQuote extends Type>(other: Price<TQuote, TOtherQuote>): Price<TBase, TOtherQuote>;
    /**
     * Return the amount of quote currency corresponding to a given amount of the base currency
     * @param currencyAmount the amount of base currency to quote against the price
     */
    quote(currencyAmount: Amount<TBase>): Amount<TQuote>;
    /**
     * Get the value scaled by decimals for formatting
     * @private
     */
    private get adjustedForDecimals();
    toSignificant(significantDigits?: number, format?: object, rounding?: Rounding): string;
    toFixed(decimalPlaces?: number, format?: object, rounding?: Rounding): string;
}
declare const CHAIN_ID_SHORT_CURRENCY_NAME_TO_CURRENCY: {
    readonly 42161: {
        readonly ETH: Native;
        readonly WETH: Token;
        readonly WBTC: Token;
        readonly USDC: Token;
        readonly USDT: Token;
        readonly DAI: Token;
        readonly FRAX: Token;
        readonly MIM: Token;
        readonly SUSHI: Token;
        readonly MAI: Token;
        readonly UNI: Token;
        readonly AGEUR: Token;
    };
    readonly 42170: {
        readonly ETH: Native;
        readonly WETH: Token;
        readonly SUSHI: Token;
    };
    readonly 43114: {
        readonly AVAX: Native;
        readonly WAVAX: Token;
        readonly ETH: Token;
        readonly WETH: Token;
        readonly WBTC: Token;
        readonly USDC: Token;
        readonly USDT: Token;
        readonly DAI: Token;
        readonly FRAX: Token;
        readonly MIM: Token;
        readonly SUSHI: Token;
        readonly MAI: Token;
        readonly UNI: Token;
        readonly AGEUR: Token;
    };
    readonly 288: {
        readonly ETH: Native;
        readonly WETH: Token;
        readonly SUSHI: Token;
    };
    readonly 43288: {
        readonly BOBA: Native;
        readonly WBOBA: Token;
        readonly USDC: Token;
    };
    readonly 56288: {
        readonly BOBA: Native;
        readonly WBOBA: Token;
        readonly USDC: Token;
        readonly BNB: Token;
    };
    readonly 56: {
        readonly BNB: Native;
        readonly WBNB: Token;
        readonly ETH: Token;
        readonly WETH: Token;
        readonly USDC: Token;
        readonly USDT: Token;
        readonly DAI: Token;
        readonly FRAX: Token;
        readonly MIM: Token;
        readonly SUSHI: Token;
        readonly MAI: Token;
        readonly UNI: Token;
        readonly AGEUR: Token;
    };
    readonly 199: {
        readonly BTT: Native;
        readonly WBTT: Token;
        readonly SUSHI: Token;
    };
    readonly 42220: {
        readonly CELO: Native;
        readonly WCELO: Token;
        readonly SUSHI: Token;
        readonly AGEUR: Token;
    };
    readonly 1: {
        readonly ETH: Native;
        readonly WETH: Token;
        readonly WBTC: Token;
        readonly USDC: Token;
        readonly USDT: Token;
        readonly DAI: Token;
        readonly FRAX: Token;
        readonly MIM: Token;
        readonly SUSHI: Token;
        readonly MAI: Token;
        readonly UNI: Token;
        readonly LUSD: Token;
        readonly AGEUR: Token;
    };
    readonly 250: {
        readonly FTM: Native;
        readonly WFTM: Token;
        readonly ETH: Token;
        readonly WETH: Token;
        readonly WBTC: Token;
        readonly USDC: Token;
        readonly USDT: Token;
        readonly DAI: Token;
        readonly FRAX: Token;
        readonly MIM: Token;
        readonly SUSHI: Token;
        readonly MAI: Token;
    };
    readonly 122: {
        readonly FUSE: Native;
        readonly WFUSE: Token;
        readonly SUSHI: Token;
    };
    readonly 100: {
        readonly XDAI: Native;
        readonly WXDAI: Token;
        readonly SUSHI: Token;
        readonly AGEUR: Token;
    };
    readonly 2222: {
        readonly KAVA: Native;
        readonly WKAVA: Token;
        readonly SUSHI: Token;
    };
    readonly 1088: {
        readonly METIS: Native;
        readonly WMETIS: Token;
        readonly SUSHI: Token;
    };
    readonly 1284: {
        readonly GLMR: Native;
        readonly WGLMR: Token;
        readonly SUSHI: Token;
    };
    readonly 1285: {
        readonly MOVR: Native;
        readonly WMOVR: Token;
        readonly SUSHI: Token;
    };
    readonly 10: {
        readonly ETH: Native;
        readonly WETH: Token;
        readonly USDC: Token;
        readonly USDT: Token;
        readonly OP: Token;
        readonly SUSHI: Token;
        readonly AGEUR: Token;
    };
    readonly 137: {
        readonly MATIC: Native;
        readonly WMATIC: Token;
        readonly ETH: Token;
        readonly WETH: Token;
        readonly WBTC: Token;
        readonly USDC: Token;
        readonly USDT: Token;
        readonly DAI: Token;
        readonly FRAX: Token;
        readonly MIM: Token;
        readonly SUSHI: Token;
        readonly MAI: Token;
        readonly UNI: Token;
        readonly AGEUR: Token;
    };
    readonly 1666600000: {
        readonly ONE: Native;
        readonly WONE: Token;
        readonly SUSHI: Token;
    };
    readonly 108: {
        readonly NATIVE: Native;
        readonly WNATIVE: Token;
        readonly SUSHI: Token;
    };
    readonly 1101: {
        readonly NATIVE: Native;
        readonly WNATIVE: Token;
        readonly ETH: Native;
        readonly WETH: Token;
    };
};
type ShortCurrencyNameChainId = keyof typeof CHAIN_ID_SHORT_CURRENCY_NAME_TO_CURRENCY;
type ShortCurrencyName = keyof (typeof CHAIN_ID_SHORT_CURRENCY_NAME_TO_CURRENCY)[ShortCurrencyNameChainId];
declare const isShortCurrencyNameSupported: (chainId: ChainId) => chainId is 137 | 1 | 43114 | 42161 | 100 | 1666600000 | 250 | 10 | 1101 | 42170 | 288 | 2222 | 1088 | 122 | 108 | 56 | 1285 | 42220 | 1284 | 199 | 43288 | 56288;
declare const isShortCurrencyName: (chainId: ChainId, shortCurrencyName: string) => shortCurrencyName is never;
declare const currencyFromShortCurrencyName: (chainId: ChainId, shortCurrencyName: ShortCurrencyName) => Type;
declare function tryParseAmount<T extends Type>(value?: string, currency?: T): Amount<T> | undefined;
export { AAVE, AAVE_ADDRESS, AGEUR, AGEUR_ADDRESS, ANKR, ANKR_ADDRESS, APE, APE_ADDRESS, ARB, ARB_ADDRESS, Amount, BCT, BCT_ADDRESS, BUSD, BUSD_ADDRESS, COMP, COMP_ADDRESS, CRV, CRV_ADDRESS, Type as Currency, DAI, DAI_ADDRESS, ENJ, ENJ_ADDRESS, FEI, FEI_ADDRESS, FRAX, FRAX_ADDRESS, FTM_ADDRESS, FXS, FXS_ADDRESS, GALA, GALA_ADDRESS, GNO, GNO_ADDRESS, JPY, JPY_ADDRESS, KLIMA, KLIMA_ADDRESS, KP3R, KP3R_ADDRESS, LDO, LDO_ADDRESS, LINK, LINK_ADDRESS, LUSD, LUSD_ADDRESS, MAI, MAI_ADDRESS, MANA, MANA_ADDRESS, MATIC, MATIC_ADDRESS, MIM, MIM_ADDRESS, MKR, MKR_ADDRESS, NFTX, NFTX_ADDRESS, Native, OHM, OHM_ADDRESS, OP, OP_ADDRESS, PRIMATE, PRIMATE_ADDRESS, Price, QUICK, QUICK_ADDRESS, SNX, SNX_ADDRESS, SUSHI, SUSHI_ADDRESS, SWISE, SWISE_ADDRESS, SerializedAmount, SerializedNative, SerializedToken, Share, ShortCurrencyName, ShortCurrencyNameChainId, TOKEN_MAP, TRIBE, TRIBE_ADDRESS, TUSD, TUSD_ADDRESS, Token, Type, UNI, UNI_ADDRESS, USDC, USDC_ADDRESS, USDT, USDT_ADDRESS, WBTC, WBTC_ADDRESS, WETH9, WETH9_ADDRESS, WNATIVE, WNATIVE_ADDRESS, XSUSHI, XSUSHI_ADDRESS, YFI, YFI_ADDRESS, addressMapToTokenMap, amountSchema, currencyFromShortCurrencyName, defaultQuoteCurrency, isShortCurrencyName, isShortCurrencyNameSupported, nativeCurrencyIds, nativeSchema, rETH2, rETH2_ADDRESS, renBTC, renBTC_ADDRESS, sETH2, sETH2_ADDRESS, tokenSchema, tryParseAmount };
