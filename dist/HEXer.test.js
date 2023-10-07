"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HEXer_1 = require("./HEXer");
var HEXER = new HEXer_1.HEXer();
afterEach(function () {
    HEXER = new HEXer_1.HEXer();
});
describe('HEXer', function () {
    describe('constructor', function () {
        it('instanciates', function () {
            expect(HEXER).toBeInstanceOf(HEXer_1.HEXer);
            expect(HEXER.toString()).toEqual('');
        });
    });
    describe('#toString', function () {
        var address = '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48';
        it('should return the address without a 0x prefix', function () {
            expect(HEXER.address(address).toString()).toEqual(address.slice(2));
        });
        it('should return hexed amount with padding', function () {
            expect(HEXER.uint(1000).toString()).toEqual('00000000000000000000000000000000000000000000000000000000000003e8');
        });
        it('should return hexed value 0 + padding', function () {
            expect(HEXER.bool(false).toString()).toEqual('00');
        });
        it('should return hexed value 1 + padding', function () {
            expect(HEXER.bool(true).toString()).toEqual('01');
        });
        it('should return the address without 0x prefix', function () {
            expect(HEXER.hexData(address).toString()).toEqual(address.slice(2));
        });
    });
    describe('#toHexString', function () {
        it('should return a string with 0x prefix', function () {
            var address = '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48';
            expect(HEXER.address(address).toHexString()).toEqual(address);
        });
    });
    describe('#uint8', function () {
        it('throws when input is greater than 255', function () {
            var amount = 256;
            expect(function () { return HEXER.uint8(amount); }).toThrow('Wrong uint8: ' + amount);
        });
        it('throws when input is less than 0', function () {
            var amount = -1;
            expect(function () { return HEXER.uint8(amount); }).toThrow('Wrong uint8: ' + amount);
        });
        it('throws when number is decimal', function () {
            var amount = 1.337;
            expect(function () { return HEXER.uint8(amount); }).toThrow('Wrong uint8: ' + amount);
        });
        it.each([1, 255])('should not throw with a valid value: %i', function (n) {
            expect(function () { return HEXER.uint8(n); }).not.toThrowError();
        });
    });
    describe('#uint16', function () {
        var maxValue = 256 * 256 - 1;
        it("throws when input is greater than ".concat(maxValue), function () {
            var amount = maxValue + 1;
            expect(function () { return HEXER.uint16(amount); }).toThrow('Wrong uint16: ' + amount);
        });
        it('throws when input is less than 0', function () {
            var amount = -1;
            expect(function () { return HEXER.uint16(amount); }).toThrow('Wrong uint16: ' + amount);
        });
        it('throws when number is decimal', function () {
            var amount = 1.337;
            expect(function () { return HEXER.uint16(amount); }).toThrow('Wrong uint16: ' + amount);
        });
        it.each([1, maxValue])('should not throw with a valid value: %i', function (n) {
            expect(function () { return HEXER.uint16(n); }).not.toThrowError();
        });
    });
    describe('#uint32', function () {
        var maxValue = 256 * 256 * 256 * 256 - 1;
        it("throws when input is greater than ".concat(maxValue), function () {
            var amount = maxValue + 1;
            expect(function () { return HEXER.uint32(amount); }).toThrow('Wrong uint32: ' + amount);
        });
        it('throws when input is less than 0', function () {
            var amount = -1;
            expect(function () { return HEXER.uint32(amount); }).toThrow('Wrong uint32: ' + amount);
        });
        it('throws when number is decimal', function () {
            var amount = 1.337;
            expect(function () { return HEXER.uint32(amount); }).toThrow('Wrong uint32: ' + amount);
        });
        it.each([1, maxValue])('should not throw with a valid value: %i', function (n) {
            expect(function () { return HEXER.uint32(n); }).not.toThrowError();
        });
    });
    describe('#uint256 and #uint', function () {
        it("throws when input is greater than ".concat(Number.MAX_SAFE_INTEGER), function () {
            var amount = Number.MAX_SAFE_INTEGER + 1;
            expect(function () { return HEXER.uint256(amount); }).toThrow('Wrong uint256: ' + amount);
            expect(function () { return HEXER.uint(amount); }).toThrow('Wrong uint256: ' + amount);
        });
        it('throws when input is less than 0', function () {
            var amount = -1;
            expect(function () { return HEXER.uint256(amount); }).toThrow('Wrong uint256: ' + amount);
            expect(function () { return HEXER.uint(amount); }).toThrow('Wrong uint256: ' + amount);
        });
        it('throws when number is decimal', function () {
            var amount = 1.337;
            expect(function () { return HEXER.uint256(amount); }).toThrow('Wrong uint256: ' + amount);
            expect(function () { return HEXER.uint(amount); }).toThrow('Wrong uint256: ' + amount);
        });
        it.each([1, Number.MAX_SAFE_INTEGER])('should not throw with a valid value: %i', function (n) {
            expect(function () { return HEXER.uint256(n); }).not.toThrowError();
            expect(function () { return HEXER.uint(n); }).not.toThrowError();
        });
    });
    describe('#share16', function () {
        var limit = 65535;
        var maxValue = (256 * 256) / limit - 1;
        it("throws when input is greater than ".concat(maxValue), function () {
            var amount = maxValue + 1;
            expect(function () { return HEXER.share16(amount); }).toThrow('Wrong uint16: ' + amount * limit);
        });
        it('throws when input is less than 0', function () {
            var amount = -1;
            expect(function () { return HEXER.share16(amount); }).toThrow('Wrong uint16: ' + amount * limit);
        });
        it.each([1, maxValue])('should not throw with a valid value: %i', function (n) {
            expect(function () { return HEXER.share16(n); }).not.toThrowError();
        });
    });
    describe('#address', function () {
        it('throws when address is RouteProcessor', function () {
            var address = 'RouteProcessor';
            expect(function () { return HEXER.address(address); }).toThrow('Wrong address: ' + address);
        });
        it('throws when address has a length more than 42', function () {
            var address = '0x00000000000000000000000000000000000000000';
            expect(function () { return HEXER.address(address); }).toThrow('Wrong address: ' + address);
        });
        // TODO: This should probably throw?
        it.skip('throws when address has a length less than 42', function () {
            var address = '0x000000000000000000000000000000000000000';
            expect(function () { return HEXER.address(address); }).toThrow('Wrong address: ' + address);
        });
    });
    describe('#hexData', function () {
        var address = '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48';
        it('throws when input length is odd', function () {
            var input = '123';
            expect(function () { return HEXER.hexData(input); }).toThrow('Wrong hex data length: ' + input.length);
        });
        it('slices the 0x prefix', function () {
            expect(HEXER.hexData(address).toString()).toEqual(address.slice(2));
        });
    });
    describe('#bytes', function () {
        var address = '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48';
        it('throws when input length is odd', function () {
            var input = '123';
            expect(function () { return HEXER.bytes(input); }).toThrow('Wrong bytes length: ' + input.length);
        });
        it('adds padding and slices the 0x prefix', function () {
            var len = '14'; // address length after slicing prefix is 20, 20 in decimal is 14 in hex
            var expected = '00000000000000000000000000000000000000000000000000000000000000' + len + address.slice(2);
            expect(HEXER.bytes(address).toString()).toEqual(expected);
        });
        it.each(['10', '1010', '101010'])('adds 0 padding and length info of the bytecode', function (n) {
            var actual = HEXER.bytes(n).toString();
            var expected = '000000000000000000000000000000000000000000000000000000000000000' + n.length / 2 + n;
            expect(actual).toEqual(expected);
        });
    });
    describe('#bool', function () {
        it('should return hexed value 0 + padding', function () {
            expect(HEXER.bool(false).toString()).toEqual('00');
        });
        it('should return hexed value 1 + padding', function () {
            expect(HEXER.bool(true).toString()).toEqual('01');
        });
    });
});
//# sourceMappingURL=HEXer.test.js.map