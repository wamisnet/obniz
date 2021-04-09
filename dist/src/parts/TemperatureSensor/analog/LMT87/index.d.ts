/**
 * @packageDocumentation
 * @module Parts.LMT87
 */
import ObnizPartsInterface, { ObnizPartsInfo } from '../../../../obniz/ObnizPartsInterface';
import AnalogTemperatureSensor, { AnalogTemperatureSensorOptions } from '../AnalogTemperatureSensor';
export interface LMT87Options extends AnalogTemperatureSensorOptions {
}
export default class LMT87 extends AnalogTemperatureSensor implements ObnizPartsInterface {
    static info(): ObnizPartsInfo;
    calc(voltage: any): number;
}