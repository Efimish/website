import { axiosInstance } from './main';

type Health = {
    status: boolean,
    database: {
        status: boolean,
        ping: number | null
    },
    thirdParty: {
        status: boolean,
        ping: number | null
    }
};

/**
 * Checks application health\
 * is everything working fine?
 */
export const checkHealth = async () => {
    try {
        const { data } : { data: Health } = await axiosInstance.get('/health');
        return data;
    } catch (err) {
        console.error(err);
        // handle error later
    }
}