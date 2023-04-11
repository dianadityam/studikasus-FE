import './index.scss';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../../context/shop-context';
import { useParams } from 'react-router-dom';
import { NumericFormat } from 'react-number-format';

const Detail = () => {
    const [product, setProduct] = useState({});
    const [category, setCategory] = useState({});
    const { id } = useParams();
    const { addToCart, cart, removeFromCart } = useContext(ShopContext);
    const [itemQty, setItemQty] = useState(null);

    const getProductById = async () => {
        const response = await axios.get(`http://localhost:9000/api/products/${id}`);
        return response.data;
    };

    const handleQty = (item) => {
        if (cart && cart.length > 0) {
            const findIndex = cart.find((val) => id === val._id);
            if (findIndex) {
                setItemQty(findIndex.qty);
            }
        }
    };
    useEffect(() => {
        getProductById().then((result) => {
            setProduct(result.data);
            setCategory(result.data.category);
        });
        handleQty(product);
        // eslint-disable-next-line
    }, [itemQty, cart]);

    // console.log(product);

    return (
        <div className='container'>
            <div className='detailContainer'>
                <div className='imageWrapper'>
                    <img
                        src={`http://localhost:9000/images/products/${product.image_url}`}
                        alt=''
                    />
                </div>
                <div className='textWrapper'>
                    <h2>{product.name}</h2>
                    <h4>
                        <span>Category </span>
                        {category.name}
                    </h4>
                    <h1>
                        <NumericFormat
                            value={product.price}
                            thousandSeparator='.'
                            decimalSeparator=','
                            displayType='text'
                        />
                    </h1>
                    <div className='quantityInput'>
                        <button
                            onClick={() => {
                                removeFromCart(product);
                                handleQty(product);
                            }}
                            disabled={itemQty < 1}
                            className='quantityButton'
                        >
                            -
                        </button>
                        <input
                            type='text'
                            className='inputValue'
                            value={itemQty ? itemQty : 0}
                            readOnly
                        />
                        <button
                            onClick={() => {
                                addToCart(product);
                                handleQty(product);
                            }}
                            className='quantityButton'
                        >
                            +
                        </button>
                    </div>
                    <p>
                        <span>Description</span>
                        <br />
                        {product.description}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Detail;
