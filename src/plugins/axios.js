import axios from 'axios';

const apiClient = axios.create({
    //baseURL: 'http://127.0.0.1:8000/rest',
    baseURL: 'https://algorithm-avengers-laravel.vercel.app/rest',
    headers:{
        'Content-Type': 'application/json',
    },
});

const apiMP = axios.create({
    baseURL: 'https://api.mercadopago.com/v1',
});

export {apiClient, apiMP};