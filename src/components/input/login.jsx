import './input.scss';
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { ShopContext } from '../../context/shop-context';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const [msg, setMsg] = useState('');
    const { cartUser } = useContext(ShopContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await axios.post('http://localhost:9000/auth/login', {
            email,
            password,
        });
        const getCart = async () => {
            const res = await axios.get('http://localhost:9000/api/cart');
            return res.data;
        };
        if (response.data.error) {
            setEmail('');
            setPassword('');
            setError(true);
            setMsg(response.data.message);
        } else {
            localStorage.setItem('profileData', JSON.stringify(response.data.user));
            localStorage.setItem('accessToken', JSON.stringify(response.data.token));
            getCart().then((result) => {
                cartUser(result);
                console.log(result);
            });
            navigate('/');
            // window.location.reload();
        }
    };

    return (
        <div className='formContainer'>
            <h2>Login</h2>
            <div className='formItem'>
                <form onSubmit={handleSubmit}>
                    <input
                        type='text'
                        placeholder='Enter Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <br />
                    <input
                        type='password'
                        placeholder='Password'
                        name='passwordInput'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <br />
                    <button type='submit'>Log in</button>
                </form>
                <p className='errorMsg'>{error ? `* ${msg}` : ''}</p>
                <div className='register'>
                    <p>
                        No Account ? <Link to={'/register'}>Register</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};
export default Login;
