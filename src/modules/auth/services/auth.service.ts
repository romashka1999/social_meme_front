import axios, { AxiosResponse } from 'axios';

import { SignInDto } from '../dto/sign-in.dto';
import { SignUpDto } from '../dto/sign-up.dto';

const baseURL = process.env.REACT_APP_API_URL + '/auth';

export const signIn = (signInDto: SignInDto): Promise<AxiosResponse> => {
    return axios.post(`${baseURL}/sign-in`, signInDto);
}

export const signUp = (signUpDto: SignUpDto): Promise<AxiosResponse> => {
    return axios.post(`${baseURL}/sign-up`, signUpDto);
}