import React from 'react';

import classes from './closeFriend.module.css';

interface User {
    id: number;
    profilePicture: string;
    username: string;
}
const CloseFriend: React.FC<User> = ({id, profilePicture, username}) => {
    return (
        <li className={classes.sidebarFriend}>
            <img className={classes.sidebarFriendImg} src="https://cdn.shopify.com/s/files/1/0045/5104/9304/t/27/assets/AC_ECOM_SITE_2020_REFRESH_1_INDEX_M2_THUMBS-V2-1.jpg?v=8913815134086573859" alt="friend"/>
            <span className={classes.sidebarFriendName}>{username}</span>
        </li>
    );
};

export default CloseFriend;
