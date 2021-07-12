import React, {useState} from 'react';

import classes from './share.module.css'
import {EmojiEmotions, Label, PermMedia, Room} from "@material-ui/icons";
import {createPost} from "../feed/posts.service";

const Share = () => {
    const [file, setFile] = useState<any>();
    const [content, setContent] = useState<string>("");

    const openInputDialog = (event: any) => {
        const input = document.querySelector('#share_input_photo_and_video') as HTMLInputElement;
        const reader = new FileReader();
        const image = document.querySelector('#uploaded_image') as HTMLImageElement;
        input.click();
        input.onchange = (event: any) => {
            if (event.target.files.length === 1) {
                setFile(event.target.files[0]);
                reader.addEventListener('load', (event: any) => {
                    image.src = event.target.result;
                    image.style.display = 'block';
                });
                reader.readAsDataURL(event.target.files[0]);
            }
        }
    }

    const sendPostToServer = () => {
        const formData = new FormData();
        formData.set('files', file);
        formData.set('content', content);
        createPost(formData)
            .then(response => {
                clearPostsData();
            });
    }

    const clearPostsData = () => {
        const image = document.querySelector('#uploaded_image') as HTMLImageElement;
        image.src = '';
        image.style.display = 'none';

    }

    return (
        <div className={classes.share}>
            <div className={classes.shareWrapper}>
                <div className={classes.shareTop}>
                    <img className={classes.shareProfileImage}
                         src="https://cdn.britannica.com/22/206222-131-E921E1FB/Domestic-feline-tabby-cat.jpg"
                         alt="post"/>
                    <div className={classes.previewWrapper}>
                        <input placeholder="Whats in your mind" className={classes.shareInput}
                               onChange={(event: any) => setContent(event.target.value)}/>
                        <img src="" alt="preview" className={classes.uploadedImage} id='uploaded_image'/>
                    </div>
                </div>
                <hr className={classes.shareHr}/>
                <div className={classes.shareBottom}>
                    <div className={classes.shareOptions}>
                        <div className={classes.shareOption} onClick={openInputDialog}>
                            <PermMedia htmlColor="tomato" className={classes.shareIcon}/>
                            <span className={classes.shareOptionText}>Photo</span>
                            <input type="file"
                                   accept="image/png, image/jpeg"
                                   className={classes.mediaUpload} id='share_input_photo_and_video'/>
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
                    <button className={classes.shareButton} onClick={sendPostToServer}>Share</button>
                </div>
            </div>
        </div>
    );
};

export default Share;
