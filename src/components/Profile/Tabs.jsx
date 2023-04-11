import * as React from 'react';
import axios from 'axios';
import './index.scss';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import OrderTable from './OrderTable';
import Delivery from '../input/Address';
import { Link } from 'react-router-dom';
import EditAddress from '../input/EditAddress';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role='tabpanel'
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3, width: 600 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

export default function VerticalTabs() {
    const [userAddress, setUserAddress] = React.useState([]);
    const [value, setValue] = React.useState(0);
    const [userData, setUserData] = React.useState([]);
    const [addressData, setAddressData] = React.useState({});
    const [addressInput, setAddressInput] = React.useState(false);
    const [editAddress, setEditAddress] = React.useState(false);
    const getAddress = async () => {
        const res = await axios.get('http://localhost:9000/api/address');
        return res.data.data;
    };

    React.useEffect(() => {
        const profileData = JSON.parse(localStorage.getItem('profileData'));
        setUserData(profileData);
        getAddress().then((result) => {
            setUserAddress(result);
        });
    }, [addressInput, editAddress]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const deleteAddress = async (id) => {
        try {
            await axios.delete(`http://localhost:9000/api/address/${id}`);
            getAddress().then((result) => {
                setUserAddress(result);
            });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className='tabsContainer'>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label='basic tabs example'>
                    <Tab label='User Profile' {...a11yProps(0)} />
                    <Tab label='Address' {...a11yProps(1)} />
                    <Tab label='Order' {...a11yProps(2)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <h5>Full Name</h5>
                <p>{userData.full_name}</p>
                <h5>Email</h5>
                <p>{userData.email}</p>
            </TabPanel>
            <TabPanel value={value} index={1}>
                {!addressInput && !editAddress ? (
                    <>
                        <h5>Address</h5>
                        <ul>
                            {userAddress.map((address, i) => (
                                <div key={i}>
                                    {`${address.alamat}
                             Kelurahan ${address.kelurahan}
                             Kecamatan ${address.kecamatan}
                             Kota ${address.kota}
                             Provinsi ${address.provinsi}`}
                                    <Button
                                        onClick={() => {
                                            setEditAddress(true);
                                            setAddressData(address);
                                        }}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        onClick={() => {
                                            deleteAddress(address._id);
                                        }}
                                    >
                                        Delete
                                    </Button>
                                </div>
                            ))}
                        </ul>
                        <Button onClick={() => setAddressInput(true)}>Tambah Alamat</Button>
                    </>
                ) : addressInput ? (
                    <>
                        <Delivery setAddressInput={setAddressInput} />
                    </>
                ) : (
                    <>
                        <EditAddress setEditAddress={setEditAddress} addressData={addressData} />
                    </>
                )}
            </TabPanel>
            <TabPanel value={value} index={2}>
                <OrderTable />
            </TabPanel>
        </div>
    );
}
