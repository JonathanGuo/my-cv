import { fetchProfile } from '../../app/sagas/Profile';
import { expectSaga } from 'redux-saga-test-plan';
import profile from '../../app/assets/data/profile.json';

it('Profile FETCH Test', () => {
    return expectSaga(fetchProfile)
        .put({ type: 'FETCHED_DATA', payload: profile })
        .dispatch({ type: 'FETCH_DATA' })
        .run();
});
