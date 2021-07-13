import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";

import classes from './profile.module.css';
import Topbar from "../../modules/topbar/Topbar";
import Sidebar from "../../modules/sidebar/Sidebar";
import Feed from "../../modules/feed/Feed";
import Rightbar from "../../modules/rightbar/Rightbar";
import {
    followUser,
    getProfile,
    unFollowUser,
    uploadCoverPictureToServer,
    uploadProfilePictureToServer
} from "./services/users.service";
import {Button} from "@material-ui/core";
import {Edit} from "@material-ui/icons";
import {getFolloweesPosts, getUserPosts} from "../../modules/feed/posts.service";
import Chat from "../../modules/chat/Chat";

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
    const [posts, setPosts] = useState([])
    const [postsCount, setPostsCount] = useState(0);
    const [profile, setProfile] = useState<Profile>();
    const {userId} = useParams<{ userId: string }>();
    const isMe = +userId === JSON.parse(localStorage.getItem('user') || '{}').id;


    useEffect(() => {
        getProfile(userId, isMe)
            .then(response => {
                setProfile(response.data)
            });
    }, []);


    useEffect(() => {
        getUserPosts(0, 10, userId)
            .then(response => {
                console.log('response.data :>> ', response.data);
                setPosts(response.data.posts);
                setPostsCount(response.data.count)
                console.log(`posts`, posts)
            })

    }, [])

    const updateFollowStatus = () => {
        console.log(profile?.existsFollowing);
        profile?.existsFollowing ? unFollowUser(userId) : followUser(userId);
        setProfile(prevState => {
            const isFollowing = prevState?.existsFollowing;
            return {
                ...prevState,
                followersCount: prevState!.followersCount + (isFollowing ? -1 : 1),
                existsFollowing: !isFollowing
            } as Profile
        })
    }

    const toggleEditButton = (selector: string, isVisible: boolean) => {
        const element = document.querySelector(`#${selector}`) as HTMLElement;
        element.style.display = isVisible ? 'block' : 'none';
    }

    const uploadProfilePicture = () => {
        const image = document.querySelector('#profile_picture') as HTMLImageElement;
        const input = document.querySelector('#uploadProfilePictureInput') as HTMLInputElement;
        const reader = new FileReader();
        input.click();
        input.onchange = (event: any) => {
            if (event.target?.files?.length === 1) {
                uploadProfileToServer(event.target.files[0]);
                reader.addEventListener('load', (event: any) => {
                    image.src = event.target.result;
                });
                reader.readAsDataURL(event.target.files[0]);
            }
        }
    }

    const uploadCoverPicture = () => {
        const image = document.querySelector('#cover_picture') as HTMLImageElement;
        const input = document.querySelector('#uploadCoverPictureInput') as HTMLInputElement;
        const reader = new FileReader();
        input.click();
        input.onchange = (event: any) => {
            if (event.target?.files?.length === 1) {
                uploadCoverToServer(event.target.files[0]);
                reader.addEventListener('load', (event: any) => {
                    image.src = event.target.result;
                });
                reader.readAsDataURL(event.target.files[0]);
            }
        }
    }

    const uploadCoverToServer = (file: any) => {
        const formData = new FormData();
        formData.set('file', file);
        uploadCoverPictureToServer(formData)
            .then(console.log);
    }

    const uploadProfileToServer = (file: any) => {
        const formData = new FormData();
        formData.set('file', file);
        uploadProfilePictureToServer(formData)
            .then(console.log);
    }

    return (
        <>
            <Topbar/>
            <div className={classes.profile}>
                <Sidebar/>
                <div className={classes.profileRight}>
                    <div className={classes.profileRightTop}>
                        <div className={classes.profileCover}>
                            <div className={classes.profileCoverWrapper}>
                                <img
                                    id='cover_picture'
                                    className={classes.profileCoverImage}
                                    src={profile?.coverImgUrl || '/cover.png'}
                                    alt="profile"
                                    onMouseEnter={() => toggleEditButton('profileCoverImageEdit', true)}
                                    onMouseLeave={() => toggleEditButton('profileCoverImageEdit', false)}
                                />
                                <Edit className={`${classes.imageEdit} ${classes.profileCoverImageEdit}`}
                                      id='profileCoverImageEdit'
                                      onMouseEnter={() => toggleEditButton('profileCoverImageEdit', true)}
                                      onClick={uploadCoverPicture}
                                />
                                <input type="file" hidden={true} accept="image/png, image/jpeg"
                                       id="uploadCoverPictureInput"/>
                            </div>
                            <div className={classes.profileUserImage}
                                 onMouseEnter={() => toggleEditButton('profileImageEdit', true)}
                                 onMouseLeave={() => toggleEditButton('profileImageEdit', false)}>
                                <img
                                    id="profile_picture"
                                    src={profile?.profileImgUrl || '/profile.jpg'}
                                    alt="profile"
                                />
                                <div className={`${classes.imageEdit} ${classes.profileImageEdit}`}
                                     id='profileImageEdit'
                                     onClick={uploadProfilePicture}>Edit
                                </div>
                                <input type="file" hidden={true} accept="image/png, image/jpeg"
                                       id="uploadProfilePictureInput"/>
                            </div>
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
                        <Feed posts={posts}/>
                        <Rightbar isHome={false}
                                  follower={profile?.followersCount}
                                  following={profile?.followingsCount}/>
                    </div>
                </div>

                <div className={classes.chat}>
                    <Chat/>
                </div>
            </div>
        </>
    );
};

export default Profile;
