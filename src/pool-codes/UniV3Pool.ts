import type { MultiRoute, RouteLeg, UniV3Pool } from './../tines'
import { HEXer } from '../HEXer'
import { LiquidityProviders } from '../liquidity-providers'
import { PoolCode } from './PoolCode'
import { defaultAbiCoder } from '@ethersproject/abi'
import { getCreate2Address } from '@ethersproject/address'
import { keccak256 } from '@ethersproject/solidity'
import { Address } from 'viem'
import { Token } from './../currency'
import {
  SUSHISWAP_V3_INIT_CODE_HASH,
  SushiSwapV3ChainId,
  SushiSwapV3FeeAmount,
} from './../config'

export class UniV3PoolCode extends PoolCode {
  constructor(
    pool: UniV3Pool,
    liquidityProvider: LiquidityProviders,
    providerName: string,
  ) {
    super(pool, liquidityProvider, `${providerName} ${(pool?.fee || 0) * 100}%`)
  }

  override getStartPoint(): string {
    return PoolCode.RouteProcessorAddress
  }

  getSwapCodeForRouteProcessor(): string {
    return 'unsupported'
  }

  override getSwapCodeForRouteProcessor2(
    leg: RouteLeg,
    _route: MultiRoute,
    to: string,
  ): string {
    const code = new HEXer()
      .uint8(1) // uniV3 pool
      .address(this.pool.address)
      .bool(leg.tokenFrom.address === this.pool.token0.address)
      .address(to)
      .toString()
    return code
  }
}

/**
 * Computes a pool address
 * @param factoryAddress The Uniswap V3 factory address
 * @param tokenA The first token of the pair, irrespective of sort order
 * @param tokenB The second token of the pair, irrespective of sort order
 * @param fee The fee tier of the pool
 * @param initCodeHashManualOverride Override the init code hash used to compute the pool address if necessary
 * @returns The pool address
 */
export function computeSushiSwapV3PoolAddress({
  factoryAddress,
  tokenA,
  tokenB,
  fee,
  initCodeHashManualOverride,
}: {
  factoryAddress: string
  tokenA: Token | string
  tokenB: Token | string
  fee: SushiSwapV3FeeAmount
  initCodeHashManualOverride?: string | undefined
}): Address {
  if (typeof tokenA !== 'string' && typeof tokenB !== 'string') {
    const [token0, token1] = tokenA.sortsBefore(tokenB)
      ? [tokenA, tokenB]
      : [tokenB, tokenA] // does safety checks
    return getCreate2Address(
      factoryAddress,
      keccak256(
        ['bytes'],
        [
          defaultAbiCoder.encode(
            ['address', 'address', 'uint24'],
            [token0.address, token1.address, fee],
          ),
        ],
      ),
      initCodeHashManualOverride ??
        SUSHISWAP_V3_INIT_CODE_HASH[token0.chainId as SushiSwapV3ChainId],
    ) as Address
  }

  // FIXME: We shouldn't even allow sending strings into here, this means we have to assume init code hash is always the same for every chain
  return getCreate2Address(
    factoryAddress,
    keccak256(
      ['bytes'],
      [
        defaultAbiCoder.encode(
          ['address', 'address', 'uint24'],
          [tokenA, tokenB, fee],
        ),
      ],
    ),
    initCodeHashManualOverride ??
      '0xe34f199b19b2b4f47f68442619d555527d244f78a3297ea89325f843f87b8b54',
  ) as Address
}
