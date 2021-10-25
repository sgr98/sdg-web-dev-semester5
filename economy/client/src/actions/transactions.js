import {
    FETCH_TRANSACTIONS,
    ADD_TRANSACTION,
    UPDATE_TRANSACTION,
    DELETE_TRANSACTION,
} from '../constants/actionTypes';
import {
    fetchAnalyticsTransactions,
    fetchBudgeterTransactions,
    createTransac,
    updateTransac,
    deleteTransac,
} from '../api';

// Get Analytics Transactions action
export const getAnalyticsTransactions = (userId) => async (dispatch) => {
    try {
        const { data } = await fetchAnalyticsTransactions(userId);
        // console.log(data.result);
        dispatch({ type: FETCH_TRANSACTIONS, payload: data.result });
    }
    catch(err) {
        console.log(err);
    }
}

// Get Budgeter Transactions action
export const getBudgeterTransactions = (userId) => async (dispatch) => {
    try {
        const { data } = await fetchBudgeterTransactions(userId);
        // console.log(data.result);
        dispatch({ type: FETCH_TRANSACTIONS, payload: data.result });
    }
    catch(err) {
        console.log(err);
    }
}

// Create Transaction action
export const createTransaction = (userId, userEconomy) => async (dispatch) => {
    try {
        const { data } = await createTransac(userId, userEconomy);
        // console.log(data.result);
        dispatch({ type: ADD_TRANSACTION, payload: data.result });
    }
    catch(err) {
        console.log(err);
    }
}

// Update Transaction action
export const updateTransaction = (userId, id, userEconomy) => async (dispatch) => {
    try {
        const { data } = await updateTransac(userId, id, userEconomy);
        // console.log(data.result);
        dispatch({ type: UPDATE_TRANSACTION, payload: data.result });
    }
    catch(err) {
        console.log(err);
    }
}

// Delete Transaction action
export const deleteTransaction = (userId, id, userEconomy) => async (dispatch) => {
    try {
        const { data } = await deleteTransac(userId, id, userEconomy);
        // console.log(data.result);
        dispatch({ type: DELETE_TRANSACTION, payload: data.result });
    }
    catch(err) {
        console.log(err);
    }
}