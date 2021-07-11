import React, {useState} from 'react';

import classes from './post.module.css';
import {MoreVert} from "@material-ui/icons";

import {Users} from '../../test';
// commentsCount: 0
// content: "123123"
// createdAt: "2021-06-13T10:18:40.543Z"
// id: 2
// reactsCount: 0
// sharesCount: 0
// updatedAt: "2021-06-13T10:18:40.543Z"
interface post {
    id: number;
    content?: string | undefined;
    files: Array<any>;
    createdAt: string;
    user: any;
    reactsCount: number;
    commentsCount: number;
    sharesCount: number;
    isLiked: boolean;
}

const Post: React.FC<post> = ({id, content, files, createdAt, user, reactsCount, commentsCount, isLiked}) => {
    const [react, setReact] = useState<number>(reactsCount);

    const likeHandler = () => {
        //setReact(isLiked ? react - 1: react + 1);
        // setIsliked(isLiked);
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
                        <span className={classes.postUsername}>{user.firstName}</span>
                        <span className={classes.postDate}>{new Date(createdAt).toDateString()}</span>
                    </div>
                    <div className={classes.postTopRight}>
                        <MoreVert/>
                    </div>

                </div>
                <div className={classes.postCenter}>
                    <span className={classes.postText}>{content}</span>
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
                        <span className={classes.postCommentText}>{commentsCount} comments</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Post;
