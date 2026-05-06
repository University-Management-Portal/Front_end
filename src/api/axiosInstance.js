import axios from 'axios';

// Base API URL pointing to the newly created Spring Cloud API Gateway
const API_BASE_URL = 'http://localhost:8087/api';

const axiosInstance = axios.create({
    baseURL: API_BASE_URL
});

// Request Interceptor to attach the JWT Token to every request
axiosInstance.interceptors.request.use(
    (config) => {
        // Assuming the token is stored in localStorage after login
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response Interceptor to handle global errors (like 401 Unauthorized)
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            // Handle unauthorized errors (e.g., redirect to login or clear token)
            console.error('Unauthorized! Token may be invalid or expired.');
            // localStorage.removeItem('token');
            // window.location.href = '/'; 
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
