
import ContactMe from '../api/ContactMe';
import { put, takeEvery, call } from 'redux-saga/effects';

export function* sendMessage (action) {
    try {
        yield put({ type: 'SENDING_CONTACT_MESSAGE' });
        const api = new ContactMe();
        const res = yield call(api.send, action.payload);

        yield put({ type: 'SENT_CONTACT_MESSAGE', payload: res });
    } catch (e) {
        yield put({ type: 'SEND_CONTACT_MESSAGE_FAILED' });
    }
}

export function* watchContactMeAsync () {
    yield takeEvery('SEND_CONTACT_MESSAGE', sendMessage);
}
