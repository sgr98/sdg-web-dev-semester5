// ============================ //
// ========== UNUSED ========== //
// ============================ //

import {
    SET_SIDEBAR_DATE,
} from '../constants/actionTypes';

// Redux Reducer for sidebar date string
const sideBarDateReducer = (sideBarDate = {sideBarDateText: ""}, action) => {
    switch (action.type) {
        case SET_SIDEBAR_DATE:
            let existing = localStorage.getItem('sideDate');
            existing = existing ? JSON.parse(existing) : {};
            console.log("existing")
            console.log(existing)
            // existing['sideBarDateText'] = action.payload.sideBarDateText;
            // // Add new data to localStorage Array
            // existing[key] = value;

            localStorage.setItem('sideDate', JSON.stringify({...existing}))
            return {...sideBarDate, sideBarDateText: action.payload};
        default:
            return sideBarDate;
    }
};

export default sideBarDateReducer;