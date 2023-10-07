"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getV3CurrencyCombinations = exports.getCurrencyCombinations = void 0;
var router_config_1 = require("@sushiswap/router-config");
var lodash_flatmap_1 = require("lodash.flatmap");
function getCurrencyCombinations(chainId, currencyA, currencyB) {
    var _a, _b, _c, _d;
    var _e = chainId ? [currencyA === null || currencyA === void 0 ? void 0 : currencyA.wrapped, currencyB === null || currencyB === void 0 ? void 0 : currencyB.wrapped] : [undefined, undefined], tokenA = _e[0], tokenB = _e[1];
    var common = chainId in router_config_1.BASES_TO_CHECK_TRADES_AGAINST ? router_config_1.BASES_TO_CHECK_TRADES_AGAINST[chainId] : [];
    var additionalA = tokenA ? (_b = (_a = router_config_1.ADDITIONAL_BASES[chainId]) === null || _a === void 0 ? void 0 : _a[tokenA.address]) !== null && _b !== void 0 ? _b : [] : [];
    var additionalB = tokenB ? (_d = (_c = router_config_1.ADDITIONAL_BASES[chainId]) === null || _c === void 0 ? void 0 : _c[tokenB.address]) !== null && _d !== void 0 ? _d : [] : [];
    var bases = __spreadArray(__spreadArray(__spreadArray([], common, true), additionalA, true), additionalB, true);
    var basePairs = (0, lodash_flatmap_1.default)(bases, function (base) {
        return bases.map(function (otherBase) { return [base, otherBase]; });
    });
    if (!tokenA || !tokenB) {
        return [];
    }
    var combinations0 = __spreadArray(__spreadArray(__spreadArray([
        // the direct pair
        [tokenA, tokenB]
    ], bases.map(function (base) { return [tokenA, base]; }), true), bases.map(function (base) { return [tokenB, base]; }), true), basePairs, true).filter(function (tokens) { return Boolean(tokens[0] && tokens[1]); })
        .filter(function (_a) {
        var t0 = _a[0], t1 = _a[1];
        return t0.address !== t1.address;
    })
        .filter(function (_a) {
        var tokenA = _a[0], tokenB = _a[1];
        if (!chainId)
            return true;
        var customBases = router_config_1.CUSTOM_BASES[chainId];
        var customBasesA = customBases === null || customBases === void 0 ? void 0 : customBases[tokenA.address];
        var customBasesB = customBases === null || customBases === void 0 ? void 0 : customBases[tokenB.address];
        if (!customBasesA && !customBasesB)
            return true;
        if (customBasesA && !customBasesA.find(function (base) { return tokenB.equals(base); }))
            return false;
        if (customBasesB && !customBasesB.find(function (base) { return tokenA.equals(base); }))
            return false;
        return true;
    });
    var combinationUniqueAndSorted = new Map();
    combinations0.forEach(function (_a) {
        var t0 = _a[0], t1 = _a[1];
        var _b = t0.sortsBefore(t1) ? [t0, t1] : [t1, t0], s0 = _b[0], s1 = _b[1];
        var id = s0.address + s1.address;
        combinationUniqueAndSorted.set(id, [s0, s1]);
    });
    return Array.from(combinationUniqueAndSorted.values());
}
exports.getCurrencyCombinations = getCurrencyCombinations;
function getV3CurrencyCombinations(chainId, currencyA, currencyB) {
    var _a = chainId ? [currencyA === null || currencyA === void 0 ? void 0 : currencyA.wrapped, currencyB === null || currencyB === void 0 ? void 0 : currencyB.wrapped] : [undefined, undefined], tokenA = _a[0], tokenB = _a[1];
    var common = chainId in router_config_1.BASES_TO_CHECK_TRADES_AGAINST ? router_config_1.BASES_TO_CHECK_TRADES_AGAINST[chainId] : [];
    if (!tokenA || !tokenB) {
        return [];
    }
    return __spreadArray(__spreadArray([
        // the direct pair
        [tokenA, tokenB]
    ], common.map(function (common) { return [tokenA, common]; }), true), common.map(function (common) { return [tokenB, common]; }), true).filter(function (tokens) { return Boolean(tokens[0] && tokens[1]); })
        .filter(function (_a) {
        var t0 = _a[0], t1 = _a[1];
        return t0.address !== t1.address;
    });
}
exports.getV3CurrencyCombinations = getV3CurrencyCombinations;
//# sourceMappingURL=getCurrencyCombinations.js.map