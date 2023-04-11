import './index.scss';
import axios from 'axios';
import {
    Modal,
    Box,
    TableContainer,
    Paper,
    Table,
    TableHead,
    TableRow,
    TableBody,
    TableCell,
    IconButton,
    FormControl,
    OutlinedInput,
    Select,
    MenuItem,
} from '@mui/material';
import { Delete } from '@mui/icons-material';
import ModalItem from './modal';
import { NumericFormat } from 'react-number-format';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShopContext } from '../../context/shop-context';

const Cart = () => {
    const { addToCart, removeFromCart, cart, deleteCart, getAddress, setCart } =
        useContext(ShopContext);
    const [add, setAdd] = useState([]);
    const [open, setOpen] = useState(false);
    const [userAddress, setUserAddress] = useState('');
    const navigate = useNavigate();
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 800,
        bgcolor: 'background.paper',
        border: '1px solid lightgray',
        boxShadow: 24,
        p: 4,
    };
    let totalCart = 0;
    const handleChange = (e) => {
        setUserAddress(e.target.value);
    };

    useEffect(() => {
        const getToken = localStorage.getItem('accessToken');
        if (!getToken) {
            navigate('/login');
        }
        getAddress().then((result) => {
            setAdd(result.data);
        });
        console.log(userAddress);
        // eslint-disable-next-line
    }, [userAddress]);

    const storeOrder = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:9000/api/order', {
                delivery_fee: 10000,
                delivery_address: userAddress,
                items: cart,
            });
            console.log(response);
            setCart([]);
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className='itemContainer'>
            {cart.length > 0 ? (
                cart.map((item, i) => {
                    totalCart += item.price * item.qty;
                    return (
                        <div className='itemWrapper' key={i}>
                            <img
                                src={`http://localhost:9000/images/products/${item.image_url}`}
                                alt='Product'
                                className='itemImage'
                            />
                            <div className='textWrapper'>
                                <div className='itemName'>{item.name}</div>
                                <div className='itemPrice'>
                                    <strong>price : </strong>
                                    <NumericFormat
                                        value={item.price}
                                        thousandSeparator='.'
                                        decimalSeparator=','
                                        displayType='text'
                                    />
                                </div>
                                <div className='itemQty'>
                                    <strong>quantity : </strong>
                                    {item.qty}
                                </div>
                            </div>
                            <div className='quantityInput'>
                                <button
                                    disabled={item.qty < 1}
                                    className='quantityButton'
                                    onClick={
                                        item.qty > 0 ? () => removeFromCart(item) : deleteCart(item)
                                    }
                                >
                                    -
                                </button>
                                <input
                                    type='text'
                                    className='inputValue'
                                    value={item.qty}
                                    readOnly
                                />
                                <button className='quantityButton' onClick={() => addToCart(item)}>
                                    +
                                </button>
                                <IconButton
                                    sx={{ marginLeft: 2 }}
                                    color='warning'
                                    onClick={() => deleteCart(item)}
                                >
                                    <Delete />
                                </IconButton>
                            </div>
                        </div>
                    );
                })
            ) : (
                <div className='emptyCart'>
                    <img src={require('./emptyCart.png')} alt='No Items in Cart' />
                </div>
            )}
            <div>
                <h4>
                    Sub Total:{' '}
                    <NumericFormat
                        value={totalCart}
                        thousandSeparator='.'
                        decimalSeparator=','
                        displayType='text'
                    />
                </h4>
            </div>
            <div className='buttonWrapper'>
                <button className='confirmButton' onClick={handleOpen} disabled={cart.length < 1}>
                    Check Out
                </button>
            </div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby='modal-modal-title'
                aria-describedby='modal-modal-description'
            >
                <Box sx={style}>
                    <h3>Periksa lagi!</h3>
                    <TableContainer component={Paper}>
                        <Table aria-label='simple table'>
                            <TableHead>
                                <TableRow>
                                    <TableCell>
                                        <strong>Product Name</strong>
                                    </TableCell>
                                    <TableCell>
                                        <strong>Quantity</strong>
                                    </TableCell>
                                    <TableCell>
                                        <strong>Price</strong>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {cart.map((item) => (
                                    <ModalItem data={item} />
                                ))}
                                <TableRow>
                                    <TableCell rowSpan={2} />
                                    <TableCell colSpan={1}>
                                        <strong>Subtotal</strong>
                                    </TableCell>
                                    <TableCell>
                                        <strong>{totalCart}</strong>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell colSpan={1}>
                                        <strong>Total</strong>
                                    </TableCell>
                                    <TableCell>
                                        <strong>{totalCart}</strong>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <FormControl sx={{ m: 1, width: 300, mt: 3 }}>
                        <Select
                            displayEmpty
                            value={userAddress}
                            onChange={handleChange}
                            input={<OutlinedInput />}
                            inputProps={{ 'aria-label': 'Without label' }}
                        >
                            <MenuItem disabled value=''>
                                <em>Pilih Alamat</em>
                            </MenuItem>
                            {add.map((address) => (
                                <MenuItem key={address._id} value={address._id}>
                                    {address.alamat}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <div className='buttonWrapper'>
                        <button className='confirmButton' onClick={storeOrder}>
                            Confirm Order
                        </button>
                        <button className='confirmButton' onClick={handleClose}>
                            Close
                        </button>
                    </div>
                </Box>
            </Modal>
        </div>
    );
};

export default Cart;
