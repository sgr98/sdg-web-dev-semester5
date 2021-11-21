import React, { useState, useEffect } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { Box, AppBar, Typography, Toolbar, Button, IconButton, Tab, Tabs } from '@mui/material';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

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
        // Save the JWT token for the user that is authorized, 
        // token also saves user_transactions data
        const token = user?.token;

        if (token) {
            const decodeToken = decode(token);

            if (decodeToken.exp * 1000 < new Date().getTime()) logout();
        }

        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location]);

    return (
        <Box sx={{ flexGrow: 1 }} style={{ margin: '0 0 1rem 0' }}>
            <AppBar
                position="static"
                style={{ background: '#232931' }}
            >
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                        <Typography
                            style={{ textDecoration: 'none', color: '#eee' }}
                            variant="h5"
                            component={Link}
                            to="/"
                        >
                            {/* {window.innerWidth >= 720
                                ? 'Home Budget Economy'
                                : 'HBE'} */}
                            HBE
                        </Typography>
                        {/* style={{ width: '50%', display: 'flex', justifyContent: 'space-around' }} */}
                    </div>
                    {user ? (   
                        <div className="Navbar-links">
                            {/* <Button
                                variant="contained"
                                color="warning"
                                sx={{ margin: '0 0.75rem 0 0.75rem' }}
                                component={Link}
                                to="/dashboard/budgeter"
                            >
                                Dashboard
                            </Button> */}

                            <div>
                                <Button 
                                    sx={{ textDecoration: 'none', color: '#eee' }}
                                    component={Link}
                                    to="/dashboard/budgeter"    
                                >
                                    Dashboard
                                </Button>
                            </div>

                            {/* <Typography
                                style={{
                                    margin: '0 0.25rem',
                                    color: '#eee',
                                }}
                                variant="h6"
                            >
                                {user?.result.username}
                                
                            </Typography> */}
                            <AccountCircleIcon 
                                fontSize="large" 
                                sx={{ 
                                    // position: 'fixed', 
                                    top: '10px', 
                                    margin: '0 0.75rem 0 0.75rem', 
                                    // color: '#65ba2c' 
                                    color: "#eee"
                                }} 
                            />
                            {/* <Button
                                variant="contained"
                                color="primary"
                                className="Navbar-buttons"
                                style={{ margin: '0 0.5rem 0 0.5rem' }}
                                onClick={logout}
                            >
                                <LogoutIcon sx={{right: '30px'}}/>
                            </Button> */}
                            <div>
                                <Button 
                                    sx={{ textDecoration: 'none', color: '#eee' }}
                                    onClick={logout}   
                                >
                                    Logout
                                </Button>
                            </div>
                            {/* <IconButton 
                                color="inherit"
                                aria-label="delete" 
                                size="medium"
                                onClick={logout}
                                sx={{ size: '40' }}
                            >
                                <LogoutIcon />
                            </IconButton> */}
                        </div>
                    ) : (
                        location.pathname === '/auth' ? null : (
                            <div className="Navbar-links">
                            <Button
                                variant="contained"
                                color="primary"
                                style={{ margin: '0 0 0 0.75rem' }}
                                component={Link}
                                to="/auth"
                                onClick={() => {console.log(location.pathname)}}
                            >
                                Sign In
                            </Button>
                        </div>
                        )
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Navbar;
