import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const ShopContext = createContext(null);

export const ShopContextProvider = (props) => {
    const cartFromLocalStorage = JSON.parse(localStorage.getItem('cart') || '[]');
    const [cart, setCart] = useState(cartFromLocalStorage);
    const getAddress = async () => {
        const res = await axios.get('http://localhost:9000/api/address');
        return res.data;
    };

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const updateQty = async (product) => {
        try {
            const response = await axios.put('http://localhost:9000/api/cart', {
                items: product,
            });
            return response.data;
        } catch (error) {
            console.log(error);
        }
    };

    const addToCart = (item) => {
        let newCart = [...cart];
        let itemInCart = newCart.find((items) => item._id === items._id);
        if (itemInCart) {
            itemInCart.qty++;
        } else {
            itemInCart = {
                ...item,
                product: item,
                qty: 1,
            };
            newCart.push(itemInCart);
        }
        setCart(newCart);
        updateQty(newCart);
    };

    const cartUser = (item) => {
        setCart(item);
    };

    const removeFromCart = (item) => {
        let newCart = [...cart];
        let itemInCart = newCart.find((items) => item._id === items._id);
        if (itemInCart.qty > 0) {
            itemInCart.qty = itemInCart.qty - 1;
        }
        setCart(newCart);
        updateQty(newCart);
    };

    const deleteCart = (item) => {
        let newCart = [...cart];
        const index = newCart.indexOf(item);
        newCart.splice(index, 1);
        setCart(newCart);
        updateQty(newCart);
    };

    // const removeAllCart = () => {
    //     let newCart = [...cart];
    //     newCart.splice(0, newCart.length);
    //     setCart(newCart);
    // };

    const contextValue = {
        cart,
        setCart,
        addToCart,
        removeFromCart,
        cartUser,
        deleteCart,
        getAddress,
    };

    return <ShopContext.Provider value={contextValue}>{props.children}</ShopContext.Provider>;
};
