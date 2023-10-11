import { type PublicClientConfig } from 'viem';
import { arbitrum, arbitrumNova, avalanche, base, boba, bsc, celo, fantom, foundry, // missing multicall
gnosis, goerli, hardhat, linea, localhost, mainnet, metis, moonbeam, moonriver, okc, optimism, polygon, polygonZkEvm, zkSync } from 'viem/chains';
export { arbitrum, arbitrumNova, avalanche, base, boba, bsc, celo, fantom, foundry, gnosis, goerli, hardhat, linea, localhost, mainnet, metis, moonbeam, moonriver, okc, optimism, polygon, polygonZkEvm, zkSync, };
export declare const fuse: {
    readonly contracts: {
        readonly multicall3: {
            readonly address: `0x${string}`;
            readonly blockCreated: 16146628;
        };
    };
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
        readonly default: {
            readonly name: "Fuse Explorer";
            readonly url: "https://explorer.fuse.io";
        };
    };
    readonly formatters?: import("viem").ChainFormatters;
    readonly serializers?: import("viem").ChainSerializers<import("viem").ChainFormatters>;
    readonly fees?: import("viem").ChainFees<import("viem").ChainFormatters>;
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
export declare const core: {
    readonly id: 1116;
    readonly name: "Core";
    readonly network: "core";
    readonly nativeCurrency: {
        readonly name: "Core";
        readonly symbol: "CORE";
        readonly decimals: 18;
    };
    readonly rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://rpc.coredao.org", "https://rpc-core.icecreamswap.com"];
        };
        readonly public: {
            readonly http: readonly ["https://rpc.coredao.org", "https://rpc-core.icecreamswap.com"];
        };
    };
    readonly contracts: {
        readonly multicall3: {
            readonly address: "0xC4b2e1718E850535A0f3e79F7fC522d966821688";
            readonly blockCreated: 5087121;
        };
    };
};
export declare const config: Record<number, PublicClientConfig>;
