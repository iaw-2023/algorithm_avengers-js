import axios from 'axios';

const API_URL = 'http://localhost:8000/rest'; // Replace with your Laravel API URL

const register = (name, email, password) => {
    return axios.post(`${API_URL}/registrar`, {
        email,
        contrasena,
        nombre,
        telefono,
        direccion
    });
};

const login = (email, password) => {
    return axios.post(`${API_URL}/login`, {
        email,
        contrasena,
    }).then((response) => {
        if (response.data.access_token) {
            localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
    });
};

const logout = () => {
    localStorage.removeItem('user');
    return axios.post(`${API_URL}/logout`, {}, {
        headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).access_token}`,
        },
    });
};

export default {
    register,
    login,
    logout,
};