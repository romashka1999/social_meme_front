import {
    Avatar,
    Button,
    Container,
    CssBaseline,
    Grid,
    makeStyles,
    TextField,
    Typography,
    Backdrop,
    CircularProgress,
} from "@material-ui/core";
import { LockOutlined } from "@material-ui/icons";
import React, { useState, Fragment } from "react";
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
// import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import CustomSnackBar, { SnackOptions, SnackSeverity } from "../../../shared/components/CustomSnackBar";
import { SignInDto } from "../dto/sign-in.dto";
import { signIn as signInService } from "../services/auth.service";

interface Props {
    history: any;
}

const useStyles = makeStyles((theme) => ({
    container: {
        padding: theme.spacing(2),
        border: "solid black 2px",
        borderRadius: theme.spacing(2),
        background: "whiteSmoke",
        marginTop: theme.spacing(2),
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
    const { register, handleSubmit, reset, errors } = useForm(/*{ resolver: yupResolver(signInValidationSchema) }*/);

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
            const { access_token } = response.data;
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

    return (
        <Fragment>
            <Backdrop open={loading} className={classes.backdrop}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <Container component="main" maxWidth="xs" className={classes.container}>
                <CssBaseline />
                <Grid container alignItems="center" direction="column">
                    <Avatar>
                        <LockOutlined color="secondary" />
                    </Avatar>
                    <Typography component="h1">Sign in</Typography>
                </Grid>
                <form noValidate onSubmit={handleSubmit(onSubmitSignIn)}>
                    <TextField
                        inputRef={register}
                        label="email"
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />
                    <TextField
                        inputRef={register}
                        label="password"
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                    />
                    <Button type="submit" fullWidth variant="contained" color="primary">
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
            </Container>
            <CustomSnackBar
                snackOptions={snackOptions}
                setClose={() => {
                    setSnackOptions((val) => {
                        return {
                            ...val,
                            open: false,
                        };
                    });
                }}
            />
        </Fragment>
    );
};

export default SignIn;
