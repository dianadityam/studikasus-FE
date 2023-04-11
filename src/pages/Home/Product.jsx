import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { NumericFormat } from 'react-number-format';
import { IconButton, Badge } from '@mui/material';
import { AddShoppingCart } from '@mui/icons-material';
import { ShopContext } from '../../context/shop-context';

const Product = (props) => {
    const { _id, image_url, name, price, category } = props.data;
    const { addToCart, cart } = useContext(ShopContext);
    const [token, setToken] = useState(null);
    const [itemQty, setItemQty] = useState(null);

    const handleQty = () => {
        if (cart && cart.length > 0) {
            const findIndex = cart.find((val) => _id === val._id);
            if (findIndex) {
                setItemQty(findIndex.qty);
            }
        }
    };
    useEffect(() => {
        setToken(localStorage.getItem('accessToken'));
        handleQty();
        // eslint-disable-next-line
    }, [token, addToCart]);

    return (
        <>
            <img
                src={`http://localhost:9000/images/products/${image_url}`}
                alt=''
                className='productImage'
            />
            <div className='textWrapper'>
                <div className='productName'>{name}</div>
                <div className='productPrice'>
                    <NumericFormat
                        value={price}
                        thousandSeparator='.'
                        decimalSeparator=','
                        displayType='text'
                    />
                </div>
                <div className='productCategory'>{category ? category.name : '-'}</div>
                <Link to={`/detail/${_id}`} className='detail'>
                    Details
                </Link>
                <div>
                    <IconButton
                        color='primary'
                        aria-label='add to shopping cart'
                        className={token ? 'cartButton' : 'displayNone'}
                        onClick={() => {
                            addToCart(props.data);
                            handleQty();
                        }}
                    >
                        <AddShoppingCart />
                    </IconButton>
                    <Badge badgeContent={itemQty} color='secondary'></Badge>
                </div>
            </div>
        </>
    );
};

export default Product;
