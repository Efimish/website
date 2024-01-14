import axios, { AxiosHeaders } from 'axios';
import { refresh } from './auth';

export const axiosInstance = axios.create({
    // baseURL: 'http://localhost:8080'
    baseURL: 'http://efima.fun:8080'
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('access_token');
        if (token) {
            if (!config.headers) config.headers = new AxiosHeaders();
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalConfig = error.config;
        const refreshToken = localStorage.getItem('refresh_token');
        if (
            error.response &&
            error.response.status === 401 &&
            !originalConfig._retry &&
            refreshToken &&
            !(originalConfig.url || '').endsWith('/auth/refreshToken')
        ) {
            originalConfig._retry = true;
            try {
                await refresh(refreshToken);
                return axiosInstance(originalConfig);
            } catch (err: any) {
                if (err.response && err.response.data) {
                    return Promise.reject(err.response.data);
                }
                return Promise.reject(err);
            }
        } else {
            return Promise.reject(error);
        }
    }
);