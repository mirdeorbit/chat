import axios from 'axios';
import { createSelector } from 'reselect/lib/index';
import { takeEvery, put, apply } from 'redux-saga/effects';

export const moduleName = 'auth';
const prefix = `${__CONFIG__.appName}/${moduleName}`;

export const CHECK_AUTH = `${prefix}/CHECK_AUTH`;
export const CHECK_AUTH_START = `${prefix}/CHECK_AUTH_START`;
export const CHECK_AUTH_SUCCESS = `${prefix}/CHECK_AUTH_SUCCESS`;
export const CHECK_AUTH_FAILED = `${prefix}/CHECK_AUTH_FAILED`;


export const checkAuth = () => ({
    type: CHECK_AUTH
});


export function reducer(state = {}, action) {
    const { type, payload } = action;

    switch(type) {
        case CHECK_AUTH_START:
            return { loading: true, error: '', ...state };
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
    window.location = `/auth/login?returnTo=${encodeURIComponent(pathname + search)}`;
};

export function* checkAuthSaga() {
    console.log('check auth saga');
    const authToken = localStorage.getItem('currentUserToken');
    if (authToken) {
        yield put({
            type: CHECK_AUTH_START
        });

        const res = yield apply(axios, 'get', ['/users/me']);
        const data = res && res.data;
        console.log(res);
    } else {
        redirectToAuth();
    }
}

export function* saga() {
    yield takeEvery(CHECK_AUTH, checkAuthSaga);
}
