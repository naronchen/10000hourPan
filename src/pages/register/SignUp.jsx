import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signUpUser } from './register_c/signUpUser';

export default function SignUp() {
    const navigate = useNavigate();

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        signUpUser(userName, password, confirmPassword)
            .then(() => {
                console.log('Sign up successful');
                navigate('/setUpPage');
            })
            .catch((error) => {
                setError(error.message);
            });
    };

  return (
    <div className="login-container-container">
        <div className="login-container">
        <h2>Sign Up</h2>
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
                minLength="6"
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
