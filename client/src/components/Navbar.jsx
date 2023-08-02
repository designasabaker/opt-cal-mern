import React, {useState} from 'react';
import {useUser} from '../context/UserContext';

import {LoginBox, RegisterBox} from './LoginBox';

export function Navbar(){
    const {user, banner, logout, showLogin, setShowLogin, showRegister} = useUser();


    return(
        <div className="navbar">
            {showLogin && <LoginBox />}
            {showRegister && <RegisterBox />}
            {user ? (
                <>
                    <div>Logged in as <b>{user.username}</b> {banner}</div>
                    <button onClick={() => logout()}>Logout</button>
                </>
            ) : (
                <button onClick={()=>setShowLogin(true)}>Login</button>
            )}
        </div>
    )
}

export default Navbar;