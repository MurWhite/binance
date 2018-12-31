import WS from 'websocket';
import { wsApiMaker } from './util';
const WebSocketClient = WS.w3cwebsocket;

const wsList = {};

export const wsTypes = {
    TICKER_24HR: 'TICKER_24HR'
};

export const wsStatus = {
    CONNECTING: 'CONNECTING',
    CONNECTED: 'CONNECTED',
    CLOSING: 'CLOSING',
    CLOSED: 'CLOSED',
};

const wsPathes = {
    [wsTypes.TICKER_24HR]: '/stream?streams=!miniTicker@arr@1000ms'
}

export const getWebsocket = function (wsType) {
    let ws = wsList[wsType];
    if (!ws || !ws.websocket) {
        ws = {
            websocket: new WebSocketClient(`${wsApiMaker(wsPathes[wsType])}`),
            handleMsg: undefined,
            connection: undefined,
        };
        const websocket = ws.websocket;
        websocket.onopen = function(e) {
            console.log(`Ws connection [${wsPathes[wsTypes.TICKER_24HR]}] Connected`);
        }
        websocket.onmessage = function(e) {
            if (typeof e.data === 'string') {
                ws.handleMsg && ws.handleMsg(JSON.parse(e.data));
            } else {
                console.log('smth else', e);
            }
        }
        websocket.onerror = function() {
            console.log(`Ws connection [${wsPathes[wsTypes.TICKER_24HR]}] Error`);
        }
        websocket.onclose = function() {
            console.log(`Ws connection [${wsPathes[wsTypes.TICKER_24HR]}] Error`);
        }
        wsList[wsType] = ws;
    }
    return ws;
};