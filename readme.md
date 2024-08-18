# TangleLabs OpenID QR Component

## Introduction

OpenID QR is an easy to integrate frontend component to consume any OpenID4VC compliant request URI and render a QR for it, it contains an easy way for you to also manage state and watch for events.

## Installation

To install OpenID Qr install the QR using

```sh
$ npm install --save @tanglelabs/open-id-qr
```

## Usage

OpenID QR is a web component so it's framework agnostic and can work anywhere on the web, so all you need to do is to import the component at the top of your file

```ts
import "@tanglelabs/open-id-qr";
```

and then consume it as follows

```jsx
<open-id-qr
    requestUri="openid-credential-offer://..." // request URI
    eventStreamUri="wss://" // URI to watch for events
    size="200" // height/width in pixels
></open-id-qr>
```

## Sending Events from your Backend

The event stream can either be a websocket endpoint or SSE stream.

The event stream needs to send data complying to the following format

```ts
{
    /**
     * Status  of the request
     * can be `success` or `failure`
     */
    "status": "success" | "failure",

    /**
     * Type of request
     *
     * id = siopv2 request
     * vc = OpenID4VCI request
     * vp = OpenID4VP request
     */
    "type": "vp" | "id" | "vc",

    /**
     * Consumer defined state to help identify the user
     */
    "state": "43202-43435-2323"
}
```

## Monitoring Events

OpenID QR sends 2 events, one for success and another for failure, you can use these events to update frontend state in cross device flows to check for status of the request and propogate your frontend state.

### On success

you can consume the success event by using an event listener for `open-id-qr-success` event

```ts
document.addEventListener("open-id-qr-success", (event) => {
    // ... your logic here
});
```

### On Failure

you can consume the failure event by using an event listener for `open-id-qr-failure` event

```ts
document.addEventListener("open-id-qr-failure", (event) => {
    // ... your logic here
});
```
