"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNewPools = exports.getAllPools = void 0;
const zod_1 = require("zod");
const AllPools = zod_1.z.object({
    chainId: zod_1.z.coerce
        .number()
        .int()
        .gte(0)
        .lte(2 ** 256),
    version: zod_1.z.string(),
    protocol: zod_1.z.string(),
    poolTypes: zod_1.z.string().transform((poolTypes) => poolTypes?.split(',')),
});
const DiscoverNewPools = zod_1.z.object({
    chainId: zod_1.z.coerce
        .number()
        .int()
        .gte(0)
        .lte(2 ** 256),
    version: zod_1.z.string(),
    protocol: zod_1.z.string(),
    poolTypes: zod_1.z.string().transform((poolTypes) => poolTypes?.split(',')),
    date: zod_1.z.string().transform((date) => new Date(date)),
});
const SELECT = {
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
async function getAllPools(client, args) {
    try {
        const where = {
            chainId: args.chainId,
            protocol: args.protocol,
        };
        const batchSize = 1000;
        let cursor = null;
        const results = [];
        let totalCount = 0;
        do {
            let result = [];
            if (!cursor) {
                result = await getPoolsPagination(client, where, batchSize);
            }
            else {
                result = await getPoolsPagination(client, where, batchSize, 1, { id: cursor });
            }
            cursor = result.length === batchSize ? result[result.length - 1]?.id : null;
            totalCount += result.length;
            results.push(result);
            // console.debug(
            //   `${args.chainId}-${args.protocol}-${args.version} Fetched a batch of pools with ${result.length}
            //    cursor: ${cursor}, total: ${totalCount}.`
            // )
        } while (cursor != null);
        const flatResult = results.flat();
        //console.debug(`${args.chainId}-${args.protocol}-${args.version} Fetched ${flatResult.length}`)
        await client.$disconnect();
        return flatResult;
    }
    catch (e) {
        console.error(e.message);
        await client.$disconnect();
        return [];
    }
}
exports.getAllPools = getAllPools;
async function getPoolsPagination(client, where, take, skip, cursor) {
    const pools = await client.pool.findMany({
        where,
        orderBy: [
            {
                liquidityUSD: 'desc',
            },
            {
                id: 'desc',
            },
        ],
        take,
        skip,
        cursor,
        select: SELECT,
    });
    return pools;
}
async function getNewPools(client, args) {
    const where = {
        chainId: args.chainId,
        protocol: args.protocol,
        generatedAt: {
            gt: args.date,
        },
    };
    const pools = await client.pool.findMany({
        where,
        select: SELECT,
    });
    return pools;
}
exports.getNewPools = getNewPools;
//# sourceMappingURL=database.js.map