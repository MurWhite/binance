import API from '../network/index';
import { getWebsocket, wsTypes, wsStatus } from '../network/ws';

export const actionTypes = {
    UPDATE_LIST: 'UPDATE_LIST',
    UPDATE_SYMBOL: 'UPDATE_SYMBOL',
    UPDATE_WS: 'UPDATE_WS',
    SORT_LIST: 'SORT_LIST',
}

export const serverFetchList = async isServer => {
    const list = await API.fetchRecentTickerList();
    return dispatch => {
        return dispatch({ type: actionTypes.UPDATE_LIST, list})
    }
}

export const updateList =  (dispatch, data) =>{
    API.fetchRecentTickerList().then(ret => {
        dispatch({ type: actionTypes.UPDATE_LIST, list: ret})
    }).catch(err => {
        console.log(err)
    })
}

export const initListWs = (dispatch) => {
    const ws = getWebsocket(wsTypes.TICKER_24HR);
    ws.websocket.onopen = function(e) {
        dispatch({ type: actionTypes.UPDATE_WS, status: wsStatus.CONNECTED })
    }
    ws.websocket.onclose = function(e) {
        ws.websocket = null;
        dispatch({ type: actionTypes.UPDATE_WS, status: wsStatus.CLOSED });
    }
    ws.handleMsg = (message) => {
        const list = (message.data || []).map(t => convert(t));
        dispatch({ type: actionTypes.UPDATE_SYMBOL, list });
    }
}

const convert = o => ({
    symbol: o.s, 
    quoteVolume: o.q,
    highPrice: o.h,
    lowPrice: o.l,
    lastPrice: o.c,
})

export const closeListWs = (dispatch) => {
    const ws = getWebsocket(wsTypes.TICKER_24HR);
    dispatch({ type: actionTypes.UPDATE_WS, status: wsStatus.CLOSING })
    ws.websocket.close();
}