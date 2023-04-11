import axios from 'axios';

const Interceptors = () => {
    // For GET requests
    axios.interceptors.request.use(
        (config) => {
            const token = JSON.parse(localStorage.getItem('accessToken'));
            if (token) {
                config.headers['Authorization'] = 'Bearer ' + token;
            }
            config.headers['Content-Type'] = 'application/json';
            return config;
        },
        (err) => {
            return Promise.reject(err);
        }
    );

    // For POST requests
    axios.interceptors.response.use(
        (res) => {
            // Add configurations here
            if (res.status === 201) {
                console.log('Posted Successfully');
            }
            return res;
        },
        (err) => {
            return Promise.reject(err);
        }
    );
};

export default Interceptors;
