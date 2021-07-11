import React, {useState} from 'react';

import classes from './post.module.css';
import {MoreVert} from "@material-ui/icons";

import {Users} from '../../test';

interface post {
    id: number;
    desc?: string | undefined;
    photo: string;
    date: string;
    userId: number;
    like: number;
    comment: number;
}

const Post: React.FC<post> = ({id, desc, photo, date, userId, like, comment}) => {
    const [react, setReact] = useState<number>(like);
    const [isLiked, setIsliked] = useState<boolean>(false);

    const likeHandler = () => {
        setReact(isLiked ? react - 1: react + 1);
        setIsliked(!isLiked);
    }

    const username = Users.filter(u => u.id === id)[0].username;
    return (
        <div className={classes.post}>
            <div className={classes.postWrapper}>
                <div className={classes.postTop}>
                    <div className={classes.postTopLeft}>
                        <img className={classes.postProfileImage}
                             src="https://i.pinimg.com/736x/d6/0c/7e/d60c7e8983fdbd7c7a27fd42fb3d61ba.jpg"
                             alt="post Img"/>
                        <span className={classes.postUsername}>{username}</span>
                        <span className={classes.postDate}>{date}</span>
                    </div>
                    <div className={classes.postTopRight}>
                        <MoreVert/>
                    </div>

                </div>
                <div className={classes.postCenter}>
                    <span className={classes.postText}>{desc}</span>
                    <img className={classes.postImage}
                         src="https://i.pinimg.com/736x/d6/0c/7e/d60c7e8983fdbd7c7a27fd42fb3d61ba.jpg" alt="post"/>
                </div>
                <div className={classes.postBottom}>
                    <div className={classes.postBottomLeft}>
                        <img className={classes.likeIcon} src="assets/like.png" alt="react" onClick={likeHandler}/>
                        <img className={classes.likeIcon} src="assets/heart.png" alt="react" onClick={likeHandler}/>
                        <span className={classes.postLikeCounter}>{react} people reacted</span>
                    </div>
                    <div className={classes.postBottomRight}>
                        <span className={classes.postCommentText}>{comment} comments</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Post;
