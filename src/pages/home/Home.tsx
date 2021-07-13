import React, {useEffect, useState} from 'react';
import io from 'socket.io-client';

import classes from './home.module.css';
import Topbar from "../../modules/topbar/Topbar";
import Sidebar from "../../modules/sidebar/Sidebar";
import Feed from "../../modules/feed/Feed";
import Rightbar from "../../modules/rightbar/Rightbar";
import {getFolloweesPosts} from "../../modules/feed/posts.service";

let socket;
const URL = 'http://f4fb68c685a2.ngrok.io/';

const Home = () => {
    const [posts, setPosts] = useState([])
    const [postsCount, setPostsCount] = useState(0);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getFolloweesPosts(0, 10)
            .then(response => {
                console.log('response.data :>> ', response.data);
                setPosts(response.data.posts);
                setPostsCount(response.data.count)
                setLoading(false);
                console.log(`posts`, posts)
            })

    }, []);

    const postSocketConnection = () => {
        console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaa');
        const socket = io('http://96e8fc7a653e.ngrok.io')

        socket.on('joinRoom', () => {
            console.log('aman mitxra join roomooo');
        })
    }

    postSocketConnection();

    return (
        <>
            <Topbar/>
            <div className={classes.homeContainer}>
                <Sidebar/>
                <Feed posts={posts}/>
                <Rightbar isHome={true}/>
            </div>
        </>
    );
};

export default Home;
