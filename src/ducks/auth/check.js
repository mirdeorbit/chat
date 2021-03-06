import { createSelector } from 'reselect/lib/index';
import { takeEvery, put, call } from 'redux-saga/effects';
import apiRequest from '../../utils/apiRequest';

export const moduleName = 'auth';
const prefix = `${__CONFIG__.appName}/${moduleName}`;

export const CHECK_AUTH = `${prefix}/CHECK_AUTH`;
export const CHECK_AUTH_START = `${prefix}/CHECK_AUTH_START`;
export const CHECK_AUTH_SUCCESS = `${prefix}/CHECK_AUTH_SUCCESS`;
export const CHECK_AUTH_FAILED = `${prefix}/CHECK_AUTH_FAILED`;

export const SET_AUTH = `${prefix}/SET_AUTH`;

export const checkAuth = () => ({
	type: CHECK_AUTH
});

export const setAuth = (payload) => ({
	type: SET_AUTH,
	payload
});

export function reducer(state = {}, action) {
	const { type, payload } = action;

	switch(type) {
		case CHECK_AUTH_START:
			return { ...state, loading: true, error: '' };
		case CHECK_AUTH_SUCCESS:
			return { ...state, loading: false, auth: payload.auth };
		case CHECK_AUTH_FAILED:
			return { ...state, loading: false, auth: null, error: payload.error };
		case SET_AUTH:
			return { ...state, auth: payload }
		default:
			return state;
	}
}

export const selectRoot = state => state[moduleName] || {};

export const makeSelectAuth = () =>
	createSelector(selectRoot, state => state.auth);

export const makeAuthLoading = () =>
	createSelector(selectRoot, state => state.loading);

export const makeAuthError = () =>
	createSelector(selectRoot, state => state.error);

const redirectToAuth = () => {
	const { pathname, search } = window.location;
	window.location = `/auth/signin?returnTo=${encodeURIComponent(pathname + search)}`;
};

export function* checkAuthSaga() {
	const authToken = localStorage.getItem('currentUserToken');

	if (authToken) {
		try {
			yield put({
				type: CHECK_AUTH_START
			});

			const res = yield call(apiRequest, '/users/me', 'get', {
				token: authToken
			});
			const data = res && res.data;

			if (!data) {
				yield put({
					type: CHECK_AUTH_SUCCESS,
					payload: {
						auth: null
					}
				});

				redirectToAuth();
			} else {
				yield put({
					type: CHECK_AUTH_SUCCESS,
					payload: {
						auth: {
							user: data
						}
					}
				});
			}
		} catch(err) {
			yield put({
				type: CHECK_AUTH_FAILED,
				payload: {
					error: err.message
				}
			});
		}

	} else {
		redirectToAuth();
	}
}

export function* saga() {
	yield takeEvery(CHECK_AUTH, checkAuthSaga);
}
