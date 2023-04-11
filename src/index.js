import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Interceptors from './api/auth';

Interceptors();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
