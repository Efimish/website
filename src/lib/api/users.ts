import { axiosInstance } from './main';

export type BaseUser = {
    userId: string,
    username: string,
    displayName: string,
    status: string | null,
    online: Date
};

export type FullUser = {
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
        const { data } : { data: BaseUser[] } = await axiosInstance.get('/users');
        return data;
    } catch (err) {
        console.error(err);
        // handle error later
    }
}

/**
 * Gets user by user id\
 * or errors in case of server error
 */
export const getUser = async (userId: string) => {
    try {
        const { data } : { data: BaseUser } = await axiosInstance.get(`/users/${userId}`);
        return data;
    } catch (err) {
        console.error(err);
        // handle error later
    }
}

/**
 * Gets userId by username\
 * or errors in case of server error
 */
export const getUserByUsername = async (username: string) => {
    try {
        const { data } : { data: BaseUser } = await axiosInstance.get(`/users/username/${username}`);
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
        const { data } : { data: FullUser } = await axiosInstance.get('/user');
        return data;
    } catch (err) {
        console.error(err);
        // handle error later
    }
}

/**
 * Updates current user\
 * or errors in case of server error
 */
export const editMyUser = async (params: Partial<{
    username: string | undefined,
    email: string | undefined,
    password: string | undefined,
    displayName: string | undefined,
    status: string | undefined
}>) => {
    try {
        const { data } : { data: FullUser } = await axiosInstance.put('/user', {
            username: params.username,
            email: params.email,
            password: params.password,
            displayName: params.displayName,
            status: params.status
        });
        return data;
    } catch (err) {
        console.error(err);
        // handle error later
    }
}

/**
 * Deletes current user\
 * or errors in case of server error
 */
export const deleteMyUser = async () => {
    try {
        await axiosInstance.delete('/user');
    } catch (err) {
        console.error(err);
        // handle error later
    }
}