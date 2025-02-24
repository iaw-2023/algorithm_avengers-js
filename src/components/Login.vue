<template>
    <form @submit.prevent="login">
        <input v-model="email" type="email" placeholder="Email" required />
        <input v-model="contrasena" type="password" placeholder="Password" required />
        <button type="submit">Login</button>
    </form>
</template>

<script>
import { useAuthStore } from '@/stores/AuthStore';

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
                this.$router.push('/dashboard'); // Redirect to a protected route
            } catch (error) {
                console.error('Login failed', error);
            }
        },
    },
};
</script>