import React, { useEffect, useState } from 'react';
import './address.scss';
import { TextField, FormControl, InputLabel, Select, MenuItem, IconButton } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import axios from 'axios';

const Delivery = (props) => {
    const { setAddressInput } = props;
    const [selectedProvinsi, setSelectedProvinsi] = useState('');
    const [alamat, setAlamat] = useState('');
    const [selectProvinsi, setSelectProvinsi] = useState([]);
    const [selectKota, setSelectKota] = useState([]);
    const [selectedKota, setSelectedKota] = useState([]);
    const [selectKecamatan, setSelectKecamatan] = useState('');
    const [selectedKecamatan, setSelectedKecamatan] = useState('');
    const [selectKelurahan, setSelectKelurahan] = useState('');
    const [kelurahan, setKelurahan] = useState('');
    const [kecamatan, setKecamatan] = useState('');
    const [kota, setKota] = useState('');
    const [provinsi, setProvinsi] = useState('');
    const [detail, setDetail] = useState('');
    const apiAddress = 'https://dev.farizdotid.com/api/daerahindonesia';

    useEffect(() => {
        const getApiAlamat = async () => {
            const getProvinsi = await axios.get(`${apiAddress}/provinsi`);
            const provinsiData = await getProvinsi.data;

            const kota = await axios.get(`${apiAddress}/kota?id_provinsi=${selectedProvinsi}`);
            const kotaData = await kota.data;

            const kecamatan = await axios.get(`${apiAddress}/kecamatan?id_kota=${selectedKota}`);
            const kecamatanData = await kecamatan.data;

            const kelurahan = await axios.get(
                `${apiAddress}/kelurahan?id_kecamatan=${selectedKecamatan}`
            );
            const kelurahanData = await kelurahan.data;
            setSelectProvinsi(provinsiData.provinsi);
            setSelectKota(kotaData.kota_kabupaten);
            setSelectKecamatan(kecamatanData.kecamatan);
            setSelectKelurahan(kelurahanData.kelurahan);
        };
        getApiAlamat();
    }, [selectedProvinsi, selectedKota, selectedKecamatan]);

    const saveAddress = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:9000/api/address', {
                alamat,
                kelurahan,
                kecamatan,
                kota,
                provinsi,
                detail,
            });
            console.log(response.data);
            setAddressInput(false);
        } catch (error) {
            console.log(error);
        }
    };

    const handleChange = (e, type) => {
        const { value } = e.target;
        let id = null;
        let name = null;
        if (value) {
            id = value.split('|')[0];
            name = value.split('|')[1];
        }

        switch (type) {
            case 'provinsi':
                setProvinsi(name);
                setSelectedProvinsi(id);
                break;
            case 'kota':
                setKota(name);
                setSelectedKota(id);
                break;
            case 'kecamatan':
                setKecamatan(name);
                setSelectedKecamatan(id);
                break;

            default:
                break;
        }
    };

    return (
        <div className='inputWrapper'>
            <div className='headerItem'>
                <strong>Tambah Alamat</strong>
                <IconButton onClick={() => setAddressInput(false)}>
                    <ArrowBack />
                </IconButton>
            </div>
            <form onSubmit={saveAddress}>
                <TextField
                    name='alamat'
                    type='text'
                    label='Alamat'
                    size='small'
                    value={alamat}
                    onChange={(e) => setAlamat(e.target.value)}
                />
                <FormControl sx={{ minWidth: 150 }} size='small'>
                    <InputLabel id='demo-simple-select-label'>Provinsi</InputLabel>
                    <Select
                        labelId='demo-simple-select-label'
                        id='demo-simple-select'
                        value={`${selectedProvinsi}|${provinsi}`}
                        label='Provinsi'
                        onChange={(e) => handleChange(e, 'provinsi')}
                    >
                        {selectProvinsi.map((option, i) => (
                            <MenuItem
                                key={i}
                                value={`${option.id}|${option.nama}`}
                                dataset={option.nama}
                            >
                                {option.nama}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl sx={{ minWidth: 150 }} size='small'>
                    <InputLabel id='demo-simple-select-label'>Kota</InputLabel>
                    <Select
                        labelId='demo-simple-select-label'
                        id='demo-simple-select'
                        value={`${selectedKota}|${kota}`}
                        label='Kota'
                        onChange={(e) => handleChange(e, 'kota')}
                    >
                        {selectKota.map((option, i) => (
                            <MenuItem key={i} value={`${option.id}|${option.nama}`}>
                                {option.nama}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl sx={{ minWidth: 150 }} size='small'>
                    <InputLabel id='demo-simple-select-label'>Kecamatan</InputLabel>
                    <Select
                        labelId='demo-simple-select-label'
                        id='demo-simple-select'
                        value={`${selectedKecamatan}|${kecamatan}`}
                        label='Kecamatan'
                        onChange={(e) => handleChange(e, 'kecamatan')}
                    >
                        {selectKecamatan.length > 0 ? (
                            selectKecamatan.map((option, i) => (
                                <MenuItem key={i} value={`${option.id}|${option.nama}`}>
                                    {option.nama}
                                </MenuItem>
                            ))
                        ) : (
                            <MenuItem>Isi kota terlebih dahulu</MenuItem>
                        )}
                    </Select>
                </FormControl>
                <FormControl sx={{ minWidth: 150 }} size='small'>
                    <InputLabel id='demo-simple-select-label'>Kelurahan</InputLabel>
                    <Select
                        labelId='demo-simple-select-label'
                        id='demo-simple-select'
                        value={kelurahan}
                        label='Kelurahan'
                        onChange={(e) => setKelurahan(e.target.value)}
                    >
                        {selectKelurahan.length > 0 ? (
                            selectKelurahan.map((option, i) => (
                                <MenuItem key={i} value={option.nama}>
                                    {option.nama}
                                </MenuItem>
                            ))
                        ) : (
                            <MenuItem>Isi kecamatan terlebih dahulu</MenuItem>
                        )}
                    </Select>
                </FormControl>
                <TextField
                    name='Detail'
                    type='text'
                    label='detail'
                    size='small'
                    value={detail}
                    onChange={(e) => setDetail(e.target.value)}
                />
                {/* <label htmlFor='address'>Alamat : </label>
                <input
                    type='text'
                    id='address'
                    placeholder='Alamat'
                    value={alamat}
                    onChange={(e) => setAlamat(e.target.value)}
                />{' '}
                <br /> */}
                {/* <label htmlFor='kelurahan'>Kelurahan : </label>
                <input
                    type='text'
                    id='kelurahan'
                    placeholder='Kelurahan'
                    value={kelurahan}
                    onChange={(e) => setKelurahan(e.target.value)}
                />{' '}
                <br />
                <label htmlFor='kecamatan'>Kecamatan : </label>
                <input
                    type='text'
                    id='kecamatan'
                    placeholder='Kecamatan'
                    value={kecamatan}
                    onChange={(e) => setKecamatan(e.target.value)}
                />{' '}
                <br />
                <label htmlFor='kota'>Kota : </label>
                <input
                    type='text'
                    id='kota'
                    placeholder='Kota'
                    value={kota}
                    onChange={(e) => setKota(e.target.value)}
                />{' '}
                <br />
                <label htmlFor='provinsi'>Provinsi : </label>
                <input
                    type='text'
                    id='provinsi'
                    placeholder='Provinsi'
                    value={provinsi}
                    onChange={(e) => setProvinsi(e.target.value)}
                />{' '}
                <br />
                <label htmlFor='addressDetail'>Alamat Lengkap : </label>
                <input
                    type='text'
                    id='addressDetail'
                    placeholder='Alamat lengkap'
                    value={detail}
                    onChange={(e) => setDetail(e.target.value)}
                />{' '}
                <br /> */}
                <button type='submit'>Submit</button>
            </form>
        </div>
    );
};

export default Delivery;
