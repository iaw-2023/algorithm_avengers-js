import axios from 'axios';

const apiClient = axios.create({
    baseURL: '127.0.0.1:8000/rest',
    headers:{
        'Content-Type': 'application/json',
    },
});

export default apiClient;