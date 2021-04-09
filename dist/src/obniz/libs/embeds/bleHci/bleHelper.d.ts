/// <reference types="node" />
/**
 * @packageDocumentation
 * @ignore
 */
import { UUID } from './bleTypes';
declare class BleHelper {
    uuidFilter(uuid: string | UUID): UUID;
    toCamelCase(str: string): string;
    toSnakeCase(str: string): string;
    buffer2reversedHex(buf: Buffer, sepalator?: string): string;
    hex2reversedBuffer(address: string, sepalator?: string): Buffer;
    reverseHexString(str: string, separator?: string): string;
}
declare const _default: BleHelper;
export default _default;