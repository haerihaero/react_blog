import { createStore, compose, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { createBrowserHistory } from "history";
import { routerMiddleware } from "connected-react-router";

import createRootReducer from "./redux/reducers/index";
import rootSaga from "./redux/sagas";

export const history = createBrowserHistory();

const sagaMiddleWare = createSagaMiddleware();

const initialState = {};

const middleware = [sagaMiddleWare, routerMiddleware(history)];
const devtools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;

const composeEnhancer =
  process.env.NODE_ENV === "production" ? compose : devtools || compose;

const store = createStore(
  createRootReducer(history),
  initialState,
  composeEnhancer(applyMiddleware(...middleware))
);
sagaMiddleWare.run(rootSaga);

export default store;
