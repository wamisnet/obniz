import BleLocalAttributeAbstract from "./bleLocalAttributeAbstract";
/**
 * @category Use as Peripheral
 */
export default class BleCharacteristic extends BleLocalAttributeAbstract {
    _maxValueSize: any;
    _updateValueCallback: any;
    addDescriptor: any;
    addChild: any;
    getDescriptor: any;
    getChild: any;
    properties: any;
    permissions: any;
    children: any;
    data: any;
    constructor(obj: any);
    get parentName(): string | null;
    get childrenClass(): any;
    get childrenName(): string | null;
    get descriptors(): any;
    toJSON(): any;
    toBufferObj(): any;
    addProperty(param: any): void;
    removeProperty(param: any): void;
    addPermission(param: any): void;
    removePermission(param: any): void;
    emit(name: any, ...params: any): any;
    _onSubscribe(maxValueSize: any, updateValueCallback?: any): void;
    _onUnsubscribe(): void;
    _onNotify(): void;
    _onIndicate(): void;
    notify(): void;
}
