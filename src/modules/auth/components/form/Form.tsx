import React from 'react';
import InputField from "../inputField/InputField";
import {Button, Grid} from "@material-ui/core";
import {Link} from "react-router-dom";
import classes from './Form.module.css';

interface InputFiledValues {
    label: string;
    id: string;
    name: string;
    autoComplete: string;
    isAutofocus: boolean;

}

interface Props {
    register: Function;
    handleSubmit: Function;
    onSubmitSignIn: Function;
    inputFieldData: Array<InputFiledValues>
}

const MyComponent: React.FC<Props> = ({register, handleSubmit, onSubmitSignIn, inputFieldData}) => {
    return (
        <>
            <form noValidate onSubmit={handleSubmit(onSubmitSignIn)}>
                {
                    inputFieldData.map((inputData, index) => (
                        <InputField key={index} register={register} {...inputData}/>
                    ))
                }
                <Button type="submit" fullWidth variant="contained" color="primary" className={classes.button}>
                    Sign in
                </Button>
                <Grid container>
                    <Grid item xs>
                        <Link to="/">Forgot password?</Link>
                    </Grid>
                    <Grid item xs>
                        <Link to="/sign-up">Don't have account? Sign Up</Link>
                    </Grid>
                </Grid>
            </form>
        </>
    );
};

export default MyComponent;
