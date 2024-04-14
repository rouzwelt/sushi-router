# SushiSwap Router Standalone

This is standalone fork of sushiswap router lib v0.0.16 with option of block number and memoize for data fetching

- All of the source code and dependencies (except `viem`, `memoize-fs` and `sushi`) of this library has been bundled into a single file, but only source code typings are available.
- Requires `sushi` lib v3.0.0.
- Requires `viem` lib v1.6.0 as the JSON-RPC handler which is bundled.
- Requires `memoize-fs` lib from `github:rouzwelt/memoize-fs#e5fcc9f6effc4ad087514372a53a49d380520ad5`.

insall:
```sh
npm install 'rouzwelt/sushi-router',
```

# Tutorial
```typescript
import { Token } from "sushi/currency";
import { fallback, http, createPublicClient } from "viem";
import { DataFetcher, Router, LiquidityProviders, config } from "sushi-router";

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
await dataFetcher.fetchPoolsForToken(fromToken, toToken, excludePools, { blockNumber: 123n, memoize: true });

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
const price = route.amountOutBI / amountIn;
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