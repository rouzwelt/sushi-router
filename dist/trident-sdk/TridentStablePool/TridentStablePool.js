"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TridentStablePool = void 0;
var base_sdk_1 = require("@sushiswap/base-sdk");
var currency_1 = require("@sushiswap/currency");
var math_1 = require("@sushiswap/math");
var tiny_invariant_1 = require("tiny-invariant");
var __1 = require("..");
var computeTridentStablePoolAddress_1 = require("./computeTridentStablePoolAddress");
var zod_1 = require("./zod");
var TridentStablePool = /** @class */ (function () {
    function TridentStablePool(amountA, amountB, fee, total0, total1) {
        this.swapGasCost = 60000n;
        this.minLiquidity = 1000n;
        this.MAX_FEE = 10000n;
        var tokenAmounts = amountA.currency.sortsBefore(amountB.currency) // does safety checks
            ? [amountA, amountB]
            : [amountB, amountA];
        this.liquidityToken = new currency_1.Token({
            chainId: tokenAmounts[0].currency.chainId,
            address: TridentStablePool.getAddress(tokenAmounts[0].currency, tokenAmounts[1].currency, fee),
            decimals: 18,
            symbol: 'SSLP',
            name: 'Sushi Stable LP Token',
        });
        this.fee = fee;
        this.tokenAmounts = tokenAmounts;
        // decimals0 = uint256(10)**(ERC20(_token0).decimals());
        // decimals1 = uint256(10)**(ERC20(_token1).decimals());
        this.decimals0 = Math.pow(10n, BigInt(this.tokenAmounts[0].currency.decimals));
        this.decimals1 = Math.pow(10n, BigInt(this.tokenAmounts[1].currency.decimals));
        this.total0 = total0;
        this.total1 = total1;
    }
    TridentStablePool.getAddress = function (tokenA, tokenB, fee) {
        return (0, computeTridentStablePoolAddress_1.computeTridentStablePoolAddress)({
            factoryAddress: __1.tridentStablePoolFactoryAddress[tokenA.chainId],
            tokenA: tokenA,
            tokenB: tokenB,
            fee: fee,
        });
    };
    /**
     * Returns true if the token is either token0 or token1
     * @param token to check
     */
    TridentStablePool.prototype.involvesToken = function (token) {
        return token.equals(this.token0) || token.equals(this.token1);
    };
    Object.defineProperty(TridentStablePool.prototype, "token0Price", {
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
    Object.defineProperty(TridentStablePool.prototype, "token1Price", {
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
    TridentStablePool.prototype.priceOf = function (token) {
        (0, tiny_invariant_1.default)(this.involvesToken(token), 'TOKEN');
        return token.equals(this.token0) ? this.token0Price : this.token1Price;
    };
    Object.defineProperty(TridentStablePool.prototype, "chainId", {
        /**
         * Returns the chain ID of the tokens in the pair.
         */
        get: function () {
            return this.token0.chainId;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TridentStablePool.prototype, "token0", {
        get: function () {
            return this.tokenAmounts[0].currency;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TridentStablePool.prototype, "token1", {
        get: function () {
            return this.tokenAmounts[1].currency;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TridentStablePool.prototype, "reserve0", {
        get: function () {
            return this.tokenAmounts[0];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TridentStablePool.prototype, "reserve1", {
        get: function () {
            return this.tokenAmounts[1];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TridentStablePool.prototype, "assets", {
        get: function () {
            return [this.tokenAmounts[0].currency, this.tokenAmounts[1].currency];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TridentStablePool.prototype, "reserves", {
        get: function () {
            return [this.reserve0, this.reserve1];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TridentStablePool.prototype, "kLast", {
        get: function () {
            return this.computeLiquidity(this.reserve0.quotient, this.reserve1.quotient);
        },
        enumerable: false,
        configurable: true
    });
    TridentStablePool.prototype.reserveOf = function (token) {
        (0, tiny_invariant_1.default)(this.involvesToken(token), 'TOKEN');
        return token.equals(this.token0) ? this.reserve0 : this.reserve1;
    };
    TridentStablePool.prototype._f = function (x0, y) {
        // (x0 * ((((y * y) / 1e12) * y) / 1e12)) / 1e12
        // +
        // (((((x0 * x0) / 1e12) * x0) / 1e12) * y) / 1e12
        return ((x0 * ((((y * y) / BigInt(1e12)) * y) / BigInt(1e12))) / BigInt(1e12) +
            (((((x0 * x0) / BigInt(1e12)) * x0) / BigInt(1e12)) * y) / BigInt(1e12));
    };
    TridentStablePool.prototype._d = function (x0, y) {
        // (3 * x0 * ((y * y) / 1e12)) / 1e12
        // +
        // ((((x0 * x0) / 1e12) * x0) / 1e12)
        return (3n * x0 * ((y * y) / BigInt(1e12))) / BigInt(1e12) + (((x0 * x0) / BigInt(1e12)) * x0) / BigInt(1e12);
    };
    TridentStablePool.prototype._get_y = function (x0, xy, y) {
        for (var i = 0; i < 255; i++) {
            var yPrev = y;
            var k = this._f(x0, y);
            if (k < xy) {
                var dy = ((xy - k) * BigInt(1e12)) / this._d(x0, y);
                y = y + dy;
            }
            else {
                var dy = ((k - xy) * BigInt(1e12)) / this._d(x0, y);
                y = y - dy;
            }
            if (y > yPrev) {
                if (y - yPrev <= 1n) {
                    return y;
                }
            }
            else {
                if (yPrev - y <= 1n) {
                    return y;
                }
            }
        }
        return y;
    };
    TridentStablePool.prototype._getOutputAmount = function (inputAmount, reserve0, reserve1) {
        var adjustedReserve0 = (reserve0 * BigInt(1e12)) / this.decimals0;
        var adjustedReserve1 = (reserve1 * BigInt(1e12)) / this.decimals1;
        var feeDeductedAmountIn = inputAmount.quotient - inputAmount.quotient * BigInt(this.fee);
        var xy = this._k(adjustedReserve0, adjustedReserve1);
        // Input is using token0
        if (inputAmount.currency.equals(this.token0)) {
            // uint256 x0 = adjustedReserve0 + ((feeDeductedAmountIn * 1e12) / decimals0);
            // uint256 y = _get_y(x0, xy, adjustedReserve1);
            // dy = adjustedReserve1 - y;
            // dy = (dy * decimals1) / 1e12;
            var x0 = adjustedReserve0 + (feeDeductedAmountIn * BigInt(1e12)) / this.decimals0;
            var y = this._get_y(x0, xy, adjustedReserve1);
            var dy = adjustedReserve1 - y;
            return (dy * this.decimals1) / BigInt(1e12);
        }
        else {
            // uint256 x0 = adjustedReserve1 + ((feeDeductedAmountIn * 1e12) / decimals1);
            // uint256 y = _get_y(x0, xy, adjustedReserve0);
            // dy = adjustedReserve0 - y;
            // dy = (dy * decimals0) / 1e12;
            var x0 = adjustedReserve1 + (feeDeductedAmountIn * BigInt(1e12)) / this.decimals1;
            var y = this._get_y(x0, xy, adjustedReserve0);
            var dy = adjustedReserve0 - y;
            return (dy * this.decimals0) / BigInt(1e12);
        }
    };
    TridentStablePool.prototype.getOutputAmount = function (inputShare, inputRebase
    // outputRebase: Rebase
    ) {
        (0, tiny_invariant_1.default)(this.involvesToken(inputShare.currency), 'TOKEN');
        if (this.reserve0.quotient === math_1.ZERO || this.reserve1.quotient === math_1.ZERO) {
            throw new base_sdk_1.InsufficientReservesError();
        }
        var inputAmount = inputShare.toAmount(inputRebase, false);
        var outputCurrency = inputAmount.currency.equals(this.token0) ? this.token1 : this.token0;
        var inputReserve = this.reserveOf(inputAmount.currency);
        var outputReserve = this.reserveOf(outputCurrency);
        // uint256 adjustedReserve0 = (_reserve0 * 1e12) / decimals0;
        // uint256 adjustedReserve1 = (_reserve1 * 1e12) / decimals1;
        // uint256 feeDeductedAmountIn = amountIn - (amountIn * swapFee) / MAX_FEE;
        // uint256 xy = _k(adjustedReserve0, adjustedReserve1);
        // if (token0In) {
        //     uint256 x0 = adjustedReserve0 + ((feeDeductedAmountIn * 1e12) / decimals0);
        //     uint256 y = _get_y(x0, xy, adjustedReserve1);
        //     dy = adjustedReserve1 - y;
        //     dy = (dy * decimals1) / 1e12;
        // } else {
        //     uint256 x0 = adjustedReserve1 + ((feeDeductedAmountIn * 1e12) / decimals1);
        //     uint256 y = _get_y(x0, xy, adjustedReserve0);
        //     dy = adjustedReserve0 - y;
        //     dy = (dy * decimals0) / 1e12;
        // }
        // const inputAmountWithFee = JSBI.multiply(inputAmount.quotient, JSBI.subtract(this.MAX_FEE, JSBI.BigInt(this.fee)))
        // const numerator = JSBI.multiply(inputAmountWithFee, outputReserve.quotient)
        // const denominator = JSBI.add(JSBI.multiply(inputReserve.quotient, this.MAX_FEE), inputAmountWithFee)
        // const outputAmount = Amount.fromRawAmount(
        //   inputAmount.currency.equals(this.token0) ? this.token1 : this.token0,
        //   JSBI.divide(numerator, denominator)
        // )
        // TODO: Incomplete...
        var outputAmount = currency_1.Amount.fromRawAmount(outputCurrency, this._getOutputAmount(inputAmount, inputReserve.quotient, outputReserve.quotient));
        if (outputAmount.quotient === math_1.ZERO) {
            throw new base_sdk_1.InsufficientInputAmountError();
        }
        return [
            outputAmount,
            new TridentStablePool(inputReserve.add(inputAmount), outputReserve.subtract(outputAmount), this.fee, this.total0, this.total1),
        ];
    };
    // public getInputAmount(outputAmount: Amount<Token>): [Amount<Token>, StablePool] {
    //   invariant(this.involvesToken(outputAmount.currency), 'TOKEN')
    //   if (
    //     JSBI.equal(this.reserve0.quotient, ZERO) ||
    //     JSBI.equal(this.reserve1.quotient, ZERO) ||
    //     JSBI.greaterThanOrEqual(outputAmount.quotient, this.reserveOf(outputAmount.currency).quotient)
    //   ) {
    //     throw new InsufficientReservesError()
    //   }
    //   const outputReserve = this.reserveOf(outputAmount.currency)
    //   const inputReserve = this.reserveOf(outputAmount.currency.equals(this.token0) ? this.token1 : this.token0)
    //   const numerator = JSBI.multiply(JSBI.multiply(inputReserve.quotient, outputAmount.quotient), this.MAX_FEE)
    //   const denominator = JSBI.multiply(
    //     JSBI.subtract(outputReserve.quotient, outputAmount.quotient),
    //     JSBI.subtract(this.MAX_FEE, JSBI.BigInt(this.fee))
    //   )
    //   const inputAmount = Amount.fromRawAmount(
    //     outputAmount.currency.equals(this.token0) ? this.token1 : this.token0,
    //     JSBI.add(JSBI.divide(numerator, denominator), ONE)
    //   )
    //   return [inputAmount, new StablePool(inputReserve.add(inputAmount), outputReserve.subtract(outputAmount), this.fee)]
    // }
    TridentStablePool.prototype.getNonOptimalMintFee = function (amount0, amount1, reserve0, reserve1) {
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
    //   function _k(uint256 x, uint256 y) internal pure returns (uint256) {
    //     uint256 _a = (x * y) / 1e12;
    //     uint256 _b = ((x * x) / 1e12 + (y * y) / 1e12);
    //     return ((_a * _b) / 1e12); // x3y+y3x >= k
    // }
    TridentStablePool.prototype._k = function (x, y) {
        var a = (x * y) / BigInt(1e12);
        var b = (x * x) / BigInt(1e12) + (y * y) / BigInt(1e12);
        return (a * b) / BigInt(1e12);
    };
    TridentStablePool.prototype.computeLiquidityFromAdjustedBalances = function (x, y) {
        return (0, math_1.sqrt)((0, math_1.sqrt)(this._k(x, y)));
    };
    TridentStablePool.prototype.computeLiquidity = function (reserve0, reserve1) {
        var adjustedReserve0 = (reserve0 * BigInt(1e12)) / this.decimals0;
        var adjustedReserve1 = (reserve1 * BigInt(1e12)) / this.decimals1;
        return this.computeLiquidityFromAdjustedBalances(adjustedReserve0, adjustedReserve1);
    };
    TridentStablePool.prototype.getMintFee = function (reserve0, reserve1, totalSupply) {
        if (this.kLast !== math_1.ZERO) {
            var computed = this.computeLiquidity(reserve0, reserve1);
            if (computed > this.kLast) {
                var liquidity = (totalSupply * (computed - this.kLast) * 5n) / computed / 10000n;
                if (liquidity !== math_1.ZERO) {
                    return liquidity;
                }
            }
        }
        return math_1.ZERO;
    };
    TridentStablePool.prototype.getLiquidityMinted = function (totalSupply, tokenAmountA, tokenAmountB) {
        (0, tiny_invariant_1.default)(totalSupply.currency.equals(this.liquidityToken), 'LIQUIDITY');
        var tokenAmounts = tokenAmountA.currency.sortsBefore(tokenAmountB.currency) // does safety checks
            ? [tokenAmountA, tokenAmountB]
            : [tokenAmountB, tokenAmountA];
        (0, tiny_invariant_1.default)(tokenAmounts[0].currency.equals(this.token0) && tokenAmounts[1].currency.equals(this.token1), 'TOKEN');
        var liquidity;
        // Expected balances after minting
        var balance0 = tokenAmounts[0].quotient + this.reserve0.quotient;
        var balance1 = tokenAmounts[1].quotient + this.reserve1.quotient;
        var computed = this.computeLiquidity(balance0, balance1);
        if (totalSupply.quotient === math_1.ZERO) {
            liquidity = computed - this.minLiquidity;
        }
        else {
            var _a = this.getNonOptimalMintFee(tokenAmounts[0].quotient, tokenAmounts[1].quotient, this.reserve0.quotient, this.reserve1.quotient), fee0 = _a[0], fee1 = _a[1];
            var reserve0 = this.reserve0.quotient + fee0;
            var reserve1 = this.reserve1.quotient + fee1;
            var k = this.computeLiquidity(reserve0, reserve1);
            var mintFee = this.getMintFee(reserve0, reserve1, totalSupply.quotient);
            liquidity = ((computed - k) * (totalSupply.quotient + mintFee)) / k;
        }
        if (liquidity <= math_1.ZERO) {
            throw new base_sdk_1.InsufficientInputAmountError();
        }
        return currency_1.Amount.fromRawAmount(this.liquidityToken, liquidity);
    };
    TridentStablePool.prototype.getLiquidityValue = function (token, totalSupply, liquidity) {
        (0, tiny_invariant_1.default)(this.involvesToken(token), 'TOKEN');
        (0, tiny_invariant_1.default)(totalSupply.currency.equals(this.liquidityToken), 'TOTAL_SUPPLY');
        (0, tiny_invariant_1.default)(liquidity.currency.equals(this.liquidityToken), 'LIQUIDITY');
        (0, tiny_invariant_1.default)(liquidity.quotient <= totalSupply.quotient, 'LIQUIDITY');
        return currency_1.Amount.fromRawAmount(token, (liquidity.quotient * this.reserveOf(token).quotient) / totalSupply.quotient);
    };
    // TODO: unsure if this should change... I guess not.
    TridentStablePool.prototype.getAmountOut = function (amountIn, reserveAmountIn, reserveAmountOut) {
        var amountInWithFee = amountIn * (this.MAX_FEE - BigInt(this.fee));
        return (amountInWithFee * reserveAmountOut) / (reserveAmountIn * this.MAX_FEE + amountInWithFee);
    };
    TridentStablePool.prototype.getLiquidityValueSingleToken = function (token, totalSupply, liquidity) {
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
    TridentStablePool.prototype.serialize = function () {
        return zod_1.tridentStablePoolSchema.parse({
            reserve0: this.tokenAmounts[0].serialize(),
            reserve1: this.tokenAmounts[1].serialize(),
            fee: this.fee,
            total0: {
                base: this.total0.base.toString(),
                elastic: this.total0.base.toString(),
            },
            total1: {
                base: this.total1.base.toString(),
                elastic: this.total1.base.toString(),
            },
        });
    };
    TridentStablePool.deserialize = function (pool) {
        var rebase0 = {
            base: BigInt(pool.total0.base),
            elastic: BigInt(pool.total0.elastic),
        };
        var rebase1 = {
            base: BigInt(pool.total1.base),
            elastic: BigInt(pool.total1.elastic),
        };
        return new TridentStablePool(currency_1.Amount.deserialize(pool.reserve0), currency_1.Amount.deserialize(pool.reserve1), pool.fee, rebase0, rebase1);
    };
    return TridentStablePool;
}());
exports.TridentStablePool = TridentStablePool;
//# sourceMappingURL=TridentStablePool.js.map