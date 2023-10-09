# SushiSwap Router Standalone

This is standalone fork of sushiswap router lib v0.0.13 with option of block number and memoize for data fetching

- All of the source code and dependencies (except `viem`) of this library has been bundled into a single file, but only source code typings are available.
- Requires `viem` lib v1.6.0 as the JSON-RPC handler which is bundled.

insall:
```sh
npm install 'rouzwelt/sushiswap-router',
```

# Tutorial
```typescript
import { fallback, http, createPublicClient } from "viem";
import { DataFetcher, Router, LiquidityProviders, Token, viemConfig } from "sushiswap-router";

const transport = fallback(
  [
    http(rpcUrl),
    http(otherUrl),
    http(anotherUrl)
  ],
  { rank: true }
);

const dataFetcher = new DataFetcher(
  chainId,
  createPublicClient({
    chain: viemConfig[chainId]?.chain,
    transport
  })
);

// start the data fetcher with desired liquidity providers
const liquidityProviders = [
  LiquidityProviders.SushiSwapV2,
  LiquidityProviders.SushiSwapV3
]
dataFetcher.startDataFetching(liquidityProviders);

// get pools and data for a token pair
const fromToken = new Token({
  chainId,
  decimals,
  address,
});
const toToken = new Token({
  chainId,
  decimals,
  address,
});

// use memozie or block number as optional args for getting pool 
// data at specific block height and memoize the result, if omitted
// the data will be at last block number and not memoized
await dataFetcher.fetchPoolsForToken(fromToken, toToken, { blockNumber: 123n, memoize: true });

// find the best route
const pcMap = dataFetcher.getCurrentPoolCodeMap(fromToken, toToken);
const route = Router.findBestRoute(
  pcMap,
  chainId,
  fromToken,
  amountIn,
  toToken,
  gasPrice.toNumber()
);
if (route.status == "NoWay") throw "found no route for this token pair";

// build price, be aware of each token decimals, should factor them yourself
const price = route.amountOutBN / amountIn;
console.log(price);

// get params for calling RouteProcessor3 contract
const params = Router.routeProcessor2Params(
  pcMap,
  route,
  fromToken,
  toToken,
  receiverAddress,
  routeProcessor3Address,
);
```