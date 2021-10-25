import React, { useState, useEffect } from 'react';
import { Box, AppBar, Typography, Toolbar, Button } from '@mui/material';

import Dashboard from '../Dashboard';
import Datarows from './DataRows/Datarows';
import './styles.css';

const Budgeter = () => {
    // const [user, setUser] = useState(
    //     JSON.parse(localStorage.getItem('profile'))
    // );

    return (
        <div className="Budgeter-Container">
            <Dashboard />
            <Datarows />
        </div>
    );
};

export default Budgeter;
