<template>   
  <div class="container-fluid my-3 my-md-4">
    <div class="register-container">
      <h2>Crear usuario</h2>
      <form @submit.prevent="handleRegister" class="register-form">
        <div class="mb-3">
          <label for="email" class="form-label">Email</label>
          <input v-model="email" type="email" id="email" class="form-control" placeholder="jose_sanmartin@ejemplo.com" required />
          <span class="form-text text-danger" v-if="errors?.email">{{errors.email[0]}}</span>
        </div>
        <div class="mb-3">
          <label for="nombre" class="form-label">Nombre y apellido</label>
          <input v-model="nombre" type="text" id="nombre" class="form-control" placeholder="José San Martín" required minlength="1" />
          <span class="form-text text-danger" v-if="errors?.nombre">{{errors.nombre[0]}}</span>
        </div>
        <div class="mb-3">
          <label for="contrasena" class="form-label">Contraseña</label>
          <input v-model="contrasena" type="password" id="contrasena" class="form-control" placeholder="Contraseña" pattern=".{8,}" required/>
          <span class="form-text">
            Debe tener al menos 8 caracteres
          </span>
          <span class="form-text text-danger" v-if="errors?.contrasena">{{errors.contrasena[0]}}</span>

        </div>
        <div class="mb-3">
          <label for="telefono" class="form-label">Teléfono</label>
          <input v-model="telefono" type="tel" id="telefono" class="form-control" pattern="^\+?[1-9][0-9]{7,14}$" placeholder="2915743111" required/>
          <span class="form-text text-danger" v-if="errors?.telefono">{{errors.telefono[0]}}</span>
        </div>
        <div class="mb-3">
          <label for="domicilio" class="form-label">Domicilio</label>
          <input v-model="domicilio" type="text" id="domicilio" class="form-control" placeholder="Yapeyú 1778" required minlength="1"/>
          <span class="form-text text-danger" v-if="errors?.domicilio">{{errors.domicilio[0]}}</span>
        </div>
        <div>
          <button type="submit" class="btn btn-primary">Registrarse</button>
        </div>
      </form>
    </div>
  </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useAuthStore } from '@/stores/AuthStore';
  import { useRouter } from 'vue-router';
  
  const errors = ref({});

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
      console.log(`Registrando usuario\n email: ${email.value}\n contraseña: ${contrasena.value}\n nombre: ${nombre.value}\n telefono: ${telefono.value}\n domicilio: ${domicilio.value}`);
      await authStore.register(
        email.value,
        contrasena.value,
        nombre.value,
        telefono.value,
        domicilio.value
      );
      router.push('/');
      await authStore.profile();
    } catch (error) {
      console.error('Registro fallido', error);
      if(error.response?.status === 422){
        errors.value = error.response.data.errors;
      }
    }
  };
  </script>