import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router'

import { reducer as authReducer, moduleName as authModuleName } from './ducks/auth/check';
import { reducer as signinReducer, moduleName as signinModuleName } from './ducks/auth/signin';
import { reducer as signupReducer, moduleName as signupModuleName } from './ducks/auth/signup';
import { reducer as chatsReducer, moduleName as chatsModuleName} from './ducks/chats';
import { reducer as messagesReducer, moduleName as messagesModuleName } from './ducks/messages';

export default function createReducers(history) {
	return combineReducers({
		[authModuleName]: authReducer,
		[signinModuleName]: signinReducer,
		[signupModuleName]: signupReducer,
		[chatsModuleName]: chatsReducer,
		[messagesModuleName]: messagesReducer,
		router: connectRouter(history)
	});
};
