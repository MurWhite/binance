import { combineReducers } from 'redux';
import { actionTypes } from './actions';

function updateSymbolList(oldList, newList) {
  const resultList = [...oldList];
  return resultList.map((d) => {
    const n = newList.filter(t => t.symbol === d.symbol)[0];
    if (n) {
      d = {...d, ...n, lastPriceChange: n.lastPrice - d.lastPrice};
    } else {
      d.lastPriceChange = 0;
    }
    return d;
  })
}

function sortList(list, key, descend = true) {
  list.sort((a, b) => {
    let aVal = a[key];
    let bVal = b[key];
    aVal = Number(aVal) || aVal;
    bVal = Number(bVal) || bVal;
    if (aVal === bVal) return 0;
    let diff = bVal > aVal;
    if (descend) {
      return diff ? 1 : -1;
    }
    return diff ? -1 : 1;
  })
  return [...list];
}

const list = (list = [], action) => {
  switch (action.type) {
    case actionTypes.UPDATE_LIST: 
      return action.list;
    case actionTypes.UPDATE_SYMBOL:
      return updateSymbolList(list, action.list);
    case actionTypes.SORT_LIST:
      return sortList(list, action.key, action.descend)
  }
  return list;
};

const ws = (ws = { status: 'disconnect' }, action) => {
  if (action.type === actionTypes.UPDATE_WS) {
    return Object.assign({}, ws, {status: action.status})
  }
  return ws;
}
export default combineReducers({
  list,
  ws,
});
