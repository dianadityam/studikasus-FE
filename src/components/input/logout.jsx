import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate();

    const handleLogout = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:9000/auth/logout');
            console.log(response);
            localStorage.removeItem('profileData');
            localStorage.removeItem('accessToken');
            localStorage.removeItem('cart');
            navigate('/');
            window.location.reload();
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <div>
            <button type='submit' onClick={handleLogout}>
                Log out
            </button>
        </div>
    );
};
export default Logout;
