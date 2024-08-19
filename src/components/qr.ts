import QrCodeStyling from "qr-code-styling";
import { createWebsocket } from "../utils/ws";

interface IMessage {
    status: "success" | "failure";
    type: "vp" | "id" | "vc";
    state: string;
}

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
        const requestUri = this.getAttribute("request-uri");
        if (!requestUri) throw new Error("`requestUri` is required");

        const size = this.getAttribute("size");
        this.requestUri = requestUri;
        this.eventStreamUri = this.getAttribute("event-stream-uri");
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

        if (this.eventStreamUri) this.watchEventStream(this.eventStreamUri);
    }

    private dispatchOpenIdEvent(message: IMessage) {
        const event = new CustomEvent(`open-id-qr-${message.status}`, {
            bubbles: true,
            cancelable: true,
            detail: message,
        });
        this.dispatchEvent(event);
    }

    private watchSSEStream(uri: string) {
        const eventSource = new EventSource(uri);
        eventSource.onmessage = (event) => {
            const data = JSON.parse(event.data);
            this.dispatchOpenIdEvent(data);
        };
    }

    private watchWebSocketStream(uri: string) {
        const ws = createWebsocket(uri);
        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            this.dispatchOpenIdEvent(data);
        };
    }

    private watchEventStream(uri: string) {
        if (uri.startsWith("wss://") || uri.startsWith("ws://")) {
            this.watchWebSocketStream(uri);
        } else if (uri.startsWith("http://") || uri.startsWith("https://")) {
            this.watchSSEStream(uri);
        } else {
            const protocol = uri.split("://")[0];
            throw new Error(`protocol \`${protocol}\` is not supported`);
        }
    }

    disconnectedCallback() {}
}

customElements.define("open-id-qr", OpenIdQr);
