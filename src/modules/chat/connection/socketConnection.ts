import io from 'socket.io-client';

let socket;
const URL = process.env.REACT_APP_API_URL

export const createChat = (chatId: string) => {
    socket = io()
}
