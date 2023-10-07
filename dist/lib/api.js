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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapToken = exports.filterTopPools = exports.filterOnDemandPools = exports.discoverNewPools = exports.getAllPools = void 0;
var currency_1 = require("@sushiswap/currency");
var database_1 = require("./database");
function getAllPools(client, chainId, protocol, version, poolTypes) {
    return __awaiter(this, void 0, void 0, function () {
        var pools, poolMap;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, database_1.getAllPools)(client, { chainId: chainId, protocol: protocol, version: version, poolTypes: poolTypes })];
                case 1:
                    pools = _a.sent();
                    poolMap = new Map(pools.map(function (pool) { return [pool.address, pool]; }));
                    return [2 /*return*/, poolMap];
            }
        });
    });
}
exports.getAllPools = getAllPools;
function discoverNewPools(client, chainId, protocol, version, poolTypes, date) {
    return __awaiter(this, void 0, void 0, function () {
        var pools, poolMap;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, database_1.getNewPools)(client, { chainId: chainId, protocol: protocol, version: version, poolTypes: poolTypes, date: date })];
                case 1:
                    pools = _a.sent();
                    poolMap = new Map(pools.map(function (pool) { return [pool.address, pool]; }));
                    return [2 /*return*/, poolMap];
            }
        });
    });
}
exports.discoverNewPools = discoverNewPools;
function filterOnDemandPools(pools, token0Address, token1Address, topPoolAddresses, size) {
    var token0PoolSize = 0;
    var token1PoolSize = 0;
    var token0Pools = pools.filter(function (p) {
        return (p.token0.address === token0Address.toLowerCase() &&
            !p.token1.isFeeOnTransfer &&
            p.token1.status === 'APPROVED') ||
            (p.token1.address === token0Address.toLowerCase() && !p.token0.isFeeOnTransfer && p.token0.status === 'APPROVED');
    });
    var token1Pools = pools.filter(function (p) {
        return (p.token0.address === token1Address.toLowerCase() &&
            !p.token1.isFeeOnTransfer &&
            p.token1.status === 'APPROVED') ||
            (p.token1.address === token1Address.toLowerCase() && !p.token0.isFeeOnTransfer && p.token0.status === 'APPROVED');
    });
    // console.log(`Flattened pools, recieved: t0: ${token0Pools.length}, t1: ${token1Pools.length}`)
    // const topPoolIds = result[2].map((p) => p.id)
    var filteredToken0Pools = token0Pools.filter(function (p) { return !topPoolAddresses.includes(p.address); });
    var filteredToken1Pools = token1Pools.filter(function (p) { return !topPoolAddresses.includes(p.address); });
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
    var pools0 = filteredToken0Pools
        .sort(function (a, b) { return Number(b.liquidityUSD) - Number(a.liquidityUSD); })
        .slice(0, token0PoolSize);
    var pools1 = filteredToken1Pools
        .sort(function (a, b) { return Number(b.liquidityUSD) - Number(a.liquidityUSD); })
        .slice(0, token1PoolSize);
    return Array.from(new Set(__spreadArray(__spreadArray([], pools0, true), pools1, true).flat()));
}
exports.filterOnDemandPools = filterOnDemandPools;
function filterTopPools(pools, size) {
    var safePools = pools.filter(function (p) {
        return p.token0.status === 'APPROVED' &&
            !p.token0.isFeeOnTransfer &&
            p.token1.status === 'APPROVED' &&
            !p.token1.isFeeOnTransfer;
    });
    var commonPools = safePools.filter(function (p) { return p.token0.isCommon && p.token1.isCommon; });
    var topPools = safePools
        .sort(function (a, b) { return Number(b.liquidityUSD) - Number(a.liquidityUSD); })
        .slice(0, safePools.length <= size ? size : size - commonPools.length);
    return __spreadArray(__spreadArray([], topPools, true), commonPools, true);
}
exports.filterTopPools = filterTopPools;
function mapToken(chainId, _a) {
    var address = _a.address, decimals = _a.decimals, symbol = _a.symbol, name = _a.name;
    return new currency_1.Token({
        chainId: chainId,
        address: address,
        decimals: decimals,
        symbol: symbol,
        name: name,
    });
}
exports.mapToken = mapToken;
//# sourceMappingURL=api.js.map