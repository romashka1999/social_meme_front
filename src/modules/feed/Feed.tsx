import React, { useEffect, useState } from 'react';

import classes from './feed.module.css'
import Share from "../share/Share";
import Post from "../post/Post";

import { getFolloweesPosts } from './posts.service';

const Feed: React.FC<any> = ({posts}: any) => {
    return (
        <div className={classes.feed}>
            <div className={classes.feedWrapper}>
                <Share/>
                {
                    posts && posts.map((post: any) => {
                        return <Post key={post.id} {...post}/>
                    })
                }
            </div>
        </div>
    );
};

export default Feed;
