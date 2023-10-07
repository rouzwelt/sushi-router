"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRoutingAnyChartSankeyData = void 0;
// Example: https://www.anychart.com/products/anychart/gallery/Sankey_Diagram/Titanic_Survivors.php?theme=lightBlue
// Data formate: [{from: 'First Class', to: 'Child', value: 6}, ....]
function getRoutingAnyChartSankeyData(route) {
    // set tokens values. input token value is 100%, other tokens value is how many % of liquidity comes through them
    var tokenValue = new Map();
    tokenValue.set(route.fromToken.tokenId, 100);
    route.legs.forEach(function (leg) {
        var fromValue = tokenValue.get(leg.tokenFrom.tokenId) || 0;
        console.assert(fromValue !== 0, 'Unexpected input token !!!' + leg.tokenFrom.tokenId);
        var legValue = fromValue * leg.absolutePortion;
        var toValue = tokenValue.get(leg.tokenTo.tokenId) || 0;
        tokenValue.set(leg.tokenTo.tokenId, toValue + legValue);
    });
    return route.legs.map(function (leg) {
        var fromValue = tokenValue.get(leg.tokenFrom.tokenId) || 0;
        console.assert(fromValue !== 0, 'Unexpected token value !!! ' + leg.tokenFrom.tokenId);
        var value = Math.round(fromValue * leg.absolutePortion);
        return {
            from: leg.tokenFrom.symbol,
            to: leg.tokenTo.symbol,
            value: value,
        };
    });
}
exports.getRoutingAnyChartSankeyData = getRoutingAnyChartSankeyData;
//# sourceMappingURL=Sankey.AnyChart.js.map