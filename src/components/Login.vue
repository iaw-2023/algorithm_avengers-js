<template>
    <form @submit.prevent="login">
        <div class="px-1 pb-1">
            <input class="form-control" v-model="email" type="email" placeholder="email" required />
        </div>
        <div class="px-1 pb-1">
            <input class="form-control" v-model="contrasena" type="password" placeholder="contraseña" required />
        </div>
        <div class="d-flex align-items-end flex-column pe-1">
            <button class="btn btn-primary btn-sm" type="submit">Login</button>
        </div>
    </form>
</template>

<script>
import { useAuthStore } from '../stores/AuthStore';

export default {
    data() {
        return {
            email: '',
            contrasena: '',
        };
    },
    methods: {
        async login() {
            const authStore = useAuthStore();
            try {
                await authStore.login(this.email, this.contrasena);
            } catch (error) {
                console.error('Login failed', error);
            }
            await authStore.profile();
        },
    },
};
</script>