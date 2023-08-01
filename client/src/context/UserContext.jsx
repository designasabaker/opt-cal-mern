import React, {useContext, useState} from 'react';

const UserContext = React.createContext();

export function UserProvider({ children }) {
    const [user, setUser] = useState(null);
    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);
    const [err, setErr] = useState('');
    const [banner, setBanner] = useState('');

    const apiUrl = import.meta.env.VITE_APP_API_URL || 'http://localhost:5000';

    const register = async (username, password) => {
        const response = await fetch(`${apiUrl}/users/register`, {  // Replace with your actual register endpoint
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
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
    }

    const login = async (username, password) => {
        const response = await fetch(`${apiUrl}/users/login`, {  // Replace with your actual login endpoint
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        if (!response.ok) {
            // Handle error
            console.error('Failed to login');
            setErr(`Failed to login: ${response.statusText}`);
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
    };

    const logout = () => {
        // Implement your logout logic here
        // Then call setUser with null
        localStorage.removeItem('jwt');
        setUser(null);
    };

    return (
        <UserContext.Provider value={{
            user,
            register,
            login,
            logout,
            showLogin,
            setShowLogin,
            showRegister,
            setShowRegister,
            banner,
        }}>
            {children}
        </UserContext.Provider>
    );
}

export const useUser = () => useContext(UserContext);

