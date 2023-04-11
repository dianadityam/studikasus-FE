import React, { useEffect, useState } from 'react';
import './index.scss';
import Logout from '../input/logout';
import { Link } from 'react-router-dom';

const UserProfile = () => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const profileData = JSON.parse(localStorage.getItem('profileData'));
        setUserData(profileData);
    }, []);

    if (!userData) {
        return (
            <div className='profileContainer'>
                <strong>You're not logged in</strong>
                <Link to='/login'>Log In</Link>
            </div>
        );
    }

    return (
        <div className='profileContainer'>
            <strong>{userData.full_name}</strong>
            <p>{userData.email}</p>
            <Logout />
        </div>
    );
};

export default UserProfile;
