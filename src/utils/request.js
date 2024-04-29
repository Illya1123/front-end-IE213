import axios from "axios";
import Swal from "sweetalert2";

const http = axios.create({
    baseURL: process.env.NODE_ENV === 'production' ? process.env.REACT_APP_BE_URL : 'http://localhost:3000',
    timeout: 5000
})

http.interceptors.request.use(
    function (config){
        config.headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };
        return config;
    },
    function (error){
        return Promise.reject(error);
    }
);

http.interceptors.response.use(
    function (response){
        return response.data;
    },
    function (error){
        console.log(error);
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error.response.data.message,
          })
        return error;
    }
);

export default http;