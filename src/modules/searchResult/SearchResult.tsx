import React from 'react';

interface User {
    firstName: string;
    id: number;
    lastName: string;
    profileImgUrl: string | null;
}

const SearchResult: React.FC<User> = ({id, firstName, lastName, profileImgUrl}) => {
    return (
        <li>

        </li>
    );
};

export default SearchResult;
