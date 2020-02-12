"use strict";
/**
 * @packageDocumentation
 * @module Parts
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @category Parts
 */
class Grove_3AxisAccelerometer {
    constructor() {
        this.displayName = "3axis";
        this.displayIoNames = { sda: "sda", scl: "scl" };
        this.address = 0x53;
        this.keys = ["gnd", "vcc", "sda", "scl"];
        this.requiredKeys = ["sda", "scl"];
        this.ioKeys = this.keys;
        this.regAdrs = {};
        this.regAdrs.POWER_CTL = 0x2d;
        this.regAdrs.THRESH_ACT = 0x24;
        this.regAdrs.THRESH_INACT = 0x25;
        this.regAdrs.TIME_INACT = 0x26;
        this.regAdrs.ACT_INACT_CTL = 0x27;
        this.regAdrs.TAP_AXES = 0x2a;
        this.regAdrs.THRESH_TAP = 0x1d;
        this.regAdrs.DUR = 0x21;
        this.regAdrs.LATENT = 0x22;
        this.regAdrs.WINDOW = 0x23;
        this.regAdrs.THRESH_FF = 0x28;
        this.regAdrs.TIME_FF = 0x29;
        this.regAdrs.INT_MAP = 0x2f;
        this.regAdrs.INT_ENABLE = 0x2e;
        this.regAdrs.DATAX0 = 0x32;
        this.regAdrs.INT_DATA_READY_BIT = 0x07;
        this.regAdrs.INT_SINGLE_TAP_BIT = 0x06;
        this.regAdrs.INT_DOUBLE_TAP_BIT = 0x05;
        this.regAdrs.INT_ACTIVITY_BIT = 0x04;
        this.regAdrs.INT_INACTIVITY_BIT = 0x03;
        this.regAdrs.INT_FREE_FALL_BIT = 0x02;
        this.regAdrs.INT_WATERMARK_BIT = 0x01;
        this.regAdrs.INT_OVERRUNY_BIT = 0x00;
        this.constVal = {};
        this.constVal.gainX = 0.0037639;
        this.constVal.gainY = 0.00376009;
        this.constVal.gainZ = 0.00349265;
        this.constVal.INT1_PIN = 0x00;
        this.constVal.INT2_PIN = 0x01;
    }
    static info() {
        return {
            name: "Grove_3AxisAccelerometer",
        };
    }
    wired(obniz) {
        return __awaiter(this, void 0, void 0, function* () {
            this.obniz = obniz;
            this.vcc = this.params.vcc;
            this.gnd = this.params.gnd;
            this.obniz.setVccGnd(this.params.vcc, this.params.gnd, "5v");
            this.params.clock = 400000;
            this.params.mode = "master";
            this.i2c = obniz.getI2CWithConfig(this.params);
            this.obniz.wait(100);
            // power on
            this.i2c.write(this.address, [this.regAdrs.POWER_CTL, 0]);
            this.i2c.write(this.address, [this.regAdrs.POWER_CTL, 16]);
            this.i2c.write(this.address, [this.regAdrs.POWER_CTL, 8]);
            this.i2c.write(this.address, [this.regAdrs.THRESH_ACT, 75]); // set activity threshold 0~255
            this.i2c.write(this.address, [this.regAdrs.THRESH_INACT, 75]); // set inactivity threshold 0~255
            this.i2c.write(this.address, [this.regAdrs.THRESH_INACT, 10]); // set time inactivity 0~255
            yield this.setRegisterBit(this.regAdrs.ACT_INACT_CTL, 6, 1); // setActivityX
            yield this.setRegisterBit(this.regAdrs.ACT_INACT_CTL, 5, 1); // setActivityY
            yield this.setRegisterBit(this.regAdrs.ACT_INACT_CTL, 4, 1); // setActivityZ
            yield this.setRegisterBit(this.regAdrs.ACT_INACT_CTL, 2, 1); // setInactivityX
            yield this.setRegisterBit(this.regAdrs.ACT_INACT_CTL, 1, 1); // setInactivityY
            yield this.setRegisterBit(this.regAdrs.ACT_INACT_CTL, 0, 1); // setInactivityZ
            yield this.setRegisterBit(this.regAdrs.TAP_AXES, 2, 0); // setTapDetectionOnX
            yield this.setRegisterBit(this.regAdrs.TAP_AXES, 1, 0); // setTapDetectionOnY
            yield this.etRegisterBit(this.regAdrs.TAP_AXES, 0, 1); // setTapDetectionOnZ
            this.i2c.write(this.address, [this.regAdrs.THRESH_TAP, 50]); // setTapThreshold
            this.i2c.write(this.address, [this.regAdrs.DUR, 15]); // setTapDuration
            this.i2c.write(this.address, [this.regAdrs.LATENT, 80]); // setDoubleTapLatency
            this.i2c.write(this.address, [this.regAdrs.WINDOW, 200]); // setDoubleTapWindow
            this.i2c.write(this.address, [this.regAdrs.THRESH_FF, 7]); // setFreeFallThreshold
            this.i2c.write(this.address, [this.regAdrs.TIME_FF, 45]); // setFreeFallDuration
            // setInterruptMapping
            yield this.setInterruptMapping(this.regAdrs.INT_SINGLE_TAP_BIT, this.constVal.INT1_PIN);
            yield this.setInterruptMapping(this.regAdrs.INT_DOUBLE_TAP_BIT, this.constVal.INT1_PIN);
            yield this.setInterruptMapping(this.regAdrs.INT_FREE_FALL_BIT, this.constVal.INT1_PIN);
            yield this.setInterruptMapping(this.regAdrs.INT_ACTIVITY_BIT, this.constVal.INT1_PIN);
            yield this.setInterruptMapping(this.regAdrs.INT_INACTIVITY_BIT, this.constVal.INT1_PIN);
            // setInterrupt
            yield this.setInterrupt(this.regAdrs.INT_SINGLE_TAP_BIT, 1);
            yield this.setInterrupt(this.regAdrs.INT_DOUBLE_TAP_BIT, 1);
            yield this.setInterrupt(this.regAdrs.INT_FREE_FALL_BIT, 1);
            yield this.setInterrupt(this.regAdrs.INT_ACTIVITY_BIT, 1);
            yield this.setInterrupt(this.regAdrs.INT_INACTIVITY_BIT, 1);
        });
    }
    setRegisterBit(regAddr, bitPos, state) {
        return __awaiter(this, void 0, void 0, function* () {
            this.i2c.write(this.address, [regAddr]);
            let b = yield this.i2c.readWait(this.address, 1);
            if (state) {
                b = b | (1 << bitPos); // forces nth bit of b to be 1.  all other bits left alone.
            }
            else {
                b = b & ~(1 << bitPos); // forces nth bit of b to be 0.  all other bits left alone.
            }
            this.i2c.write(this.address, [b]);
        });
    }
    setInterruptMapping(interruptBit, interruptPin) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.setRegisterBit(this.regAdrs.INT_MAP, interruptBit, interruptPin);
        });
    }
    setInterrupt(interruptBit, state) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.setRegisterBit(this.regAdrs.INT_ENABLE, interruptBit, state);
        });
    }
    signHandling(val) {
        const sign = val >> 15;
        if (sign) {
            val = -(0xffff - val);
        }
        return val;
    }
    getRawVal() {
        return __awaiter(this, void 0, void 0, function* () {
            this.i2c.write(this.address, [this.regAdrs.DATAX0]);
            const buff = yield this.i2c.readWait(this.address, 6);
            const rawVal = [0, 0, 0];
            rawVal[0] = this.signHandling((buff[1] << 8) | buff[0]);
            rawVal[1] = this.signHandling((buff[3] << 8) | buff[2]);
            rawVal[2] = this.signHandling((buff[5] << 8) | buff[4]);
            return rawVal;
        });
    }
    getWait() {
        return __awaiter(this, void 0, void 0, function* () {
            const accelVal = [0, 0, 0];
            const raw = yield this.getRawVal();
            accelVal[0] = raw[0] * this.constVal.gainX;
            accelVal[1] = raw[1] * this.constVal.gainY;
            accelVal[2] = raw[2] * this.constVal.gainZ;
            return accelVal;
        });
    }
}
exports.default = Grove_3AxisAccelerometer;

//# sourceMappingURL=index.js.map
