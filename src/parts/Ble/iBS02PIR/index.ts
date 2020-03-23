/**
 * @packageDocumentation
 * @module Parts.iBS02IR
 */

import Obniz from "../../../obniz";
import BleRemotePeripheral from "../../../obniz/libs/embeds/ble/bleRemotePeripheral";
import ObnizPartsInterface, { ObnizPartsInfo } from "../../../obniz/ObnizPartsInterface";

export interface IBS02PIROptions {}

export interface IBS02PIR_Data {
  event: number;
  battery: number;
  address: string;
}

export default class IBS02PIR implements ObnizPartsInterface {
  public static info(): ObnizPartsInfo {
    return {
      name: "iBS02PIR",
    };
  }

  public onNotification?: (data: IBS02PIR_Data) => void;
  public onChangeMoving?: (moved: boolean, address: string) => void;

  public keys: string[];
  public requiredKeys: string[];
  public obniz!: Obniz;
  public params: any;

  private oldMovingFlg: boolean;

  private deviceAdv: number[] = [
    0xff,
    0x0d, // Manufacturer vendor code
    0x00, // Manufacturer vendor code
    0x82, // Magic code
    0xbc, // Magic code
    -1, // Battery
    -1, // Battery
    -1, // Event
    -1, // reserved
    -1, // reserved
    -1, // reserved
    -1, // reserved
    -1, // user
    -1, // user
    -1, // type
    -1, // reserved
    -1, // reserved
    -1, // reserved
  ];
  private repeat_flg: boolean = false;

  private ble_setting = {
    duplicate: true,
  };

  constructor() {
    this.keys = [];
    this.requiredKeys = [];
    this.oldMovingFlg = false;
  }

  public wired(obniz: Obniz) {
    this.obniz = obniz;
  }

  public scan(address: string = "") {
    this.obniz.ble!.scan.onfind = (peripheral: BleRemotePeripheral) => {
      const advertise = peripheral.advertise_data_rows.filter((adv: number[]) => {
        let find = false;
        if (this.deviceAdv.length > adv.length) {
          return find;
        }
        for (let index = 0; index < this.deviceAdv.length; index++) {
          if (this.deviceAdv[index] === -1) {
            continue;
          }
          if (adv[index] === this.deviceAdv[index]) {
            find = true;
            continue;
          }
          find = false;
          break;
        }
        return find;
      });
      //    console.log(advertise);
      if (advertise.length === 0) {
        return;
      }

      if (advertise[0][14] !== 0x01) {
        // error iBS02IR
        return;
      }

      const data: IBS02PIR_Data = {
        battery: (advertise[0][5] + advertise[0][6] * 256) * 0.01,
        event: advertise[0][7],
        address: peripheral.address,
      };
      // console.log(`battery ${data.battery}V event ${data.event} address ${data.address});
      if (this.onNotification) {
        this.onNotification(data);
      }

      if (this.onChangeMoving) {
        const moved: boolean = Boolean((advertise[0][7] & 0b100) >> 2);
        if (moved !== this.oldMovingFlg) {
          this.onChangeMoving(moved, peripheral.address);
          this.oldMovingFlg = moved;
        }
      }
    };

    this.obniz.ble!.scan.onfinish = () => {
      if (this.repeat_flg) {
        this.obniz.ble!.scan.start(null, this.ble_setting);
      }
    };

    this.obniz.ble!.initWait();
    if (address && address.length >= 12) {
      this.obniz.ble!.scan.start({ deviceAddress: address }, this.ble_setting);
    } else {
      this.obniz.ble!.scan.start(null, this.ble_setting);
    }
    this.repeat_flg = true;
  }

  public end() {
    this.repeat_flg = false;
    this.obniz.ble!.scan.end();
  }
}
