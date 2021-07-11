import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";

import classes from './profile.module.css';
import Topbar from "../../modules/topbar/Topbar";
import Sidebar from "../../modules/sidebar/Sidebar";
import Feed from "../../modules/feed/Feed";
import Rightbar from "../../modules/rightbar/Rightbar";
import {followUser, getProfile, unFollowUser} from "./services/users.service";
import {Button} from "@material-ui/core";
import {Edit} from "@material-ui/icons";

interface Profile {
    id: number;
    "firstName": string;
    "lastName": string;
    "email": string;
    "profileImgUrl": string | null;
    "coverImgUrl": string | null;
    followersCount: number;
    followingsCount: number;
    existsFollowing?: boolean;
}

const Profile: React.FC = (props) => {

    const [profile, setProfile] = useState<Profile>();
    const {userId} = useParams<{ userId: string }>();
    const isMe = +userId === JSON.parse(localStorage.getItem('user') || '{}').id;
    useEffect(() => {
        getProfile(userId, isMe)
            .then(response => {
                setProfile(response.data)
            });
    }, []);

    const updateFollowStatus = () => {
        console.log(profile?.existsFollowing);
        profile?.existsFollowing ? unFollowUser(userId) : followUser(userId);
        setProfile(prevState => {
            const isFollowing = prevState?.existsFollowing;
            return {...prevState,
                followersCount: prevState!.followersCount + (isFollowing ? -1: 1),
                existsFollowing: !isFollowing} as Profile
        })
    }

    return (
        <>
            <Topbar/>
            <div className={classes.profile}>
                <Sidebar/>
                <div className={classes.profileRight}>
                    <div className={classes.profileRightTop}>
                        <div className={classes.profileCover}>
                            <img
                                 className={classes.profileCoverImage}
                                 src={profile?.coverImgUrl || '/cover.png'}
                                 alt="profile"/>
                            <img className={classes.profileUserImage}
                                 src={profile?.profileImgUrl || '/profile.jpg'}
                                 alt="profile"/>
                        </div>
                        <div className={classes.profileInfo}>
                            <h4 className={classes.profileInfoName}>{profile?.firstName}</h4>
                            <span className={classes.profileInfoDesc}>{profile?.lastName}</span>
                            {isMe ? null :
                                <div className={classes.followButtonContainer}>
                                    <Button onClick={updateFollowStatus}
                                        className={classes.followButton} color='default'
                                            variant='contained'>{profile?.existsFollowing ? "unfollow" : 'follow'}</Button>
                                </div>
                            }
                        </div>
                    </div>
                    <div className={classes.profileRightBottom}>
                        <Feed/>
                        <Rightbar isHome={false}
                                  follower={profile?.followersCount}
                                  following={profile?.followingsCount}/>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Profile;
