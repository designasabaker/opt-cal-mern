import React, {useState} from 'react';
import {useUser} from '../context/UserContext';

import {LoginBox, RegisterBox} from './LoginBox';

export function Navbar(){
    const {user,err, banner, logout, showLogin, setShowLogin, showRegister} = useUser();


    return(
        <div className="navbar">
            {err && <div className="err">{err}</div>}
            {user ? (
                <>
                    <div>Logged in as <b>{user.username}</b> {banner}</div>
                    <button onClick={() => logout()}>Logout</button>
                </>
            ) : (
                <button onClick={()=>setShowLogin(true)}>Login</button>
            )}
            {showLogin && <LoginBox />}
            {showRegister && <RegisterBox />}
        </div>
    )
}

export default Navbar;