import React, {useState} from 'react';
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';

import classes from './App.module.css';
import SignIn from './pages/signIn/SignIn';
import SignUp from "./pages/signUp/SignUp";
import Profile from "./pages/profile/Profile";
import PrivateRoute from "./modules/auth/services/PrivateRoute";
import Home from "./pages/home/Home";

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('token') ? true : false);
    return (
        <div className={classes.mainContent}>
            <Router>
                <Switch>
                    <Route
                        path='/'
                        exact
                        render={() => {
                            return (
                                isAuthenticated ?
                                    <Redirect to='home'/> :
                                    <Redirect to='sign-in'/>
                            )
                        }}/>
                    <Route path='/sign-in'>
                        <SignIn setIsAuthenticated={setIsAuthenticated}/>
                    </Route>
                    <Route path='/sign-up'>
                        <SignUp/>
                    </Route>
                    <PrivateRoute Component={Home} authed={isAuthenticated}
                                  setIsAuthenticated={setIsAuthenticated}
                                  path={'/home'}/>
                    <PrivateRoute Component={Profile} authed={isAuthenticated}
                                  setIsAuthenticated={setIsAuthenticated}
                                  path={'/profile/:userId'}/>

                    <Route path=''
                           render={(props) => {
                               props.history.replace(props.location)
                               return (
                                   isAuthenticated ?
                                       <Redirect to='home'/> :
                                       <Redirect to='sign-in'/>
                               )
                           }}>
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
