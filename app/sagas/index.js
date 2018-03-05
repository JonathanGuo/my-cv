/* eslint default-case: "off" */
import { put, take, all, call } from 'redux-saga/effects';
import moment from 'moment';
import { push } from 'react-router-redux';
import { store } from '../config/Store';
import Data from '../api/Data';

export function* fetchProfile () {
    try {
        yield put({ type: 'FETCH_DATA' });
        const api = new Data();
        const res = yield call(api.fetch);

        yield put({ type: 'FETCHED_DATA', payload: res });
    } catch (e) {
        yield put({ type: 'FETCH_DATA_FAILED' });
    }
}

export function* watchAsync () {
    yield take('FETCH_DATA');
    yield call(fetchProfile);
}

export function* handleRouteChange () {
    yield put({ type: 'ROUTE_CHANGED', payload: moment() });
}

export function* pushRoute (payload) {
    yield store.dispatch(push(payload.uri));
}

export function* watchRouteAsync () {
    let locationChangedAt;
    while (true) {
        const action = yield take(['@@router/LOCATION_CHANGE', 'PUSH_ROUTE']);
        switch (action.type) {
            case '@@router/LOCATION_CHANGE':
                locationChangedAt = moment();
                break;
            case 'PUSH_ROUTE':
                if (!locationChangedAt || moment().diff(locationChangedAt, 'milliseconds') > 500) {
                    yield call(pushRoute, action.payload);
                }
                break;
        }
    }
}

export default function* rootSaga() {
    yield all([
        watchAsync(),
        watchRouteAsync(),
    ]);
}
