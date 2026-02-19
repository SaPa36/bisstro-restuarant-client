import axios from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";

export const axiosSecure = axios.create({
    baseURL: 'https://bisstro-restuarant-server.vercel.app',
    // You can add any default headers or configurations here
});

const useAxiosSecure = () => {
    const { logOut } = useContext(AuthContext);
    const navigate = useNavigate();

    // Add a request interceptor to include the token in headers for every request made using this instance
    axiosSecure.interceptors.request.use(config => {
        const token = localStorage.getItem('access-token');
        //console.log('Token from localStorage:', token); // Debugging log
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
    }, async error => {
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
            await logOut();
            navigate('/login');
        }
        return Promise.reject(error);
    });



    return axiosSecure;
};

export default useAxiosSecure;