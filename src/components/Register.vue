<template>
    <form @submit.prevent="register">
        <input v-model="email" type="email" placeholder="Email" required />
        <input v-model="contrasena" type="password" placeholder="Contraseña" required />
        <input v-model="nombre" type="text" placeholder="Nombre y Apellido" required />
        <input v-model="telefono" type="tel" placeholder="Telefono" required />
        <input v-model="domicilio" type="text" placeholder="Domicilio" required />
        <button type="submit">Registrar</button>
    </form>
</template>

<script>
import { useAuthStore } from '@/stores/auth';

export default {
    data() {
        return {
            email: '',
            contrasena: '',
            nombre: '',
            telefono: '',
            domicilio: ''
        };
    },
    methods: {
        async register() {
            const authStore = useAuthStore();
            try {
                await authStore.register(this.email, this.contrasena, this.nombre, this.telefono, this.domicilio);
                this.$router.push('/login'); // Redirect to login after registration
            } catch (error) {
                console.error('Registration failed', error);
            }
        },
    },
};
</script>