import { createStore, applyMiddleware } from "redux";
import { createBrowserHistory } from "history";
import { routerMiddleware } from "connected-react-router";
import thunk from "redux-thunk";
import createRootReducer from "./reducers";

const history = createBrowserHistory();
const store = createStore(
  createRootReducer(history),
  applyMiddleware(thunk, routerMiddleware(history))
);
export default store;
