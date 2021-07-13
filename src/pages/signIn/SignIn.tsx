import {Avatar, Container, CssBaseline, Grid, makeStyles, Typography,} from "@material-ui/core";
import React, {Fragment, useState} from "react";
import {useForm} from "react-hook-form";
import {useHistory} from "react-router-dom";
// import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import CustomSnackBar, {SnackOptions, SnackSeverity} from "../../shared/components/CustomSnackBar";
import {SignInDto} from "../../modules/auth/dto/sign-in.dto";
import {signIn as signInService} from "../../modules/auth/services/auth.service";
import Form from '../../modules/auth/components/form/Form';
import './SignIn.css'
import CreateBackdrop from "../../shared/components/CreateBackdrop";

interface Props {
    setIsAuthenticated: Function;
}

const footerData = [
    {text: "Forgot password?", redirectTo: '/'},
    {text: "Don't have account? Sign Up", redirectTo: '/sign-up'},
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

const signInValidationSchema = yup.object().shape({
    email: yup.string().required().email(),
    password: yup.string().required().min(8),
});

const signInInputData = [
    {
        label: 'email',
        id: 'email',
        name: 'email',
        autoComplete: 'email',
        isAutofocus: true,
        type: 'email'
    },
    {
        label: 'password',
        id: 'password',
        name: 'password',
        autoComplete: 'current-password',
        isAutofocus: false,
        type: 'password'
    },

]

const SignIn: React.FC<Props> = ({setIsAuthenticated}) => {
        const classes = useStyles();
        const history = useHistory();
        const [loading, setLoading] = useState<boolean>(false);
        const [snackOptions, setSnackOptions] = useState<SnackOptions>({
            open: false,
            message: "",
            severity: SnackSeverity.INFO,
        });
        const {register, handleSubmit, reset} = useForm(/*{ resolver: yupResolver(signInValidationSchema) }*/);

        const onSubmitSignIn = async (data: any) => {
                console.log("data :>> ", data);
                try {
                    const signInDto: SignInDto = {
                        email: data.email,
                        password: data.password,
                    };
                    setLoading(true);
                    const response = await signInService(signInDto);
                    const {accessToken, user} = response.data;
                    localStorage.setItem("token", accessToken);
                    localStorage.setItem("user", JSON.stringify(user));
                    setIsAuthenticated(true);
                    history.push("/home");
                } catch (error) {
                    if (error.response) {
                        if (Array.isArray(error.response.data.message)) {
                            setSnackOptions({
                                message: error.response.data.message[0],
                                severity: SnackSeverity.ERROR,
                                open: true,
                            });
                        } else {
                            setSnackOptions({
                                message: error.response.data.message,
                                severity: SnackSeverity.ERROR,
                                open: true,
                            });
                        }
                    }
                } finally {
                    setLoading(false);
                }
            }
        ;
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
                        <Typography component="h1">Sign in</Typography>
                    </Grid>
                    <Form
                        register={register}
                        onSubmit={onSubmitSignIn}
                        handleSubmit={handleSubmit}
                        inputFieldData={signInInputData}
                        buttonText='Sign in'
                        footerValues={footerData}
                    />
                </Container>
                <CustomSnackBar
                    snackOptions={snackOptions}
                    setClose={onSnackBarCloseHandler}
                />
            </Fragment>
        );
    }
;

export default SignIn;
