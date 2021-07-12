import React, {useState} from 'react';

import {Chat, Notifications, Person, Search} from '@material-ui/icons';
import classes from './topbar.module.css';
import {Redirect, useHistory} from "react-router-dom";
import {searchUsers} from "../../pages/profile/services/users.service";
import {UserSearchDto} from "../../pages/profile/services/dto/userSearchDto";
import SearchResult from "../searchResult/SearchResult";


const Topbar = () => {
    const [isDropDownVisible, setDropDownVisible] = useState<boolean>(false);
    const [isLoggedOut, setIsloggedOut] = useState<boolean>(false);
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
        searchUsers(event.target.value)
            .then(response => setUsersDto(response.data));
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
                               placeholder="Search for Friend, Posts or Video" className={classes.searchInput}/>
                        {
                            usersDto ?
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
                        <span className={classes.topbarLink}
                              onClick={() => redirect(`/profile/${user.id}`)}>Homepage</span>
                        <span className={classes.topbarLink} onClick={() => redirect('/home')}>Timeline</span>
                    </div>
                    <div className={classes.topbarIcons}>
                        <div className={classes.topbarIconItem}>
                            <Person/>
                            <span className={classes.topbarIconBadge}>1</span>
                        </div>
                        <div className={classes.topbarIconItem}>
                            <Chat/>
                            <span className={classes.topbarIconBadge}>2</span>
                        </div>
                        <div className={classes.topbarIconItem}>
                            <Notifications/>
                            <span className={classes.topbarIconBadge}>1</span>
                        </div>
                    </div>
                    <div className={classes.topRightOptions}>
                        <img className={classes.topbarImg}
                             onClick={() => toggleDropDown(!isDropDownVisible)}
                             src="https://ath2.unileverservices.com/wp-content/uploads/sites/4/2020/02/IG-annvmariv-1024x1016.jpg"
                             alt="girl"/>
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
