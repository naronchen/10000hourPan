import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logInUser } from './register_c/logInUser';

import '../../css/LogIn.css';

export default function LogIn() {
    const navigate = useNavigate();

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        
        logInUser(userName, password)
            .then(() => {
                console.log('Log in successful');
                navigate('/homePage');
            })
            .catch((error) => {
                console.log(error.message);
            });
        
    };

  return (
    <div className="login-container-container">
        <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit} className="loginForm">
            <input 
                type="username" 
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Username"
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
