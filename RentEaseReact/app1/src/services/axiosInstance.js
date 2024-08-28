import axios from 'axios';
import config from '../config';

// Create an Axios instance
const axiosInstance = axios.create({
    baseURL: config.url,
    headers: config.headers, // Apply default headers
});

// Add a request interceptor to set the Authorization header dynamically
axiosInstance.interceptors.request.use(
    (requestConfig) => {
        const token = sessionStorage.getItem('token');
        if (token) {
            requestConfig.headers['Authorization'] = `Bearer ${token}`;
        }
        return requestConfig;
    },
    (error) => Promise.reject(error)
);

export default axiosInstance;
