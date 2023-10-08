# SushiSwap Router Standalone

This is standalone fork of sushiswap router lib v0.0.13 with option of block number and memoize for data fetching
requires `viem` lib v1.6.0 as the JSON-RPC handler, although it is bundled its typings are not available, so if you need its typings to be available, install it as a dev dependency in your project.

insall:
```sh
npm install 'rouzwelt/sushiswap-router',
```

# Tutorial
```typescript
import { fallback, http, createPublicClient } from "viem";
import { DataFetcher, Router, LiquidityProviders, Token, config } from "sushiswap-router";

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
    chain: config[chainId]?.chain,
    transport
  })
);

// start the data fetcher with desired liquidity providers
const liquidityProviders = [
  LiquidityProviders.SushiSwapV2,
  LiquidityProviders.SushiSwapV3
]
dataFetcher.startDataFetching(liquidityProviders);

// get pools and data for each to find the best route for desired tokens
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

// use optional args memozie or block number for getting pool data at specific block height and memoize the result
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
if (route.status == "NoWay") throw "unable to find route";

// build price, be aware of each token decimals, should factore them in yourself
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