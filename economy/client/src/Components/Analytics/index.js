import React, { useState, useEffect } from 'react';
// import { Box, AppBar, Typography, Toolbar, Button } from '@mui/material';
// import { useDispatch } from 'react-redux';

// import { LOGOUT } from '../../constants/actionTypes';

import Dashboard from '../Dashboard';
import { getAnalyticsTransactions } from '../../actions/transactions';
import './styles.css';

const Analytics = () => {
    // const [user, setUser] = useState(
    //     JSON.parse(localStorage.getItem('profile'))
    // );
    // const dispatch = useDispatch();

    return (
        <div className="Analytics-Container">
            <Dashboard />
            Analytics
        </div>
    );
};

export default Analytics;
