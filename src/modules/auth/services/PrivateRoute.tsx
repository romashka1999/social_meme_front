import React from 'react';
import SignIn from "../../../pages/signIn/SignIn";
import {Route} from "react-router-dom";

interface Props {
    Component: any;
    authed: boolean;
    setIsAuthenticated: Function;
    path: string;
}

const PrivateRoute: React.FC<Props> = ({Component, authed, setIsAuthenticated, path}) => {
    return (
        <Route path={path}>
            {authed ? <Component/> : <SignIn setIsAuthenticated={setIsAuthenticated}/>}
        </Route>
    );
};

export default PrivateRoute;
