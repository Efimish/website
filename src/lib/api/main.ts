import axios, { AxiosHeaders } from 'axios';
import { refresh } from './auth';

export const axiosInstance = axios.create({
    // baseURL: 'http://localhost:3000'
    baseURL: 'http://efima.fun:3000'
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
    (response) => {
        if (!response.data.length) {
            for (const date of ['online', 'lastActive', 'createdAt']) {
                if (response.data[date]) {
                    response.data[date] = new Date(response.data[date]);
                }
            }
        }
        else {
            for (const el of response.data) {
                for (const date of ['online', 'lastActive', 'createdAt']) {
                    if (el[date]) {
                        el[date] = new Date(el[date]);
                    }
                }
            }
        }
        return response;
    },
    async (error) => {
        const originalConfig = error.config;
        const refreshToken = localStorage.getItem('refresh_token');
        if (
            error.response &&
            error.response.status === 401 &&
            !originalConfig._retry &&
            refreshToken &&
            !(originalConfig.url || '').endsWith('/auth/refresh')
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