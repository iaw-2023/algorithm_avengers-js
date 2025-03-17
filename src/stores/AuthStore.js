import { defineStore } from 'pinia';
import axios from 'axios';

const API_URL = 'http://localhost:8000/rest/clientes'; // Replace with your Laravel API URL

export const useAuthStore = defineStore('AuthStore', {
    state: () => ({
        user: JSON.parse(localStorage.getItem('user')) || null,
        token: JSON.parse(localStorage.getItem('token')) || null,
    }),
    getters: {
        isAuthenticated: (state) => !!state.user,
    },
    actions: {
        async register(email, contrasena, nombre, telefono, domicilio) {
            await axios.post(`${API_URL}/registrar`, {
                email,
                contrasena,
                nombre,
                telefono,
                domicilio
            });
        },
        async login(email, contrasena) {
            const response = await axios.post(`${API_URL}/login`, {
                email,
                contrasena,
            });
            if (response.data.token) {
                this.token = response.data.token;
                localStorage.setItem('token', JSON.stringify(response.data.token));
            }
        },
        async profile(){
            const response = await axios.post(`${API_URL}/perfil`, {}, {
                headers: {
                    Authorization: `Bearer ${this.token}`
                },
            });
            if(response.data){
                this.user = response.data;
                localStorage.setItem('user', JSON.stringify(response.data));
            }
        },
        async logout() {
            await axios.post(`${API_URL}/logout`, {}, {
                headers: {
                    Authorization: `Bearer ${this.token}`,
                },
            });
            this.user = null;
            localStorage.removeItem('user');
        },
    },
});