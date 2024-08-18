export function createWebsocket(uri: string) {
    let ws: WebSocket;
    let retries: number;
    let interval: NodeJS.Timer | null;
    ws = new WebSocket(uri);
    ws.onclose = function (e) {
        console.log(
            "Socket is closed. Reconnect will be attempted in 1 second.",
            e.reason
        );
        interval = setInterval(function () {
            console.log("attempting reconnect");
            ws = new WebSocket(uri);
            retries++;
            if (retries < 10) return;
            if (!interval) return;
            clearInterval(interval as NodeJS.Timeout);
        }, 2000);
    };
    ws.onopen = () => {
        interval = null;
        if (!interval) return;
        clearInterval(interval);
    };
    return ws;
}
