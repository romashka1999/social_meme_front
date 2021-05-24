import {Avatar, Container, CssBaseline, Grid, makeStyles, Typography,} from "@material-ui/core";
import React, {Fragment, useState} from "react";
import {useForm} from "react-hook-form";
import {useHistory} from "react-router-dom";
// import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import CustomSnackBar, {SnackOptions, SnackSeverity} from "../../../../shared/components/CustomSnackBar";
import {signUp as signUpService} from "../../services/auth.service";
import Form from '../form/Form';
import './SignUp.css'
import CreateBackdrop from "../../../../shared/components/CreateBackdrop";
import {SignUpDto} from "../../dto/sign-up.dto";

interface Props {
    history: any;
}

const footerData = [
    {text: "Already have account? Sign in", redirectTo: '/sign-in'},
]

const useStyles = makeStyles((theme) => ({
    container: {
        padding: theme.spacing(2),
        border: "solid black 2px",
        borderRadius: theme.spacing(2),
        background: "whiteSmoke",
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: "#fff",
    },
}));

const SignUp: React.FC<Partial<Props>> = (props) => {
    const classes = useStyles();
    const history = useHistory();
    const [loading, setLoading] = useState<boolean>(false);
    const [snackOptions, setSnackOptions] = useState<SnackOptions>({
        open: false,
        message: "",
        severity: SnackSeverity.INFO,
    });
    const {register, handleSubmit, reset, errors} = useForm(/*{ resolver: yupResolver(signUpValidationSchema) }*/);

    const signUpInputData = [
        {
            label: 'firstName',
            id: 'firstName',
            name: 'firstName',
            autoComplete: 'firstName',
            isAutofocus: true,
        },
        {
            label: 'lastName',
            id: 'lastName',
            name: 'lastName',
            autoComplete: 'lastName',
            isAutofocus: false,
        },
        {
            label: 'email',
            id: 'email',
            name: 'email',
            autoComplete: 'email',
            isAutofocus: false,
        },
        {
            label: 'password',
            id: 'password',
            name: 'password',
            autoComplete: 'current-password',
            isAutofocus: false,
        },

    ]

    const onSubmitSignUp = async (data: any) => {
        console.log("data :>> ", data);
        console.log("errors :>> ", errors);
        try {
            const signUpDto: SignUpDto = {
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                password: data.password,
            };
            setLoading(true);
            const response = await signUpService(signUpDto);
            const {access_token} = response.data;
            localStorage.setItem("token", access_token);
            history.push("/profile");
        } catch (error) {
            if (error.response) {
                reset();
                console.log("error.response :>> ", error.response);
                let errorMessage = "validation error";
                switch (error.response.data.message) {
                    case "INVALID_CREDENTIALS":
                        errorMessage = "invalid credentials";
                }
                setSnackOptions({
                    message: errorMessage,
                    severity: SnackSeverity.ERROR,
                    open: true,
                });
            }
        } finally {
            setLoading(false);
        }
    };
    const onSnackBarCloseHandler = () => {
        setSnackOptions((val) => {
            return {
                ...val,
                open: false,
            };
        });
    }

    return (
        <Fragment>
            <CreateBackdrop loading={loading} className={classes.backdrop}/>
            <Container component="main" maxWidth="xs" className={classes.container}>
                <CssBaseline/>
                <Grid container alignItems="center" direction="column">
                    <Avatar>
                        <img src={process.env.PUBLIC_URL + 'logo.svg'}
                             className='sign_in_logo' alt='logo'/>
                    </Avatar>
                    <Typography component="h1">Sign up</Typography>
                </Grid>
                <Form
                    register={register}
                    onSubmit={onSubmitSignUp}
                    handleSubmit={handleSubmit}
                    inputFieldData={signUpInputData}
                    buttonText='Sign up'
                    footerValues={footerData}
                />
            </Container>
            <CustomSnackBar
                snackOptions={snackOptions}
                setClose={onSnackBarCloseHandler}
            />
        </Fragment>
    );
};

export default SignUp;
