import { createSelector } from 'reselect/lib/index';
import { takeEvery, put, call } from 'redux-saga/effects';
import apiRequest from '../../utils/apiRequest';

export const moduleName = 'signin';
const prefix = `${__CONFIG__.appName}/${moduleName}`;

export const SIGNIN = `${prefix}/SIGNIN`;
export const SIGNIN_START = `${prefix}/SIGNIN_START`;
export const SIGNIN_SUCCESS = `${prefix}/SIGNIN_SUCCESS`;
export const SIGNIN_FAILED = `${prefix}/SIGNIN_FAILED`;

export const signin = (data) => ({
	type: SIGNIN,
	payload: data
});

export function reducer(state = {}, action) {
	const { type, payload } = action;

	switch(type) {
		case SIGNIN_START:
			return { loading: true, error: '', ...state };
		case SIGNIN_SUCCESS:
			return { loading: false, auth: payload.user, ...state };
		case SIGNIN_FAILED:
			return {loading: false, auth: null, error: payload.error, ...state};
		default:
			return state;
	}
}

export const selectRoot = state => state[moduleName] || {};

export const makeSelectUser = () =>
	createSelector(selectRoot, state => state.user);

export const makeSelectLoading = () =>
	createSelector(selectRoot, state => state.loading);

export const makeSelectError = () =>
	createSelector(selectRoot, state => state.error);

// @TODO Process returnTo
const redirectToApp = () => {
	//const { pathname, search } = window.location;
	window.location = `/`;
};

export function* signinSaga(params) {
	console.log(params);
	yield put({
		type: SIGNIN_START
	});

	const response = yield call(apiRequest, '/auth/signin', 'post', params.payload);

	const data = response && response.data;

	if (data) {
		console.log(data);
	}
}

export function* saga() {
	yield takeEvery(SIGNIN, signinSaga);
}
