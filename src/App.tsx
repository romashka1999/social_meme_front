import React from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';

import './App.module.css';
import SignIn from './modules/auth/components/signIn/SignIn';
import classes from './App.module.css';
import SignUp from "./modules/auth/components/signUp/SignUp";

const App = () => {
    const isAuthenticated: boolean = localStorage.getItem('token') ? true : false;
    return (
        <div className={classes.mainContent}>
            <Router>
                <Switch>
                    <Route path='/sign-in'>
                        <SignIn/>
                    </Route>
                    <Route path='/sign-up'>
                        <SignUp/>
                    </Route>
                    <Route
                        path='/'
                        exact
                        render={() => {
                            return (
                                isAuthenticated ?
                                    <Redirect to='profile'/> :
                                    <Redirect to='sign-in'/>
                            )
                        }}/>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
