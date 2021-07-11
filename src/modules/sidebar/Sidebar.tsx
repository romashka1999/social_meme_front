import React from 'react';
import classes from "./sidebar.module.css";
import {Bookmark, Chat, Event, Group, HelpOutline, RssFeed, School, Videocam, WorkOutline} from '@material-ui/icons'
import {Users} from '../../test';
import CloseFriend from "../closeFriend/CloseFriend";


const Sidebar = () => {
    return (
        <div className={classes.sidebar}>
            <div className={classes.sidebarWrapper}>
                <ul className={classes.sidebarList}>
                    <li className={classes.sidebarListItem}>
                        <RssFeed className={classes.sidebarIcon}/>
                        <span className={classes.sidebarListItemText}>Feed</span>
                    </li>
                    <li className={classes.sidebarListItem}>
                        <Chat className={classes.sidebarIcon}/>
                        <span className={classes.sidebarListItemText}>Chats</span>
                    </li>
                    <li className={classes.sidebarListItem}>
                        <Videocam className={classes.sidebarIcon}/>
                        <span className={classes.sidebarListItemText}>Videos</span>
                    </li>
                    <li className={classes.sidebarListItem}>
                        <Group className={classes.sidebarIcon}/>
                        <span className={classes.sidebarListItemText}>Groups</span>
                    </li>
                    <li className={classes.sidebarListItem}>
                        <Bookmark className={classes.sidebarIcon}/>
                        <span className={classes.sidebarListItemText}>Bookmarks</span>
                    </li>
                    <li className={classes.sidebarListItem}>
                        <HelpOutline className={classes.sidebarIcon}/>
                        <span className={classes.sidebarListItemText}>Questions</span>
                    </li>
                    <li className={classes.sidebarListItem}>
                        <WorkOutline className={classes.sidebarIcon}/>
                        <span className={classes.sidebarListItemText}>Jobs</span>
                    </li>
                    <li className={classes.sidebarListItem}>
                        <Event className={classes.sidebarIcon}/>
                        <span className={classes.sidebarListItemText}>Events</span>
                    </li>
                    <li className={classes.sidebarListItem}>
                        <School className={classes.sidebarIcon}/>
                        <span className={classes.sidebarListItemText}>Courses</span>
                    </li>
                </ul>

                <button className={classes.sidebarButton}>
                    Show More
                </button>
                <hr className={classes.sidebarHr}/>
                <ul className={classes.sidebarFriendList}>
                    {
                        Users.map(user => (
                                <CloseFriend key={user.id} {...user}/>
                            )
                        )
                    }
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
