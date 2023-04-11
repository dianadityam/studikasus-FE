import React, { useEffect, useState, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import './index.scss';
import { Badge } from '@mui/material';
import { ShopContext } from '../../context/shop-context';
import { ShoppingCart } from '@mui/icons-material';
import UserProfile from '../Profile';

const Sidebar = () => {
    const { cart } = useContext(ShopContext);
    const [token, setToken] = useState();

    useEffect(() => {
        setToken(localStorage.getItem('accessToken'));
    }, [token]);
    return (
        <div className='navbar'>
            <ul className='linkWrapper'>
                <h4 className='navbarBrand'>
                    Jajan<span>Dulu</span>
                </h4>
                <li className='link'>
                    <NavLink to='/' className={(navData) => (navData.isActive ? 'active' : '')}>
                        Dashboard
                    </NavLink>
                </li>
                <li className='link'>
                    <NavLink
                        to={token ? '/cart' : '/login'}
                        className={(navData) => (navData.isActive ? 'active' : '')}
                    >
                        <Badge sx={{ marginRight: 2 }} badgeContent={cart.length} color='secondary'>
                            <ShoppingCart />
                        </Badge>
                        Cart
                    </NavLink>
                </li>
                <li className='link'>
                    <NavLink to={token ? '/info' : '/login'}>Account Info</NavLink>
                </li>
            </ul>
            <UserProfile />
        </div>
    );
};

export default Sidebar;
