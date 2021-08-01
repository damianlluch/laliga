import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import user from "./user";
// eslint-disable-next-line import/no-anonymous-default-export
export default (history) =>
  combineReducers({
    router: connectRouter(history),
    user,
  });
