import React from 'react'
import userLogo from "./images/user@3x.png"
import logOut from "./images/logout@3x.png"
import "./Header.scss"
import { useContext } from 'react';
import { UserContextContainer } from '../App';

function Header() {

    const userContext = useContext(UserContextContainer)

    return (
        <header>
            <div className='user'>
                <img src={userLogo} alt="user logo" />
                <p>{userContext.displayName()}</p>
            </div>
            <div className='logout' onClick={() => userContext.logOut()}>
                <p>Űrhajó elhagyása</p>
                <img src={logOut} alt="log out" />
            </div>
        </header>
    )
}

export default Header