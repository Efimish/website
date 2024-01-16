import { axiosInstance } from './main';

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
export const getMyChats = async () => {
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
 * Gets all messages from one chat\
 * or errors in case of server error
 */
export const getChatMessages = async (chatId: string) => {
    try {
        const { data } : { data: Message[] } = await axiosInstance.get(`/messages/${chatId}`);
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
        await axiosInstance.post('/messages', {
            chatId,
            context
        });
    } catch (err) {
        console.error(err);
        // handle error later
    }
}