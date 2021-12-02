import { combineReducers } from 'redux';
import auth from './auth';
import transactions from './transactions';
import sidebardate from './sidebarDate';

export default combineReducers({
    auth,
    transactions,
    sidebardate,
});
