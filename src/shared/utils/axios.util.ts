import axios from 'axios';

const token = localStorage.getItem('token');

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        token
    }
});

axiosInstance.interceptors.response.use(
    (config) => {
        console.log('config :>> ', config);

        return config;
    },
    (error) => {
        console.log('error :>> ', error);
        return Promise.reject(error);
    }
);

export default axiosInstance;