"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNewPools = exports.getAllPools = void 0;
var zod_1 = require("zod");
var AllPools = zod_1.z.object({
    chainId: zod_1.z.coerce
        .number()
        .int()
        .gte(0)
        .lte(Math.pow(2, 256)),
    version: zod_1.z.string(),
    protocol: zod_1.z.string(),
    poolTypes: zod_1.z.string().transform(function (poolTypes) { return poolTypes === null || poolTypes === void 0 ? void 0 : poolTypes.split(','); }),
});
var DiscoverNewPools = zod_1.z.object({
    chainId: zod_1.z.coerce
        .number()
        .int()
        .gte(0)
        .lte(Math.pow(2, 256)),
    version: zod_1.z.string(),
    protocol: zod_1.z.string(),
    poolTypes: zod_1.z.string().transform(function (poolTypes) { return poolTypes === null || poolTypes === void 0 ? void 0 : poolTypes.split(','); }),
    date: zod_1.z.string().transform(function (date) { return new Date(date); }),
});
var SELECT = {
    id: true,
    address: true,
    twapEnabled: true,
    isWhitelisted: true,
    swapFee: true,
    type: true,
    liquidityUSD: true,
    token0: {
        select: {
            id: true,
            address: true,
            status: true,
            name: true,
            symbol: true,
            decimals: true,
            isFeeOnTransfer: true,
            isCommon: true,
        },
    },
    token1: {
        select: {
            id: true,
            address: true,
            name: true,
            status: true,
            symbol: true,
            decimals: true,
            isFeeOnTransfer: true,
            isCommon: true,
        },
    },
};
function getAllPools(client, args) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var where, batchSize, cursor, results, totalCount, result, flatResult, e_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 9, , 11]);
                    where = {
                        chainId: args.chainId,
                        protocol: args.protocol,
                    };
                    batchSize = 1000;
                    cursor = null;
                    results = [];
                    totalCount = 0;
                    _b.label = 1;
                case 1:
                    result = [];
                    if (!!cursor) return [3 /*break*/, 3];
                    return [4 /*yield*/, getPoolsPagination(client, where, batchSize)];
                case 2:
                    result = _b.sent();
                    return [3 /*break*/, 5];
                case 3: return [4 /*yield*/, getPoolsPagination(client, where, batchSize, 1, { id: cursor })];
                case 4:
                    result = _b.sent();
                    _b.label = 5;
                case 5:
                    cursor = result.length === batchSize ? (_a = result[result.length - 1]) === null || _a === void 0 ? void 0 : _a.id : null;
                    totalCount += result.length;
                    results.push(result);
                    _b.label = 6;
                case 6:
                    if (cursor != null) return [3 /*break*/, 1];
                    _b.label = 7;
                case 7:
                    flatResult = results.flat();
                    //console.debug(`${args.chainId}-${args.protocol}-${args.version} Fetched ${flatResult.length}`)
                    return [4 /*yield*/, client.$disconnect()];
                case 8:
                    //console.debug(`${args.chainId}-${args.protocol}-${args.version} Fetched ${flatResult.length}`)
                    _b.sent();
                    return [2 /*return*/, flatResult];
                case 9:
                    e_1 = _b.sent();
                    console.error(e_1.message);
                    return [4 /*yield*/, client.$disconnect()];
                case 10:
                    _b.sent();
                    return [2 /*return*/, []];
                case 11: return [2 /*return*/];
            }
        });
    });
}
exports.getAllPools = getAllPools;
function getPoolsPagination(client, where, take, skip, cursor) {
    return __awaiter(this, void 0, void 0, function () {
        var pools;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, client.pool.findMany({
                        where: where,
                        orderBy: [
                            {
                                liquidityUSD: 'desc',
                            },
                            {
                                id: 'desc',
                            },
                        ],
                        take: take,
                        skip: skip,
                        cursor: cursor,
                        select: SELECT,
                    })];
                case 1:
                    pools = _a.sent();
                    return [2 /*return*/, pools];
            }
        });
    });
}
function getNewPools(client, args) {
    return __awaiter(this, void 0, void 0, function () {
        var where, pools;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    where = {
                        chainId: args.chainId,
                        protocol: args.protocol,
                        generatedAt: {
                            gt: args.date,
                        },
                    };
                    return [4 /*yield*/, client.pool.findMany({
                            where: where,
                            select: SELECT,
                        })];
                case 1:
                    pools = _a.sent();
                    return [2 /*return*/, pools];
            }
        });
    });
}
exports.getNewPools = getNewPools;
//# sourceMappingURL=database.js.map