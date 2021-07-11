import React from 'react';
import classes from './searchResult.module.css';

interface User {
    firstName: string;
    id: number;
    lastName: string;
    profileImgUrl: string | null;
}

const SearchResult: React.FC<User> = ({id, firstName, lastName, profileImgUrl}) => {
    return (
        <li>
            <img className={classes.personsProfile} src="/cover.png" alt="person"/>
            <div className={classes.personsName}>{firstName} {lastName}</div>
        </li>
    );
};

export default SearchResult;
