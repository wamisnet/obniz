/**
 * @packageDocumentation
 * @module Parts
 */
import Obniz from "../../../obniz";
import ObnizPartsInterface, { ObnizPartsInfo } from "../../../obniz/ObnizPartsInterface";
/**
 * @category Parts
 */
export interface WS2812Options {
    din: number;
    vcc?: number;
    gnd?: number;
}
/**
 * @category Parts
 */
export default class WS2812 implements ObnizPartsInterface {
    static info(): ObnizPartsInfo;
    private static _generateFromByte;
    private static _generateColor;
    private static _generateHsvColor;
    keys: string[];
    requiredKeys: string[];
    params: any;
    protected obniz: Obniz;
    private spi;
    constructor();
    wired(obniz: Obniz): void;
    rgb(red: number, green: number, blue: number): void;
    hsv(hue: number, saturation: number, value: number): void;
    rgbs(array: Array<[number, number, number]>): void;
    hsvs(array: Array<[number, number, number]>): void;
}
