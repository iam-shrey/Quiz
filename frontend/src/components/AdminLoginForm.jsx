import React, { useState } from 'react';
import '../styles/AdminLoginForm.css'; // Import the CSS file

const AdminLoginForm = ({ onLoginSuccess }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        // Basic validation
        if (!email || !password) {
            setError('Please fill in all fields');
            return;
        }

        // Simulate API call (replace with your actual login logic)
        if (email === 'ranga' && password === 'admin') {
            onLoginSuccess();
        } else {
            setError('Invalid credentials');
        }
    };

    return (
        <div className="admin-login-container">
            <h2 className="admin-login-title">Admin Login</h2>
            <form onSubmit={handleSubmit} className="admin-login-form">
                <div>
                    <label htmlFor="email" className="admin-login-label"></label>
                    <input
                        type="text"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder='Email'
                        className="admin-login-input"
                    />
                </div>
                <div>
                    <label htmlFor="password" className="admin-login-label"></label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder='Password'
                        className="admin-login-input"
                    />
                </div>
                {error && <p className="admin-login-error">{error}</p>}
                <button type="submit" className="admin-login-button">Login</button>
            </form>
        </div>
    );
};

export default AdminLoginForm;
