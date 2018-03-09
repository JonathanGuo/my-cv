
import { all } from 'redux-saga/effects';
import { watchProfileAsync } from './Profile';
import { watchRouteAsync } from './Route';
import { watchContactMeAsync } from './ContactMe';

export default function* rootSaga() {
    yield all([
        watchProfileAsync(),
        watchRouteAsync(),
        watchContactMeAsync(),
    ]);
}
