"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TridentConstantPool = void 0;
var base_sdk_1 = require("@sushiswap/base-sdk");
var currency_1 = require("@sushiswap/currency");
var math_1 = require("@sushiswap/math");
var tiny_invariant_1 = require("tiny-invariant");
var __1 = require("..");
var computeTridentConstantPoolAddress_1 = require("./computeTridentConstantPoolAddress");
var zod_1 = require("./zod");
var TridentConstantPool = /** @class */ (function () {
    function TridentConstantPool(AmountA, AmountB, fee, twap) {
        this.swapGasCost = 60000n;
        this.minLiquidity = 1000n;
        this.MAX_FEE = 10000n;
        var Amounts = AmountA.currency.sortsBefore(AmountB.currency) // does safety checks
            ? [AmountA, AmountB]
            : [AmountB, AmountA];
        this.liquidityToken = new currency_1.Token({
            chainId: Amounts[0].currency.chainId,
            address: TridentConstantPool.getAddress(Amounts[0].currency, Amounts[1].currency, fee, twap),
            decimals: 18,
            symbol: 'SCPLP',
            name: 'Sushi Constant Product LP Token',
        });
        this.fee = fee;
        this.twap = twap;
        this.tokenAmounts = Amounts;
    }
    TridentConstantPool.getAddress = function (tokenA, tokenB, fee, twap) {
        return (0, computeTridentConstantPoolAddress_1.computeTridentConstantPoolAddress)({
            factoryAddress: __1.tridentConstantPoolFactoryAddress[tokenA.chainId],
            tokenA: tokenA,
            tokenB: tokenB,
            fee: fee,
            twap: twap,
        });
    };
    /**
     * Returns true if the token is either token0 or token1
     * @param token to check
     */
    TridentConstantPool.prototype.involvesToken = function (token) {
        return token.equals(this.token0) || token.equals(this.token1);
    };
    Object.defineProperty(TridentConstantPool.prototype, "token0Price", {
        /**
         * Returns the current mid price of the pair in terms of token0, i.e. the ratio of reserve1 to reserve0
         */
        get: function () {
            var result = this.tokenAmounts[1].divide(this.tokenAmounts[0]);
            return new currency_1.Price(this.token0, this.token1, result.denominator, result.numerator);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TridentConstantPool.prototype, "token1Price", {
        /**
         * Returns the current mid price of the pair in terms of token1, i.e. the ratio of reserve0 to reserve1
         */
        get: function () {
            var result = this.tokenAmounts[0].divide(this.tokenAmounts[1]);
            return new currency_1.Price(this.token1, this.token0, result.denominator, result.numerator);
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Return the price of the given token in terms of the other token in the pair.
     * @param token token to return price of
     */
    TridentConstantPool.prototype.priceOf = function (token) {
        (0, tiny_invariant_1.default)(this.involvesToken(token), 'TOKEN');
        return token.equals(this.token0) ? this.token0Price : this.token1Price;
    };
    Object.defineProperty(TridentConstantPool.prototype, "chainId", {
        /**
         * Returns the chain ID of the tokens in the pair.
         */
        get: function () {
            return this.token0.chainId;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TridentConstantPool.prototype, "token0", {
        get: function () {
            return this.tokenAmounts[0].currency;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TridentConstantPool.prototype, "token1", {
        get: function () {
            return this.tokenAmounts[1].currency;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TridentConstantPool.prototype, "reserve0", {
        get: function () {
            return this.tokenAmounts[0];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TridentConstantPool.prototype, "reserve1", {
        get: function () {
            return this.tokenAmounts[1];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TridentConstantPool.prototype, "assets", {
        get: function () {
            return [this.tokenAmounts[0].currency, this.tokenAmounts[1].currency];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TridentConstantPool.prototype, "reserves", {
        get: function () {
            return [this.reserve0, this.reserve1];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TridentConstantPool.prototype, "kLast", {
        get: function () {
            return (0, math_1.sqrt)(this.reserve0.multiply(this.reserve1).quotient);
        },
        enumerable: false,
        configurable: true
    });
    TridentConstantPool.prototype.reserveOf = function (token) {
        (0, tiny_invariant_1.default)(this.involvesToken(token), 'TOKEN');
        return token.equals(this.token0) ? this.reserve0 : this.reserve1;
    };
    TridentConstantPool.prototype.getOutputAmount = function (inputAmount) {
        (0, tiny_invariant_1.default)(this.involvesToken(inputAmount.currency), 'TOKEN');
        if (this.reserve0.quotient === math_1.ZERO || this.reserve1.quotient === math_1.ZERO) {
            throw new base_sdk_1.InsufficientReservesError();
        }
        var inputReserve = this.reserveOf(inputAmount.currency);
        var outputReserve = this.reserveOf(inputAmount.currency.equals(this.token0) ? this.token1 : this.token0);
        var inputAmountWithFee = inputAmount.quotient * this.MAX_FEE - BigInt(this.fee);
        var numerator = inputAmountWithFee * outputReserve.quotient;
        var denominator = inputReserve.quotient * this.MAX_FEE + inputAmountWithFee;
        var outputAmount = currency_1.Amount.fromRawAmount(inputAmount.currency.equals(this.token0) ? this.token1 : this.token0, numerator / denominator);
        if (outputAmount.quotient === math_1.ZERO) {
            throw new base_sdk_1.InsufficientInputAmountError();
        }
        return [
            outputAmount,
            new TridentConstantPool(inputReserve.add(inputAmount), outputReserve.subtract(outputAmount), this.fee, this.twap),
        ];
    };
    TridentConstantPool.prototype.getInputAmount = function (outputAmount) {
        (0, tiny_invariant_1.default)(this.involvesToken(outputAmount.currency), 'TOKEN');
        if (this.reserve0.quotient === math_1.ZERO ||
            this.reserve1.quotient === math_1.ZERO ||
            outputAmount.quotient >= this.reserveOf(outputAmount.currency).quotient) {
            throw new base_sdk_1.InsufficientReservesError();
        }
        var outputReserve = this.reserveOf(outputAmount.currency);
        var inputReserve = this.reserveOf(outputAmount.currency.equals(this.token0) ? this.token1 : this.token0);
        var numerator = inputReserve.quotient * outputAmount.quotient * this.MAX_FEE;
        var denominator = (outputReserve.quotient - outputAmount.quotient) * (this.MAX_FEE - BigInt(this.fee));
        var inputAmount = currency_1.Amount.fromRawAmount(outputAmount.currency.equals(this.token0) ? this.token1 : this.token0, numerator / denominator + math_1.ONE);
        return [
            inputAmount,
            new TridentConstantPool(inputReserve.add(inputAmount), outputReserve.subtract(outputAmount), this.fee, this.twap),
        ];
    };
    TridentConstantPool.prototype.getNonOptimalMintFee = function (amount0, amount1, reserve0, reserve1) {
        if (reserve0 === math_1.ZERO || reserve1 === math_1.ZERO) {
            return [math_1.ZERO, math_1.ZERO];
        }
        var amount1Optimal = (amount0 * reserve1) / reserve0;
        if (amount1Optimal <= amount1) {
            return [math_1.ZERO, (BigInt(this.fee) * (amount1 - amount1Optimal)) / (2n * 10000n)];
        }
        else {
            var amount0Optimal = (amount1 * reserve0) / reserve1;
            return [(BigInt(this.fee) * (amount0 - amount0Optimal)) / (2n * 10000n), math_1.ZERO];
        }
    };
    TridentConstantPool.prototype.getMintFee = function (reserve0, reserve1, totalSupply) {
        if (this.kLast !== math_1.ZERO) {
            var computed = (0, math_1.sqrt)(reserve0 * reserve1);
            if (computed > this.kLast) {
                var liquidity = (totalSupply * (computed - this.kLast) * 5n) / computed / 10000n;
                if (liquidity !== math_1.ZERO) {
                    return liquidity;
                }
            }
        }
        return math_1.ZERO;
    };
    TridentConstantPool.prototype.getLiquidityMinted = function (totalSupply, tokenAmountA, tokenAmountB) {
        (0, tiny_invariant_1.default)(totalSupply.currency.equals(this.liquidityToken), 'LIQUIDITY');
        var tokenAmounts = tokenAmountA.currency.sortsBefore(tokenAmountB.currency) // does safety checks
            ? [tokenAmountA, tokenAmountB]
            : [tokenAmountB, tokenAmountA];
        (0, tiny_invariant_1.default)(tokenAmounts[0].currency.equals(this.token0) && tokenAmounts[1].currency.equals(this.token1), 'TOKEN');
        var liquidity;
        // Expected balances after minting
        var balance0 = tokenAmounts[0].quotient + this.reserve0.quotient;
        var balance1 = tokenAmounts[1].quotient + this.reserve1.quotient;
        var computed = (0, math_1.sqrt)(balance0 * balance1);
        if (totalSupply.quotient === math_1.ZERO) {
            liquidity = computed - this.minLiquidity;
        }
        else {
            var _a = this.getNonOptimalMintFee(tokenAmounts[0].quotient, tokenAmounts[1].quotient, this.reserve0.quotient, this.reserve1.quotient), fee0 = _a[0], fee1 = _a[1];
            var reserve0 = this.reserve0.quotient + fee0;
            var reserve1 = this.reserve1.quotient + fee1;
            var k = (0, math_1.sqrt)(reserve0 * reserve1);
            var mintFee = this.getMintFee(reserve0, reserve1, totalSupply.quotient);
            liquidity = ((computed - k) * (totalSupply.quotient + mintFee)) / k;
        }
        if (liquidity <= math_1.ZERO) {
            throw new base_sdk_1.InsufficientInputAmountError();
        }
        return currency_1.Amount.fromRawAmount(this.liquidityToken, liquidity);
    };
    TridentConstantPool.prototype.getLiquidityValue = function (token, totalSupply, liquidity) {
        (0, tiny_invariant_1.default)(this.involvesToken(token), 'TOKEN');
        (0, tiny_invariant_1.default)(totalSupply.currency.equals(this.liquidityToken), 'TOTAL_SUPPLY');
        (0, tiny_invariant_1.default)(liquidity.currency.equals(this.liquidityToken), 'LIQUIDITY');
        (0, tiny_invariant_1.default)(liquidity.quotient <= totalSupply.quotient, 'LIQUIDITY');
        return currency_1.Amount.fromRawAmount(token, (liquidity.quotient * this.reserveOf(token).quotient) / totalSupply.quotient);
    };
    TridentConstantPool.prototype.getAmountOut = function (amountIn, reserveAmountIn, reserveAmountOut) {
        var amountInWithFee = amountIn * (this.MAX_FEE - BigInt(this.fee));
        return (amountInWithFee * reserveAmountOut) / (reserveAmountIn * this.MAX_FEE + amountInWithFee);
    };
    TridentConstantPool.prototype.getLiquidityValueSingleToken = function (token, totalSupply, liquidity) {
        (0, tiny_invariant_1.default)(this.involvesToken(token), 'TOKEN');
        (0, tiny_invariant_1.default)(totalSupply.currency.equals(this.liquidityToken), 'TOTAL_SUPPLY');
        (0, tiny_invariant_1.default)(liquidity.currency.equals(this.liquidityToken), 'LIQUIDITY');
        (0, tiny_invariant_1.default)(liquidity.quotient <= totalSupply.quotient, 'LIQUIDITY');
        var _totalSupply = totalSupply.quotient + this.getMintFee(this.reserve0.quotient, this.reserve1.quotient, totalSupply.quotient);
        var amount0 = (liquidity.quotient * this.reserve0.quotient) / _totalSupply;
        var amount1 = (liquidity.quotient * this.reserve1.quotient) / _totalSupply;
        if (token === this.token1) {
            return currency_1.Amount.fromRawAmount(token, amount1 + this.getAmountOut(amount0, this.reserve0.quotient - amount0, this.reserve1.quotient - amount1));
        }
        return currency_1.Amount.fromRawAmount(token, amount0 + this.getAmountOut(amount1, this.reserve1.quotient - amount1, this.reserve0.quotient - amount0));
    };
    TridentConstantPool.prototype.serialize = function () {
        return zod_1.tridentConstantPoolSchema.parse({
            reserve0: this.tokenAmounts[0].serialize(),
            reserve1: this.tokenAmounts[1].serialize(),
            fee: this.fee,
            twap: this.twap,
        });
    };
    TridentConstantPool.deserialize = function (pool) {
        return new TridentConstantPool(currency_1.Amount.deserialize(pool.reserve0), currency_1.Amount.deserialize(pool.reserve1), pool.fee, pool.twap);
    };
    return TridentConstantPool;
}());
exports.TridentConstantPool = TridentConstantPool;
//# sourceMappingURL=TridentConstantPool.js.map