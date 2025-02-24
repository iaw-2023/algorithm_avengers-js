<template>
    <div class="register-container">
      <h2>Crear usuario</h2>
      <form @submit.prevent="handleRegister" class="register-form">
        <div class="form-group">
          <label for="email">Email</label>
          <input v-model="email" type="email" id="email" placeholder="Enter your email" required />
        </div>
        <div class="form-group">
          <label for="nombre">Nombre y apellido</label>
          <input v-model="nombre" type="text" id="nombre" placeholder="Enter your name" required />
        </div>
        <div class="form-group">
          <label for="contrasena">Password</label>
          <input v-model="contrasena" type="password" id="contrasena" placeholder="Enter your password" required />
        </div>
        <div class="form-group">
          <label for="telefono">Teléfono</label>
          <input v-model="telefono" type="tel" id="telefono" placeholder="Enter your phone number" required />
        </div>
        <div class="form-group">
          <label for="domicilio">Domicilio</label>
          <input v-model="domicilio" type="text" id="domicilio" placeholder="Enter your place" required />
        </div>
        <button type="submit" class="register-button">Register</button>
      </form>
      <p>
        ¿Ya tenés una cuenta? <router-link to="/login">Iniciá sesión acá</router-link>.
      </p>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useAuthStore } from '@/stores/AuthStore';
  import { useRouter } from 'vue-router';
  
  // Refs for form inputs
  const email = ref('');
  const contrasena = ref('');
  const nombre = ref('');
  const telefono = ref('');
  const domicilio = ref('');
  
  // Auth store and router
  const authStore = useAuthStore();
  const router = useRouter();
  
  // Register handler
  const handleRegister = async () => {
    try {
      await authStore.register({
        email: email.value,
        contrasena: contrasena.value,
        nombre: nombre.value,
        telefono: telefono.value,
        domicilio: domicilio.value
      });
      router.push('/login'); // Redirect to login after successful registration
    } catch (error) {
      console.error('Registration failed', error);
    }
  };
  </script>