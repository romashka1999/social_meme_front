import React from 'react';

import classes from './share.module.css'
import {EmojiEmotions, Label, PermMedia, Room} from "@material-ui/icons";

const Share = () => {
    return (
        <div className={classes.share}>
            <div className={classes.shareWrapper}>
                <div className={classes.shareTop}>
                    <img className={classes.shareProfileImage} src="https://cdn.britannica.com/22/206222-131-E921E1FB/Domestic-feline-tabby-cat.jpg" alt="post"/>
                    <input placeholder="Whats in your mind" className={classes.shareInput}/>
                </div>
                <hr className={classes.shareHr}/>
                <div className={classes.shareBottom}>
                    <div className={classes.shareOptions}>
                        <div className={classes.shareOption}>
                            <PermMedia htmlColor="tomato" className={classes.shareIcon}/>
                            <span className={classes.shareOptionText}>Photo or Video</span>
                        </div>
                        <div className={classes.shareOption}>
                            <Label htmlColor="blue" className={classes.shareIcon}/>
                            <span className={classes.shareOptionText}>Tag</span>
                        </div>
                        <div className={classes.shareOption}>
                            <Room htmlColor="green" className={classes.shareIcon}/>
                            <span className={classes.shareOptionText}>Location</span>
                        </div>
                        <div className={classes.shareOption}>
                            <EmojiEmotions htmlColor="goldenrod" className={classes.shareIcon}/>
                            <span className={classes.shareOptionText}>Emoji</span>
                        </div>
                    </div>
                    <button className={classes.shareButton}>Share</button>
                </div>
            </div>
        </div>
    );
};

export default Share;
