
import Data from '../api/Data';
import { put, take, call } from 'redux-saga/effects';

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

export function* watchProfileAsync () {
    yield take('FETCH_DATA');
    yield call(fetchProfile);
}
