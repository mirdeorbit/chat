import { all } from 'redux-saga/effects';

import { saga as authSaga } from './ducks/auth/check';
import { saga as signinSaga } from './ducks/auth/signin';
import { saga as signupSaga } from './ducks/auth/signup';

export default function* rootSaga() {
	yield all([
		authSaga(),
		signinSaga(),
		signupSaga()
	]);
}