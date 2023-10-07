"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tridentStablePoolSchema = void 0;
const base_sdk_1 = require("@sushiswap/base-sdk");
const currency_1 = require("@sushiswap/currency");
const z = require("zod");
exports.tridentStablePoolSchema = z.object({
    reserve0: currency_1.amountSchema,
    reserve1: currency_1.amountSchema,
    fee: z.nativeEnum(base_sdk_1.Fee),
    total0: z.object({
        base: z.string(),
        elastic: z.string(),
    }),
    total1: z.object({
        base: z.string(),
        elastic: z.string(),
    }),
});
//# sourceMappingURL=zod.js.map