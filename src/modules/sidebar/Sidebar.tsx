import React, {useState} from 'react';
import classes from "./sidebar.module.css";
import {Bookmark, Chat, Event, Group, HelpOutline, RssFeed, School, Videocam, WorkOutline} from '@material-ui/icons'
import {Users} from '../../test';
import CloseFriend from "../closeFriend/CloseFriend";
import {Button} from "@material-ui/core";


const Sidebar = () => {
    const [isLess, setIsLess] = useState(true);
    const sidebarContent = [
        <li key={1} className={classes.sidebarListItem}>
            <RssFeed className={classes.sidebarIcon}/>
            <span className={classes.sidebarListItemText}>Feed</span>
        </li>,
        <li key={2} className={classes.sidebarListItem}>
            <Chat className={classes.sidebarIcon}/>
            <span className={classes.sidebarListItemText}>Chats</span>
        </li>,
        <li key={3} className={classes.sidebarListItem}>
            <Videocam className={classes.sidebarIcon}/>
            <span className={classes.sidebarListItemText}>Videos</span>
        </li>,
        <li key={4} className={classes.sidebarListItem}>
            <Group className={classes.sidebarIcon}/>
            <span className={classes.sidebarListItemText}>Groups</span>
        </li>,
        <li key={5} className={classes.sidebarListItem}>
            <Bookmark className={classes.sidebarIcon}/>
            <span className={classes.sidebarListItemText}>Bookmarks</span>
        </li>,
        <li key={6} className={classes.sidebarListItem}>
            <HelpOutline className={classes.sidebarIcon}/>
            <span className={classes.sidebarListItemText}>Questions</span>
        </li>,
        <li key={7} className={classes.sidebarListItem}>
            <WorkOutline className={classes.sidebarIcon}/>
            <span className={classes.sidebarListItemText}>Jobs</span>
        </li>,
        <li key={8} className={classes.sidebarListItem}>
            <Event className={classes.sidebarIcon}/>
            <span className={classes.sidebarListItemText}>Events</span>
        </li>,
        <li key={9} className={classes.sidebarListItem}>
            <School className={classes.sidebarIcon}/>
            <span className={classes.sidebarListItemText}>Courses</span>
        </li>
    ]

    const toggleOptions = (event: any) => {
        setIsLess(!isLess);
        event.target.innerHTML = isLess ? 'Show Less' : 'Show More';
    }

    return (
        <div className={classes.sidebar}>
            <div className={classes.sidebarWrapper}>
                <ul className={classes.sidebarList}>
                    {isLess ?
                        sidebarContent.slice(0, 3)
                            .map(element => element)
                        : sidebarContent.map(element => element)

                    }
                </ul>

                <Button className={classes.sidebarButton} onClick={toggleOptions}>
                    Show More
                </Button>
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
