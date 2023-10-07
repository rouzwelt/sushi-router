"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tridentConstantPoolSchema = void 0;
var base_sdk_1 = require("@sushiswap/base-sdk");
var currency_1 = require("@sushiswap/currency");
var zod_1 = require("zod");
exports.tridentConstantPoolSchema = zod_1.default.object({
    reserve0: currency_1.amountSchema,
    reserve1: currency_1.amountSchema,
    fee: zod_1.default.nativeEnum(base_sdk_1.Fee),
    twap: zod_1.default.boolean(),
});
//# sourceMappingURL=zod.js.map