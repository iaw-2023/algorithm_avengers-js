<script setup>
    import { useAuthStore } from '../stores/AuthStore';
    import { computed } from 'vue';
    
    const authStore = useAuthStore();
    const user = computed(() => authStore.user);
</script>

<template>
    <h1>Tus compras, {{ user.nombre }}</h1>
    <ol v-for="compra in user.compras">
        <li>
            <p>Id de compra: {{ compra.id }}</p>
            <p>Precio: {{ compra.precio }}</p>
            <p>Fecha: {{ compra.fecha }}</p>
            <p>Productos:</p>
            <ul>
                <li v-for="producto in compra.detalles">
                    {{ producto }}
                </li>
            </ul>
        </li>
    </ol>
</template>

<style>
</style>