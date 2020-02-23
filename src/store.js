import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';

import createReducers from './reducers';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();
export const history = createBrowserHistory();

const initialState = {};
const enhancers = [];
const middleware = [
    sagaMiddleware,
    routerMiddleware(history)
];

if (process.env.NODE_ENV === 'development') {
    const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;

    if (typeof devToolsExtension === 'function') {
        enhancers.push(devToolsExtension());
    }
}

const composedEnhancers = compose(
    applyMiddleware(...middleware),
    ...enhancers
);

const store = createStore(
    connectRouter(history)(createReducers(history)),
    initialState,
    composedEnhancers
);

sagaMiddleware.run(rootSaga);

export default store;

