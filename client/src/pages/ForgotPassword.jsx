import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';

function ForgotPassword() {
    const apiUrl = import.meta.env.VITE_APP_API_URL || 'http://localhost:5000';
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Send a request to your backend server
        // If the request is successful, redirect to another page
        const response = await fetch(`${apiUrl}/users/forgot-password`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email }),
        });

        if (response.ok) {
            navigate('/reset-password-instructions');
        } else {
            // Handle error
            console.log(response)
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Email:
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </label>
            <button type="submit">Send reset link</button>
        </form>
    );
}

export default ForgotPassword;
