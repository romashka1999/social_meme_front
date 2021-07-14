import React, {useState} from 'react';

import {Chat, Notifications, Person, Search} from '@material-ui/icons';
import classes from './topbar.module.css';
import {Redirect, useHistory} from "react-router-dom";
import {searchUsers} from "../../pages/profile/services/users.service";
import {UserSearchDto} from "../../pages/profile/services/dto/userSearchDto";
import SearchResult from "../searchResult/SearchResult";


const Topbar = () => {
    const [personNotification, setPersonNotification] = useState({
        notificationCount: 1,
        isOpen: false
    });

    const [chatNotification, setChatNotification] = useState({
        notificationCount: 2,
        isOpen: false
    });

    const [newsNotification, setNewsNotification] = useState({
        notificationCount: 1,
        isOpen: false
    });

    const [isDropDownVisible, setDropDownVisible] = useState<boolean>(false);
    const [isLoggedOut, setIsloggedOut] = useState<boolean>(false);
    const [isSearchVisible, setIsSearchVisible] = useState<boolean>(false);
    const history = useHistory();
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    const [usersDto, setUsersDto] = useState<UserSearchDto>();


    const signOutHandler = () => {
        localStorage.clear();
        setIsloggedOut(true);
    }

    const toggleDropDown = (isVisible: boolean) => {
        setDropDownVisible(isVisible);
    }

    const redirect = (link: string) => {
        history.push(link);
    }

    const getMatchingUsers = (event: any) => {
        if (!event.target.value) return;
        setIsSearchVisible(true);
        searchUsers(event.target.value)
            .then(response => setUsersDto(response.data));
    }

    const checkClickedElement = (event: any) => {
        setTimeout(() => {
            setIsSearchVisible(false);
        }, 100)
    }

    const openNotification = (handler: Function) => {
        handler((prev: any) => {
            return {isOpen: !prev.isOpen, notificationCount: 0}
        })
    }

    return (
        isLoggedOut ?
            <Redirect to={'/sign-in'}/> :
            <div className={classes.topbarContainer}>
                <div className={classes.topbarLeft}>
                    <span className={classes.logo} onClick={() => redirect('/home')}>Social Meme</span>
                </div>
                <div className={classes.topbarCenter}>
                    <div className={classes.searchBar}>
                        <Search className={classes.searchIcon}/>
                        <input onChange={getMatchingUsers}
                               onBlur={checkClickedElement}
                               placeholder="Search for Friend, Posts or Video" className={classes.searchInput}/>
                        {
                            usersDto && isSearchVisible ?
                                <div className={classes.searchResultWrapper}>
                                    <ul className={classes.searchResult}>
                                        {
                                            usersDto.users.map(user => (
                                                <SearchResult key={user.id} {...user}/>
                                            ))
                                        }
                                    </ul>
                                </div> : null
                        }
                    </div>
                </div>
                <div className={classes.topbarRight}>
                    <div className={classes.topbarLinks}>
                        <span className={classes.topbarLink} onClick={() => redirect('/home')}>Home</span>
                        <span className={classes.topbarLink}
                              onClick={() => redirect(`/profile/${user.id}`)}>Profile</span>
                    </div>
                    <div className={classes.topbarIcons}>
                        <div className={classes.topbarIconItem} onClick={() => openNotification(setPersonNotification)}>
                            <Person/>
                            {
                                personNotification.notificationCount ?
                                    <span
                                        className={classes.topbarIconBadge}>{personNotification.notificationCount}</span>
                                    : null
                            }
                            <div className={classes.dropDownPerson} hidden={!personNotification.isOpen}>
                                <div className={classes.arrowPerson}>
                                </div>
                            </div>
                        </div>
                        <div className={classes.topbarIconItem} onClick={() => openNotification(setChatNotification)}>
                            <Chat/>

                            {
                                chatNotification.notificationCount ?
                                    <span className={classes.topbarIconBadge}>{chatNotification.notificationCount}</span>
                                    : null
                            }
                            <div className={classes.dropDownChat} hidden={!chatNotification.isOpen}>
                                <div className={classes.arrowChat}>
                                </div>
                            </div>
                        </div>
                        <div className={classes.topbarIconItem} onClick={() => openNotification(setNewsNotification)}>
                            <Notifications/>
                            {
                                newsNotification.notificationCount ?
                                    <span className={classes.topbarIconBadge}
                                    >{newsNotification.notificationCount}</span>
                                    : null
                            }

                            <div className={classes.dropDownNotification} hidden={!newsNotification.isOpen}>
                                <div className={classes.arrowNotification}>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={classes.topRightOptions}>
                        <img className={classes.topbarImg}
                             onClick={() => toggleDropDown(!isDropDownVisible)}
                             src={user.profileImgUrl || '/profile.jpg'}
                             alt="profile"/>
                        {
                            isDropDownVisible ?
                                <div className={classes.dropDown}
                                     onClick={signOutHandler}>
                                    Log Out
                                </div> : null
                        }
                    </div>

                </div>
            </div>

    );
};

export default Topbar;
