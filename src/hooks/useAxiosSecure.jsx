import axios from "axios";

export const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000',
    // You can add any default headers or configurations here
});

const useAxiosSecure = () => {

    // Add a request interceptor to include the token in headers for every request made using this instance
    axiosSecure.interceptors.request.use(config => {
        const token = localStorage.getItem('access-token');
        console.log('Token from localStorage:', token); // Debugging log
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    }, error => {
        return Promise.reject(error);
    });

    // intercpt 401 and 403 status
    axiosSecure.interceptors.response.use(response => {
        return response;
    }, error => {
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
            // Handle unauthorized or forbidden responses here, e.g., log out the user or redirect to login page    
            console.log('Unauthorized or Forbidden response detected:', error.response);
            // You can also clear the token from localStorage if needed
            localStorage.removeItem('access-token');
            // Optionally, you can redirect the user to the login page or show a notification
        }
        return Promise.reject(error);
    });

    
    return axiosSecure;
};

export default useAxiosSecure;