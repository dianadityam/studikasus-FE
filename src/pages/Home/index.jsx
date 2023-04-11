import './index.scss';
import React, { useEffect, useState } from 'react';
import {
    Pagination,
    TextField,
    IconButton,
    InputAdornment,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Button,
} from '@mui/material';
import { Search } from '@mui/icons-material';
import axios from 'axios';
import Product from './Product';
import ProductSkeleton from './Skeleton';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState([]);
    const [tags, setTags] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedTags, setSelectedTags] = useState('');
    const [query, setQuery] = useState('');
    const [numberOfPages, setNumberOfPages] = useState(0);
    const [pageNumber, setPageNumber] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(0);

    useEffect(() => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
        const getProduct = async () => {
            const response = await axios.get(
                `http://localhost:9000/api/products?q=${query}&page=${pageNumber}&category=${selectedCategory}&tags=${selectedTags}`
            );
            return response.data;
        };
        const getCategory = async () => {
            const response = await axios.get(`http://localhost:9000/api/categories`);
            return response.data;
        };
        const getTags = async () => {
            const response = await axios.get(`http://localhost:9000/api/tags`);
            setTags(response.data);
        };
        getCategory().then((result) => {
            setCategory(result);
        });
        getTags();
        getProduct().then((result) => {
            setProducts(result.data);
            setNumberOfPages(result.totalPages);
        });
    }, [query, pageNumber, selectedCategory, selectedTags]);

    const handleSearch = (e) => {
        e.preventDefault();
        setQuery(e.target.search.value);
        setPageNumber(0);
    };

    const handlePage = (e, v) => {
        setPage(v);
        setPageNumber(v - 1);
    };

    const handleReset = () => {
        setSelectedCategory('');
        setSelectedTags('');
        setPageNumber(0);
    };

    return (
        <div className='app'>
            <div className='header'>
                <form onSubmit={handleSearch}>
                    <TextField
                        sx={{ fontFamily: 'Quicksand' }}
                        name='search'
                        type='text'
                        label='Search product'
                        className='searchInput'
                        size='small'
                        endAdornment={
                            <InputAdornment position='end'>
                                <IconButton type='submit'>
                                    <Search />
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </form>
                <FormControl sx={{ minWidth: 150 }} size='small'>
                    <InputLabel id='demo-simple-select-label'>Category</InputLabel>
                    <Select
                        labelId='demo-simple-select-label'
                        id='demo-simple-select'
                        value={selectedCategory}
                        label='Category'
                        onChange={(e) => {
                            setSelectedCategory(e.target.value);
                            setPageNumber(0);
                        }}
                    >
                        {category.map((option, i) => (
                            <MenuItem key={i} value={option.name}>
                                {option.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl sx={{ minWidth: 150 }} size='small'>
                    <InputLabel id='demo-simple-select-label'>Tags</InputLabel>
                    <Select
                        labelId='demo-simple-select-label'
                        id='demo-simple-select'
                        value={selectedTags}
                        label='Tags'
                        onChange={(e) => {
                            setSelectedTags(e.target.value);
                            setPageNumber(0);
                        }}
                    >
                        {tags.map((option, i) => (
                            <MenuItem key={i} value={option.name}>
                                {option.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Button onClick={handleReset} size='small'>
                    Reset filter
                </Button>
            </div>
            <div className='productContainer'>
                {isLoading ? (
                    [1, 2, 3, 4, 5, 6, 7, 8, 9].map((skeleton) => (
                        <div key={skeleton}>
                            <ProductSkeleton />
                        </div>
                    ))
                ) : products.length > 0 ? (
                    products.map((product, i) => {
                        return (
                            <div className='productWrapper' key={i}>
                                <Product data={product} />
                            </div>
                        );
                    })
                ) : (
                    <div>No product found</div>
                )}
            </div>
            <Pagination
                sx={{ marginLeft: '6.5em' }}
                count={numberOfPages}
                variant='outlined'
                page={page}
                onChange={handlePage}
            />
        </div>
    );
};

export default Home;
