import React, {useEffect, useState} from 'react';
// @ts-ignore
import {Launcher} from 'popup-chat-react';


import classes from './chat.module.css';
import {getMessages, getMessagesId, sendMessageBack} from "../../pages/profile/services/users.service";


interface Props {
    userId: string;
    socket: any;
}



const Chat: React.FC<Props> = ({userId, socket}) => {
    const [id, setId] = useState<string>();
    const [room, setRoom] = useState('');
    const [userName, setUserName] = useState('');
    const [button, setButton] = useState<HTMLElement>();

    const currentUserId = JSON.parse(localStorage.getItem('user') || '{}').id;

    const [chatData, setChatData] = useState({
        messageList: [],
        newMessagesCount: 0,
        isOpen: true,
        fileUpload: false,
    });

    useEffect(() => {
        if(!socket) return;
        socket.on("messageCreated", (message: any) => {

            const newMessage = {
                author: message.userId === currentUserId ? 'me': 'them',
                type: 'text',
                data: {text: message.content}
            }
            setChatData(prevState => {
                return {
                    ...prevState,
                    messageList: [...prevState.messageList, newMessage]
                } as any
            })

        });
    }, [socket])

    useEffect(() => {
        getMessagesId(userId)
            .then(response => setId(response.data._id));

    }, [])


    useEffect(() => {
        if(!id) return;
        getMessages(id)
            .then(response => {
                const newMessages = response.data.reverse().map((message: any) => {
                    return {
                        author: message.userId === currentUserId ? 'me': 'them',
                        type: 'text',
                        data: {text: message.content}
                    }
                })
                setChatData(prevState => {
                    return {
                        ...prevState,
                        messageList: [...prevState.messageList, ...newMessages]
                    } as any
                })
            })
    }, [id])



    useEffect(() => {
        const button = document.querySelector('.sc-launcher') as HTMLElement;
        const header = document.querySelector('.sc-header') as HTMLElement;
        button.style.display = 'none';
        header.style.background = '#1877f3';
        setButton(button);
    }, [])


    const onMessageWasSent = (message: any) => {
        console.log(message);
        sendMessageBack(id! ,message.data.text)
            .then(console.log);
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
