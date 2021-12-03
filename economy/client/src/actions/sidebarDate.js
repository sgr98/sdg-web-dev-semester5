import {
    SET_SIDEBAR_DATE,
} from '../constants/actionTypes';

// Set date selected in sidebar
export const setSidebarDate = (dateStr) => (dispatch) => {
    dispatch({ type: SET_SIDEBAR_DATE, payload: dateStr });
};