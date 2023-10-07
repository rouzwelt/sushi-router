"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurveProvider = exports.getAllSupportedCurvePools = exports.CURVE_FACTORY_ADDRESSES = exports.CURVE_NON_FACTORY_POOLS = exports.CurvePoolType = exports.sETH = void 0;
const chain_1 = require("@sushiswap/chain");
const currency_1 = require("@sushiswap/currency");
const currency_2 = require("@sushiswap/currency");
const currency_3 = require("@sushiswap/currency");
const currency_4 = require("@sushiswap/currency");
const currency_5 = require("@sushiswap/currency");
const currency_6 = require("@sushiswap/currency");
const currency_7 = require("@sushiswap/currency");
const tines_1 = require("@sushiswap/tines");
const viem_1 = require("viem");
const getCurrencyCombinations_1 = require("../getCurrencyCombinations");
const CurvePool_1 = require("../pools/CurvePool");
const LiquidityProvider_1 = require("./LiquidityProvider");
const stETH = new currency_1.Token({
    chainId: 1,
    address: '0xae7ab96520DE3A18E5e111B5EaAb095312D7fE84',
    decimals: 18,
    symbol: 'stETH',
    name: 'Liquid staked Ether 2.0',
});
const sBTC = new currency_1.Token({
    chainId: 1,
    address: '0xfe18be6b3bd88a2d2a7f928d00292e7a9963cfc6',
    decimals: 18,
    symbol: 'sBTC',
    name: 'Synth sBTC',
});
exports.sETH = new currency_1.Token({
    chainId: 1,
    address: '0x5e74c9036fb86bd7ecdcb084a0673efc32ea31cb',
    decimals: 18,
    symbol: 'sETH',
    name: 'Synth sETH',
});
const rETH = new currency_1.Token({
    chainId: 1,
    address: '0x9559Aaa82d9649C7A7b220E7c461d2E74c9a3593',
    decimals: 18,
    symbol: 'rETH',
    name: 'StaFi',
});
const ankrETH = new currency_1.Token({
    chainId: 1,
    address: '0xE95A203B1a91a908F9B9CE46459d101078c2c3cb',
    decimals: 18,
    symbol: 'ankrETH',
    name: 'Ankr Staked ETH',
});
const frxETH = new currency_1.Token({
    chainId: 1,
    address: '0x5e8422345238f34275888049021821e8e08caa1f',
    decimals: 18,
    symbol: 'frxETH',
    name: 'Frax Ether',
});
const sEUR = new currency_1.Token({
    chainId: 1,
    address: '0xd71ecff9342a5ced620049e616c5035f1db98620',
    decimals: 18,
    symbol: 'sEUR',
    name: 'Synth sEUR',
});
const EURS = new currency_1.Token({
    chainId: 1,
    address: '0xdb25f211ab05b1c97d595516f45794528a807ad8',
    decimals: 2,
    symbol: 'EURS',
    name: 'STASIS EURS',
});
const aDAI = new currency_1.Token({
    chainId: 1,
    address: '0x028171bCA77440897B824Ca71D1c56caC55b68A3',
    decimals: 18,
    symbol: 'aDAI',
    name: 'Aave interest bearing DAI',
});
const aSUSD = new currency_1.Token({
    chainId: 1,
    address: '0x6C5024Cd4F8A59110119C56f8933403A539555EB',
    decimals: 18,
    symbol: 'aSUSD',
    name: 'Aave interest bearing SUSD',
});
const cUSDC = new currency_1.Token({
    chainId: 1,
    address: '0x39AA39c021dfbaE8faC545936693aC917d5E7563',
    decimals: 8,
    symbol: 'cUSDC',
    name: 'Compound USD Coin',
});
const cDAI = new currency_1.Token({
    chainId: 1,
    address: '0x5d3a536E4D6DbD6114cc1Ead35777bAB948E3643',
    decimals: 8,
    symbol: 'cDAI',
    name: 'Compound Dai',
});
const sLINK = new currency_1.Token({
    chainId: 1,
    address: '0xbBC455cb4F1B9e4bFC4B73970d360c8f032EfEE6',
    decimals: 18,
    symbol: 'sLINK',
    name: 'Synth sLINK',
});
const HBTC = new currency_1.Token({
    chainId: 1,
    address: '0x0316EB71485b0Ab14103307bf65a021042c6d380',
    decimals: 18,
    symbol: 'HBTS',
    name: 'Huobi BTC',
});
var CurvePoolType;
(function (CurvePoolType) {
    CurvePoolType["Legacy"] = "Legacy";
    CurvePoolType["LegacyV2"] = "LegacyV2";
    CurvePoolType["LegacyV3"] = "LegacyV3";
    CurvePoolType["Factory"] = "Factory";
})(CurvePoolType || (exports.CurvePoolType = CurvePoolType = {}));
const ETH = currency_5.Native.onChain(chain_1.ChainId.ETHEREUM);
exports.CURVE_NON_FACTORY_POOLS = {
    [chain_1.ChainId.ETHEREUM]: [
        ['0xdc24316b9ae028f1497c275eb9192a3ea0f67022', CurvePoolType.Legacy, ETH, stETH],
        [
            '0xdcef968d416a41cdac0ed8702fac8128a64241a2',
            CurvePoolType.Legacy,
            currency_2.FRAX[chain_1.ChainId.ETHEREUM],
            currency_3.USDC[chain_1.ChainId.ETHEREUM],
        ],
        ['0xf253f83aca21aabd2a20553ae0bf7f65c755a07f', CurvePoolType.Legacy, currency_4.WBTC[chain_1.ChainId.ETHEREUM], sBTC],
        ['0xc5424b857f758e906013f3555dad202e4bdb4567', CurvePoolType.Legacy, ETH, exports.sETH],
        ['0xa1f8a6807c402e4a15ef4eba36528a3fed24e577', CurvePoolType.Legacy, ETH, frxETH],
        ['0x0ce6a5ff5217e38315f87032cf90686c96627caa', CurvePoolType.Legacy, EURS, sEUR],
        ['0xa96a65c051bf88b4095ee1f2451c2a9d43f53ae2', CurvePoolType.Legacy, ETH, ankrETH],
        ['0xeb16ae0052ed37f479f7fe63849198df1765a733', CurvePoolType.Legacy, aDAI, aSUSD],
        ['0xf9440930043eb3997fc70e1339dbb11f341de7a8', CurvePoolType.Legacy, ETH, rETH],
        ['0xa2b47e3d5c44877cca798226b7b8118f9bfb7a56', CurvePoolType.LegacyV2, cDAI, cUSDC],
        ['0xf178c0b5bb7e7abf4e12a4838c7b7c5ba2c623c0', CurvePoolType.Legacy, currency_6.LINK[chain_1.ChainId.ETHEREUM], sLINK],
        ['0x4ca9b3063ec5866a4b82e437059d2c43d1be596f', CurvePoolType.LegacyV3, HBTC, currency_4.WBTC[chain_1.ChainId.ETHEREUM]],
        [
            '0x93054188d876f558f4a66b2ef1d97d16edf0895b',
            CurvePoolType.LegacyV2,
            currency_7.renBTC[chain_1.ChainId.ETHEREUM],
            currency_4.WBTC[chain_1.ChainId.ETHEREUM],
        ],
        // Low liquidity ['0xfd5db7463a3ab53fd211b4af195c5bccc1a03890', CurvePoolType.Legacy],
    ],
};
exports.CURVE_FACTORY_ADDRESSES = {
    [chain_1.ChainId.ETHEREUM]: [
    // '0x0959158b6040d32d04c301a72cbfd6b39e21c9ae',  // Metapools only - uncomment when we support them
    // '0xb9fc157394af804a3578134a6585c0dc9cc990d4',  // Metapools only - uncomment when we support them
    //'0xf18056bbd320e96a48e3fbf8bc061322531aac99', for crypto2 pools only
    ],
};
const factoryABI = (0, viem_1.parseAbi)([
    'function pool_count() pure returns (uint256)',
    'function pool_list(uint256) pure returns (address)',
    'function find_pool_for_coins(address, address, uint256) view returns (address)',
    //'function get_n_coins(address) pure returns (uint256)',
]);
async function getAllSupportedCurvePools(publicClient) {
    const result = new Map();
    const chainId = await publicClient.getChainId();
    const promises = exports.CURVE_FACTORY_ADDRESSES[chainId].map(async (factory) => {
        const factoryContract = (0, viem_1.getContract)({
            address: factory,
            abi: factoryABI,
            publicClient,
        });
        const poolNum = await factoryContract.read.pool_count();
        for (let i = 0n; i < poolNum; ++i) {
            const poolAddress = await factoryContract.read.pool_list([i]);
            result.set(poolAddress, CurvePoolType.Factory);
        }
    });
    await Promise.all(promises);
    exports.CURVE_NON_FACTORY_POOLS[chainId].forEach((pool) => result.set(pool[0], pool[1]));
    return result;
}
exports.getAllSupportedCurvePools = getAllSupportedCurvePools;
const curvePoolABI = {
    [CurvePoolType.Factory]: (0, viem_1.parseAbi)([
        'function A() pure returns (uint256)',
        'function fee() pure returns (uint256)',
        'function coins(uint256) pure returns (address)',
        'function balances(uint256) pure returns (uint256)',
    ]),
    [CurvePoolType.Legacy]: (0, viem_1.parseAbi)([
        'function A() pure returns (uint256)',
        'function fee() pure returns (uint256)',
        'function coins(uint256) pure returns (address)',
        'function balances(uint256) pure returns (uint256)',
    ]),
    [CurvePoolType.LegacyV2]: (0, viem_1.parseAbi)([
        'function A() pure returns (uint256)',
        'function fee() pure returns (uint256)',
        'function coins(int128) pure returns (address)',
        'function balances(int128) pure returns (uint256)',
    ]),
    [CurvePoolType.LegacyV3]: (0, viem_1.parseAbi)([
        'function A() pure returns (uint256)',
        'function fee() pure returns (uint256)',
        'function coins(uint256) pure returns (address)',
        'function balances(uint256) pure returns (uint256)',
    ]),
};
/*
async function getCurvePoolCode(publicClient: PublicClient, poolAddress: string, poolType: CurvePoolType, token0: Type, token1: Type): Promise<PoolCode> {
  const poolContract = getContract({
    address: poolAddress as '0x${string}',
    abi: curvePoolABI[poolType],
    publicClient,
  })

  const userAddress = await user.getAddress()
  const tokenContracts = []
  const tokenTines: RToken[] = []
  for (let i = 0; i < 100; ++i) {
    let token
    try {
      token = await poolContract.coins(i)
    } catch (e) {
      break
    }
    if (token == '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE') {
      // native
      tokenContracts.push(undefined)
      tokenTines.push({ address: token, name: token, symbol: token, chainId: 1, decimals: 18 })
    } else {
      const res = await setTokenBalance(token, userAddress, initialBalance)
      expect(res).equal(true, 'Wrong setTokenBalance for ' + token)

      const tokenContract = new Contract(token, erc20Abi, user)
      try {
        await tokenContract.approve(poolAddress, initialBalance.toString())
      } catch (_) {
        // in try block because crv token (0xD533a949740bb3306d119CC777fa900bA034cd52) doesn't allow re-approve (((
      }
      tokenContracts.push(tokenContract)

      const decimals = await tokenContract.decimals()
      tokenTines.push({ address: token, name: token, symbol: token, chainId: 1, decimals })
    }
}*/
class CurveProvider extends LiquidityProvider_1.LiquidityProvider {
    constructor() {
        super(...arguments);
        this.foundPools = [];
    }
    getType() {
        return LiquidityProvider_1.LiquidityProviders.CurveSwap;
    }
    /**
     * The name of liquidity provider to be used for pool naming. For example, 'SushiSwap'
     */
    getPoolProviderName() {
        return 'Curve';
    }
    /**
     * Initiates event listeners for top pools
     */
    startFetchPoolsData() {
        // simple implementation - no prefetching
    }
    async getPoolsForTokens(t0, t1, excludePools, options) {
        const pools = new Map();
        let currencyCombinations = (0, getCurrencyCombinations_1.getCurrencyCombinations)(this.chainId, t0, t1);
        for (let i = 0; currencyCombinations.length > 0; ++i) {
            const calls = exports.CURVE_FACTORY_ADDRESSES[this.chainId].flatMap((factory) => currencyCombinations.map(([t0, t1]) => ({
                address: factory,
                chainId: this.chainId,
                abi: factoryABI,
                functionName: 'find_pool_for_coins',
                args: [t0.address, t1.address, BigInt(i)],
            })));
            const newFoundPools = await this.client.multicall({
                multicallAddress: this.client.chain?.contracts?.multicall3?.address,
                allowFailure: true,
                contracts: calls,
                blockNumber: options?.blockNumber
            });
            newFoundPools.forEach((pool, i) => {
                if (pool.status === 'success' && excludePools?.has(pool.result) !== true)
                    pools.set(pool.result, [CurvePoolType.Factory, ...currencyCombinations[i]]);
            });
            currencyCombinations = newFoundPools
                .map((pool, i) => (pool.status === 'success' ? currencyCombinations[i] : undefined))
                .filter((c) => c !== undefined);
        }
        exports.CURVE_NON_FACTORY_POOLS[this.chainId].forEach((pool) => {
            if (excludePools?.has(pool[0]) !== true)
                pools.set(pool[0], [pool[1], pool[2], pool[3]]);
        });
        return pools;
    }
    async getPoolRatio(pools) {
        if (this.chainId === chain_1.ChainId.ETHEREUM) {
            const ratios = await this.client.multicall({
                multicallAddress: this.client.chain?.contracts?.multicall3?.address,
                allowFailure: true,
                contracts: [
                    {
                        address: '0xE95A203B1a91a908F9B9CE46459d101078c2c3cb',
                        //chainId: this.chainId,
                        abi: (0, viem_1.parseAbi)(['function ratio() pure returns (uint256)']),
                        functionName: 'ratio',
                    },
                    {
                        address: '0x9559aaa82d9649c7a7b220e7c461d2e74c9a3593',
                        //chainId: this.chainId,
                        abi: (0, viem_1.parseAbi)(['function getExchangeRate() pure returns (uint256)']),
                        functionName: 'getExchangeRate',
                    },
                    {
                        address: '0x39aa39c021dfbae8fac545936693ac917d5e7563',
                        //chainId: this.chainId,
                        abi: (0, viem_1.parseAbi)(['function exchangeRateCurrent() pure returns (uint256)']),
                        functionName: 'exchangeRateCurrent',
                    },
                    {
                        address: '0x5d3a536E4D6DbD6114cc1Ead35777bAB948E3643',
                        //chainId: this.chainId,
                        abi: (0, viem_1.parseAbi)(['function exchangeRateCurrent() pure returns (uint256)']),
                        functionName: 'exchangeRateCurrent',
                    },
                ],
            });
            return pools.map(([poolAddress]) => {
                // collection of freaks
                switch (poolAddress.toLowerCase()) {
                    case '0xa96a65c051bf88b4095ee1f2451c2a9d43f53ae2': {
                        //ankrETH pool
                        const _ratio = ratios[0].result;
                        return _ratio !== undefined ? 1e18 / Number(_ratio) : undefined;
                    }
                    case '0xf9440930043eb3997fc70e1339dbb11f341de7a8': {
                        // rETH pool
                        const _ratio = ratios[1].result;
                        return _ratio !== undefined ? Number(_ratio) / 1e18 : undefined;
                    }
                    case '0xa2b47e3d5c44877cca798226b7b8118f9bfb7a56': {
                        // compound pool cUSDC-cDAI
                        const _ratio0 = ratios[2].result;
                        const _ratio1 = ratios[3].result;
                        return _ratio0 !== undefined && _ratio1 !== undefined
                            ? (Number(_ratio0) * 1e12) / Number(_ratio1)
                            : undefined;
                    }
                    default:
                        return 1;
                }
            });
        }
        else
            return pools.map(() => 1);
    }
    async getCurvePoolCodes(pools) {
        const poolArray = Array.from(pools.entries());
        const poolsMulticall = (functionName, args) => {
            return this.client.multicall({
                multicallAddress: this.client.chain?.contracts?.multicall3?.address,
                allowFailure: true,
                contracts: poolArray.map(([address, [poolType]]) => ({
                    address: address,
                    // //chainId: this.chainId,
                    abi: curvePoolABI[poolType],
                    functionName: functionName,
                    args,
                    // rome-ignore lint/suspicious/noExplicitAny: any
                })),
            });
        };
        // const poolContract = getContract({
        //   address: poolAddress as '0x${string}',
        //   abi: curvePoolABI[poolType],
        //   publicClient: this.client,
        // })
        const A = await poolsMulticall('A');
        const fee = await poolsMulticall('fee');
        const balance0 = await poolsMulticall('balances', [0n]);
        const balance1 = await poolsMulticall('balances', [1n]);
        const ratio = await this.getPoolRatio(poolArray);
        const poolCodes = poolArray.map(([poolAddress, [, token0, token1]], i) => {
            const _fee = fee[i].result;
            const _A = A[i].result;
            const _balance0 = balance0[i].result;
            const _balance1 = balance1[i].result;
            const _ratio = ratio[i];
            if (_fee === undefined ||
                _A === undefined ||
                _balance0 === undefined ||
                _balance1 === undefined ||
                _ratio === undefined)
                return;
            const poolTines = new tines_1.CurvePool(poolAddress, token0, token1, Number(_fee) / 1e10, Number(_A), BigInt(_balance0.toString()), BigInt(_balance1.toString()), _ratio);
            return new CurvePool_1.CurvePoolCode(poolTines, this.getType(), this.getPoolProviderName());
        });
        return poolCodes.filter((p) => p !== undefined);
    }
    /**
     * Fetches relevant pools for the given tokens
     * @param t0 Token
     * @param t1 Token
     */
    async fetchPoolsForToken(t0, t1, excludePools, options) {
        const pools = await this.getPoolsForTokens(t0, t1, excludePools, options);
        this.foundPools = await this.getCurvePoolCodes(pools);
        //console.log(JSON.stringify(this.foundPools, undefined, '   '))
    }
    /**
     * Returns a list of PoolCode
     * @returns PoolCode[]
     */
    getCurrentPoolList() {
        return this.foundPools;
    }
    stopFetchPoolsData() {
        // nothing at start - nothing at stop
    }
}
exports.CurveProvider = CurveProvider;
//# sourceMappingURL=CurveProvider.js.map