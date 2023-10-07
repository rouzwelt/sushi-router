"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BentoBridgePoolCode = void 0;
const HEXer_1 = require("../HEXer");
const Bridge_1 = require("./Bridge");
const PoolCode_1 = require("./PoolCode");
class BentoBridgePoolCode extends PoolCode_1.PoolCode {
    constructor(pool, liquidityProvider, _providerName, bentoBoxAddress) {
        super(pool, liquidityProvider, Bridge_1.Bridge.BentoBox);
        this.bentoBoxAddress = bentoBoxAddress;
    }
    getStartPoint(leg) {
        if (leg.tokenFrom.chainId === this.pool.token0.chainId) {
            // bento deposit
            return this.bentoBoxAddress;
        }
        else {
            return 'RouteProcessor';
        }
    }
    getSwapCodeForRouteProcessor(leg, route, to, exactAmount) {
        if (leg.tokenFrom.chainId === this.pool.token0.chainId) {
            // bento deposit
            if (leg.tokenFrom.tokenId === route.fromToken.tokenId) {
                // input token with exactAmount
                if (exactAmount !== undefined) {
                    const code = new HEXer_1.HEXer()
                        .uint8(20) // bentoDepositAmountFromBento
                        .address(to)
                        .uint(exactAmount)
                        .toString();
                    console.assert(code.length === 53 * 2, 'BentoBridge deposit unexpected code length');
                    return code;
                }
                else {
                    throw new Error("Bento deposit from input token can't work without exact amount");
                }
            }
            else {
                // deposit in the middle of a route
                const code = new HEXer_1.HEXer()
                    .uint8(26) // bentoDepositAllFromBento
                    .address(to)
                    .address(leg.tokenFrom.address)
                    .toString();
                console.assert(code.length === 41 * 2, 'BentoBridge deposit unexpected code length');
                return code;
            }
        }
        else {
            // bento withdraw
            if (leg.tokenFrom.tokenId === route.fromToken.tokenId) {
                // input token with exactAmount
                if (exactAmount !== undefined) {
                    const code = new HEXer_1.HEXer()
                        .uint8(23) // bentoWithdrawShareFromRP
                        .address(to)
                        .uint(exactAmount)
                        .toString();
                    console.assert(code.length === 53 * 2, 'BentoBridge withdraw unexpected code length');
                    return code;
                }
                else {
                    throw new Error("Bento withdraw from input token can't work without exact amount");
                }
            }
            else {
                // withdraw in the middle of a route
                const code = new HEXer_1.HEXer()
                    .uint8(27) // bentoWithdrawAllFromRP
                    .address(leg.tokenFrom.address)
                    .address(to)
                    .toString();
                console.assert(code.length === 41 * 2, 'BentoBridge deposit unexpected code length');
                return code;
            }
        }
    }
    getSwapCodeForRouteProcessor2(leg, _route, to) {
        const code = new HEXer_1.HEXer()
            .uint8(3) // bentoBridge
            .uint8(leg.tokenFrom.chainId === this.pool.token0.chainId ? 1 : 0) // direction = deposit/withdraw
            .address(to)
            .toString();
        return code;
    }
}
exports.BentoBridgePoolCode = BentoBridgePoolCode;
//# sourceMappingURL=BentoBridge.js.map