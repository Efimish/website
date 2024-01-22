import axios, { AxiosHeaders } from 'axios';
import { authenticated } from '$lib/stores';
import { goto } from '$app/navigation';
import type { TokenPair } from './auth';

let refreshing: Promise<void> | undefined = undefined;

/**
 * Refreshes user session
 */
const refresh = async (refreshToken: string) => {
    try {
        const { data } : { data: TokenPair } = await axiosInstance.post('/auth/refresh', {
            refreshToken
        });
        localStorage.setItem('access_token', data.access);
        localStorage.setItem('refresh_token', data.refresh);
    } catch (err) {
        console.error(err);
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        authenticated.set(false);
        goto('/login');
        // handle error later
    } finally {
        refreshing = undefined;
    }
}

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

const fixObjectDates = (obj: any) => {
    const iterable = (maybeArr: any) => maybeArr.length ? maybeArr : [maybeArr];
    for(const el of iterable(obj)) {
        for(const [key, value] of Object.entries(el)) {
            if (typeof value !== 'string') continue;
            const date = Date.parse(value);
            if (date) el[key] = date;
        }
    }
}

axiosInstance.interceptors.response.use(
    (response) => {
        fixObjectDates(response)
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
                if (!refreshing) {
                    refreshing = refresh(refreshToken);
                }
                await refreshing;
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