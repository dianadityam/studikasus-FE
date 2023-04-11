import React, { useEffect } from 'react';
import axios from 'axios';

const Success = () => {
    useEffect(() => {
        const getOrder = async () => {
            try {
                const response = await axios.get('http://localhost:9000/api/order');
                console.log(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        getOrder();
    }, []);

    return (
        <div>
            <h1>Success</h1>
        </div>
    );
};

export default Success;
