import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import './App.css';
import SignIn from './modules/auth/components/SignIn';


const App = () => {
    const isAUthenticated: boolean = localStorage.getItem('token') ? true: false;
    return (
        <Router>
            <Switch>
                <Route path='/sign-in'>
                    <SignIn />
                </Route>
                <Route
                    path='/'
                    exact
                    render={() => {
                        return (
                            isAUthenticated ?
                            <Redirect to='profile' /> :
                            <Redirect to='sign-in' />
                        )
                    }}/>
            </Switch>
        </Router>
    );
}

export default App;
