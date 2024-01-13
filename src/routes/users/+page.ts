import { axiosInstance } from '$lib/api/init';
import { browser } from '$app/environment';

export async function load() {
    if (!browser) return;
    const resp = await axiosInstance.get('/users');
    return { users: resp.data };
}