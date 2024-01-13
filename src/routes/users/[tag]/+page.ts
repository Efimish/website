import { axiosInstance } from '$lib/api/init';
import { browser } from '$app/environment';

export async function load({ params }) {
    if (!browser) return;
    const resp = await axiosInstance.get(`/users/${params.tag}`);
    return { user: resp.data };
}