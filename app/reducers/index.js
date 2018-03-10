import { combineReducers } from 'redux';
import { routerReducer as Router } from 'react-router-redux';
import Data from './Data';
import ContactMe from './ContactMe';

export default combineReducers({
    Router,
    Data,
    ContactMe,
});
