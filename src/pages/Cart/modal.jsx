import React from 'react';
import { TableRow, TableCell } from '@mui/material';

const ModalItem = (props) => {
    const { name, price, qty } = props.data;
    return (
        // <div>
        //     <p>{name}</p>
        //     <p>{price}</p>
        //     <p>{qty}</p>
        // </div>
        <TableRow key={name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
            <TableCell component='th' scope='row'>
                {name}
            </TableCell>
            <TableCell>{qty}</TableCell>
            <TableCell>{price}</TableCell>
        </TableRow>
    );
};

export default ModalItem;
