
/* eslint default-case: "off" */
import { put, take, call } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import moment from 'moment';
import { store } from '../config/Store';

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
