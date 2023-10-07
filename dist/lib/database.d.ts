import { PrismaClient } from '@sushiswap/database';
import { z } from 'zod';
declare const AllPools: z.ZodObject<{
    chainId: z.ZodNumber;
    version: z.ZodString;
    protocol: z.ZodString;
    poolTypes: z.ZodEffects<z.ZodString, string[], string>;
}, "strip", z.ZodTypeAny, {
    chainId?: number;
    version?: string;
    protocol?: string;
    poolTypes?: string[];
}, {
    chainId?: number;
    version?: string;
    protocol?: string;
    poolTypes?: string;
}>;
declare const DiscoverNewPools: z.ZodObject<{
    chainId: z.ZodNumber;
    version: z.ZodString;
    protocol: z.ZodString;
    poolTypes: z.ZodEffects<z.ZodString, string[], string>;
    date: z.ZodEffects<z.ZodString, Date, string>;
}, "strip", z.ZodTypeAny, {
    chainId?: number;
    version?: string;
    protocol?: string;
    poolTypes?: string[];
    date?: Date;
}, {
    chainId?: number;
    version?: string;
    protocol?: string;
    poolTypes?: string;
    date?: string;
}>;
export declare function getAllPools(client: PrismaClient, args: typeof AllPools._output): Promise<string[]>;
export declare function getNewPools(client: PrismaClient, args: typeof DiscoverNewPools._output): Promise<any>;
export {};
//# sourceMappingURL=database.d.ts.map