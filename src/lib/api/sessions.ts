import { axiosInstance } from './main';

type Session = {
    userId: string,
    sessionId: string,
    userIp: string,
    userAgent: string,
    userCountry: string,
    userCity: string,
    lastActive: Date
}

/**
 * Gets all active sessions\
 * or errors in case of server error
 */
export const getMySessions = async () => {
    try {
        const { data } : { data: Session[] } = await axiosInstance.get('/sessions');
        return data;
    } catch (err) {
        console.error(err);
        // handle error later
    }
}

/**
 * Remove one specified session\
 * or errors in case of server error
 */
export const endOneSession = async (sessionId: string) => {
    try {
        await axiosInstance.post(`/sessions/end/${sessionId}`);
    } catch (err) {
        console.error(err);
        // handle error later
    }
}

/**
 * Removes all active sessions\
 * or errors in case of server error
 */
export const endAllSessions = async () => {
    try {
        await axiosInstance.post('/sessions/endAll');
    } catch (err) {
        console.error(err);
        // handle error later
    }
}