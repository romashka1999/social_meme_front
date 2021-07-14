import React, {useEffect, useRef, useState} from 'react';

import classes from './online.module.css';
import Chat from "../chat/Chat";
import io from "socket.io-client";

interface User {
    firstName: string;
    id: number;
    lastName: string;
    profileImgUrl: string | null;
}

const URL = process.env.REACT_APP_API_URL_Socket + '/chats';


const Online: React.FC<User> = ({id, firstName, lastName, profileImgUrl}) => {
    const [showChat, setShowChat] = useState(false);
    const [receivedSocket, setReceivedSocket] = useState(false);
    const [socket, setSocket] = useState<any>();
    const openChatWindow = () => {
        setShowChat(true);
    }

    useEffect(() => {
        const token = localStorage.getItem("token") as string;

        const socket = io(URL, {
            transports: ["websocket", "polling", "flashsocket"],
            query: { token },
        });

        socket.on("joinRoom", () => {
            socket.emit("joinRoom");
        });

        socket.on('connect', () =>{
            setSocket(socket);
        })
    },[])

    useEffect(() => {
        if(!socket) return;
        setReceivedSocket(true);
    }, [socket])

    return (
        <li className={classes.rightbarFriend} onClick={openChatWindow}>
            <div className={classes.rightbarProfileImageContainer}>
                <img className={classes.rightbarProfileImage}
                     src={profileImgUrl || '/profile.jpg'} alt="profile"/>
                <span className={classes.rightbarOnline}>
                </span>
            </div>
            <span className={classes.rightbarUsername}>{`${firstName} ${lastName}`}</span>
            {
                showChat && receivedSocket && <Chat userId={id.toString()} socket={socket}/>
            }
        </li>

    );
};

export default Online;
