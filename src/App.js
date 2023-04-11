import './App.css';
import Sidebar from './components/Navigation';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Detail from './pages/Detail';
import Register from './components/input/register';
import Login from './components/input/login';
import Delivery from './components/input/Address';
import Order from './pages/Order';
import Success from './pages/Success';
import { ShopContextProvider } from './context/shop-context';
import Info from './components/Profile/Info';
import Invoice from './pages/Invoice/Invoice';
import { createTheme, ThemeProvider } from '@mui/material';
import EditAddress from './components/input/EditAddress';

const theme = createTheme({
    typography: {
        fontFamily: ['Quicksand', 'sans-serif'].join(','),
        fontWeightBold: 700,
        fontWeightRegular: 500,
    },
    palette: {
        primary: {
            main: '#c58940',
        },
        secondary: {
            main: '#d81350',
        },
    },
});

const SideBarLayout = () => {
    return (
        <>
            <Sidebar />
            <div style={{ marginLeft: '20%' }}>
                <Outlet />
            </div>
        </>
    );
};

const App = () => {
    return (
        <ShopContextProvider>
            <Router>
                <ThemeProvider theme={theme}>
                    <div>
                        <Routes>
                            <Route path='/' element={<SideBarLayout />}>
                                <Route index element={<Home />} exact='true' />
                                <Route path='cart' element={<Cart />} />
                                <Route path='detail/:id' element={<Detail />} />
                                <Route path='edit-address/:id' element={<EditAddress />} />
                                <Route path='/info' element={<Info />} />
                            </Route>
                            <Route path='/register' element={<Register />} />
                            <Route path='/login' element={<Login />} />
                            <Route path='/address' element={<Delivery />} />
                            <Route path='/order' element={<Order />} />
                            <Route path='/invoice/:id' element={<Invoice />} />
                            <Route path='/success' element={<Success />} />
                        </Routes>
                    </div>
                </ThemeProvider>
            </Router>
        </ShopContextProvider>
    );
};

export default App;
