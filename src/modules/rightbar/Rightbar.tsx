import React, {useEffect, useState} from 'react';

import classes from './rightbar.module.css';
import {Users} from '../../test';
import Online from "../online/Online";
import {getFollowees} from "../../pages/profile/services/users.service";

interface Props {
    isHome: boolean;
    follower?: number;
    following?: number;
    userId?: string;
    users?: any[];
}

const Rightbar: React.FC<Props> = ({isHome, follower, following, userId, users}) => {
    const [followees, setFollowees] = useState<any>();
    useEffect(() => {
        if(!userId) return;
        getFollowees(userId)
            .then(response => setFollowees(response.data.followees))
    }, [userId])

    const HomeRightBar = () => {
        return (
            <>
                <img className={classes.rightbarAd} src="assets/ad.jpg" alt="ad"/>
                <h4 className={classes.rightbarTitle}>Online Friends</h4>
                <ul className={classes.rightbarFriendList}>

                    {
                        users && users.map(user => (
                            <Online key={user.id} {...user}/>
                        ))
                    }
                </ul>
            </>
        )
    }


    const ProfileRightBar = () => {
        return (
            <>
                <h4 className={classes.rightbarTitle}>User Information</h4>
                <div className={classes.rightbarInfo}>
                    <div className={classes.rightbarInfoItem}>
                        <span className={classes.rightbarInfoKey}>Follower: </span>
                        <span className={classes.rightbarInfoValue}>{ follower }</span>
                    </div>
                    <div className={classes.rightbarInfoItem}>
                        <span className={classes.rightbarInfoKey}>Following: </span>
                        <span className={classes.rightbarInfoValue}> {following} </span>
                    </div>
                </div>
                <h4 className={classes.rightbarTitle}>User Followees</h4>
                <div className={classes.rightbarFollowings}>
                    {
                        followees && followees.map((followee: any) => (
                            <div className={classes.rightbarFollowing} key={followee.id}>
                                <img className={classes.rightbarFollowingImage}
                                     src={followee.profileImgUrl || '/profile.jpg'}
                                     alt="following"/>
                                <span className={classes.rightbarFollowingName}>
                                    {`${followee.firstName} ${followee.lastName}`}
                                </span>
                            </div>
                        ))

                    }
                </div>

            </>
        )
    }


    return (
        <div className={classes.rightbar}>
            <div className={classes.rightbarWrapper}>
                {isHome ? <HomeRightBar/> : <ProfileRightBar/>}
            </div>
        </div>
    )
}

export default Rightbar;
