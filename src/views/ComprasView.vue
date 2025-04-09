<script setup>
    import { useAuthStore } from '../stores/AuthStore';
    import { computed } from 'vue';
    
    const authStore = useAuthStore();
    const user = computed(() => authStore.user);
</script>

<template>
    <h1>Tus compras, {{ user.nombre }}</h1>
    <p>{{ user.compras }}</p>
</template>

<style>
</style>