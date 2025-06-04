import axios from 'axios';

const apiClient = axios.create({
    //baseURL: 'http://127.0.0.1:8000/rest',
    //baseURL: 'https://algorithm-avengers-laravel.vercel.app/rest',
    //baseURL: 'https://algorithm-avengers-laravel-fgq1tdydc-algorithm-avengers.vercel.app/rest/', // este es el que tiene el código ejemplo
    //baseURL: 'https://algorithm-avengers-laravel-4xl6htaoa-algorithm-avengers.vercel.app/rest', // este es el que tiene el código más actualizado
    //baseURL: 'https://algorithm-avengers-laravel-ij48zr20e-algorithm-avengers.vercel.app/rest',
    baseURL: 'https://algorithm-avengers-laravel-6ao5alav9-algorithm-avengers.vercel.app/rest',
    headers:{
        'Content-Type': 'application/json',
    },
});

export default apiClient;