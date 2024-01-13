import axios, { AxiosHeaders } from 'axios';

export const axiosInstance = axios.create({
    // baseURL: 'http://localhost:8080'
    baseURL: 'http://efima.fun:8080'
});

const refreshToken = async (rToken: string) => {
    try {
        const { data } = await axiosInstance.post('/auth/refreshToken', {
            refreshToken: rToken,
        });
        localStorage.setItem('access_token', data.access_token);
        localStorage.setItem('refresh_token', data.refresh_token);
    } catch (err) {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        window.location.reload();
    }
}

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
        const rToken = localStorage.getItem('refresh_token');
        if (
            error.response &&
            error.response.status === 401 &&
            !originalConfig._retry &&
            rToken &&
            !(originalConfig.url || '').endsWith('/auth/refreshToken')
        ) {
            originalConfig._retry = true;
            try {
                await refreshToken(rToken);
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