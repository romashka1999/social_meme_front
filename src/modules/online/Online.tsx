import React from 'react';

import classes from './online.module.css';

interface User {
    firstName: string;
    id: number;
    lastName: string;
    profileImgUrl: string | null;
}

const Online: React.FC<User> = ({id, firstName, lastName, profileImgUrl}) => {
    const openChatWindow = () => {
        // const button = document.querySelector('.sc-launcher') as HTMLElement;
        // button?.click();
    }

    return (
        <li className={classes.rightbarFriend} onClick={openChatWindow}>
            <div className={classes.rightbarProfileImageContainer}>
                <img className={classes.rightbarProfileImage}
                     src={profileImgUrl || '/profile.jpg'} alt="profile"/>
                <span className={classes.rightbarOnline}>
                </span>
            </div>
            <span className={classes.rightbarUsername}>{`${firstName} ${lastName}`}</span>
        </li>
    );
};

export default Online;
