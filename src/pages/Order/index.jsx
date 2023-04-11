import React from 'react';

const Order = () => {
    return (
        <div className='orderContainer'>
            <h2>Periksa lagi pesanan anda</h2>
            <div className='tableContainer'>
                <table>
                    <thead>
                        <tr>
                            <th>Item</th>
                            <th>Quantity</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Kopi</td>
                            <td>2</td>
                            <td>2.000</td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan={2}>Sub Total</td>
                            <td>25.000</td>
                        </tr>
                        <tr>
                            <td colSpan={2}>Delivery Fee</td>
                            <td>0</td>
                        </tr>
                        <tr>
                            <td colSpan={2}>Total</td>
                            <td>25.000</td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    );
};

export default Order;
