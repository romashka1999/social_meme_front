import React from 'react';

import classes from './feed.module.css'
import Share from "../share/Share";
import Post from "../post/Post";

import {Posts} from "../../test";

const Feed = () => {
    return (
        <div className={classes.feed}>
            <div className={classes.feedWrapper}>
                <Share/>
                {
                    Posts.map(post => {
                        return <Post key={post.id} {...post}/>
                    })
                }

            </div>
        </div>
    );
};

export default Feed;
