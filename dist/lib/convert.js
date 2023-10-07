"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertTokenToBento = exports.getBentoChainId = void 0;
function getBentoChainId(chainId) {
    return "Bento ".concat(chainId);
}
exports.getBentoChainId = getBentoChainId;
function convertTokenToBento(token) {
    var t = __assign({}, token);
    t.chainId = getBentoChainId(token.chainId);
    t.name = getBentoChainId(token.name);
    t.symbol = getBentoChainId(token.symbol);
    delete t.tokenId;
    return t;
}
exports.convertTokenToBento = convertTokenToBento;
//# sourceMappingURL=convert.js.map