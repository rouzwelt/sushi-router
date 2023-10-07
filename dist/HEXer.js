"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HEXer = void 0;
var HEXer = /** @class */ (function () {
    function HEXer() {
        this.hex = '';
    }
    HEXer.prototype.toString = function () {
        return this.hex;
    };
    HEXer.prototype.toHexString = function () {
        return "0x".concat(this.hex);
    };
    HEXer.prototype.toString0x = function () {
        // for backwards compatibility for now
        return this.toHexString();
    };
    HEXer.prototype.uint8 = function (data) {
        if (data > 255 || data < 0 || data !== Math.round(data)) {
            throw new Error("Wrong uint8: ".concat(data));
        }
        this.hex += data.toString(16).padStart(2, '0');
        return this;
    };
    HEXer.prototype.bool = function (data) {
        return this.uint8(data ? 1 : 0);
    };
    HEXer.prototype.uint16 = function (data) {
        if (data >= 256 * 256 || data < 0 || data !== Math.round(data)) {
            throw new Error("Wrong uint16: ".concat(data));
        }
        this.hex += data.toString(16).padStart(4, '0');
        return this;
    };
    HEXer.prototype.uint24 = function (data) {
        if (data >= 256 * 256 * 256 || data < 0 || data !== Math.round(data)) {
            throw new Error("Wrong uint24: ".concat(data));
        }
        this.hex += data.toString(16).padStart(6, '0');
        return this;
    };
    HEXer.prototype.share16 = function (share) {
        return this.uint16(Math.round(share * 65535));
    };
    HEXer.prototype.uint32 = function (data) {
        if (data >= 256 * 256 * 256 * 256 || data < 0 || data !== Math.round(data)) {
            throw new Error("Wrong uint32: ".concat(data));
        }
        this.hex += data.toString(16).padStart(8, '0');
        return this;
    };
    HEXer.prototype.uint256 = function (data) {
        if (typeof data === 'number') {
            if (data > Number.MAX_SAFE_INTEGER || data < 0 || data !== Math.round(data)) {
                throw new Error("Wrong uint256: ".concat(data));
            }
            this.hex += data.toString(16).padStart(64, '0');
            return this;
        }
        else {
            var hex = data.toString(16).padStart(64, '0');
            if (data < 0n || hex.length > 64) {
                throw new Error("Wrong uin256: ".concat(data.toString()));
            }
            this.hex += hex;
            return this;
        }
    };
    HEXer.prototype.uint = function (data) {
        return this.uint256(data);
    };
    HEXer.prototype.address = function (addr) {
        if (addr.length > 42 || addr === 'RouteProcessor') {
            throw new Error("Wrong address: ".concat(addr));
        }
        // 0xabcd => 0000abcd
        this.hex += addr.slice(2).padStart(40, '0');
        return this;
    };
    HEXer.prototype.hexData = function (data) {
        if (data.length % 2 !== 0) {
            throw new Error("Wrong hex data length: ".concat(data.length));
        }
        if (data.startsWith('0x'))
            data = data.slice(2);
        this.hex += data;
        return this;
    };
    HEXer.prototype.bytes = function (data) {
        if (data.length % 2 !== 0) {
            throw new Error("Wrong bytes length: ".concat(data.length));
        }
        if (data.startsWith('0x'))
            data = data.slice(2);
        this.uint(data.length / 2);
        this.hex += data;
        return this;
    };
    HEXer.prototype.bytes32 = function (data) {
        if (data.startsWith('0x'))
            data = data.slice(2);
        if (data.length > 64) {
            throw new Error("Wrong bytes32 length: ".concat(data.length));
        }
        this.hex += data.padEnd(64, '0');
        return this;
    };
    return HEXer;
}());
exports.HEXer = HEXer;
//# sourceMappingURL=HEXer.js.map