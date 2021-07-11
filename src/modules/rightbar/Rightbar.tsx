import React from 'react';

import classes from './rightbar.module.css';
import {Users} from '../../test';
import Online from "../online/Online";

interface Props {
    isHome: boolean;
    follower?: number;
    following?: number;
}

const Rightbar: React.FC<Props> = ({isHome, follower, following}) => {
    const HomeRightBar = () => {
        return (
            <>
                <div className={classes.birthdayContainer}>
                    <img className={classes.birthdayImage} src="assets/gift.png" alt="gift"/>
                    <span className={classes.birthdayText}>
                        <b>Irakli</b> and <b>2 other friends</b> have a birthday today
                    </span>
                </div>
                <img className={classes.rightbarAd} src="assets/ad.jpg" alt="ad"/>
                <h4 className={classes.rightbarTitle}>Online Friends</h4>
                <ul className={classes.rightbarFriendList}>

                    {
                        Users.map(user => (
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
                <h4 className={classes.rightbarTitle}>User Friends</h4>
                <div className={classes.rightbarFollowings}>
                    <div className={classes.rightbarFollowing}>
                        <img className={classes.rightbarFollowingImage}
                             src="https://cdn.britannica.com/s:800x450,c:crop/34/180334-138-4235A017/subordinate-meerkat-pack.jpg"
                             alt="following"/>
                        <span className={classes.rightbarFollowingName}>John test</span>
                    </div>
                    <div className={classes.rightbarFollowing}>
                        <img className={classes.rightbarFollowingImage}
                             src="https://cdn.britannica.com/s:800x450,c:crop/34/180334-138-4235A017/subordinate-meerkat-pack.jpg"
                             alt="following"/>
                        <span className={classes.rightbarFollowingName}>John test</span>
                    </div>
                    <div className={classes.rightbarFollowing}>
                        <img className={classes.rightbarFollowingImage}
                             src="https://cdn.britannica.com/s:800x450,c:crop/34/180334-138-4235A017/subordinate-meerkat-pack.jpg"
                             alt="following"/>
                        <span className={classes.rightbarFollowingName}>John test</span>
                    </div>
                    <div className={classes.rightbarFollowing}>
                        <img className={classes.rightbarFollowingImage}
                             src="https://cdn.britannica.com/s:800x450,c:crop/34/180334-138-4235A017/subordinate-meerkat-pack.jpg"
                             alt="following"/>
                        <span className={classes.rightbarFollowingName}>John test</span>
                    </div>
                    <div className={classes.rightbarFollowing}>
                        <img className={classes.rightbarFollowingImage}
                             src="https://cdn.britannica.com/s:800x450,c:crop/34/180334-138-4235A017/subordinate-meerkat-pack.jpg"
                             alt="following"/>
                        <span className={classes.rightbarFollowingName}>John test</span>
                    </div>
                    <div className={classes.rightbarFollowing}>
                        <img className={classes.rightbarFollowingImage}
                             src="https://cdn.britannica.com/s:800x450,c:crop/34/180334-138-4235A017/subordinate-meerkat-pack.jpg"
                             alt="following"/>
                        <span className={classes.rightbarFollowingName}>John test</span>
                    </div>
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
