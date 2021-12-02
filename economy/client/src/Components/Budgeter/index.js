import React, { useState } from 'react';
import  { Redirect } from 'react-router-dom'

import Dashboard from '../Dashboard';
import Datarows from './DataRows/Datarows';
import './styles.css';

const Budgeter = () => {
    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem('profile'))
    );

    if(user === null) {
        return <Redirect to="/auth" />
    }

    return (
        <div className="Budgeter-Container">
            <Dashboard />
            <Datarows />
        </div>
    );
};

export default Budgeter;
