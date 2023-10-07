"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.computeInitCodeHash = void 0;
const abi_1 = require("@ethersproject/abi");
const solidity_1 = require("@ethersproject/solidity");
const computeInitCodeHash = ({ creationCode, deployData, masterDeployerAddress, }) => {
    return (0, solidity_1.keccak256)(['bytes'], [
        (0, solidity_1.pack)(['bytes', 'bytes'], [creationCode, abi_1.defaultAbiCoder.encode(['bytes', 'address'], [deployData, masterDeployerAddress])]),
    ]);
};
exports.computeInitCodeHash = computeInitCodeHash;
//# sourceMappingURL=computeInitCodeHash.js.map