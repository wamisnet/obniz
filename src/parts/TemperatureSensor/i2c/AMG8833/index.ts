/**
 * @packageDocumentation
 * @module Parts
 */

import Obniz from "../../../../obniz";
import PeripheralI2C from "../../../../obniz/libs/io_peripherals/i2c";

import ObnizPartsInterface, {ObnizPartsInfo} from "../../../../obniz/ObnizPartsInterface";
import {I2cPartsAbstructOptions} from "../../../i2cParts";

/**
 * @category Parts
 */
export interface  AMG8833Options extends I2cPartsAbstructOptions {
  address?: number;
 }

/**
 * @category Parts
 */
export default class AMG8833 implements ObnizPartsInterface {

  public static info(): ObnizPartsInfo {
    return {
      name: "AMG8833",
    };
  }

  public requiredKeys: string[];
  public keys: string[];
  public ioKeys: string[];
  public commands: any;
  public params: any;
  public address: any;

  protected obniz!: Obniz;
  protected i2c!: PeripheralI2C;

  constructor() {
    this.requiredKeys = [];
    this.keys = ["vcc", "gnd", "sda", "scl", "address"];

    this.ioKeys = ["vcc", "gnd", "sda", "scl"];
    this.commands = {};
    this.commands.mode_normal = [0x00, 0x00];
    this.commands.reset_flag = [0x01, 0x30];
    this.commands.reset_initial = [0x01, 0x3f];
    this.commands.frameRate_10fps = [0x02, 0x00];
    this.commands.frameRate_1fps = [0x02, 0x01];
    this.commands.int_disable = [0x03, 0x00];
    this.commands.int_absVal = [0x03, 0x03];
    this.commands.int_diff = [0x03, 0x01];
    this.commands.stat = [0x04];
    this.commands.statClr_ovs = [0x05, 0x04];
    this.commands.statClr_int = [0x05, 0x02];
    this.commands.average_disable = [0x07, 0x00];
    this.commands.average_enable = [0x07, 0x10];
  }

  public wired(obniz: Obniz) {
    this.obniz = obniz;
    this.obniz.setVccGnd(this.params.vcc, this.params.gnd, "5v");

    this.address = 0x69;
    if (this.params.address === 0x69) {
      this.address = 0x69;
    } else if (this.params.addressmode === 0x68) {
      this.address = 0x68;
    } else if (this.params.address !== undefined) {
      throw new Error("address must be 0x68 or 0x69");
    }

    this.params.clock = this.params.clock || 400 * 1000; // for i2c
    this.params.mode = this.params.mode || "master"; // for i2c
    this.params.pull = this.params.pull || null; // for i2c
    this.i2c = obniz.getI2CWithConfig(this.params);
    this.obniz.wait(50);

    this.i2c.write(this.address, this.commands.mode_normal);
    this.i2c.write(this.address, this.commands.reset_flag);
    this.i2c.write(this.address, this.commands.frameRate_10fps);
    this.i2c.write(this.address, this.commands.int_disable);
  }

  public async getOnePixWait(pixel: number): Promise<number> {
    let pixelAddrL: any = 0x80;
    let pixelAddrH: any = 0x81;
    if (pixel >= 0 && pixel <= 63) {
      pixelAddrL = 0x80 + pixel * 2;
      pixelAddrH = 0x81 + pixel * 2;
    } else {
      throw new Error("pixel number must be range of 0 to 63");
    }
    this.i2c.write(this.address, [pixelAddrL]);
    const dataL: any = await this.i2c.readWait(this.address, 1);
    this.i2c.write(this.address, [pixelAddrH]);
    const dataH: any = await this.i2c.readWait(this.address, 1);
    let temp12bit: any = (dataH << 8) | dataL;
    if (dataH & 0x08) {
      // negative temperature
      temp12bit = temp12bit - 1;
      temp12bit = 0xfff - temp12bit; // bit inverting
      return temp12bit * -0.25;
    } else {
      // positive temperature
      return temp12bit * 0.25;
    }
  }

  public async getAllPixWait(): Promise<number[]> {
    const tempArray = new Array(64);
    this.i2c.write(this.address, [0x80]);
    const datas = await this.i2c.readWait(this.address, 64 * 2);

    for (let i = 0; i < 64; i++) {
      let temp12bit: any = (datas[i * 2 + 1] << 8) | datas[i * 2];
      let temp: any = 0;
      if (datas[i * 2 + 1] & 0x08) {
        // negative temperature
        temp12bit = temp12bit - 1;
        temp12bit = 0xfff - temp12bit; // bit inverting
        temp = temp12bit * -0.25;
      } else {
        // positive temperature
        temp = temp12bit * 0.25;
      }
      tempArray[i] = temp;
    }

    return tempArray;
  }
}
