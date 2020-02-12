/**
 * @packageDocumentation
 * @ignore
 */
/// <reference types="node" />
import events = require("events");
/**
 * @ignore
 */
declare class Hci extends events.EventEmitter {
    static STATUS_MAPPER: any;
    _obnizHci: any;
    _state: any;
    _handleBuffers: any;
    on: any;
    _socket: any;
    once: any;
    _handleAclsInProgress: any;
    _aclOutQueue: any;
    _aclMtu: any;
    _aclMaxInProgress: any;
    addressType: any;
    address: any;
    constructor(obnizHci: any);
    initWait(): Promise<unknown>;
    setEventMask(): void;
    reset(): void;
    resetBuffers(): void;
    readLocalVersion(): void;
    readBdAddr(): void;
    setLeEventMask(): void;
    readLeHostSupported(): void;
    writeLeHostSupported(): void;
    setScanParameters(): void;
    setScanEnabled(enabled: boolean, filterDuplicates: boolean): void;
    createLeConn(address: any, addressType: any): void;
    connUpdateLe(handle: any, minInterval: any, maxInterval: any, latency: any, supervisionTimeout: any): void;
    startLeEncryption(handle: any, random: any, diversifier: any, key: any): void;
    disconnect(handle: any, reason: any): void;
    readRssi(handle: any): void;
    writeAclDataPkt(handle: any, cid: any, data: any): void;
    setAdvertisingParameters(): void;
    setAdvertisingData(data: any): void;
    setScanResponseData(data: any): void;
    setAdvertiseEnable(enabled: any): void;
    leReadBufferSize(): void;
    readBufferSize(): void;
    queueAclDataPkt(handle: any, cid: any, data: any): void;
    pushAclOutQueue(): void;
    writeOneAclDataPkt(): void;
    onSocketData(array: any): void;
    onSocketError(error: any): void;
    processCmdCompleteEvent(cmd: any, status: any, result: any): void;
    processLeMetaEvent(eventType: any, status: any, data: any): void;
    processLeConnComplete(status: any, data: any): void;
    processLeAdvertisingReport(count: any, data: any): void;
    processLeConnUpdateComplete(status: any, data: any): void;
    processCmdStatusEvent(cmd: any, status: any): void;
    processLeReadBufferSize(result: any): void;
    onStateChange(state: any): void;
}
export default Hci;
