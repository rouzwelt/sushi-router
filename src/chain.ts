export interface Chain {
  name: string;
  chain: string;
  icon?: string;
  rpc: string[];
  faucets: string[];
  nativeCurrency: NativeCurrency;
  infoURL: string;
  shortName: string;
  chainId: number;
  networkId: number;
  slip44?: number;
  ens?: Ens;
  explorers?: Explorer[];
  title?: string;
  parent?: Parent;
  network?: Network;
}
export interface Ens {
  registry: string;
}
export interface Explorer {
  name: string;
  url: string;
  standard: Standard;
  icon?: string;
}
export declare const Standard: {
  readonly Eip3091: "EIP3091";
  readonly None: "none";
};
export type Standard = (typeof Standard)[keyof typeof Standard];
export interface NativeCurrency {
  name: string;
  symbol: string;
  decimals: number;
}
export declare const Network: {
  readonly Iorachain: "iorachain";
  readonly Mainnet: "mainnet";
  readonly Testnet: "testnet";
};
export type Network = (typeof Network)[keyof typeof Network];
export interface Parent {
  type: {
    readonly L2: "L2";
    readonly Shard: "shard";
  };
  chain: string;
  bridges?: {
    url: string;
  }[];
}
// export interface Bridge {
//   url: string;
// }
// export declare const Type: {
//   readonly L2: "L2";
//   readonly Shard: "shard";
// };
// export type Type = (typeof Type)[keyof typeof Type];
export declare const ChainId: {
  readonly ETHEREUM: 1;
  readonly ROPSTEN: 3;
  readonly RINKEBY: 4;
  readonly GÖRLI: 5;
  readonly KOVAN: 42;
  readonly POLYGON: 137;
  readonly POLYGON_TESTNET: 80001;
  readonly FANTOM: 250;
  readonly FANTOM_TESTNET: 4002;
  readonly GNOSIS: 100;
  readonly BSC: 56;
  readonly BSC_TESTNET: 97;
  readonly ARBITRUM: 42161;
  readonly ARBITRUM_NOVA: 42170;
  readonly ARBITRUM_TESTNET: 79377087078960;
  readonly AVALANCHE: 43114;
  readonly AVALANCHE_TESTNET: 43113;
  readonly HECO: 128;
  readonly HECO_TESTNET: 256;
  readonly HARMONY: 1666600000;
  readonly HARMONY_TESTNET: 1666700000;
  readonly OKEX: 66;
  readonly OKEX_TESTNET: 65;
  readonly CELO: 42220;
  readonly PALM: 11297108109;
  readonly MOONRIVER: 1285;
  readonly FUSE: 122;
  readonly TELOS: 40;
  readonly MOONBEAM: 1284;
  readonly OPTIMISM: 10;
  readonly KAVA: 2222;
  readonly METIS: 1088;
  readonly BOBA: 288;
  readonly BOBA_AVAX: 43288;
  readonly BOBA_BNB: 56288;
  readonly BTTC: 199;
  readonly POLYGON_ZKEVM: 1101;
  readonly THUNDERCORE: 108;
};
export type ChainId = (typeof ChainId)[keyof typeof ChainId];
export declare const ChainKey: {
  readonly 42161: "arbitrum";
  readonly 42170: "arbitrum-nova";
  readonly 79377087078960: "arbitrum-testnet";
  readonly 43114: "avalanche";
  readonly 43113: "avalance-testnet";
  readonly 56: "bsc";
  readonly 97: "bsc-testnet";
  readonly 42220: "celo";
  readonly 1: "ethereum";
  readonly 250: "fantom";
  readonly 4002: "fantom-testnet";
  readonly 122: "fuse";
  readonly 5: "goerli";
  readonly 1666600000: "harmony";
  readonly 1666700000: "harmony-testnet";
  readonly 128: "heco";
  readonly 256: "heco-testnet";
  readonly 42: "kovan";
  readonly 3: "ropsten";
  readonly 137: "polygon";
  readonly 80001: "matic-testnet";
  readonly 1284: "moonbeam";
  readonly 1285: "moonriver";
  readonly 66: "okex";
  readonly 65: "okex-testnet";
  readonly 11297108109: "palm";
  readonly 4: "rinkeby";
  readonly 40: "telos";
  readonly 100: "gnosis";
  readonly 10: "optimism";
  readonly 2222: "kava";
  readonly 1088: "metis";
  readonly 288: "boba";
  readonly 43288: "boba-avax";
  readonly 56288: "boba-bnb";
  readonly 199: "bttc";
  readonly 1101: "polygon-zkevm";
  readonly 108: "thundercore";
};
export type ChainKey = (typeof ChainKey)[keyof typeof ChainKey];
declare const RAW: readonly [{
  readonly name: "Ethereum Mainnet";
  readonly chain: "ETH";
  readonly icon: "ethereum";
  readonly rpc: readonly ["https://mainnet.infura.io/v3/${INFURA_API_KEY}", "wss://mainnet.infura.io/ws/v3/${INFURA_API_KEY}", "https://api.mycryptoapi.com/eth", "https://cloudflare-eth.com", "https://ethereum.publicnode.com"];
  readonly features: readonly [{
      readonly name: "EIP155";
  }, {
      readonly name: "EIP1559";
  }];
  readonly faucets: readonly [];
  readonly nativeCurrency: {
      readonly name: "Ether";
      readonly symbol: "ETH";
      readonly decimals: 18;
  };
  readonly infoURL: "https://ethereum.org";
  readonly shortName: "eth";
  readonly chainId: 1;
  readonly networkId: 1;
  readonly slip44: 60;
  readonly ens: {
      readonly registry: "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e";
  };
  readonly explorers: readonly [{
      readonly name: "etherscan";
      readonly url: "https://etherscan.io";
      readonly standard: "EIP3091";
  }];
}, {
  readonly name: "Ropsten";
  readonly title: "Ethereum Testnet Ropsten";
  readonly chain: "ETH";
  readonly rpc: readonly ["https://ropsten.infura.io/v3/${INFURA_API_KEY}", "wss://ropsten.infura.io/ws/v3/${INFURA_API_KEY}"];
  readonly faucets: readonly ["http://fauceth.komputing.org?chain=3&address=${ADDRESS}", "https://faucet.ropsten.be?${ADDRESS}"];
  readonly nativeCurrency: {
      readonly name: "Ropsten Ether";
      readonly symbol: "ETH";
      readonly decimals: 18;
  };
  readonly infoURL: "https://github.com/ethereum/ropsten";
  readonly shortName: "rop";
  readonly chainId: 3;
  readonly networkId: 3;
  readonly ens: {
      readonly registry: "0x112234455c3a32fd11230c42e7bccd4a84e02010";
  };
  readonly explorers: readonly [{
      readonly name: "etherscan";
      readonly url: "https://ropsten.etherscan.io";
      readonly standard: "EIP3091";
  }];
}, {
  readonly name: "Rinkeby";
  readonly title: "Ethereum Testnet Rinkeby";
  readonly chain: "ETH";
  readonly rpc: readonly ["https://rinkeby.infura.io/v3/${INFURA_API_KEY}", "wss://rinkeby.infura.io/ws/v3/${INFURA_API_KEY}"];
  readonly faucets: readonly ["http://fauceth.komputing.org?chain=4&address=${ADDRESS}", "https://faucet.rinkeby.io"];
  readonly nativeCurrency: {
      readonly name: "Rinkeby Ether";
      readonly symbol: "ETH";
      readonly decimals: 18;
  };
  readonly infoURL: "https://www.rinkeby.io";
  readonly shortName: "rin";
  readonly chainId: 4;
  readonly networkId: 4;
  readonly ens: {
      readonly registry: "0xe7410170f87102df0055eb195163a03b7f2bff4a";
  };
  readonly explorers: readonly [{
      readonly name: "etherscan-rinkeby";
      readonly url: "https://rinkeby.etherscan.io";
      readonly standard: "EIP3091";
  }];
}, {
  readonly name: "Goerli";
  readonly title: "Ethereum Testnet Goerli";
  readonly chain: "ETH";
  readonly rpc: readonly ["https://goerli.infura.io/v3/${INFURA_API_KEY}", "wss://goerli.infura.io/v3/${INFURA_API_KEY}", "https://rpc.goerli.mudit.blog/", "https://ethereum-goerli.publicnode.com"];
  readonly faucets: readonly ["http://fauceth.komputing.org?chain=5&address=${ADDRESS}", "https://goerli-faucet.slock.it?address=${ADDRESS}", "https://faucet.goerli.mudit.blog"];
  readonly nativeCurrency: {
      readonly name: "Goerli Ether";
      readonly symbol: "ETH";
      readonly decimals: 18;
  };
  readonly infoURL: "https://goerli.net/#about";
  readonly shortName: "gor";
  readonly chainId: 5;
  readonly networkId: 5;
  readonly ens: {
      readonly registry: "0x112234455c3a32fd11230c42e7bccd4a84e02010";
  };
  readonly explorers: readonly [{
      readonly name: "etherscan-goerli";
      readonly url: "https://goerli.etherscan.io";
      readonly standard: "EIP3091";
  }];
}, {
  readonly name: "Optimism";
  readonly chain: "ETH";
  readonly rpc: readonly ["https://mainnet.optimism.io/"];
  readonly faucets: readonly [];
  readonly nativeCurrency: {
      readonly name: "Ether";
      readonly symbol: "ETH";
      readonly decimals: 18;
  };
  readonly infoURL: "https://optimism.io";
  readonly shortName: "oeth";
  readonly chainId: 10;
  readonly networkId: 10;
  readonly explorers: readonly [{
      readonly name: "etherscan";
      readonly url: "https://optimistic.etherscan.io";
      readonly standard: "EIP3091";
  }];
}, {
  readonly name: "Telos EVM Mainnet";
  readonly chain: "TLOS";
  readonly rpc: readonly ["https://mainnet.telos.net/evm"];
  readonly faucets: readonly [];
  readonly nativeCurrency: {
      readonly name: "Telos";
      readonly symbol: "TLOS";
      readonly decimals: 18;
  };
  readonly infoURL: "https://telos.net";
  readonly shortName: "TelosEVM";
  readonly chainId: 40;
  readonly networkId: 40;
  readonly explorers: readonly [{
      readonly name: "teloscan";
      readonly url: "https://teloscan.io";
      readonly standard: "EIP3091";
  }];
}, {
  readonly name: "Kovan";
  readonly title: "Ethereum Testnet Kovan";
  readonly chain: "ETH";
  readonly rpc: readonly ["https://kovan.poa.network", "http://kovan.poa.network:8545", "https://kovan.infura.io/v3/${INFURA_API_KEY}", "wss://kovan.infura.io/ws/v3/${INFURA_API_KEY}", "ws://kovan.poa.network:8546"];
  readonly faucets: readonly ["http://fauceth.komputing.org?chain=42&address=${ADDRESS}", "https://faucet.kovan.network", "https://gitter.im/kovan-testnet/faucet"];
  readonly nativeCurrency: {
      readonly name: "Kovan Ether";
      readonly symbol: "ETH";
      readonly decimals: 18;
  };
  readonly explorers: readonly [{
      readonly name: "etherscan";
      readonly url: "https://kovan.etherscan.io";
      readonly standard: "EIP3091";
  }];
  readonly infoURL: "https://kovan-testnet.github.io/website";
  readonly shortName: "kov";
  readonly chainId: 42;
  readonly networkId: 42;
}, {
  readonly name: "Binance Smart Chain Mainnet";
  readonly chain: "BSC";
  readonly rpc: readonly ["https://bsc-dataseed1.binance.org", "https://bsc-dataseed2.binance.org", "https://bsc-dataseed3.binance.org", "https://bsc-dataseed4.binance.org", "https://bsc-dataseed1.defibit.io", "https://bsc-dataseed2.defibit.io", "https://bsc-dataseed3.defibit.io", "https://bsc-dataseed4.defibit.io", "https://bsc-dataseed1.ninicoin.io", "https://bsc-dataseed2.ninicoin.io", "https://bsc-dataseed3.ninicoin.io", "https://bsc-dataseed4.ninicoin.io", "https://bsc.publicnode.com", "wss://bsc-ws-node.nariox.org"];
  readonly faucets: readonly ["https://free-online-app.com/faucet-for-eth-evm-chains/"];
  readonly nativeCurrency: {
      readonly name: "Binance Chain Native Token";
      readonly symbol: "BNB";
      readonly decimals: 18;
  };
  readonly infoURL: "https://www.binance.org";
  readonly shortName: "bnb";
  readonly chainId: 56;
  readonly networkId: 56;
  readonly slip44: 714;
  readonly explorers: readonly [{
      readonly name: "bscscan";
      readonly url: "https://bscscan.com";
      readonly standard: "EIP3091";
  }];
}, {
  readonly name: "OKExChain Testnet";
  readonly chain: "okexchain";
  readonly rpc: readonly ["https://exchaintestrpc.okex.org"];
  readonly faucets: readonly ["https://www.okex.com/drawdex"];
  readonly nativeCurrency: {
      readonly name: "OKExChain Global Utility Token in testnet";
      readonly symbol: "OKT";
      readonly decimals: 18;
  };
  readonly infoURL: "https://www.okex.com/okexchain";
  readonly shortName: "tokt";
  readonly chainId: 65;
  readonly networkId: 65;
  readonly explorers: readonly [{
      readonly name: "OKLink";
      readonly url: "https://www.oklink.com/okexchain-test";
      readonly standard: "EIP3091";
  }];
}, {
  readonly name: "OKXChain Mainnet";
  readonly chain: "okxchain";
  readonly rpc: readonly ["https://exchainrpc.okex.org", "https://okc-mainnet.gateway.pokt.network/v1/lb/6275309bea1b320039c893ff"];
  readonly faucets: readonly ["https://free-online-app.com/faucet-for-eth-evm-chains/?"];
  readonly nativeCurrency: {
      readonly name: "OKXChain Global Utility Token";
      readonly symbol: "OKT";
      readonly decimals: 18;
  };
  readonly infoURL: "https://www.okex.com/okc";
  readonly shortName: "okt";
  readonly chainId: 66;
  readonly networkId: 66;
  readonly explorers: readonly [{
      readonly name: "OKLink";
      readonly url: "https://www.oklink.com/en/okc";
      readonly standard: "EIP3091";
  }];
}, {
  readonly name: "Binance Smart Chain Testnet";
  readonly chain: "BSC";
  readonly rpc: readonly ["https://data-seed-prebsc-1-s1.binance.org:8545", "https://data-seed-prebsc-2-s1.binance.org:8545", "https://data-seed-prebsc-1-s2.binance.org:8545", "https://data-seed-prebsc-2-s2.binance.org:8545", "https://data-seed-prebsc-1-s3.binance.org:8545", "https://data-seed-prebsc-2-s3.binance.org:8545", "https://bsc-testnet.publicnode.com"];
  readonly faucets: readonly ["https://testnet.binance.org/faucet-smart"];
  readonly nativeCurrency: {
      readonly name: "Binance Chain Native Token";
      readonly symbol: "tBNB";
      readonly decimals: 18;
  };
  readonly infoURL: "https://testnet.binance.org/";
  readonly shortName: "bnbt";
  readonly chainId: 97;
  readonly networkId: 97;
  readonly explorers: readonly [{
      readonly name: "bscscan-testnet";
      readonly url: "https://testnet.bscscan.com";
      readonly standard: "EIP3091";
  }];
}, {
  readonly name: "Gnosis";
  readonly chain: "GNO";
  readonly icon: "gnosis";
  readonly rpc: readonly ["https://rpc.gnosischain.com", "https://rpc.ankr.com/gnosis", "https://gnosischain-rpc.gateway.pokt.network", "https://gnosis-mainnet.public.blastapi.io", "wss://rpc.gnosischain.com/wss"];
  readonly faucets: readonly ["https://gnosisfaucet.com", "https://faucet.gimlu.com/gnosis", "https://stakely.io/faucet/gnosis-chain-xdai", "https://faucet.prussia.dev/xdai"];
  readonly nativeCurrency: {
      readonly name: "xDAI";
      readonly symbol: "xDAI";
      readonly decimals: 18;
  };
  readonly infoURL: "https://docs.gnosischain.com";
  readonly shortName: "gno";
  readonly chainId: 100;
  readonly networkId: 100;
  readonly slip44: 700;
  readonly explorers: readonly [{
      readonly name: "gnosisscan";
      readonly url: "https://gnosisscan.io";
      readonly standard: "EIP3091";
  }, {
      readonly name: "blockscout";
      readonly url: "https://blockscout.com/xdai/mainnet";
      readonly icon: "blockscout";
      readonly standard: "EIP3091";
  }];
}, {
  readonly name: "ThunderCore Mainnet";
  readonly chain: "TT";
  readonly rpc: readonly ["https://mainnet-rpc.thundercore.com", "https://mainnet-rpc.thundertoken.net", "https://mainnet-rpc.thundercore.io"];
  readonly faucets: readonly ["https://faucet.thundercore.com"];
  readonly nativeCurrency: {
      readonly name: "ThunderCore Token";
      readonly symbol: "TT";
      readonly decimals: 18;
  };
  readonly infoURL: "https://thundercore.com";
  readonly shortName: "TT";
  readonly chainId: 108;
  readonly networkId: 108;
  readonly slip44: 1001;
  readonly explorers: readonly [{
      readonly name: "thundercore-viewblock";
      readonly url: "https://viewblock.io/thundercore";
      readonly standard: "EIP3091";
  }];
}, {
  readonly name: "Fuse Mainnet";
  readonly chain: "FUSE";
  readonly rpc: readonly ["https://rpc.fuse.io"];
  readonly faucets: readonly [];
  readonly nativeCurrency: {
      readonly name: "Fuse";
      readonly symbol: "FUSE";
      readonly decimals: 18;
  };
  readonly infoURL: "https://fuse.io/";
  readonly shortName: "fuse";
  readonly chainId: 122;
  readonly networkId: 122;
}, {
  readonly name: "Huobi ECO Chain Mainnet";
  readonly chain: "Heco";
  readonly rpc: readonly ["https://http-mainnet.hecochain.com", "wss://ws-mainnet.hecochain.com"];
  readonly faucets: readonly ["https://free-online-app.com/faucet-for-eth-evm-chains/"];
  readonly nativeCurrency: {
      readonly name: "Huobi ECO Chain Native Token";
      readonly symbol: "HT";
      readonly decimals: 18;
  };
  readonly infoURL: "https://www.hecochain.com";
  readonly shortName: "heco";
  readonly chainId: 128;
  readonly networkId: 128;
  readonly slip44: 1010;
  readonly explorers: readonly [{
      readonly name: "hecoinfo";
      readonly url: "https://hecoinfo.com";
      readonly standard: "EIP3091";
  }];
}, {
  readonly name: "Polygon Mainnet";
  readonly chain: "Polygon";
  readonly icon: "polygon";
  readonly rpc: readonly ["https://polygon-rpc.com/", "https://rpc-mainnet.matic.network", "https://matic-mainnet.chainstacklabs.com", "https://rpc-mainnet.maticvigil.com", "https://rpc-mainnet.matic.quiknode.pro", "https://matic-mainnet-full-rpc.bwarelabs.com", "https://polygon-bor.publicnode.com"];
  readonly faucets: readonly [];
  readonly nativeCurrency: {
      readonly name: "MATIC";
      readonly symbol: "MATIC";
      readonly decimals: 18;
  };
  readonly infoURL: "https://polygon.technology/";
  readonly shortName: "matic";
  readonly chainId: 137;
  readonly networkId: 137;
  readonly slip44: 966;
  readonly explorers: readonly [{
      readonly name: "polygonscan";
      readonly url: "https://polygonscan.com";
      readonly standard: "EIP3091";
  }];
}, {
  readonly name: "BitTorrent Chain Mainnet";
  readonly chain: "BTTC";
  readonly rpc: readonly ["https://rpc.bittorrentchain.io/"];
  readonly faucets: readonly [];
  readonly nativeCurrency: {
      readonly name: "BitTorrent";
      readonly symbol: "BTT";
      readonly decimals: 18;
  };
  readonly infoURL: "https:/bt.io";
  readonly shortName: "BTT";
  readonly chainId: 199;
  readonly networkId: 199;
  readonly explorers: readonly [{
      readonly name: "BitTorrent Chain Explorer";
      readonly url: "https://bttcscan.com";
      readonly standard: "EIP3091";
  }];
}, {
  readonly name: "Fantom Opera";
  readonly chain: "FTM";
  readonly rpc: readonly ["https://rpc.ftm.tools", "https://fantom.publicnode.com"];
  readonly faucets: readonly ["https://free-online-app.com/faucet-for-eth-evm-chains/"];
  readonly nativeCurrency: {
      readonly name: "Fantom";
      readonly symbol: "FTM";
      readonly decimals: 18;
  };
  readonly infoURL: "https://fantom.foundation";
  readonly shortName: "ftm";
  readonly chainId: 250;
  readonly networkId: 250;
  readonly icon: "fantom";
  readonly explorers: readonly [{
      readonly name: "ftmscan";
      readonly url: "https://ftmscan.com";
      readonly icon: "ftmscan";
      readonly standard: "EIP3091";
  }];
}, {
  readonly name: "Huobi ECO Chain Testnet";
  readonly chain: "Heco";
  readonly rpc: readonly ["https://http-testnet.hecochain.com", "wss://ws-testnet.hecochain.com"];
  readonly faucets: readonly ["https://scan-testnet.hecochain.com/faucet"];
  readonly nativeCurrency: {
      readonly name: "Huobi ECO Chain Test Native Token";
      readonly symbol: "htt";
      readonly decimals: 18;
  };
  readonly infoURL: "https://testnet.hecoinfo.com";
  readonly shortName: "hecot";
  readonly chainId: 256;
  readonly networkId: 256;
}, {
  readonly name: "Boba Network";
  readonly chain: "ETH";
  readonly rpc: readonly ["https://mainnet.boba.network/"];
  readonly faucets: readonly [];
  readonly nativeCurrency: {
      readonly name: "Ether";
      readonly symbol: "ETH";
      readonly decimals: 18;
  };
  readonly infoURL: "https://boba.network";
  readonly shortName: "Boba";
  readonly chainId: 288;
  readonly networkId: 288;
  readonly explorers: readonly [{
      readonly name: "Bobascan";
      readonly url: "https://bobascan.com";
      readonly standard: "none";
  }, {
      readonly name: "Blockscout";
      readonly url: "https://blockexplorer.boba.network";
      readonly standard: "none";
  }];
  readonly parent: {
      readonly type: "L2";
      readonly chain: "eip155-1";
      readonly bridges: readonly [{
          readonly url: "https://gateway.boba.network";
      }];
  };
}, {
  readonly name: "Metis Andromeda Mainnet";
  readonly chain: "ETH";
  readonly rpc: readonly ["https://andromeda.metis.io/?owner=1088"];
  readonly faucets: readonly [];
  readonly nativeCurrency: {
      readonly name: "Metis";
      readonly symbol: "METIS";
      readonly decimals: 18;
  };
  readonly infoURL: "https://www.metis.io";
  readonly shortName: "metis-andromeda";
  readonly chainId: 1088;
  readonly networkId: 1088;
  readonly explorers: readonly [{
      readonly name: "blockscout";
      readonly url: "https://andromeda-explorer.metis.io";
      readonly standard: "EIP3091";
  }];
  readonly parent: {
      readonly type: "L2";
      readonly chain: "eip155-1";
      readonly bridges: readonly [{
          readonly url: "https://bridge.metis.io";
      }];
  };
}, {
  readonly name: "Polygon zkEVM";
  readonly title: "Polygon zkEVM";
  readonly chain: "Polygon";
  readonly rpc: readonly ["https://zkevm-rpc.com"];
  readonly faucets: readonly [];
  readonly nativeCurrency: {
      readonly name: "Ether";
      readonly symbol: "ETH";
      readonly decimals: 18;
  };
  readonly infoURL: "https://polygon.technology/polygon-zkevm";
  readonly shortName: "zkevm";
  readonly chainId: 1101;
  readonly networkId: 1101;
  readonly icon: "zkevm";
  readonly explorers: readonly [{
      readonly name: "blockscout";
      readonly url: "https://zkevm.polygonscan.com";
      readonly icon: "zkevm";
      readonly standard: "EIP3091";
  }];
  readonly parent: {
      readonly type: "L2";
      readonly chain: "eip155-1";
      readonly bridges: readonly [{
          readonly url: "https://bridge.zkevm-rpc.com";
      }];
  };
}, {
  readonly name: "Moonbeam";
  readonly chain: "MOON";
  readonly rpc: readonly ["https://rpc.api.moonbeam.network", "wss://wss.api.moonbeam.network"];
  readonly faucets: readonly [];
  readonly nativeCurrency: {
      readonly name: "Glimmer";
      readonly symbol: "GLMR";
      readonly decimals: 18;
  };
  readonly infoURL: "https://moonbeam.network/networks/moonbeam/";
  readonly shortName: "mbeam";
  readonly chainId: 1284;
  readonly networkId: 1284;
  readonly explorers: readonly [{
      readonly name: "moonscan";
      readonly url: "https://moonbeam.moonscan.io";
      readonly standard: "none";
  }];
}, {
  readonly name: "Moonriver";
  readonly chain: "MOON";
  readonly rpc: readonly ["https://rpc.api.moonriver.moonbeam.network", "wss://wss.api.moonriver.moonbeam.network"];
  readonly faucets: readonly [];
  readonly nativeCurrency: {
      readonly name: "Moonriver";
      readonly symbol: "MOVR";
      readonly decimals: 18;
  };
  readonly infoURL: "https://moonbeam.network/networks/moonriver/";
  readonly shortName: "mriver";
  readonly chainId: 1285;
  readonly networkId: 1285;
  readonly explorers: readonly [{
      readonly name: "moonscan";
      readonly url: "https://moonriver.moonscan.io";
      readonly standard: "none";
  }];
}, {
  readonly name: "Kava EVM";
  readonly chain: "KAVA";
  readonly rpc: readonly ["https://evm.kava.io", "https://evm2.kava.io", "wss://wevm.kava.io", "wss://wevm2.kava.io"];
  readonly faucets: readonly [];
  readonly nativeCurrency: {
      readonly name: "Kava";
      readonly symbol: "KAVA";
      readonly decimals: 18;
  };
  readonly infoURL: "https://www.kava.io";
  readonly shortName: "kava";
  readonly chainId: 2222;
  readonly networkId: 2222;
  readonly icon: "kava";
  readonly explorers: readonly [{
      readonly name: "Kava EVM Explorer";
      readonly url: "https://explorer.kava.io";
      readonly standard: "EIP3091";
      readonly icon: "kava";
  }];
}, {
  readonly name: "Fantom Testnet";
  readonly chain: "FTM";
  readonly rpc: readonly ["https://rpc.testnet.fantom.network", "https://fantom-testnet.publicnode.com"];
  readonly faucets: readonly ["https://faucet.fantom.network"];
  readonly nativeCurrency: {
      readonly name: "Fantom";
      readonly symbol: "FTM";
      readonly decimals: 18;
  };
  readonly infoURL: "https://docs.fantom.foundation/quick-start/short-guide#fantom-testnet";
  readonly shortName: "tftm";
  readonly chainId: 4002;
  readonly networkId: 4002;
  readonly icon: "fantom";
  readonly explorers: readonly [{
      readonly name: "ftmscan";
      readonly url: "https://testnet.ftmscan.com";
      readonly icon: "ftmscan";
      readonly standard: "EIP3091";
  }];
}, {
  readonly name: "Arbitrum One";
  readonly chainId: 42161;
  readonly shortName: "arb1";
  readonly chain: "ETH";
  readonly networkId: 42161;
  readonly nativeCurrency: {
      readonly name: "Ether";
      readonly symbol: "ETH";
      readonly decimals: 18;
  };
  readonly rpc: readonly ["https://arbitrum-mainnet.infura.io/v3/${INFURA_API_KEY}", "https://arb-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}", "https://arb1.arbitrum.io/rpc"];
  readonly faucets: readonly [];
  readonly explorers: readonly [{
      readonly name: "Arbiscan";
      readonly url: "https://arbiscan.io";
      readonly standard: "EIP3091";
  }, {
      readonly name: "Arbitrum Explorer";
      readonly url: "https://explorer.arbitrum.io";
      readonly standard: "EIP3091";
  }];
  readonly infoURL: "https://arbitrum.io";
  readonly parent: {
      readonly type: "L2";
      readonly chain: "eip155-1";
      readonly bridges: readonly [{
          readonly url: "https://bridge.arbitrum.io";
      }];
  };
}, {
  readonly name: "Arbitrum Nova";
  readonly chainId: 42170;
  readonly shortName: "arb-nova";
  readonly chain: "ETH";
  readonly networkId: 42170;
  readonly nativeCurrency: {
      readonly name: "Ether";
      readonly symbol: "ETH";
      readonly decimals: 18;
  };
  readonly rpc: readonly ["https://nova.arbitrum.io/rpc"];
  readonly faucets: readonly [];
  readonly explorers: readonly [{
      readonly name: "Arbitrum Nova Chain Explorer";
      readonly url: "https://nova-explorer.arbitrum.io";
      readonly icon: "blockscout";
      readonly standard: "EIP3091";
  }];
  readonly infoURL: "https://arbitrum.io";
  readonly parent: {
      readonly type: "L2";
      readonly chain: "eip155-1";
      readonly bridges: readonly [{
          readonly url: "https://bridge.arbitrum.io";
      }];
  };
}, {
  readonly name: "Celo Mainnet";
  readonly chainId: 42220;
  readonly shortName: "celo";
  readonly chain: "CELO";
  readonly networkId: 42220;
  readonly nativeCurrency: {
      readonly name: "CELO";
      readonly symbol: "CELO";
      readonly decimals: 18;
  };
  readonly rpc: readonly ["https://forno.celo.org", "wss://forno.celo.org/ws"];
  readonly faucets: readonly ["https://free-online-app.com/faucet-for-eth-evm-chains/"];
  readonly infoURL: "https://docs.celo.org/";
  readonly explorers: readonly [{
      readonly name: "Celoscan";
      readonly url: "https://celoscan.io";
      readonly standard: "EIP3091";
  }, {
      readonly name: "blockscout";
      readonly url: "https://explorer.celo.org";
      readonly standard: "none";
  }];
}, {
  readonly name: "Avalanche Fuji Testnet";
  readonly chain: "AVAX";
  readonly icon: "avax";
  readonly rpc: readonly ["https://api.avax-test.network/ext/bc/C/rpc", "https://avalanche-fuji-c-chain.publicnode.com"];
  readonly faucets: readonly ["https://faucet.avax-test.network/"];
  readonly nativeCurrency: {
      readonly name: "Avalanche";
      readonly symbol: "AVAX";
      readonly decimals: 18;
  };
  readonly infoURL: "https://cchain.explorer.avax-test.network";
  readonly shortName: "Fuji";
  readonly chainId: 43113;
  readonly networkId: 1;
  readonly explorers: readonly [{
      readonly name: "snowtrace";
      readonly url: "https://testnet.snowtrace.io";
      readonly standard: "EIP3091";
  }];
}, {
  readonly name: "Avalanche C-Chain";
  readonly chain: "AVAX";
  readonly icon: "avax";
  readonly rpc: readonly ["https://api.avax.network/ext/bc/C/rpc", "https://avalanche-c-chain.publicnode.com"];
  readonly features: readonly [{
      readonly name: "EIP1559";
  }];
  readonly faucets: readonly ["https://free-online-app.com/faucet-for-eth-evm-chains/"];
  readonly nativeCurrency: {
      readonly name: "Avalanche";
      readonly symbol: "AVAX";
      readonly decimals: 18;
  };
  readonly infoURL: "https://www.avax.network/";
  readonly shortName: "avax";
  readonly chainId: 43114;
  readonly networkId: 43114;
  readonly slip44: 9005;
  readonly explorers: readonly [{
      readonly name: "snowtrace";
      readonly url: "https://snowtrace.io";
      readonly standard: "EIP3091";
  }];
}, {
  readonly name: "Boba Avax";
  readonly chain: "Boba Avax";
  readonly rpc: readonly ["https://avax.boba.network", "wss://wss.avax.boba.network", "https://replica.avax.boba.network", "wss://replica-wss.avax.boba.network"];
  readonly faucets: readonly [];
  readonly nativeCurrency: {
      readonly name: "Boba Token";
      readonly symbol: "BOBA";
      readonly decimals: 18;
  };
  readonly infoURL: "https://docs.boba.network/for-developers/network-avalanche";
  readonly shortName: "bobaavax";
  readonly chainId: 43288;
  readonly networkId: 43288;
  readonly explorers: readonly [{
      readonly name: "Boba Avax Explorer";
      readonly url: "https://blockexplorer.avax.boba.network";
      readonly standard: "none";
  }];
}, {
  readonly name: "Boba BNB Mainnet";
  readonly chain: "Boba BNB Mainnet";
  readonly rpc: readonly ["https://bnb.boba.network", "wss://wss.bnb.boba.network", "https://replica.bnb.boba.network", "wss://replica-wss.bnb.boba.network"];
  readonly faucets: readonly [];
  readonly nativeCurrency: {
      readonly name: "Boba Token";
      readonly symbol: "BOBA";
      readonly decimals: 18;
  };
  readonly infoURL: "https://boba.network";
  readonly shortName: "BobaBnb";
  readonly chainId: 56288;
  readonly networkId: 56288;
  readonly explorers: readonly [{
      readonly name: "Boba BNB block explorer";
      readonly url: "https://blockexplorer.bnb.boba.network";
      readonly standard: "none";
  }];
}, {
  readonly name: "Mumbai";
  readonly title: "Polygon Testnet Mumbai";
  readonly chain: "Polygon";
  readonly icon: "polygon";
  readonly rpc: readonly ["https://matic-mumbai.chainstacklabs.com", "https://rpc-mumbai.maticvigil.com", "https://matic-testnet-archive-rpc.bwarelabs.com", "https://polygon-mumbai-bor.publicnode.com"];
  readonly faucets: readonly ["https://faucet.polygon.technology/"];
  readonly nativeCurrency: {
      readonly name: "MATIC";
      readonly symbol: "MATIC";
      readonly decimals: 18;
  };
  readonly infoURL: "https://polygon.technology/";
  readonly shortName: "maticmum";
  readonly chainId: 80001;
  readonly networkId: 80001;
  readonly explorers: readonly [{
      readonly name: "polygonscan";
      readonly url: "https://mumbai.polygonscan.com";
      readonly standard: "EIP3091";
  }];
}, {
  readonly name: "Harmony Mainnet Shard 0";
  readonly chain: "Harmony";
  readonly rpc: readonly ["https://api.harmony.one", "https://api.s0.t.hmny.io"];
  readonly faucets: readonly ["https://free-online-app.com/faucet-for-eth-evm-chains/"];
  readonly nativeCurrency: {
      readonly name: "ONE";
      readonly symbol: "ONE";
      readonly decimals: 18;
  };
  readonly infoURL: "https://www.harmony.one/";
  readonly shortName: "hmy-s0";
  readonly chainId: 1666600000;
  readonly networkId: 1666600000;
  readonly explorers: readonly [{
      readonly name: "Harmony Block Explorer";
      readonly url: "https://explorer.harmony.one";
      readonly standard: "EIP3091";
  }];
}, {
  readonly name: "Harmony Testnet Shard 0";
  readonly chain: "Harmony";
  readonly rpc: readonly ["https://api.s0.b.hmny.io"];
  readonly faucets: readonly ["https://faucet.pops.one"];
  readonly nativeCurrency: {
      readonly name: "ONE";
      readonly symbol: "ONE";
      readonly decimals: 18;
  };
  readonly infoURL: "https://www.harmony.one/";
  readonly shortName: "hmy-b-s0";
  readonly chainId: 1666700000;
  readonly networkId: 1666700000;
  readonly explorers: readonly [{
      readonly name: "Harmony Testnet Block Explorer";
      readonly url: "https://explorer.pops.one";
      readonly standard: "EIP3091";
  }];
}, {
  readonly name: "Palm";
  readonly chain: "Palm";
  readonly icon: "palm";
  readonly rpc: readonly ["https://palm-mainnet.infura.io/v3/${INFURA_API_KEY}"];
  readonly faucets: readonly [];
  readonly nativeCurrency: {
      readonly name: "PALM";
      readonly symbol: "PALM";
      readonly decimals: 18;
  };
  readonly infoURL: "https://palm.io";
  readonly shortName: "palm";
  readonly chainId: 11297108109;
  readonly networkId: 11297108109;
  readonly explorers: readonly [{
      readonly name: "Palm Explorer";
      readonly url: "https://explorer.palm.io";
      readonly standard: "EIP3091";
  }];
}];
type Data = (typeof RAW)[number];
export declare class Chain implements Chain {
  static fromRaw(data: Data): Chain;
  static from(chainId: number): Chain;
  static fromShortName(shortName: string): Chain;
  static fromChainId(chainId: number): Chain;
  static txUrl(chainId: number, txHash: string): string;
  static blockUrl(chainId: number, blockHashOrHeight: string): string;
  static tokenUrl(chainId: number, tokenAddress: string): string;
  static accountUrl(chainId: number, accountAddress: string): string;
  constructor(data: Data);
  getTxUrl(txHash: string): string;
  getBlockUrl(blockHashOrHeight: string): string;
  getTokenUrl(tokenAddress: string): string;
  getAccountUrl(accountAddress: string): string;
}
export declare const chains: {
  [k: string]: Chain;
};
export declare const chainsL2: {
  [k: string]: Chain;
};
export declare const chainIds: (5 | 1 | 3 | 4 | 10 | 40 | 42 | 56 | 65 | 66 | 97 | 100 | 108 | 122 | 128 | 137 | 199 | 250 | 256 | 288 | 1088 | 1101 | 1284 | 1285 | 2222 | 4002 | 42161 | 42170 | 42220 | 43113 | 43114 | 43288 | 56288 | 80001 | 1666600000 | 1666700000 | 11297108109)[];
export declare const chainShortNameToChainId: {
  [k: string]: number;
};
export declare const chainShortName: {
  [k: string]: string;
};
export declare const chainName: {
  [k: string]: string;
};
export default chains;
//# sourceMappingURL=index.d.ts.map