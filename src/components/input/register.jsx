import './input.scss';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const navigate = useNavigate();

    const HandleRegister = async (e) => {
        e.preventDefault();
        const newUser = {
            full_name: name,
            email: email,
            password: password,
        };
        try {
            const response = await axios.post('http://localhost:9000/auth/register', newUser);
            console.log(response.data);
            navigate('/login');
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <div className='formContainer'>
            <h2>Register</h2>
            <div className='formItem'>
                <form onSubmit={HandleRegister}>
                    <input
                        type='text'
                        placeholder='Full Name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <br />
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
                    <button type='submit'>Register</button>
                </form>
            </div>
        </div>
    );
};
export default Register;
