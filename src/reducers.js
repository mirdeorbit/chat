import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router'

import { reducer as authReducer } from './ducks/auth';
import { reducer as signinReducer } from './ducks/signin';

export default function createReducers(history) {
	return combineReducers({
		authReducer,
		signinReducer,
		router: connectRouter(history)
	});
};
