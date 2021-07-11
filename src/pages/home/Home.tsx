import React from 'react';

import classes from './home.module.css';
import Topbar from "../../modules/topbar/Topbar";
import Sidebar from "../../modules/sidebar/Sidebar";
import Feed from "../../modules/feed/Feed";
import Rightbar from "../../modules/rightbar/Rightbar";


const Home = () => {
    return (
        <>
            <Topbar/>
            <div className={classes.homeContainer}>
                <Sidebar/>
                <Feed/>
                <Rightbar isHome={true}/>
            </div>
        </>
    );
};

export default Home;
