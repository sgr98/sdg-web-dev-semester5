import React, { useState, useEffect } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { Box, AppBar, Typography, Toolbar, Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';
import { LOGOUT } from '../../constants/actionTypes';

import './styles.css';

const Navbar = () => {
    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem('profile'))
    );
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();

    const logout = () => {
        dispatch({ type: LOGOUT });
        history.push('/auth');
        setUser(null);
    };

    useEffect(() => {
        const token = user?.token;

        if (token) {
            const decodeToken = decode(token);

            if (decodeToken.exp * 1000 < new Date().getTime()) logout();
        }

        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location]);

    return (
        <Box sx={{ flexGrow: 1 }} style={{ margin: '1rem 0' }}>
            <AppBar
                position="static"
                style={{ background: '#4E9F3D', borderRadius: '5px' }}
            >
                <Toolbar>
                    <Typography
                        style={{ textDecoration: 'none', color: '#eee' }}
                        variant="h5"
                        component="div"
                        sx={{ flexGrow: 1 }}
                        component={Link}
                        to="/"
                    >
                        {window.innerWidth >= 720
                            ? 'Home Budget Economy'
                            : 'HBE'}
                    </Typography>

                    {user ? (
                        <div className="Navbar-links">
                            <Button
                                variant="contained"
                                color="primary"
                                className="Navbar-buttons"
                                style={{ margin: '0 0.5rem 0 0.5rem' }}
                                component={Link}
                                to="/dashboard/budgeter"
                            >
                                Dashboard
                            </Button>
                            <Typography
                                style={{
                                    margin: '0 0.25rem',
                                    color: '#14279B',
                                }}
                                variant="h6"
                            >
                                {user?.result.username}
                            </Typography>
                            <Button
                                variant="contained"
                                color="primary"
                                className="Navbar-buttons"
                                style={{ margin: '0 0.5rem 0 0.5rem' }}
                                onClick={logout}
                            >
                                Log Out
                            </Button>
                        </div>
                    ) : (
                        <div className="Navbar-links">
                            <Button
                                variant="contained"
                                color="primary"
                                style={{ margin: '0 0.5rem 0 0.5rem' }}
                                component={Link}
                                to="/auth"
                            >
                                Sign In
                            </Button>
                        </div>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Navbar;
