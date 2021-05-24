import {
    Avatar,
    Backdrop,
    CircularProgress,
    Container,
    CssBaseline,
    Grid,
    makeStyles,
    Typography,
} from "@material-ui/core";
import React, {Fragment, useState} from "react";
import {useForm} from "react-hook-form";
import {useHistory} from "react-router-dom";
// import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import CustomSnackBar, {SnackOptions, SnackSeverity} from "../../../../shared/components/CustomSnackBar";
import {SignInDto} from "../../dto/sign-in.dto";
import {signIn as signInService} from "../../services/auth.service";
import Form from '../form/Form';
import './SignIn.css'

interface Props {
    history: any;
}


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

const signInValidationSchema = yup.object().shape({
    email: yup.string().required().email(),
    password: yup.string().required().min(8),
});

const SignIn: React.FC<Partial<Props>> = (props) => {
    const classes = useStyles();
    const history = useHistory();
    const [loading, setLoading] = useState<boolean>(false);
    const [snackOptions, setSnackOptions] = useState<SnackOptions>({
        open: false,
        message: "",
        severity: SnackSeverity.INFO,
    });
    const {register, handleSubmit, reset, errors} = useForm(/*{ resolver: yupResolver(signInValidationSchema) }*/);

    const signInInputData = [
        {
            label: 'email',
            id: 'email',
            name: 'email',
            autoComplete: 'email',
            isAutofocus: true,
        },
        {
            label: 'password',
            id: 'password',
            name: 'password',
            autoComplete: 'current-password',
            isAutofocus: false,
        },

    ]

    const onSubmitSignIn = async (data: any) => {
        console.log("data :>> ", data);
        console.log("errors :>> ", errors);
        try {
            const signInDto: SignInDto = {
                email: data.email,
                password: data.password,
            };
            setLoading(true);
            const response = await signInService(signInDto);
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
            <Backdrop open={loading} className={classes.backdrop}>
                <CircularProgress color="inherit"/>
            </Backdrop>
            <Container component="main" maxWidth="xs" className={classes.container}>
                <CssBaseline/>
                <Grid container alignItems="center" direction="column">
                    <Avatar>
                        <img src={process.env.PUBLIC_URL + 'logo.svg'}
                             className='sign_in_logo'/>
                    </Avatar>
                    <Typography component="h1">Sign in</Typography>
                </Grid>
                <Form
                    register={register}
                    onSubmitSignIn={onSubmitSignIn}
                    handleSubmit={handleSubmit}
                    inputFieldData={signInInputData}
                />
            </Container>
            <CustomSnackBar
                snackOptions={snackOptions}
                setClose={onSnackBarCloseHandler}
            />
        </Fragment>
    );
};

export default SignIn;
