<template>
    <form @submit.prevent="login">
        <div class="px-1 pb-1">
            <input class="form-control" v-model="email" type="email" placeholder="email" required />
            <span class="form-text text-danger" v-if="errors?.email">{{ errors.email[0] }}</span>
        </div>
        <div class="px-1 pb-1">
            <input class="form-control" v-model="contrasena" type="password" placeholder="contraseña" required />
            <span class="form-text text-danger" v-if="errors?.contrasena">{{ errors.contrasena[0] }}</span>
            <span class="form-text text-danger mt-2" v-if="errors.value !== ''">{{ errors.value }}</span>
        </div>
        <div class="d-flex align-items-end flex-column pe-1">
            <button class="btn btn-primary btn-sm" type="submit">Login</button>
        </div>
        
    </form>
</template>

<script>
import { useAuthStore } from '../stores/AuthStore';
import { ref } from 'vue';

export default {
    data() {
        return {
            email: '',
            contrasena: '',
            errors: ref({})
        };
    },
    methods: {
        async login() {
            const authStore = useAuthStore();
            try {
                await authStore.login(this.email, this.contrasena);
                await authStore.profile();
            } catch (error) {
                if(error.response?.status === 422){
                    this.errors.value = error.response.data.errors;
                }
                if(error.response?.status === 401){
                    this.errors.value = error.response.data.message;
                }
                console.error('Error al iniciar sesión.', error);
            }
        },
    },
};
</script>