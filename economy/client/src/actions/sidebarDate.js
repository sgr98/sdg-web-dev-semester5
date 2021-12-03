import {
    SET_SIDEBAR_DATE,
} from '../constants/actionTypes';

export const setSidebarDate = (dateStr) => (dispatch) => {
    dispatch({ type: SET_SIDEBAR_DATE, payload: dateStr });
};