import { axiosInstance } from './main';
import type { BaseUser } from './users';

type Chat = {
    chatId: string,
    chatName: string
};

type Message = {
    messageId: string,
    chatId: string,
    senderId: string,
    context: string,
    createdAt: Date,
};

/**
 * Gets all your chats\
 * or errors in case of server error
 */
export const getChats = async () => {
    try {
        const { data } : { data: Chat[] } = await axiosInstance.get('/chats');
        return data;
    } catch (err) {
        console.error(err);
        // handle error later
    }
}

/**
 * Create a new chat and adds you in\
 * or errors in case of server error
 */
export const createChat = async (chatName: string) => {
    try {
        await axiosInstance.post('/chats', {
            chatName
        });
    } catch (err) {
        console.error(err);
        // handle error later
    }
}

/**
 * Gets one chat by id\
 * or errors in case of server error
 */
export const getChat = async (chatId: string) => {
    try {
        const { data } : { data: Chat } = await axiosInstance.get(`/chats/${chatId}`);
        return data;
    } catch (err) {
        console.error(err);
        // handle error later
    }
}

/**
 * Deletes one chat by id\
 * or errors in case of server error
 */
export const deleteChat = async (chatId: string) => {
    try {
        await axiosInstance.delete(`/chats/${chatId}`);
    } catch (err) {
        console.error(err);
        // handle error later
    }
}

/**
 * Gets all messages from one chat\
 * or errors in case of server error
 */
export const getChatMessages = async (chatId: string) => {
    try {
        const { data } : { data: Message[] } = await axiosInstance.get(`/chats/${chatId}/messages`);
        return data;
    } catch (err) {
        console.error(err);
        // handle error later
    }
}

/**
 * Sends a new message\
 * or errors in case of server error
 */
export const sendChatMessage = async (chatId: string, context: string) => {
    try {
        await axiosInstance.post(`/chats/${chatId}/messages`, {
            context
        });
    } catch (err) {
        console.error(err);
        // handle error later
    }
}

/**
 * Gets all users from one chat\
 * or errors in case of server error
 */
export const getChatUsers = async (chatId: string) => {
    try {
        const { data } : { data: BaseUser[] } = await axiosInstance.get(`/chats/${chatId}/users`);
        return data;
    } catch (err) {
        console.error(err);
        // handle error later
    }
}

/**
 * Adds one more user to a chat\
 * or errors in case of server error
 */
export const addChatUser = async (chatId: string, userId: string) => {
    try {
        await axiosInstance.post(`/chats/${chatId}/users`, {
            userId
        });
    } catch (err) {
        console.error(err);
        // handle error later
    }
}