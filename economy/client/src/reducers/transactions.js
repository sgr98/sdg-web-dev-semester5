import {
    FETCH_TRANSACTIONS,
    ADD_TRANSACTION,
    UPDATE_TRANSACTION,
    DELETE_TRANSACTION,
} from '../constants/actionTypes';

const transactionReducer = (transactions = {}, action) => {
    switch (action.type) {
        case FETCH_TRANSACTIONS:
        case ADD_TRANSACTION:
        case UPDATE_TRANSACTION:
        case DELETE_TRANSACTION:
            return action.payload;
        default:
            return transactions;
    }
};

export default transactionReducer;
