// ============================ //
// ========== UNUSED ========== //
// ============================ //

import {
    SET_SIDEBAR_DATE,
} from '../constants/actionTypes';

export const setSidebarDate = (dateStr) => (dispatch) => {
    const sideBarDate = {sideBarDateText: dateStr}
    dispatch({ type: SET_SIDEBAR_DATE, payload: sideBarDate });
};