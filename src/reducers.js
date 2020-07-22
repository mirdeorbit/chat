import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router'

import { reducer as authReducer } from './ducks/auth/check';
import { reducer as signinReducer } from './ducks/auth/signin';
import { reducer as signupReducer } from './ducks/auth/signup';

export default function createReducers(history) {
	return combineReducers({
		authReducer,
		signinReducer,
		signupReducer,
		router: connectRouter(history)
	});
};
