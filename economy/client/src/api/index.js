import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

API.interceptors.request.use((req) => {         // Adds something to all the API requests
    // If a token is generated, attach it to the authorization header 
    // (will be used by auth middleware in backend)
    // otherwise attach nothing to no headers
    if(localStorage.getItem('profile')) {
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
    return req;
})

API.interceptors.response.use((response) => {
    if(response.status === 404) {
         alert("Some user declined Error");
    }
    if(response.status === 400) {
        alert("Some error");
    }
    if(response.status === 400) {
        alert("some error");
    }
    return response;
}, (error) => {
    if (error.response && error.response.data) {
        return Promise.reject(error.response.data);
    }
    return Promise.reject(error.message);
});

// Authentication 
export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);

// Transactions
export const fetchAnalyticsTransactions = (userId) => API.get(`/dashboard/${userId}/analytics`);
export const fetchBudgeterTransactions = (userId) => API.get(`/dashboard/${userId}/budgeter`);
export const createTransac = (userId, userEconomy) => API.patch(`/dashboard/${userId}/budgeter`, userEconomy);
export const updateTransac = (userId, id, userEconomy) => API.patch(`/dashboard/${userId}/budgeter/edit/${id}`, userEconomy);
export const deleteTransac = (userId, id, userEconomy) => API.patch(`/dashboard/${userId}/budgeter/delete/${id}`, userEconomy);
