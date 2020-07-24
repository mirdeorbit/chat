import { createSelector } from 'reselect/lib/index';
import { takeEvery, put, call } from 'redux-saga/effects';
import apiRequest from '../utils/apiRequest';

export const moduleName = 'chats';
const prefix = `${__CONFIG__.appName}/${moduleName}`;

export const FETCH_CHATS = `${prefix}/FETCH_CHATS`;
export const FETCH_CHATS_START = `${prefix}/FETCH_CHATS_START`;
export const FETCH_CHATS_SUCCESS = `${prefix}/FETCH_CHATS_SUCCESS`;
export const FETCh_CHATS_FAILED = `${prefix}/FETCH_CHATS_FAILED`;

export const CREATE_CHAT = `${prefix}/CREATE_CHAT`;
export const CREATE_CHAT_START = `${prefix}/CREATE_CHAT_START`;
export const CREATE_CHAT_SUCCESS = `${prefix}/CREATE_CHAT_SUCCESS`;
export const CREATE_CHAT_FAILED = `${prefix}/CREATE_CHAT_FAILED`;

export const fetchChats = () => ({
	type: FETCH_CHATS
});

export const createChat = (data) => ({
	type: CREATE_CHAT,
	payload: data
})

export function reducer(state = {}, action) {
	const { type, payload } = action;

	switch(type) {
		case FETCH_CHATS_START:
			return { ...state, loading: true, error: ''};
		case FETCH_CHATS_SUCCESS:
			return { ...state, loading: false, chats: payload.chats };
		case FETCh_CHATS_FAILED:
			return { ...state, loading: false, chats: null, error: payload.error };

		case CREATE_CHAT_START:
			return { ...state, loading: true, error: '' };
		case CREATE_CHAT_SUCCESS:
			return { ...state, loading: false, chats: [payload.chat, ...state.chats] };
		case CREATE_CHAT_FAILED:
			return { ...state, loading: false, error: payload.error };
		default:
			return state;
	}
}

export const selectRoot = state => state[moduleName] || {};

export const makeSelectChats = () =>
	createSelector(selectRoot, state => state.chats);

export const makeChatsLoading = () =>
	createSelector(selectRoot, state => state.loading);

export const makeChatsError = () =>
	createSelector(selectRoot, state => state.error);

export function* fetchChatsSaga() {

	const authToken = localStorage.getItem('currentUserToken');

	try {
		yield put({
			type: FETCH_CHATS_START
		});

		const res = yield call(apiRequest, '/chats/me', 'get', {
			token: authToken
		});
		const data = res && res.data;

		if (!data) {
			yield put({
				type: FETCH_CHATS_SUCCESS,
				payload: {
					chats: null
				}
			});

			redirectToAuth();
		} else {
			yield put({
				type: FETCH_CHATS_SUCCESS,
				payload: {
					chats: data
				}
			});
		}
	} catch(err) {
		yield put({
			type: FETCh_CHATS_FAILED,
			payload: {
				error: err.message
			}
		});
	}
}

export function* createChatSaga(params) {

	const authToken = localStorage.getItem('currentUserToken');

	try {
		yield put({
			type: CREATE_CHAT_START
		});

		const res = yield call(apiRequest, '/chats', 'post', {
			token: authToken,
			chat: params.payload
		});

		const data = res && res.data;

		yield put({
			type: CREATE_CHAT_SUCCESS,
			payload: {
				chat: data
			}
		});

	} catch(err) {
		yield put({
			type: CREATE_CHAT_FAILED,
			payload: {
				error: err.message
			}
		});
	}
}

export function* saga() {
	yield takeEvery(FETCH_CHATS, fetchChatsSaga);
	yield takeEvery(CREATE_CHAT, createChatSaga);
}
