import React, {useContext, useReducer, useState} from 'react';
import {initialState, reducer} from "../reducer/UnemploymentReducer.js";

const UserContext = React.createContext();

export function UserProvider({ children }) {
    const [user, setUser] = useState(null);
    const [showLogin, setShowLogin] = useState(false);
    const [isLogining, setIsLogining] = useState(false);
    const [showRegister, setShowRegister] = useState(false);
    const [err, setErr] = useState('');
    const [banner, setBanner] = useState('');
    const [T, setT] = useState();
    const [isGettingState, setIsGettingState] = useState(false);
    const [isSavingState, setIsSavingState] = useState(false);

    const apiUrl = import.meta.env.VITE_APP_API_URL || 'http://localhost:5050';

    const setTimelyBanner = (msg) => {
        clearTimeout(T);
        setBanner(msg);
        const t =setTimeout(()=>setBanner(''), 3000);
        setT(t);
    }
    const getState = async () => {
        const token = localStorage.getItem('jwt');
        setIsGettingState(true);
        try{
            const response = await fetch(`${apiUrl}/record`, {  // Replace with your actual state endpoint
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            });
            if (!response.ok) {
                // Handle error
                return;
            }
            const record = await response.json();
            if(!record){
                console.log('Empty state from database')
                return null;
            }
            console.log('GET state from database', record.state)
            setIsGettingState(false);
            setTimelyBanner('Successfully loaded state from database');
            return (record.state);
        }
        catch (err){
            console.log(err);
            setIsGettingState(false);
            return null;
        }
    }

    const saveState = async (state) => {
        console.log("start saving state");
        setIsSavingState(true);
        const token = localStorage.getItem('jwt');
        if (!token) {
            console.error('No JWT token found');
            return;
        }else{
            console.log('JWT token found', token);
        }
        const response = await fetch(`${apiUrl}/record`, {  // Replace with your actual state endpoint
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ state }),
        });
        if (!response.ok) {
            console.log('Failed to save state to database')
            setIsSavingState(false);
            // Handle error
            return;
        }
        console.log('Successfully saved state to database')
        setIsSavingState(false);
    }

    const register = async (username, password, email) => {
        const response = await fetch(`${apiUrl}/users/register`, {  // Replace with your actual register endpoint
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password, email }),
        });

        if (!response.ok) {
            // Handle error
            console.error('Failed to register');
            setErr('Failed to register');
            return;
        }
        console.log('Successfully registered');
        setShowRegister(false);
        setShowLogin(true);
        setTimelyBanner('Successfully registered');
    }

    const login = async (usernameOrEmail, password) => {
        setIsLogining(true);
        const response = await fetch(`${apiUrl}/users/login`, {  // Replace with your actual login endpoint
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ usernameOrEmail, password }),
        });

        if (!response.ok) {
            // Handle error
            console.error('Failed to login');
            setErr(`Failed to login: ${response.statusText}`);
            setIsLogining(false);
            return;
        }

        const { token, user, message } = await response.json();

        // Store the token in local storage or somewhere else where you can access it later
        localStorage.setItem('jwt', token);

        console.log('Successfully logged in');

        // Update the user state
        setUser(user);
        setShowLogin(false); // Close the login box
        setBanner(message);
        setErr('');
        setIsLogining(false);
    };

    const googleLogin = () => {
        window.location.href=`${apiUrl}/auth/google`
    }

    const logout = () => {
        // Implement your logout logic here
        // Then call setUser with null
        localStorage.removeItem('jwt');
        setUser(null);
        setBanner('');

    };

    const closeLoginRegister = () => {
        setShowLogin(false);
        setShowRegister(false);
        setErr('')
    }

    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <UserContext.Provider value={{
            user,
            register,
            isLogining,
            login,
            googleLogin,
            logout,
            err,
            showLogin,
            setShowLogin,
            showRegister,
            setShowRegister,
            closeLoginRegister,
            banner,
            getState,
            isGettingState,
            saveState,
            isSavingState,
            state,
            dispatch,
        }}>
            {children}
        </UserContext.Provider>
    );
}

export const useUser = () => useContext(UserContext);

