import { axiosInstance } from './main';

type BaseUser = {
    userId: string,
    username: string,
    displayName: string,
    status: string | null
};

type FullUser = {
    userId: string,
    username: string,
    email: string,
    displayName: string,
    status: string | null
};

/**
 * Gets all users from database\
 * or errors in case of server error
 */
export const getUsers = async () => {
    try {
        const { data } : { data: BaseUser } = await axiosInstance.get('/users');
        return data;
    } catch (err) {
        console.error(err);
        // handle error later
    }
}

/**
 * Gets user by username\
 * or errors in case of server error
 */
export const getUser = async (username: string) => {
    try {
        const { data } : { data: BaseUser } = await axiosInstance.get(`/users/${username}`);
        return data;
    } catch (err) {
        console.error(err);
        // handle error later
    }
}

/**
 * Gets current user\
 * or errors in case of server error
 */
export const getMyUser = async () => {
    try {
        const { data } : { data: FullUser } = await axiosInstance.get('/me/user');
        return data;
    } catch (err) {
        console.error(err);
        // handle error later
    }
}