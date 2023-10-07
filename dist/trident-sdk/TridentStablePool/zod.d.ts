import { Fee } from '@sushiswap/base-sdk';
import * as z from 'zod';
export declare const tridentStablePoolSchema: z.ZodObject<{
    reserve0: z.ZodObject<{
        amount: z.ZodString;
        currency: z.ZodDiscriminatedUnion<"isNative", [z.ZodObject<{
            isNative: z.ZodLiteral<true>;
            name: z.ZodOptional<z.ZodString>;
            symbol: z.ZodOptional<z.ZodString>;
            decimals: z.ZodNumber;
            chainId: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            decimals: number;
            chainId: number;
            isNative: true;
            name?: string;
            symbol?: string;
        }, {
            decimals: number;
            chainId: number;
            isNative: true;
            name?: string;
            symbol?: string;
        }>, z.ZodObject<{
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
            name?: string;
            symbol?: string;
        }, {
            decimals: number;
            chainId: number;
            address: string;
            isNative: false;
            name?: string;
            symbol?: string;
        }>]>;
    }, "strip", z.ZodTypeAny, {
        amount: string;
        currency: {
            decimals: number;
            chainId: number;
            isNative: true;
            name?: string;
            symbol?: string;
        } | {
            decimals: number;
            chainId: number;
            address: string;
            isNative: false;
            name?: string;
            symbol?: string;
        };
    }, {
        amount: string;
        currency: {
            decimals: number;
            chainId: number;
            isNative: true;
            name?: string;
            symbol?: string;
        } | {
            decimals: number;
            chainId: number;
            address: string;
            isNative: false;
            name?: string;
            symbol?: string;
        };
    }>;
    reserve1: z.ZodObject<{
        amount: z.ZodString;
        currency: z.ZodDiscriminatedUnion<"isNative", [z.ZodObject<{
            isNative: z.ZodLiteral<true>;
            name: z.ZodOptional<z.ZodString>;
            symbol: z.ZodOptional<z.ZodString>;
            decimals: z.ZodNumber;
            chainId: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            decimals: number;
            chainId: number;
            isNative: true;
            name?: string;
            symbol?: string;
        }, {
            decimals: number;
            chainId: number;
            isNative: true;
            name?: string;
            symbol?: string;
        }>, z.ZodObject<{
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
            name?: string;
            symbol?: string;
        }, {
            decimals: number;
            chainId: number;
            address: string;
            isNative: false;
            name?: string;
            symbol?: string;
        }>]>;
    }, "strip", z.ZodTypeAny, {
        amount: string;
        currency: {
            decimals: number;
            chainId: number;
            isNative: true;
            name?: string;
            symbol?: string;
        } | {
            decimals: number;
            chainId: number;
            address: string;
            isNative: false;
            name?: string;
            symbol?: string;
        };
    }, {
        amount: string;
        currency: {
            decimals: number;
            chainId: number;
            isNative: true;
            name?: string;
            symbol?: string;
        } | {
            decimals: number;
            chainId: number;
            address: string;
            isNative: false;
            name?: string;
            symbol?: string;
        };
    }>;
    fee: z.ZodNativeEnum<typeof Fee>;
    total0: z.ZodObject<{
        base: z.ZodString;
        elastic: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        base?: string;
        elastic?: string;
    }, {
        base?: string;
        elastic?: string;
    }>;
    total1: z.ZodObject<{
        base: z.ZodString;
        elastic: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        base?: string;
        elastic?: string;
    }, {
        base?: string;
        elastic?: string;
    }>;
}, "strip", z.ZodTypeAny, {
    reserve0?: z.ZodObject<{
        amount: z.ZodString;
        currency: z.ZodDiscriminatedUnion<"isNative", [z.ZodObject<{
            isNative: z.ZodLiteral<true>;
            name: z.ZodOptional<z.ZodString>;
            symbol: z.ZodOptional<z.ZodString>;
            decimals: z.ZodNumber;
            chainId: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            decimals: number;
            chainId: number;
            isNative: true;
            name?: string;
            symbol?: string;
        }, {
            decimals: number;
            chainId: number;
            isNative: true;
            name?: string;
            symbol?: string;
        }>, z.ZodObject<{
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
            name?: string;
            symbol?: string;
        }, {
            decimals: number;
            chainId: number;
            address: string;
            isNative: false;
            name?: string;
            symbol?: string;
        }>]>;
    }, "strip", z.ZodTypeAny, {
        amount: string;
        currency: {
            decimals: number;
            chainId: number;
            isNative: true;
            name?: string;
            symbol?: string;
        } | {
            decimals: number;
            chainId: number;
            address: string;
            isNative: false;
            name?: string;
            symbol?: string;
        };
    }, {
        amount: string;
        currency: {
            decimals: number;
            chainId: number;
            isNative: true;
            name?: string;
            symbol?: string;
        } | {
            decimals: number;
            chainId: number;
            address: string;
            isNative: false;
            name?: string;
            symbol?: string;
        };
    }>;
    reserve1?: z.ZodObject<{
        amount: z.ZodString;
        currency: z.ZodDiscriminatedUnion<"isNative", [z.ZodObject<{
            isNative: z.ZodLiteral<true>;
            name: z.ZodOptional<z.ZodString>;
            symbol: z.ZodOptional<z.ZodString>;
            decimals: z.ZodNumber;
            chainId: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            decimals: number;
            chainId: number;
            isNative: true;
            name?: string;
            symbol?: string;
        }, {
            decimals: number;
            chainId: number;
            isNative: true;
            name?: string;
            symbol?: string;
        }>, z.ZodObject<{
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
            name?: string;
            symbol?: string;
        }, {
            decimals: number;
            chainId: number;
            address: string;
            isNative: false;
            name?: string;
            symbol?: string;
        }>]>;
    }, "strip", z.ZodTypeAny, {
        amount: string;
        currency: {
            decimals: number;
            chainId: number;
            isNative: true;
            name?: string;
            symbol?: string;
        } | {
            decimals: number;
            chainId: number;
            address: string;
            isNative: false;
            name?: string;
            symbol?: string;
        };
    }, {
        amount: string;
        currency: {
            decimals: number;
            chainId: number;
            isNative: true;
            name?: string;
            symbol?: string;
        } | {
            decimals: number;
            chainId: number;
            address: string;
            isNative: false;
            name?: string;
            symbol?: string;
        };
    }>;
    fee?: Fee;
    total0?: {
        base?: string;
        elastic?: string;
    };
    total1?: {
        base?: string;
        elastic?: string;
    };
}, {
    reserve0?: z.ZodObject<{
        amount: z.ZodString;
        currency: z.ZodDiscriminatedUnion<"isNative", [z.ZodObject<{
            isNative: z.ZodLiteral<true>;
            name: z.ZodOptional<z.ZodString>;
            symbol: z.ZodOptional<z.ZodString>;
            decimals: z.ZodNumber;
            chainId: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            decimals: number;
            chainId: number;
            isNative: true;
            name?: string;
            symbol?: string;
        }, {
            decimals: number;
            chainId: number;
            isNative: true;
            name?: string;
            symbol?: string;
        }>, z.ZodObject<{
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
            name?: string;
            symbol?: string;
        }, {
            decimals: number;
            chainId: number;
            address: string;
            isNative: false;
            name?: string;
            symbol?: string;
        }>]>;
    }, "strip", z.ZodTypeAny, {
        amount: string;
        currency: {
            decimals: number;
            chainId: number;
            isNative: true;
            name?: string;
            symbol?: string;
        } | {
            decimals: number;
            chainId: number;
            address: string;
            isNative: false;
            name?: string;
            symbol?: string;
        };
    }, {
        amount: string;
        currency: {
            decimals: number;
            chainId: number;
            isNative: true;
            name?: string;
            symbol?: string;
        } | {
            decimals: number;
            chainId: number;
            address: string;
            isNative: false;
            name?: string;
            symbol?: string;
        };
    }>;
    reserve1?: z.ZodObject<{
        amount: z.ZodString;
        currency: z.ZodDiscriminatedUnion<"isNative", [z.ZodObject<{
            isNative: z.ZodLiteral<true>;
            name: z.ZodOptional<z.ZodString>;
            symbol: z.ZodOptional<z.ZodString>;
            decimals: z.ZodNumber;
            chainId: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            decimals: number;
            chainId: number;
            isNative: true;
            name?: string;
            symbol?: string;
        }, {
            decimals: number;
            chainId: number;
            isNative: true;
            name?: string;
            symbol?: string;
        }>, z.ZodObject<{
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
            name?: string;
            symbol?: string;
        }, {
            decimals: number;
            chainId: number;
            address: string;
            isNative: false;
            name?: string;
            symbol?: string;
        }>]>;
    }, "strip", z.ZodTypeAny, {
        amount: string;
        currency: {
            decimals: number;
            chainId: number;
            isNative: true;
            name?: string;
            symbol?: string;
        } | {
            decimals: number;
            chainId: number;
            address: string;
            isNative: false;
            name?: string;
            symbol?: string;
        };
    }, {
        amount: string;
        currency: {
            decimals: number;
            chainId: number;
            isNative: true;
            name?: string;
            symbol?: string;
        } | {
            decimals: number;
            chainId: number;
            address: string;
            isNative: false;
            name?: string;
            symbol?: string;
        };
    }>;
    fee?: Fee;
    total0?: {
        base?: string;
        elastic?: string;
    };
    total1?: {
        base?: string;
        elastic?: string;
    };
}>;
export type SerializedStablePool = z.infer<typeof tridentStablePoolSchema>;
//# sourceMappingURL=zod.d.ts.map