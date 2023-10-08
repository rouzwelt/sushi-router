# SushiSwap Router Standalone

This is standalone fork of sushiswap router lib v0.0.13 with option of block number and memoize for data fetching
`viem` lib has been packed in this package for ease of use.

insall:
```sh
npm install 'rouzwelt/sushiswap-router',
```

# Tutorial
```typescript
import { DataFetcher, Router, LiquidityProviders, Token, config, viem } from "sushiswap-router";

const transport = viem.fallback(
  [
    viem.http(rpcUrl),
    viem.http(otherUrl),
    viem.http(anotherUrl)
  ],
  { rank: true }
);

const dataFetcher = new DataFetcher(
  chainId,
  viem.createPublicClient({
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