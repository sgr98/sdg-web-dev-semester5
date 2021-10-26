import React from 'react';

import Dashboard from '../Dashboard';
import Datarows from './DataRows/Datarows';
import './styles.css';

const Budgeter = () => {
    return (
        <div className="Budgeter-Container">
            <Dashboard />
            <Datarows />
        </div>
    );
};

export default Budgeter;
