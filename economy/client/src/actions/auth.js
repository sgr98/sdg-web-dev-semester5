import { AUTH } from '../constants/actionTypes';
import { signIn, signUp } from '../api';

// Redux Action for sign in
export const signin = (formData, history) => async (dispatch) => {
    try {
        const { data } = await signIn(formData);
        dispatch({ type: AUTH, data})

        history.push('/');
    } catch (err) {
        console.log(err); 
    }
};

// Redux Action for sign up
export const signup = (formData, history) => async (dispatch) => {
    try {
        const { data } = await signUp(formData);
        dispatch({ type: AUTH, data})

        history.push('/');
    } catch (err) {
        console.log(err); 
    }
};
