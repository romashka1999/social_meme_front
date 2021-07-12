import React, { useEffect, useState } from 'react';

import classes from './feed.module.css'
import Share from "../share/Share";
import Post from "../post/Post";

import { getFolloweesPosts } from './posts.service';

const Feed: React.FC<any> = ({posts}: any) => {
    console.log(posts);
    return (
        <div className={classes.feed}>
            <div className={classes.feedWrapper}>
                <Share/>
                {
                    posts.length && posts.map((post: any) => {
                        return <Post  {...post}/>
                    })
                }
            </div>
        </div>
    );
};

export default Feed;
