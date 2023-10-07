"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapToken = exports.filterTopPools = exports.filterOnDemandPools = exports.discoverNewPools = exports.getAllPools = void 0;
const currency_1 = require("@sushiswap/currency");
const database_1 = require("./database");
async function getAllPools(client, chainId, protocol, version, poolTypes) {
    const pools = await (0, database_1.getAllPools)(client, { chainId, protocol, version, poolTypes });
    const poolMap = new Map(pools.map((pool) => [pool.address, pool]));
    return poolMap;
}
exports.getAllPools = getAllPools;
async function discoverNewPools(client, chainId, protocol, version, poolTypes, date) {
    const pools = await (0, database_1.getNewPools)(client, { chainId, protocol, version, poolTypes, date });
    const poolMap = new Map(pools.map((pool) => [pool.address, pool]));
    return poolMap;
}
exports.discoverNewPools = discoverNewPools;
function filterOnDemandPools(pools, token0Address, token1Address, topPoolAddresses, size) {
    let token0PoolSize = 0;
    let token1PoolSize = 0;
    const token0Pools = pools.filter((p) => (p.token0.address === token0Address.toLowerCase() &&
        !p.token1.isFeeOnTransfer &&
        p.token1.status === 'APPROVED') ||
        (p.token1.address === token0Address.toLowerCase() && !p.token0.isFeeOnTransfer && p.token0.status === 'APPROVED'));
    const token1Pools = pools.filter((p) => (p.token0.address === token1Address.toLowerCase() &&
        !p.token1.isFeeOnTransfer &&
        p.token1.status === 'APPROVED') ||
        (p.token1.address === token1Address.toLowerCase() && !p.token0.isFeeOnTransfer && p.token0.status === 'APPROVED'));
    // console.log(`Flattened pools, recieved: t0: ${token0Pools.length}, t1: ${token1Pools.length}`)
    // const topPoolIds = result[2].map((p) => p.id)
    const filteredToken0Pools = token0Pools.filter((p) => !topPoolAddresses.includes(p.address));
    const filteredToken1Pools = token1Pools.filter((p) => !topPoolAddresses.includes(p.address));
    // console.log(`After excluding top pools: t0: ${filteredToken0Pools.length}, t1: ${filteredToken1Pools.length}`)
    if (filteredToken0Pools.length >= size / 2 && filteredToken1Pools.length >= size / 2) {
        token0PoolSize = size / 2;
        token1PoolSize = size / 2;
    }
    else if (filteredToken0Pools.length >= size / 2 && filteredToken1Pools.length < size / 2) {
        token1PoolSize = filteredToken1Pools.length;
        token0PoolSize = size - filteredToken1Pools.length;
    }
    else if (filteredToken1Pools.length >= size / 2 && filteredToken0Pools.length < size / 2) {
        token0PoolSize = filteredToken0Pools.length;
        token1PoolSize = size - filteredToken0Pools.length;
    }
    else {
        token0PoolSize = filteredToken0Pools.length;
        token1PoolSize = filteredToken1Pools.length;
    }
    const pools0 = filteredToken0Pools
        .sort((a, b) => Number(b.liquidityUSD) - Number(a.liquidityUSD))
        .slice(0, token0PoolSize);
    const pools1 = filteredToken1Pools
        .sort((a, b) => Number(b.liquidityUSD) - Number(a.liquidityUSD))
        .slice(0, token1PoolSize);
    return Array.from(new Set([...pools0, ...pools1].flat()));
}
exports.filterOnDemandPools = filterOnDemandPools;
function filterTopPools(pools, size) {
    const safePools = pools.filter((p) => p.token0.status === 'APPROVED' &&
        !p.token0.isFeeOnTransfer &&
        p.token1.status === 'APPROVED' &&
        !p.token1.isFeeOnTransfer);
    const commonPools = safePools.filter((p) => p.token0.isCommon && p.token1.isCommon);
    const topPools = safePools
        .sort((a, b) => Number(b.liquidityUSD) - Number(a.liquidityUSD))
        .slice(0, safePools.length <= size ? size : size - commonPools.length);
    return [...topPools, ...commonPools];
}
exports.filterTopPools = filterTopPools;
function mapToken(chainId, { address, decimals, symbol, name, }) {
    return new currency_1.Token({
        chainId,
        address,
        decimals,
        symbol,
        name,
    });
}
exports.mapToken = mapToken;
//# sourceMappingURL=api.js.map