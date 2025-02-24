import { defineStore } from 'pinia';
import axios from 'axios';

const API_URL = 'http://localhost:8000/rest'; // Replace with your Laravel API URL

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: JSON.parse(localStorage.getItem('user')) || null,
    }),
    getters: {
        isAuthenticated: (state) => !!state.user,
    },
    actions: {
        async register(name, email, password) {
            await axios.post(`${API_URL}/register`, {
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
            if (response.data.access_token) {
                this.user = response.data;
                localStorage.setItem('user', JSON.stringify(response.data));
            }
        },
        async logout() {
            await axios.post(`${API_URL}/logout`, {}, {
                headers: {
                    Authorization: `Bearer ${this.user.access_token}`,
                },
            });
            this.user = null;
            localStorage.removeItem('user');
        },
    },
});