import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import Navbar from './Components/Navbar';
import Home from './Components/Home';
import './App.css';

const App = () => {
    const dispatch = useDispatch();

    // useEffect(() => {
    //     dispatch();
    // }, []);
    
    return (
        <div className="AppContainer">
            <div>
                <Navbar />
                <Home />
            </div>
        </div>
    );
};

export default App;
