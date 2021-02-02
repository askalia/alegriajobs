import { createStore, applyMiddleware } from "redux";

import rootReducer from "./root-reducer";

import { logger as loggerMiddleware} from "redux-logger";
import thunkMiddleware from "redux-thunk"

const middlewares = [loggerMiddleware, thunkMiddleware]

export default createStore(rootReducer, applyMiddleware(...middlewares));