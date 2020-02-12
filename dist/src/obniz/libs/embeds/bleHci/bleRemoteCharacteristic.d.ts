/**
 * @packageDocumentation
 * @module ObnizCore.Components.Ble.Hci
 */
import BleRemoteAttributeAbstract from "./bleRemoteAttributeAbstract";
/**
 * @category Use as Central
 */
export default class BleRemoteCharacteristic extends BleRemoteAttributeAbstract {
    properties: any;
    children: any;
    addChild: any;
    getChild: any;
    Obniz: any;
    service: any;
    uuid: any;
    emitter: any;
    discoverChildrenWait: any;
    constructor(params: any);
    get parentName(): string | null;
    get childrenClass(): any;
    get childrenName(): string | null;
    get descriptors(): any;
    addDescriptor(params: any): any;
    getDescriptor(uuid: any): any;
    registerNotify(callback: any): void;
    registerNotifyWait(callback: any): Promise<unknown>;
    unregisterNotify(): void;
    unregisterNotifyWait(): Promise<unknown>;
    read(): void;
    write(array: any, needResponse: any): void;
    discoverChildren(): void;
    discoverAllDescriptors(): void;
    discoverAllDescriptorsWait(): any;
    toJSON(): any;
    canBroadcast(): any;
    canNotify(): any;
    canRead(): any;
    canWrite(): any;
    canWriteWithoutResponse(): any;
    canIndicate(): any;
    ondiscover(descriptor: any): void;
    ondiscoverfinished(descriptors: any): void;
    ondiscoverdescriptor(descriptor: any): void;
    ondiscoverdescriptorfinished(descriptors: any): void;
    onregisternotify(): void;
    onunregisternotify(): void;
    onnotify(data: any): void;
    notifyFromServer(notifyName: any, params: any): void;
}
