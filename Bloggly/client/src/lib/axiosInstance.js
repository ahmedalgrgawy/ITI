import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: import.meta.env.MODE === 'development' ? 'http://localhost:5000/api' : '/api',
    withCredentials: true // for cookies
});

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response) {
            switch (error.response.status) {
                case 400:
                    console.error('Bad Request: ', error.response.data);
                    break;
                case 401:
                    console.error('Unauthorized: Please log in again.');
                    break;
                case 404:
                    console.error('Not Found: The requested resource was not found.');
                    break;
                case 500:
                    console.error('Internal Server Error: Try again later.');
                    break;
                default:
                    console.error('Error: ', error.response.data);
            }
        } else if (error.request) {
            console.error('No response received: ', error.request);
        } else {
            console.error('Error setting up request: ', error.message);
        }

        return Promise.reject(error);
    }
);


export default axiosInstance;