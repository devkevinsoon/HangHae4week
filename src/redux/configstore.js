import { createStore, combineReducers, applyMiddleware } from "redux";
import { createBrowserHistory } from "history";
import thunk from "redux-thunk";
import words from "./module/words";

export const history = createBrowserHistory();

const middlewares = [thunk];

const enhancer = applyMiddleware(...middlewares);
const rootReducer = combineReducers({ words });

const store = createStore(rootReducer, enhancer);

export default store;