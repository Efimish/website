import { axiosInstance } from './api/main';
import { browser } from '$app/environment';
import { writable, type Writable } from 'svelte/store';

type User = {
    id: number,
    tag: string,
    email: string,
    created_at: string,
    username: string,
    status: string,
    currentSession: string,
    sessions: [
        {
            session_id: string,
            user_ip: string,
            user_location: string,
            user_agent: string,
            created_at: string
        }
    ]
};

const getMyUser = () => {
    if (!(browser && localStorage.getItem('refresh_token'))) return undefined;
    axiosInstance.get('/myuser').then((resp) => {
        return resp.data;
    })
}

export const currentUser: Writable<User | undefined> = writable(getMyUser());

// if (browser) {
//     if (localStorage.getItem('refresh_token')) {
//         const resp = await axiosInstance.get('/myuser');
//         currentUser = resp.data;
//     }
// }


// if (browser) {
//     if (localStorage.getItem('refresh_token')) {
//         const resp = await axiosInstance.get('/myuser');
//         currentUser = resp.data;
//         // const pfp = await axiosInstance.get(`/media/${currentUser.avatar}`, {
//         //     responseType: 'blob'
//         // });
//         // currentUser.avatar = window.URL.createObjectURL(pfp.data);
//     }
// }