import {
    SET_SIDEBAR_DATE,
} from '../constants/actionTypes';

import { getMonthYear } from '../Functions/date';

let initialState = {
    sideBarDateText: getMonthYear(new Date())
}

// Redux Reducer for sidebar date string
const sideBarDateReducer = (currentState = initialState, action) => {
    switch (action.type) {
        case SET_SIDEBAR_DATE:
            return {...currentState, sideBarDateText: action.payload};
        default:
            return currentState;
    }
};

export default sideBarDateReducer;