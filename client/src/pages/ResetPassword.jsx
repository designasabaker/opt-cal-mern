import React, { useState } from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import {useUser} from "../context/UserContext.jsx";

function ResetPassword() {
    const {setShowLogin} = useUser();
    const navigate = useNavigate();
    const apiUrl = import.meta.env.VITE_APP_API_URL || 'http://localhost:5050';
    const [newPassword, setnewPassword] = useState('');
    const { token } = useParams();  // Extract the token from the URL

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('newPassword', newPassword)
        // Send a request to your backend server
        // If the request is successful, redirect to another page
        const response = await fetch(`${apiUrl}/users/reset-password`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token, newPassword }),
        });

        if (response.ok) {
            setShowLogin(true);
            navigate('/');
        } else {
            // Handle error
        }
    };

    return (
        <div>
            <h1>Reset password</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    New password:
                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setnewPassword(e.target.value)}
                        required
                    />
                </label>
                <button type="submit">Reset password</button>
            </form>
        </div>
    );
}

export default ResetPassword;
