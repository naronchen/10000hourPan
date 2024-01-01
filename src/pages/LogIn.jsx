import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import '../css/LogIn.css';

export default function LogIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
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
            <button className='login-button' type="submit">登陆</button>
            <Link className='signUp' to="/signup">注册</Link>
        </form>
        </div>
    </div>
  )
}
