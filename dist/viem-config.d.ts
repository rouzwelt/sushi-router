import { PublicClientConfig } from 'viem';
import { arbitrum, avalanche, bsc, celo, fantom, mainnet, optimism, polygon } from 'viem/chains';
export { arbitrum, avalanche, bsc, celo, fantom, mainnet, optimism, polygon, };
export declare const polygonZkEvm: {
    contracts: {
        multicall3: {
            address: `0x${string}`;
            blockCreated: number;
        };
    };
    id: 1101;
    name: "Polygon zkEVM";
    network: "polygon-zkevm";
    nativeCurrency: {
        readonly name: "Ether";
        readonly symbol: "ETH";
        readonly decimals: 18;
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://zkevm-rpc.com"];
        };
        readonly public: {
            readonly http: readonly ["https://zkevm-rpc.com"];
        };
    };
    blockExplorers: {
        readonly default: {
            readonly name: "PolygonScan";
            readonly url: "https://zkevm.polygonscan.com";
        };
    };
    formatters?: import("viem").ChainFormatters;
    serializers?: import("viem").ChainSerializers<import("viem").ChainFormatters>;
    fees?: import("viem").ChainFees<import("viem").ChainFormatters>;
};
export declare const gnosis: {
    contracts: {
        multicall3: {
            address: `0x${string}`;
            blockCreated: number;
        };
    };
    id: 100;
    name: "Gnosis";
    network: "gnosis";
    nativeCurrency: {
        readonly decimals: 18;
        readonly name: "Gnosis";
        readonly symbol: "xDAI";
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://rpc.gnosischain.com"];
        };
        readonly public: {
            readonly http: readonly ["https://rpc.gnosischain.com"];
        };
    };
    blockExplorers: {
        readonly etherscan: {
            readonly name: "Gnosisscan";
            readonly url: "https://gnosisscan.io";
        };
        readonly default: {
            readonly name: "Gnosis Chain Explorer";
            readonly url: "https://blockscout.com/xdai/mainnet";
        };
    };
    formatters?: import("viem").ChainFormatters;
    serializers?: import("viem").ChainSerializers<import("viem").ChainFormatters>;
    fees?: import("viem").ChainFees<import("viem").ChainFormatters>;
};
export declare const metis: {
    contracts: {
        multicall3: {
            address: `0x${string}`;
            blockCreated: number;
        };
    };
    id: 1088;
    name: "Metis";
    network: "andromeda";
    nativeCurrency: {
        readonly decimals: 18;
        readonly name: "Metis";
        readonly symbol: "METIS";
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://andromeda.metis.io/?owner=1088"];
        };
        readonly public: {
            readonly http: readonly ["https://andromeda.metis.io/?owner=1088"];
        };
    };
    blockExplorers: {
        readonly default: {
            readonly name: "Andromeda Explorer";
            readonly url: "https://andromeda-explorer.metis.io";
        };
    };
    formatters?: import("viem").ChainFormatters;
    serializers?: import("viem").ChainSerializers<import("viem").ChainFormatters>;
    fees?: import("viem").ChainFees<import("viem").ChainFormatters>;
};
export declare const harmony: {
    readonly id: 1666600000;
    readonly name: "Harmony";
    readonly network: "harmony";
    readonly nativeCurrency: {
        readonly name: "ONE";
        readonly symbol: "ONE";
        readonly decimals: 18;
    };
    readonly rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://api.harmony.one"];
        };
        readonly public: {
            readonly http: readonly ["https://api.harmony.one"];
        };
    };
    readonly blockExplorers: {
        readonly etherscan: {
            readonly name: "Harmony Blockchain Explorer";
            readonly url: "https://explorer.harmony.one";
        };
        readonly default: {
            readonly name: "Harmony Blockchain Explorer";
            readonly url: "https://explorer.harmony.one";
        };
    };
    readonly contracts: {
        readonly multicall3: {
            readonly address: `0x${string}`;
            readonly blockCreated: 24185753;
        };
    };
};
export declare const moonbeam: {
    readonly id: 1284;
    readonly name: "Moonbeam";
    readonly network: "moonbeam";
    readonly nativeCurrency: {
        readonly name: "Glimmer";
        readonly symbol: "GLMR";
        readonly decimals: 18;
    };
    readonly rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://rpc.api.moonbeam.network"];
        };
        readonly public: {
            readonly http: readonly ["https://rpc.api.moonbeam.network"];
        };
    };
    readonly blockExplorers: {
        readonly etherscan: {
            readonly name: "Moonscan";
            readonly url: "https://moonbeam.moonscan.io";
        };
        readonly default: {
            readonly name: "Moonscan";
            readonly url: "https://moonbeam.moonscan.io";
        };
    };
    readonly contracts: {
        readonly multicall3: {
            readonly address: `0x${string}`;
            readonly blockCreated: 609002;
        };
    };
};
export declare const moonriver: {
    readonly id: 1285;
    readonly name: "Moonriver";
    readonly network: "moonriver";
    readonly nativeCurrency: {
        readonly name: "Moonriver";
        readonly symbol: "MOVR";
        readonly decimals: 18;
    };
    readonly rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://rpc.api.moonriver.moonbeam.network"];
        };
        readonly public: {
            readonly http: readonly ["https://rpc.api.moonriver.moonbeam.network"];
        };
    };
    readonly blockExplorers: {
        readonly etherscan: {
            readonly name: "Moonscan";
            readonly url: "https://moonriver.moonscan.io";
        };
        readonly default: {
            readonly name: "Moonscan";
            readonly url: "https://moonriver.moonscan.io";
        };
    };
    readonly contracts: {
        readonly multicall3: {
            readonly address: `0x${string}`;
            readonly blockCreated: 1597904;
        };
    };
};
export declare const kava: {
    readonly id: 2222;
    readonly name: "Kava";
    readonly network: "kava";
    readonly nativeCurrency: {
        readonly name: "Kava";
        readonly symbol: "KAVA";
        readonly decimals: 18;
    };
    readonly rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://evm.kava.io", "https://evm2.kava.io"];
        };
        readonly public: {
            readonly http: readonly ["https://evm.kava.io", "https://evm2.kava.io"];
        };
    };
    readonly blockExplorers: {
        readonly etherscan: {
            readonly name: "Kavascan";
            readonly url: "https://explorer.kava.io/";
        };
        readonly default: {
            readonly name: "Kavascan";
            readonly url: "https://explorer.kava.io/";
        };
    };
    readonly contracts: {
        readonly multicall3: {
            readonly address: `0x${string}`;
            readonly blockCreated: 1176602;
        };
    };
};
export declare const fuse: {
    readonly id: 122;
    readonly name: "Fuse";
    readonly network: "fuse";
    readonly nativeCurrency: {
        readonly name: "Fuse";
        readonly symbol: "FUSE";
        readonly decimals: 18;
    };
    readonly rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://rpc.fuse.io"];
        };
        readonly public: {
            readonly http: readonly ["https://rpc.fuse.io"];
        };
    };
    readonly blockExplorers: {
        readonly etherscan: {
            readonly name: "Fusescan";
            readonly url: "https://explorer.fuse.io/";
        };
        readonly default: {
            readonly name: "Fuse Explorer";
            readonly url: "https://explorer.fuse.io/";
        };
    };
    readonly contracts: {
        readonly multicall3: {
            readonly address: `0x${string}`;
            readonly blockCreated: 16146628;
        };
    };
};
export declare const arbitrumNova: {
    readonly id: 42170;
    readonly name: "Arbitrum Nova";
    readonly network: "arbitrumnova";
    readonly nativeCurrency: {
        readonly name: "Ether";
        readonly symbol: "ETH";
        readonly decimals: 18;
    };
    readonly rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://nova.arbitrum.io/rpc"];
        };
        readonly public: {
            readonly http: readonly ["https://nova.arbitrum.io/rpc"];
        };
    };
    readonly blockExplorers: {
        readonly etherscan: {
            readonly name: "Arbitrum Nova Chain Explorer";
            readonly url: "https://nova-explorer.arbitrum.io/";
        };
        readonly default: {
            readonly name: "Arbitrum Nova Chain Explorer";
            readonly url: "https://nova-explorer.arbitrum.io/";
        };
    };
    readonly contracts: {
        readonly multicall3: {
            readonly address: `0x${string}`;
            readonly blockCreated: 400008;
        };
    };
};
export declare const okex: {
    readonly id: 66;
    readonly name: "OKXChain";
    readonly network: "okxchain";
    readonly nativeCurrency: {
        readonly name: "OKC Token";
        readonly symbol: "OKT";
        readonly decimals: 18;
    };
    readonly rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://exchainrpc.okex.org"];
        };
        readonly public: {
            readonly http: readonly ["https://exchainrpc.okex.org"];
        };
    };
    readonly blockExplorers: {
        readonly etherscan: {
            readonly name: "OKC Explorer";
            readonly url: "https://www.oklink.com/en/okc/";
        };
        readonly default: {
            readonly name: "OKC Explorer";
            readonly url: "https://www.oklink.com/en/okc/";
        };
    };
    readonly contracts: {
        readonly multicall3: {
            readonly address: `0x${string}`;
            readonly blockCreated: 10364792;
        };
    };
};
export declare const heco: {
    readonly id: 128;
    readonly name: "Huobi ECO Chain";
    readonly network: "huobieco";
    readonly nativeCurrency: {
        readonly name: "Huobi Token";
        readonly symbol: "HT";
        readonly decimals: 18;
    };
    readonly rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://http-mainnet.hecochain.com"];
        };
        readonly public: {
            readonly http: readonly ["https://http-mainnet.hecochain.com"];
        };
    };
    readonly blockExplorers: {
        readonly etherscan: {
            readonly name: "HecoInfo";
            readonly url: "https://www.hecoinfo.com/";
        };
        readonly default: {
            readonly name: "Heco Explorer";
            readonly url: "https://www.hecoinfo.com/";
        };
    };
    readonly contracts: {
        readonly multicall3: {
            readonly address: `0x${string}`;
            readonly blockCreated: 14413501;
        };
    };
};
export declare const palm: {
    readonly id: 11297108109;
    readonly name: "Palm";
    readonly network: "palm";
    readonly nativeCurrency: {
        readonly name: "Palm";
        readonly symbol: "PALM";
        readonly decimals: 18;
    };
    readonly rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://palm-mainnet.infura.io/v3/3a961d6501e54add9a41aa53f15de99b"];
        };
        readonly public: {
            readonly http: readonly ["https://palm-mainnet.infura.io/v3/3a961d6501e54add9a41aa53f15de99b"];
        };
    };
    readonly blockExplorers: {
        readonly etherscan: {
            readonly name: "Palm Explorer";
            readonly url: "https://explorer.palm.io/";
        };
        readonly default: {
            readonly name: "Palm Explorer";
            readonly url: "https://explorer.palm.io/";
        };
    };
    readonly contracts: {
        readonly multicall3: {
            readonly address: `0x${string}`;
            readonly blockCreated: 8005532;
        };
    };
};
export declare const boba: {
    readonly id: 288;
    readonly name: "Boba";
    readonly network: "boba";
    readonly nativeCurrency: {
        readonly name: "Ether";
        readonly symbol: "ETH";
        readonly decimals: 18;
    };
    readonly rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://mainnet.boba.network"];
        };
        readonly public: {
            readonly http: readonly ["https://mainnet.boba.network"];
        };
    };
    readonly blockExplorers: {
        readonly etherscan: {
            readonly name: "Bobascan";
            readonly url: "https://bobascan.com/";
        };
        readonly default: {
            readonly name: "Bobascan";
            readonly url: "https://bobascan.com/";
        };
    };
    readonly contracts: {
        readonly multicall3: {
            readonly address: `0x${string}`;
            readonly blockCreated: 446859;
        };
    };
};
export declare const bobaAvax: {
    readonly id: 43288;
    readonly name: "Boba Avax";
    readonly network: "boba-avax";
    readonly nativeCurrency: {
        readonly name: "Boba";
        readonly symbol: "BOBA";
        readonly decimals: 18;
    };
    readonly rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://avax.boba.network"];
        };
        readonly public: {
            readonly http: readonly ["https://avax.boba.network"];
        };
    };
    readonly blockExplorers: {
        readonly etherscan: {
            readonly name: "Boba Avalanche Mainnet Explorer";
            readonly url: "https://blockexplorer.avax.boba.network/";
        };
        readonly default: {
            readonly name: "Boba Avalanche Mainnet Explorer";
            readonly url: "https://blockexplorer.avax.boba.network/";
        };
    };
    readonly contracts: {
        readonly multicall3: {
            readonly address: `0x${string}`;
            readonly blockCreated: 3652;
        };
    };
};
export declare const bobaBnb: {
    readonly id: 56288;
    readonly name: "Boba BNB";
    readonly network: "boba-bnb";
    readonly nativeCurrency: {
        readonly name: "Boba";
        readonly symbol: "BOBA";
        readonly decimals: 18;
    };
    readonly rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://bnb.boba.network"];
        };
        readonly public: {
            readonly http: readonly ["https://bnb.boba.network"];
        };
    };
    readonly blockExplorers: {
        readonly etherscan: {
            readonly name: "Boba BNB Mainnet Explorer";
            readonly url: "https://blockexplorer.bnb.boba.network/";
        };
        readonly default: {
            readonly name: "Boba BNB Mainnet Explorer";
            readonly url: "https://blockexplorer.bnb.boba.network/";
        };
    };
    readonly contracts: {
        readonly multicall3: {
            readonly address: `0x${string}`;
            readonly blockCreated: 18871;
        };
    };
};
export declare const bttc: {
    readonly id: 199;
    readonly name: "BitTorrent Chain";
    readonly network: "btt";
    readonly nativeCurrency: {
        readonly name: "BitTorrent";
        readonly symbol: "BTT";
        readonly decimals: 18;
    };
    readonly rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://rpc.bittorrentchain.io"];
        };
        readonly public: {
            readonly http: readonly ["https://rpc.bittorrentchain.io"];
        };
    };
    readonly blockExplorers: {
        readonly etherscan: {
            readonly name: "BitTorrent Chain Explorer";
            readonly url: "https://bttcscan.com/";
        };
        readonly default: {
            readonly name: "BitTorrent Chain Explorer";
            readonly url: "https://bttcscan.com/";
        };
    };
    readonly contracts: {
        readonly multicall3: {
            readonly address: `0x${string}`;
            readonly blockCreated: 13014184;
        };
    };
};
export declare const viemConfig: Record<number, PublicClientConfig>;
