import type { BigNumber } from 'ethers';
export declare class HEXer {
    private hex;
    constructor();
    toString(): string;
    toHexString(): `0x${string}`;
    toString0x(): `0x${string}`;
    uint8(data: number): HEXer;
    bool(data: boolean): HEXer;
    uint16(data: number): HEXer;
    uint24(data: number): HEXer;
    share16(share: number): HEXer;
    uint32(data: number): HEXer;
    uint256(data: BigNumber | number): HEXer;
    uint(data: BigNumber | number): HEXer;
    address(addr: string): HEXer;
    hexData(data: string): HEXer;
    bytes(data: string): HEXer;
    bytes32(data: string): HEXer;
}
