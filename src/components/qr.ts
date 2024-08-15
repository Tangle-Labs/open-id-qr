import QRCodeStyling, { Options } from "qr-code-styling";

export default class Qr {
  private _qrOptions: Options;
  public qr: QRCodeStyling;
  constructor(qrOptions: Options, data: string) {
    this._qrOptions = qrOptions;
    this.qr = new QRCodeStyling({ ...this._qrOptions, data });
  }
}
