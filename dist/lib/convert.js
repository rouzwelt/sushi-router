"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertTokenToBento = exports.getBentoChainId = void 0;
function getBentoChainId(chainId) {
    return `Bento ${chainId}`;
}
exports.getBentoChainId = getBentoChainId;
function convertTokenToBento(token) {
    const t = { ...token };
    t.chainId = getBentoChainId(token.chainId);
    t.name = getBentoChainId(token.name);
    t.symbol = getBentoChainId(token.symbol);
    delete t.tokenId;
    return t;
}
exports.convertTokenToBento = convertTokenToBento;
//# sourceMappingURL=convert.js.map