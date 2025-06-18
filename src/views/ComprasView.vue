<script setup>
    import { useAuthStore } from '../stores/AuthStore';
    import { computed } from 'vue';
    
    const authStore = useAuthStore();
    const user = computed(() => authStore.user);
    const compras = computed(() => authStore.getUserPurchases);
</script>

<template>
    <div class="container-fluid my-3 my-md-4">
        <h1 class="mb-4">Tus compras, {{ user.nombre }}</h1>

        <div class="card my-3" v-for="compra in compras">
            <div class="card-body m-3">
                <div class="row">
                    <p class="col text-start">{{ compra.fecha }}</p>
                    <p class="col text-end fw-lighter">#{{ compra.id }}</p>
                </div>
                
                <div class="container d-grid">
                    <div v-for="detalle in compra.detalles" class="card mb-1 mx-auto" style="max-width: 540px;">
                        <div class="row align-items-center g-0">
                            <div class="col-md-4 d-flex align-items-center justify-content-center">
                                <img :src="detalle.producto.imagen" class="imagen img-fluid rounded-start m-2" alt="imagen de producto">
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
    </div>
</template>

<style>
#descripcion {
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
}

.imagen{
    max-width: 150px;
    max-height: 150px;
    width: auto;
    height: auto;
}
</style>