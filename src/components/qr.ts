import QRCodeStyling, { Options } from "qr-code-styling";

export default class OpenIdQr {
  private _qrOptions: Options;
  private _onSuccess: () => void;
  private _onFailure: () => void;
  public qr: QRCodeStyling;
  constructor(
    qrOptions: Options,
    requestUri: string,
    onSuccess: () => void,
    onFailure: () => void
  ) {
    this._qrOptions = qrOptions;
    this._onSuccess = onSuccess;
    this._onFailure = onFailure;
    this.qr = new QRCodeStyling({ ...this._qrOptions, data: requestUri });
  }
}
