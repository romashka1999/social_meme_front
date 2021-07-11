import React, { useEffect, useState } from 'react';

import classes from './feed.module.css'
import Share from "../share/Share";
import Post from "../post/Post";

import { getFolloweesPosts } from './posts.service';

const Feed = () => {

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
        
    }, [])
    return (
        <div className={classes.feed}>
            <div className={classes.feedWrapper}>
                <Share/>
                {
                    !loading && posts.map(post => {
                        return <Post  {...post}/>
                    })
                }
            </div>
        </div>
    );
};

export default Feed;
