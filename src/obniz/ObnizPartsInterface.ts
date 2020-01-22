import Obniz = require("./index");

export interface ObnizPartsInfo {
  name: string;
  datasheet?: any;
}

export default abstract class ObnizPartsInterface {
  public static info: (() => ObnizPartsInfo);

  public abstract keys: string[];
  public abstract requiredKeys: string[];
  public abstract ioKeys?: string[];

  public abstract wired(obniz: Obniz): void;
}
