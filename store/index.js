import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";
import home from "./home/reducer";

const rootInitialState = {
  home: {
    list: []
  }
};

// REDUCERS
export const reducer = combineReducers({
  home
});

// console.log('reducer::::', reducer);

export function initializeStore(initialState = rootInitialState) {
  return createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
  );
}
