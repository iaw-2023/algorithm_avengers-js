<template>
    <div id="card-cuerpo" class="card text-center">
        <img :src="`${prod.imagen}`" class="rounded mx-auto d-block" alt="Foto" id="foto">
        <div class="card-body">
            <h5 class="card-title">{{ prod.nombre }}</h5>
            <h6 class="card-subtitle mb-2 text-body-secondary">$ {{ parseFloat(prod.precio).toFixed(2) }}</h6>
            <p class="card-text" id="descripcion">{{ prod.descripcion }}</p>
            <p class="card-text"><small class="text-body-secondary">Talles: {{ prod.talles }}</small></p>
            <p v-if="typeof prod.categoria !== 'undefined'" class="card-text"><small class="text-body-secondary">#{{ prod.categoria.nombre }}</small></p>
            <button class="btn btn-primary" @click="data.addToCart(prod)">
                <v-icon name="bi-cart-plus" animation="wrench" hover scale="1.2" title="Añadir al carrito" />
                Añadir al carrito
            </button>
        </div>
    </div>
</template>

<script setup>
    import { useCartStore } from '../../stores/CartStore';

    const props = defineProps({
        prod: {
            type: Object,
            required: true
        }
    });

    const data = useCartStore();

</script>

<style>
#descripcion {
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
}

#foto {
    width:auto;
    max-height: 250px;
    max-width: 250px;
}

#card-cuerpo{
    height: 37rem;
    width: 18rem;
}
</style>