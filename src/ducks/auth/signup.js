import { createSelector } from 'reselect/lib/index';
import { takeEvery, put, call } from 'redux-saga/effects';
import apiRequest from '../../utils/apiRequest';

export const moduleName = 'signup';
const prefix = `${__CONFIG__.appName}/${moduleName}`;

export const SIGNUP = `${prefix}/SIGNUP`;
export const SIGNUP_START = `${prefix}/SIGNUP_START`;
export const SIGNUP_SUCCESS = `${prefix}/SIGNUP_SUCCESS`;
export const SIGNUP_FAILED = `${prefix}/SIGNUP_FAILED`;

export const signup = (data) => ({
	type: SIGNUP,
	payload: data
});

export function reducer(state = {}, action) {
	const { type, payload } = action;

	switch(type) {
		case SIGNUP_START:
			return { signup: { loading: true, error: '' }, ...state };
		case SIGNUP_SUCCESS:
			return { signup: { loading: false, user: payload.user }, ...state };
		case SIGNUP_FAILED:
			return { signup: { loading: false, user: null, error: payload.error }, ...state};
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

export function* signupSaga(params) {
	yield put({
		type: SIGNUP_START
	});

	try {
		const response = yield call(apiRequest, '/auth/signup', 'post', params.payload);

		const data = response && response.data;

		yield put({
			type: SIGNUP_SUCCESS,
			payload: {
				user: data || null
			}
		})
	} catch(err) {
		yield put({
			type: SIGNUP_FAILED,
			payload: {
				error: err.message
			}
		})
	}
}

export function* saga() {
	yield takeEvery(SIGNUP, signupSaga);
}
