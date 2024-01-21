import { writable, type Writable } from 'svelte/store';
import type { FullUser } from '$lib/api/users';
import { getMyUser } from '$lib/api/users';

export const authenticated: Writable<boolean> = writable(
    !!localStorage.getItem('access_token') && !!localStorage.getItem('refresh_token')
);

// export const myUser: Writable<FullUser> = writable(
//     getMyUser()
// )