"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tridentConstantPoolSchema = void 0;
const base_sdk_1 = require("@sushiswap/base-sdk");
const currency_1 = require("@sushiswap/currency");
const z = require("zod");
exports.tridentConstantPoolSchema = z.object({
    reserve0: currency_1.amountSchema,
    reserve1: currency_1.amountSchema,
    fee: z.nativeEnum(base_sdk_1.Fee),
    twap: z.boolean(),
});
//# sourceMappingURL=zod.js.map