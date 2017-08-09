/**
 * Created by mty on 2017/8/2.
 */
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import promise from "redux-promise-middleware"
import { createLogger } from 'redux-logger'
import rootReducer from './redux'

const loggerMiddleware = createLogger();
const promiseMiddleware = promise();

export default function configureStore() {
    return createStore(
        rootReducer,
        applyMiddleware(
            promiseMiddleware,
            thunkMiddleware,
            loggerMiddleware
        )
    )
}