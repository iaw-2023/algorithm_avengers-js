<script setup>
    import { useAuthStore } from '../stores/AuthStore';
    import { computed } from 'vue';
    
    const authStore = useAuthStore();
    const user = computed(() => authStore.user);
    const compras = computed(() => authStore.getUserPurchases);
</script>

<template>
    <h1 class="mb-4">Tus compras, {{ user.nombre }}</h1>

    <div class="card mt-6" v-for="compra in compras">
        <div class="card-body m-3">
            <div class="row">
                <p class="h4 col text-start fw-bold">{{ compra.fecha }}</p>
                <p class="col text-end fw-lighter">#{{ compra.id }}</p>
            </div>
            <p class="h5 fw-normal">Total: ${{ compra.precio }}</p>
            
            <div class="container d-grid">
                <div v-for="detalle in compra.detalles" class="card mb-1 mx-auto" style="max-width: 540px;">
                    <div class="row align-items-center g-0">
                        <div class="col-md-4">
                            <img :src="detalle.producto.imagen" class="img-fluid rounded-start m-2" alt="imagen de producto">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title">{{detalle.producto.nombre}} (x{{ detalle.cantidad }})</h5>
                                <p class="card-text"><small class="text-body-secondary">Talle: {{detalle.talle}}</small></p>
                                <p class="card-text" id="descripcion">{{detalle.producto.descripcion}}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    </div>
    </div>
</template>

<style>
#descripcion {
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
}
</style>