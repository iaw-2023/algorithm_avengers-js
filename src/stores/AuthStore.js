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
                const response = await apiClient.post('/clientes/login', {
                    email,
                    contrasena,
                });
                this.token = response.data.token;
                localStorage.setItem('authToken', this.token);
                apiClient.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
                await this.profile();
                return response.data;
            }catch(error){
                this.error = error.response?.data?.message || 'Login fallido';
                throw error;
            }
        },
        async profile(){
            try {
                const response = await apiClient.get('/clientes/perfil');
                this.user = response.data;
                return response.data;
            } catch (error){
                this.error = error.response?.data?.message || "Error al obtener el perfil del usuario";
                throw error;
            }
        },
        async logout() {
            try{
                console.log(`Cerrando sesión de ${this.user.nombre}`);
                await apiClient.post('/clientes/logout');
                this.user = null;
                this.token = null;
                localStorage.removeItem('auth_token');
                delete apiClient.defaults.headers.common['Authorization'];
            } catch (error) {
                this.error = error.response?.data?.message || "Logout fallido";
                throw error;
            }
        }
    },
});