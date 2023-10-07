"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.computeInitCodeHash = void 0;
var abi_1 = require("@ethersproject/abi");
var solidity_1 = require("@ethersproject/solidity");
var computeInitCodeHash = function (_a) {
    var creationCode = _a.creationCode, deployData = _a.deployData, masterDeployerAddress = _a.masterDeployerAddress;
    return (0, solidity_1.keccak256)(['bytes'], [
        (0, solidity_1.pack)(['bytes', 'bytes'], [creationCode, abi_1.defaultAbiCoder.encode(['bytes', 'address'], [deployData, masterDeployerAddress])]),
    ]);
};
exports.computeInitCodeHash = computeInitCodeHash;
//# sourceMappingURL=computeInitCodeHash.js.map