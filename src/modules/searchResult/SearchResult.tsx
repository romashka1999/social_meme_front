import React from 'react';
import classes from './searchResult.module.css';
import {useHistory} from "react-router-dom";

interface User {
    firstName: string;
    id: number;
    lastName: string;
    profileImgUrl: string | null;
}

const SearchResult: React.FC<User> = ({id, firstName, lastName, profileImgUrl}) => {
    const history = useHistory();
    const navigateToUser = () => {
        history.push(`/profile/${id}`);
    }

    return (
        <li className={classes.searchResult} onClick={navigateToUser}>
            <img className={classes.personsProfile} src={profileImgUrl || "/cover.png"} alt="person"/>
            <div className={classes.personsName}>{firstName} {lastName}</div>
        </li>
    );
};

export default SearchResult;
