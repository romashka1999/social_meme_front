import React from 'react';
import {Grid} from "@material-ui/core";
import {Link} from "react-router-dom";

interface Props {
    redirectTo: string;
    text: string;
}

const MyComponent: React.FC<Props> = ({text, redirectTo}) => {
    return (
        <Grid container item xs justify='center'>
            <Link to={redirectTo}>{text}</Link>
        </Grid>
    );
};

export default MyComponent;
