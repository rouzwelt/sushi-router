"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tridentStablePoolSchema = void 0;
var base_sdk_1 = require("@sushiswap/base-sdk");
var currency_1 = require("@sushiswap/currency");
var zod_1 = require("zod");
exports.tridentStablePoolSchema = zod_1.default.object({
    reserve0: currency_1.amountSchema,
    reserve1: currency_1.amountSchema,
    fee: zod_1.default.nativeEnum(base_sdk_1.Fee),
    total0: zod_1.default.object({
        base: zod_1.default.string(),
        elastic: zod_1.default.string(),
    }),
    total1: zod_1.default.object({
        base: zod_1.default.string(),
        elastic: zod_1.default.string(),
    }),
});
//# sourceMappingURL=zod.js.map