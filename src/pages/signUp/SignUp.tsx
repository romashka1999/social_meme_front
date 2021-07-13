import {Avatar, Container, CssBaseline, Grid, makeStyles, Typography,} from "@material-ui/core";
import React, {Fragment, useState} from "react";
import {useForm} from "react-hook-form";
import {useHistory} from "react-router-dom";

import CustomSnackBar, {SnackOptions, SnackSeverity} from "../../shared/components/CustomSnackBar";
import {signUp as signUpService} from "../../modules/auth/services/auth.service";
import Form from '../../modules/auth/components/form/Form';
import './SignUp.css'
import CreateBackdrop from "../../shared/components/CreateBackdrop";
import {SignUpDto} from "../../modules/auth/dto/sign-up.dto";

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

const signUpInputData = [
    {
        label: 'firstName',
        id: 'firstName',
        name: 'firstName',
        autoComplete: 'firstName',
        isAutofocus: true,
        type: 'text'

    },
    {
        label: 'lastName',
        id: 'lastName',
        name: 'lastName',
        autoComplete: 'lastName',
        isAutofocus: false,
        type: 'text'

    },
    {
        label: 'email',
        id: 'email',
        name: 'email',
        autoComplete: 'email',
        isAutofocus: false,
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

const SignUp: React.FC<Partial<Props>> = (props) => {
    const classes = useStyles();
    const history = useHistory();
    const [loading, setLoading] = useState<boolean>(false);
    const [registeredSuccessfully, setRegisteredSuccessfully] = useState<boolean>(false);

    const [snackOptions, setSnackOptions] = useState<SnackOptions>({
        open: false,
        message: "",
        severity: SnackSeverity.INFO,
    });

    const {register, handleSubmit, reset} = useForm(/*{ resolver: yupResolver(signUpValidationSchema) }*/);


    const onSubmitSignUp = async (data: any) => {
        try {
            const signUpDto: SignUpDto = {
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                password: data.password,
            };
            setLoading(true);
            const response = await signUpService(signUpDto);
            if (response.status === 201) {
                setRegisteredSuccessfully(true)
            }
            setSnackOptions({
                message: "Registration Successful",
                severity: SnackSeverity.SUCCESS,
                open: true
            });

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
    };
    const onSnackBarCloseHandler = () => {
        setSnackOptions((val) => {
            return {
                ...val,
                open: false,
            };
        });
        if (registeredSuccessfully) {
            history.push("/sign-in");
        }
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
