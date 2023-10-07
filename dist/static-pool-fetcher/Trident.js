"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TridentStaticPoolFetcher = void 0;
const abi_1 = require("@sushiswap/abi");
const memoize_fs_1 = require("memoize-fs");
const getCurrencyCombinations_1 = require("../getCurrencyCombinations");
const trident_sdk_1 = require("../trident-sdk");
const memoizer = (0, memoize_fs_1.default)({ cachePath: "./mem-cache" });
class TridentStaticPoolFetcher {
    static async getStaticPools(client, chainId, t1, t2, options) {
        const pools = await Promise.all([
            this.getPools(client, chainId, t1, t2, 'CONSTANT_PRODUCT_POOL', options),
            this.getPools(client, chainId, t1, t2, 'STABLE_POOL', options),
        ]);
        return pools;
    }
    static async getPools(client, chainId, t1, t2, type, options) {
        const currencies = (0, getCurrencyCombinations_1.getCurrencyCombinations)(chainId, t1, t2);
        const _pairsUnique = pairsUnique(currencies);
        const _pairsUniqueAddr = _pairsUnique.map(([t0, t1]) => [t0.address, t1.address]);
        const factoryAddress = type === 'STABLE_POOL'
            ? trident_sdk_1.tridentStablePoolFactoryAddress[chainId]
            : trident_sdk_1.tridentConstantPoolFactoryAddress[chainId];
        const factoryAbi = type === 'STABLE_POOL'
            ? trident_sdk_1.tridentStablePoolFactoryAbi[chainId]
            : trident_sdk_1.tridentConstantPoolFactoryAbi[chainId];
        const asyncMulticallWrapper = async (calldata, callback) => {
            client.multicall(calldata)
                .then(v => callback(v, undefined))
                .catch(reason => callback(undefined, reason));
        };
        const multicallMemoize = await memoizer.fn(asyncMulticallWrapper);
        const callStatePoolsCount = await multicallMemoize({
            multicallAddress: client.chain?.contracts?.multicall3?.address,
            allowFailure: true,
            blockNumber: options?.blockNumber,
            contracts: _pairsUniqueAddr.map((el) => ({
                chainId,
                address: factoryAddress,
                abi: factoryAbi,
                functionName: 'poolsCount',
                args: el,
            })),
        }, (res, rej) => {
            if (rej)
                return undefined;
            else
                return res;
        });
        // const callStatePoolsCount = await client.multicall({
        //   multicallAddress: client.chain?.contracts?.multicall3?.address as Address,
        //   allowFailure: true,
        //   contracts: _pairsUniqueAddr.map(
        //     (el) =>
        //       ({
        //         chainId,
        //         address: factoryAddress,
        //         abi: factoryAbi,
        //         functionName: 'poolsCount',
        //         args: el as [Address, Address],
        //       } as const)
        //   ),
        // })
        const callStatePoolsCountProcessed = callStatePoolsCount
            ?.map((s, i) => [i, s?.result ? parseInt(s.result.toString()) : 0])
            .filter(([, length]) => length)
            .map(([i, length]) => [_pairsUniqueAddr[i][0], _pairsUniqueAddr[i][1], BigInt(0), BigInt(length)]);
        const pairsUniqueProcessed = callStatePoolsCount
            ?.map((s, i) => [i, s?.result ? parseInt(s.result.toString()) : 0])
            .filter(([, length]) => length)
            .map(([i]) => [_pairsUnique[i][0], _pairsUnique[i][1]]);
        const callStatePools = await multicallMemoize({
            multicallAddress: client.chain?.contracts?.multicall3?.address,
            allowFailure: true,
            blockNumber: options?.blockNumber,
            contracts: callStatePoolsCountProcessed.map((args) => ({
                chainId,
                address: factoryAddress,
                abi: factoryAbi,
                functionName: 'getPools',
                args,
            })),
        }, (res, rej) => {
            if (rej)
                return undefined;
            else
                return res;
        });
        // const callStatePools = await client.multicall({
        //   multicallAddress: client.chain?.contracts?.multicall3?.address as Address,
        //   allowFailure: true,
        //   contracts: callStatePoolsCountProcessed.map(
        //     (args) =>
        //       ({
        //         chainId,
        //         address: factoryAddress,
        //         abi: factoryAbi,
        //         functionName: 'getPools',
        //         args,
        //       } as const)
        //   ),
        // })
        const pools = [];
        callStatePools.forEach((s, i) => {
            if (s?.result)
                s.result.forEach((address) => pools.push({
                    address: address.toLowerCase(),
                    token0: pairsUniqueProcessed?.[i][0],
                    token1: pairsUniqueProcessed?.[i][1],
                    type,
                }));
        });
        const poolsAddresses = pools.map((p) => p.address);
        const fees = await multicallMemoize({
            multicallAddress: client.chain?.contracts?.multicall3?.address,
            allowFailure: true,
            blockNumber: options?.blockNumber,
            contracts: poolsAddresses.map((address) => ({
                chainId,
                address: address,
                abi: type === 'STABLE_POOL' ? abi_1.tridentStablePoolAbi : abi_1.tridentConstantPoolAbi,
                functionName: 'swapFee',
            })),
        }, (res, rej) => {
            if (rej)
                return undefined;
            else
                return res;
        });
        // const fees = await client.multicall({
        //   multicallAddress: client.chain?.contracts?.multicall3?.address as Address,
        //   allowFailure: true,
        //   contracts: poolsAddresses.map(
        //     (address) =>
        //       ({
        //         chainId,
        //         address: address as Address,
        //         abi: type === 'STABLE_POOL' ? tridentStablePoolAbi : tridentConstantPoolAbi,
        //         functionName: 'swapFee',
        //       } as const)
        //   ),
        // })
        const results = [];
        pools.forEach((p, i) => {
            const fee = fees?.[i]?.result;
            if (!fee)
                return;
            results.push({
                ...p,
                swapFee: Number(fee) / 10000,
            });
        });
        return results;
    }
}
exports.TridentStaticPoolFetcher = TridentStaticPoolFetcher;
const pairsUnique = (currencies) => {
    const pairsMap = new Map();
    currencies.map(([c1, c2]) => {
        if (c1 && c2) {
            const addr1 = c1.wrapped.address;
            const addr2 = c2.wrapped.address;
            if (addr1 !== undefined && addr2 !== undefined) {
                if (addr1.toLowerCase() < addr2.toLowerCase())
                    pairsMap.set(addr1 + addr2, [c1, c2]);
                else
                    pairsMap.set(addr2 + addr1, [c2, c1]);
            }
        }
    });
    return Array.from(pairsMap.values());
};
const tokensUnique = (_pairsUnique) => Array.from(new Set(_pairsUnique.reduce((previousValue, currentValue) => previousValue.concat(currentValue), [])));
//# sourceMappingURL=Trident.js.map