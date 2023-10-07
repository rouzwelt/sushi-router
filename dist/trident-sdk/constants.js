"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isTridentChainId = exports.TridentChainIds = exports.TRIDENT_SUPPORTED_CHAIN_IDS = exports.TRIDENT_CONSTANT_POOL_FACTORY_ADDRESS = exports.TRIDENT_STABLE_POOL_FACTORY_ADDRESS = void 0;
const chain_1 = require("@sushiswap/chain");
exports.TRIDENT_STABLE_POOL_FACTORY_ADDRESS = {
    [chain_1.ChainId.METIS]: '0x2f686751b19a9d91cc3d57d90150Bc767f050066',
    [chain_1.ChainId.KAVA]: '0x9B3fF703FA9C8B467F5886d7b61E61ba07a9b51c',
    [chain_1.ChainId.POLYGON]: '0x2A0Caa28331bC6a18FF195f06694f90671dE70f2',
    [chain_1.ChainId.OPTIMISM]: '0x827179dD56d07A7eeA32e3873493835da2866976',
    [chain_1.ChainId.BTTC]: '0x120140d0c1EBC938befc84840575EcDc5fE55aFe',
    [chain_1.ChainId.ARBITRUM]: '0xc2fB256ABa36852DCcEA92181eC6b355f09A0288',
    [chain_1.ChainId.AVALANCHE]: '0x7770978eED668a3ba661d51a773d3a992Fc9DDCB',
    [chain_1.ChainId.BSC]: '0xA4C0363edD74F55AC8f316a3Bf447F8aa09607D3',
};
exports.TRIDENT_CONSTANT_POOL_FACTORY_ADDRESS = {
    [chain_1.ChainId.OPTIMISM]: '0x93395129bd3fcf49d95730D3C2737c17990fF328',
    [chain_1.ChainId.POLYGON]: '0x28890e3C0aA9B4b48b1a716f46C9abc9B12abfab',
    [chain_1.ChainId.METIS]: '0x0769fd68dFb93167989C6f7254cd0D766Fb2841F',
    [chain_1.ChainId.KAVA]: '0x0769fd68dFb93167989C6f7254cd0D766Fb2841F',
    [chain_1.ChainId.BTTC]: '0x752Dc00ABa9c930c84aC81D288dB5E2a02Afe633',
    [chain_1.ChainId.ARBITRUM]: '0xc79Ae87E9f55761c08e346B98dDdf070C9872787',
    [chain_1.ChainId.AVALANCHE]: '0xb84a043bc4fCA97B7a74eD7dAaB1Bf12A8DF929F',
    [chain_1.ChainId.BSC]: '0x3D2f8ae0344d38525d2AE96Ab750B83480c0844F',
};
exports.TRIDENT_SUPPORTED_CHAIN_IDS = [
    chain_1.ChainId.OPTIMISM,
    chain_1.ChainId.POLYGON,
    chain_1.ChainId.METIS,
    chain_1.ChainId.KAVA,
    chain_1.ChainId.BTTC,
    chain_1.ChainId.ARBITRUM,
    chain_1.ChainId.AVALANCHE,
    chain_1.ChainId.BSC,
    // ChainId.ETHEREUM,
    // ChainId.FANTOM,
    // ChainId.GNOSIS,
];
exports.TridentChainIds = exports.TRIDENT_SUPPORTED_CHAIN_IDS;
const isTridentChainId = (chainId) => exports.TRIDENT_SUPPORTED_CHAIN_IDS.includes(chainId);
exports.isTridentChainId = isTridentChainId;
//# sourceMappingURL=constants.js.map