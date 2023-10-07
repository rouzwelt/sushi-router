"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getV3CurrencyCombinations = exports.getCurrencyCombinations = void 0;
const router_config_1 = require("@sushiswap/router-config");
const lodash_flatmap_1 = require("lodash.flatmap");
function getCurrencyCombinations(chainId, currencyA, currencyB) {
    const [tokenA, tokenB] = chainId ? [currencyA?.wrapped, currencyB?.wrapped] : [undefined, undefined];
    const common = chainId in router_config_1.BASES_TO_CHECK_TRADES_AGAINST ? router_config_1.BASES_TO_CHECK_TRADES_AGAINST[chainId] : [];
    const additionalA = tokenA ? router_config_1.ADDITIONAL_BASES[chainId]?.[tokenA.address] ?? [] : [];
    const additionalB = tokenB ? router_config_1.ADDITIONAL_BASES[chainId]?.[tokenB.address] ?? [] : [];
    const bases = [...common, ...additionalA, ...additionalB];
    const basePairs = (0, lodash_flatmap_1.default)(bases, (base) => bases.map((otherBase) => [base, otherBase]));
    if (!tokenA || !tokenB) {
        return [];
    }
    const combinations0 = [
        // the direct pair
        [tokenA, tokenB],
        // token A against all bases
        ...bases.map((base) => [tokenA, base]),
        // token B against all bases
        ...bases.map((base) => [tokenB, base]),
        // each base against all bases
        ...basePairs,
    ]
        .filter((tokens) => Boolean(tokens[0] && tokens[1]))
        .filter(([t0, t1]) => t0.address !== t1.address)
        .filter(([tokenA, tokenB]) => {
        if (!chainId)
            return true;
        const customBases = router_config_1.CUSTOM_BASES[chainId];
        const customBasesA = customBases?.[tokenA.address];
        const customBasesB = customBases?.[tokenB.address];
        if (!customBasesA && !customBasesB)
            return true;
        if (customBasesA && !customBasesA.find((base) => tokenB.equals(base)))
            return false;
        if (customBasesB && !customBasesB.find((base) => tokenA.equals(base)))
            return false;
        return true;
    });
    const combinationUniqueAndSorted = new Map();
    combinations0.forEach(([t0, t1]) => {
        const [s0, s1] = t0.sortsBefore(t1) ? [t0, t1] : [t1, t0];
        const id = s0.address + s1.address;
        combinationUniqueAndSorted.set(id, [s0, s1]);
    });
    return Array.from(combinationUniqueAndSorted.values());
}
exports.getCurrencyCombinations = getCurrencyCombinations;
function getV3CurrencyCombinations(chainId, currencyA, currencyB) {
    const [tokenA, tokenB] = chainId ? [currencyA?.wrapped, currencyB?.wrapped] : [undefined, undefined];
    const common = chainId in router_config_1.BASES_TO_CHECK_TRADES_AGAINST ? router_config_1.BASES_TO_CHECK_TRADES_AGAINST[chainId] : [];
    if (!tokenA || !tokenB) {
        return [];
    }
    return [
        // the direct pair
        [tokenA, tokenB],
        // token A against all bases
        ...common.map((common) => [tokenA, common]),
        // token B against all bases
        ...common.map((common) => [tokenB, common]),
    ]
        .filter((tokens) => Boolean(tokens[0] && tokens[1]))
        .filter(([t0, t1]) => t0.address !== t1.address);
}
exports.getV3CurrencyCombinations = getV3CurrencyCombinations;
//# sourceMappingURL=getCurrencyCombinations.js.map