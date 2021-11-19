import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Paper, Grid, Typography, Container } from '@mui/material';
import { useHistory } from 'react-router-dom';

import Input from './Input';
import './styles.css';

import { signin, signup } from '../../actions/auth';

const initialState = {
    firstName: '',
    lastName: '',
    userName: '',
    email: '',
    password: '',
    confirmPassword: '',
};

const Authentication = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);
    const [formData, setFormData] = useState(initialState);

    const dispatch = useDispatch();
    const history = useHistory();

    // To show or unshow password
    const handleShowPassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    // Submit sign in and sign up form
    const handleSubmit = (e) => {
        e.preventDefault();

        if (isSignUp) {
            dispatch(signup(formData, history))
        } else {
            dispatch(signin(formData, history))
        }
    };

    // update form data state whenever the value in a field is changed
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Switch between sign in and sign up form
    const switchMode = () => {
        setIsSignUp((prevIsSignUp) => !prevIsSignUp);
        setShowPassword((prevShowPassword) => false);
    };

    return (
        <Container component="main" maxWidth="xs">
            <Paper elevation={3} className="Auth-Paper">
                <Typography variant="h4">
                    {isSignUp ? 'Sign Up' : 'Sign In'}
                </Typography>
                <form className="Auth-form" onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {isSignUp && (
                            <>
                                <Input
                                    the_name="firstName"
                                    label="First Name"
                                    type="text"
                                    handleChange={handleChange}
                                    autoFocus
                                    half
                                />
                                <Input
                                    the_name="lastName"
                                    label="Last Name"
                                    type="text"
                                    handleChange={handleChange}
                                    half
                                />
                            </>
                        )}
                        {isSignUp && (
                            <Input
                                the_name="userName"
                                label="Username"
                                handleChange={handleChange}
                                type="text"
                            />
                        )}
                        <Input
                            the_name="email"
                            label="Email Address"
                            handleChange={handleChange}
                            type="email"
                        />
                        <Input
                            the_name="password"
                            label="Password"
                            handleChange={handleChange}
                            type={showPassword ? 'text' : 'password'}
                            handleShowPassword={handleShowPassword}
                        />
                        {isSignUp && (
                            <Input
                                the_name="confirmPassword"
                                label="Repeat Password"
                                handleChange={handleChange}
                                type="password"
                            />
                        )}
                    </Grid>
                    <Button
                        className="Auth-Sign-Button"
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ marginTop: '1.5rem' }}
                    >
                        {isSignUp ? 'Sign Up' : 'Sign In'}
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Button
                                onClick={switchMode}
                                sx={{ marginTop: '1rem' }}
                            >
                                {isSignUp
                                    ? 'Already have an account? Sign In'
                                    : "Don't have an account? Sign Up"}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
};

export default Authentication;
