import React, { useEffect, useState } from "react";
import io from "socket.io-client";

import classes from "./home.module.css";
import Topbar from "../../modules/topbar/Topbar";
import Sidebar from "../../modules/sidebar/Sidebar";
import Feed from "../../modules/feed/Feed";
import Rightbar from "../../modules/rightbar/Rightbar";
import { getFolloweesPosts } from "../../modules/feed/posts.service";

const URL = "http://09e8ada14ca6.ngrok.io/posts";

const Home = () => {
    const [posts, setPosts] = useState<any[]>([]);
    const [postsCount, setPostsCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [onlineUsers, setOnlineUsers] = useState();

    useEffect(() => {
        getFolloweesPosts(0, 10).then((response) => {
            console.log("response.data :>> ", response.data);
            setPosts(response.data.posts);
            setPostsCount(response.data.count);
            setLoading(false);
            console.log(`posts`, posts);
        });
    }, []);

    useEffect(() => {
        const token = localStorage.getItem("token") as string;
        console.log(`token`, token);

        const socket = io(URL, {
            transports: ["websocket", "polling", "flashsocket"],
            query: { token },
        });

        socket.on("joinRoom", () => {
            socket.emit("joinRoom");
        });

        socket.on("postCreated", (post) => {
            setPosts((oldPosts) => {
                return [post ,...oldPosts]
            });
        });

        socket.emit("onlineFriends");
        socket.on('onlineFriends', (users) => {
            setOnlineUsers(users);
        })
    }, []);

    return (
        <>
            <Topbar />
            <div className={classes.homeContainer}>
                <Sidebar />
                <Feed posts={posts} />
                <Rightbar isHome={true} users={onlineUsers} />
            </div>
        </>
    );
};

export default Home;
