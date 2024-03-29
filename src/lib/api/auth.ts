import { axiosInstance } from './main';
import { authenticated } from '$lib/stores';
import { goto } from '$app/navigation';

export type TokenPair = {
    access: string,
    refresh: string
};

/**
 * Logs in using credentials\
 * or errors in case they are wrong
 */
export const login = async (username: string, password: string) => {
    try {
        const { data } : { data: TokenPair } = await axiosInstance.post('/auth/login', {
            username,
            password
        });
        localStorage.setItem('access_token', data.access);
        localStorage.setItem('refresh_token', data.refresh);
        authenticated.set(true);
        goto('/');
    } catch (err) {
        console.error(err);
        // handle error later
    }
}

/**
 * Registers a new user\
 * or errors in case they can not be validated
 */
export const register = async (tag: string, email: string, password: string) => {
    try {
        const { data } : { data: TokenPair } = await axiosInstance.post('/auth/register', {
            tag,
            email,
            password
        })
        localStorage.setItem('access_token', data.access);
        localStorage.setItem('refresh_token', data.refresh);
        authenticated.set(true);
        goto('/');
    } catch (err) {
        console.error(err);
        // handle error later
    }
}

/**
 * Logs out\
 * might still error due to server error
 */
export const logout = async () => {
    try {
        await axiosInstance.post('/auth/logout');
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        authenticated.set(false);
        goto('/login');
    } catch (err) {
        window.location.reload();
        console.error(err);
        // handle error later
    }
}