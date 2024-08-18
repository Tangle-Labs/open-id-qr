import QrCodeStyling from "qr-code-styling";

class OpenIdQr extends HTMLElement {
    requestUri: string;
    eventStreamUri: string | null;
    size: number;
    qrTarget: HTMLElement;

    constructor() {
        super();
        this.requestUri = "";
        this.eventStreamUri = "";
        this.size = 300;

        const shadow = this.attachShadow({ mode: "open" });
        const canvasElement = document.createElement("div");
        canvasElement.id = "qr-canvas";
        shadow.appendChild(canvasElement);
        this.qrTarget = canvasElement;
    }

    connectedCallback() {
        const requestUri = this.getAttribute("requestUri");
        if (!requestUri) throw new Error("`requestUri` is required");

        const size = this.getAttribute("size");
        this.requestUri = requestUri;
        this.eventStreamUri = this.getAttribute("eventStreamURI");
        this.size = Number(size ?? this.size);

        const qr = new QrCodeStyling({
            type: "svg",
            width: this.size,
            height: this.size,
            data: this.requestUri,
            backgroundOptions: {
                color: "#ffffff",
            },
            dotsOptions: {
                color: "#1d1d1d",
            },
        });

        qr.append(this.qrTarget);
    }

    disconnectedCallback() {}
}

customElements.define("open-id-qr", OpenIdQr);
