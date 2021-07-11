import React from 'react';
import InputField from "../inputField/InputField";
import {Button, Grid} from "@material-ui/core";
import classes from './Form.module.css';
import Footer from "../footer/Footer";

interface InputFiledValues {
    label: string;
    id: string;
    name: string;
    autoComplete: string;
    isAutofocus: boolean;
    type: string;

}

interface FooterValues {
    text: string;
    redirectTo: string;
}

interface Props {
    register: Function;
    handleSubmit: Function;
    onSubmit: Function;
    inputFieldData: Array<InputFiledValues>
    buttonText: string;
    footerValues: Array<FooterValues>;
}

const MyComponent: React.FC<Props> = ({register, handleSubmit, onSubmit, inputFieldData, buttonText, footerValues}) => {
    return (
        <>
            <form noValidate onSubmit={handleSubmit(onSubmit)}>
                {
                    inputFieldData.map((inputData, index) => (
                        <InputField key={index} register={register} {...inputData}/>
                    ))
                }
                <Button type="submit" fullWidth variant="contained" color="primary" className={classes.button}>
                    {buttonText}
                </Button>
                <Grid container>
                    {
                        footerValues.map((value, index) => (
                            <Footer {...value} key={index}/>
                        ))
                    }
                </Grid>
            </form>
        </>
    );
};

export default MyComponent;
