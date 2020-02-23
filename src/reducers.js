import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router'

import { reducer as authReducer } from './ducks/auth';

export default function createReducers(history) {
    return combineReducers({
        authReducer,
        router: connectRouter(history)
    });
};
