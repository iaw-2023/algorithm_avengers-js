import { defineStore } from 'pinia';
import apiClient from '../plugins/axios';

export const useAuthStore = defineStore('AuthStore', {
    state: () => ({
        user: null,
        token: JSON.parse(localStorage.getItem('auth_token')) || null,
        error: null,
    }),
    getters: {
        isAuthenticated: (state) => !!state.user,
    },
    actions: {
        async register(email, contrasena, nombre, telefono, domicilio) {
            try {
                response = await apiClient.post('clientes/registrar', {
                    email,
                    contrasena,
                    nombre,
                    telefono,
                    domicilio
                });
                this.user = response.data;
                return response.data;
            }catch(error){
                this.error = error.response?.data?.message || 'Registro fallido';
                throw error;
            }
        },
        async login(email, contrasena) {
            try{
                const response = await apiClient.post(`/clientes/login`, {
                    email,
                    contrasena,
                });
                this.token = response.data.token;
                localStorage.setItem('authToken', this.token);
                apiClient.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
                await this.fetchProfile();
                return response.data;
            }catch(error){
                this.error = error.response?.data?.message || 'Login fallido';
                throw error;
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