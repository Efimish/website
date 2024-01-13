import { axiosInstance } from './init';

/**
 * Logs in a user
 */
export const login = async (tag: string, password: string) => {
    const response = await axiosInstance.post('/auth/login', {
        tag,
        password
    });
    localStorage.setItem('access_token', response.data.access_token);
    localStorage.setItem('refresh_token', response.data.refresh_token);
    window.location.href = '/';
}

/**
 * Registers a new user in db
 */
export const register = async (tag: string, email: string, password: string) => {
    const response = await axiosInstance.post('/auth/register', {
        tag,
        email,
        password
    })
    localStorage.setItem('access_token', response.data.access_token);
    localStorage.setItem('refresh_token', response.data.refresh_token);
    window.location.href = '/';
}

/**
 * Logs a user out
 */
export const logout = async () => {
    await axiosInstance.post('/auth/logout');
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    window.location.href = '/';
}