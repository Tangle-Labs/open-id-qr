import QRCodeStyling, { Options } from "qr-code-styling";

export default class OpenIdQr {
  private _qrOptions: Options;
  public qr: QRCodeStyling;
  constructor(qrOptions: Options, requestUri: string) {
    this._qrOptions = qrOptions;
    this.qr = new QRCodeStyling({ ...this._qrOptions, data: requestUri });
  }
}
