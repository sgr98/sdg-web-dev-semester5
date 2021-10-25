import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Navbar from './Components/Navbar';
import Home from './Components/Home';
import Authentication from './Components/Authentication';
import Budgeter from './Components/Budgeter';
import Analytics from './Components/Analytics';
import './App.css';

const App = () => {
    const dispatch = useDispatch();

    // useEffect(() => {
    //     dispatch();
    // }, []);

    return (
        <BrowserRouter>
            <div className="AppContainer">
                <div>
                    <Navbar />
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/auth" component={Authentication} />
                        <Route exact path="/dashboard/budgeter" component={Budgeter} />
                        <Route path="/dashboard/analytics" component={Analytics} />
                    </Switch>
                </div>
            </div>
        </BrowserRouter>
    );
};

export default App;
