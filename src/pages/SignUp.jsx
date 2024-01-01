import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function SignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');


    const handleSubmit = (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        console.log('Email:', email, 'Password:', password);
    };

  return (
    <div className="login-container-container">
        <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit} className="loginForm">
            <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required 
            />
            <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required 
            />
            <input 
                type="password" 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
                required 
            />

            {error && <p style={{ color: 'yellow', fontSize: '30px' }}>{error}</p>}
            <button className='login-button' type="submit">注册</button>
            <Link className='signUp' to="/login">回到登陆</Link>
        </form>
        </div>
    </div>
  )
}
