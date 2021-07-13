import React, {useEffect, useState} from 'react';
// @ts-ignore
import {Launcher} from 'popup-chat-react';


import classes from './chat.module.css';

let socket: any;
const CONNECTION_PORT = 'localhost:3000/';

interface Props {
    messages?: Array<any>;
    channel?: string;

}

const Chat = () => {

    const [chatData, setChatData] = useState({
        messageList: [],
        newMessagesCount: 0,
        isOpen: false,
        fileUpload: false,
    });
    const [button, setButton] = useState<HTMLElement>();

    useEffect(() => {
        const button = document.querySelector('.sc-launcher') as HTMLElement;
        const header = document.querySelector('.sc-header') as HTMLElement;
        button.style.display = 'none';
        header.style.background = '#1877f3';
        setButton(button);
    }, [])

    const [room, setRoom] = useState('');
    const [userName, setUserName] = useState('');

    // useEffect(() => {
    //     socket = io(CONNECTION_PORT, channel);
    // }, [CONNECTION_PORT])

    const connectToRoom = () => {
        socket.emit('join-room');
    }

    const onMessageWasSent = (message: string) => {
        setChatData(chatData => ({
            ...chatData,
            messageList: [...chatData.messageList, message]
        }) as any);
    }

    const sendMessage = (text: string) => {
        if (text.length > 0) {
            const newMessagesCount = chatData.isOpen ? chatData.newMessagesCount : chatData.newMessagesCount + 1;

            setChatData(chatData => ({
                ...chatData,
                newMessagesCount: newMessagesCount,
                messageList: [
                    ...chatData.messageList,
                    {
                        author: 'them',
                        type: 'text',
                        data: {text}
                    }
                ]
            }) as any);
        }
    }

    const onClick = () => {
        setChatData(chatData => ({
            ...chatData,
            isOpen: !chatData.isOpen,
            newMessagesCount: 0
        }));
    }

    return (
        <Launcher
            className={classes.launcher}
            agentProfile={{
                teamName: 'popup-chat-react',
                imageUrl: 'https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png'
            }}
            onMessageWasSent={onMessageWasSent}
            messageList={chatData.messageList}
            newMessagesCount={chatData.newMessagesCount}
            onClick={onClick}
            isOpen={chatData.isOpen}
            showEmoji
            fileUpload={false}
            placeholder='Enter your message'
        />
    );
};

export default Chat;
