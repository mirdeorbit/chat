import { createSelector } from 'reselect/lib/index';
import { takeEvery, put, call } from 'redux-saga/effects';
import apiRequest from '../utils/apiRequest';

export const moduleName = 'messages';
const prefix = `${__CONFIG__.appName}/${moduleName}`;

export const FETCH_MESSAGES = `${prefix}/FETCH_MESSAGES`;
export const FETCH_MESSAGES_START = `${prefix}/FETCH_MESSAGES_START`;
export const FETCH_MESSAGES_SUCCESS = `${prefix}/FETCH_MESSAGES_SUCCESS`;
export const FETCh_MESSAGES_FAILED = `${prefix}/FETCH_MESSAGES_FAILED`;

export const APPEND_MESSAGE = `${prefix}/CREATE_MESSAGE`;
// export const CREATE_MESSAGE_START = `${prefix}/CREATE_MESSAGE_START`;
// export const CREATE_MESSAGE_SUCCESS = `${prefix}/CREATE_MESSAGE_SUCCESS`;
// export const CREATE_MESSAGE_FAILED = `${prefix}/CREATE_MESSAGE_FAILED`;

export const fetchMessages = () => ({
	type: FETCH_MESSAGES
});

export const appendMessage = (data) => ({
	type: APPEND_MESSAGE,
	payload: data
})

export function reducer(state = {}, action) {
	const { type, payload } = action;

	switch(type) {
		case FETCH_MESSAGES_START:
			return { ...state, loading: true, error: '' };
		case FETCH_MESSAGES_SUCCESS:
			return { ...state, messages: payload.messages, loading: false };
		case FETCh_MESSAGES_FAILED:
			return {...state, loading: false, messages: null, error: payload.error};

		case APPEND_MESSAGE:
			return {...state, messages: [...state.messages, payload.message]}

		default:
			return state;
	}
}

export const selectRoot = state => state[moduleName] || {};

export const makeSelectMessages = () =>
	createSelector(selectRoot, state => state.messages);

export const makeMessagesLoading = () =>
	createSelector(selectRoot, state => state.loading);

export const makeMessagesError = () =>
	createSelector(selectRoot, state => state.error);

export function* fetchMessagesSaga(params) {

	const authToken = localStorage.getItem('currentUserToken');

	try {
		yield put({
			type: FETCH_MESSAGES_START
		});

		const res = yield call(apiRequest, '/messages/me', 'get', {
			token: authToken
		});
		const data = res && res.data;

		if (!data) {
			yield put({
				type: FETCH_MESSAGES_SUCCESS,
				payload: {
					messages: null
				}
			});
		} else {
			yield put({
				type: FETCH_MESSAGES_SUCCESS,
				payload: {
					messages: data
				}
			});
		}
	} catch(err) {
		yield put({
			type: FETCh_MESSAGES_FAILED,
			payload: {
				error: err.message
			}
		});
	}
}

export function* saga() {
	yield takeEvery(FETCH_MESSAGES, fetchMessagesSaga);
}
