import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './invoice.scss';
import { TableContainer, Table, TableRow, TableBody, TableCell, Paper } from '@mui/material';
import { useParams } from 'react-router-dom';

const Invoice = () => {
    const { id } = useParams();
    const [invoice, setInvoice] = useState([]);
    const [order, setOrder] = useState([]);
    const [user, setUser] = useState([]);
    const [address, setAddress] = useState({});
    useEffect(() => {
        const getInvoice = async () => {
            const res = await axios.get(`http://localhost:9000/api/invoice/${id}`);
            console.log(res.data);
            return res.data;
        };
        getInvoice().then((result) => {
            setInvoice(result);
            setOrder(result.order);
            setUser(result.user);
            setAddress(result.order.delivery_address);
        });
    }, []);
    return (
        <div className='invoiceContainer'>
            <div className='invoiceTitle'>
                <h4>Invoice #{invoice._id}</h4>
            </div>
            <TableContainer sx={{ width: '75%' }} component={Paper}>
                <Table aria-label='simple table'>
                    <TableBody>
                        <TableRow>
                            <TableCell component='th' scope='row'>
                                <strong>Order ID</strong>
                            </TableCell>
                            <TableCell>#{order.order_number}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell component='th' scope='row'>
                                <strong>Status</strong>
                            </TableCell>
                            <TableCell>{invoice.payment_status}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell component='th' scope='row'>
                                <strong>Bill to</strong>
                            </TableCell>
                            <TableCell>
                                {user.full_name}
                                <br />
                                <p>
                                    {address.alamat} {address.detail} {address.kelurahan}{' '}
                                    {address.kecamatan} {address.kota} {address.provinsi}{' '}
                                </p>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell component='th' scope='row'>
                                <strong>Delivery Fee</strong>
                            </TableCell>
                            <TableCell>{invoice.delivery_fee}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell component='th' scope='row'>
                                <strong>Sub Total</strong>
                            </TableCell>
                            <TableCell>{invoice.sub_total}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell component='th' scope='row'>
                                <strong>Total</strong>
                            </TableCell>
                            <TableCell>{invoice.total}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            <Link to='/'>
                <button className='confirmButton'>Back to dashboard</button>
            </Link>
        </div>
    );
};

export default Invoice;
