import React from 'react';
import MuiAlert from '@material-ui/lab/Alert';
import { Snackbar } from '@material-ui/core';

export enum SnackSeverity {
    SUCCESS = 'success',
    ERROR = 'error',
    INFO = 'info',
    WARNING = 'warning',
}

export interface SnackOptions {
    severity: SnackSeverity,
    message: string,
    open: boolean,
}

interface Props {
    snackOptions: SnackOptions,
    setClose: any,
    duration?: number,
}

const CustomSnackBar: React.FC<Props> = (props) => {
    return (
        <Snackbar 
            open={props.snackOptions.open}
            autoHideDuration={props.duration || 2000}
            onClose={props.setClose}>
                <MuiAlert
                    elevation={6}
                    variant="filled"
                    severity={props.snackOptions.severity}>
                    { props.snackOptions.message }
                </MuiAlert>
        </Snackbar>
    );
}

export default CustomSnackBar;