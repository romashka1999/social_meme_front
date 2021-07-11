import React from 'react';

import classes from './online.module.css';

interface User {
    id: number;
    profilePicture: string;
    username: string;
}

const Online: React.FC<User> = ({id, username, profilePicture}) => {
    return (
        <li className={classes.rightbarFriend}>
            <div className={classes.rightbarProfileImageContainer}>
                <img className={classes.rightbarProfileImage}
                     src="https://hatrabbits.com/wp-content/uploads/2017/01/random.jpg" alt="profile"/>
                <span className={classes.rightbarOnline}>

                </span>
            </div>
            <span className={classes.rightbarUsername}>{username}</span>
        </li>
    );
};

export default Online;
