import React from 'react';
import {Backdrop, CircularProgress} from "@material-ui/core";

interface Props {
    loading: boolean;
    className: string;
}

const CreateBackdrop: React.FC<Props> = ({loading, className}) => {
    return (
        <Backdrop open={loading} className={className}>
            <CircularProgress color="inherit"/>
        </Backdrop>
    );
};

export default CreateBackdrop;
