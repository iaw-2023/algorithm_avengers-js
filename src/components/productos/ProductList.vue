<template>
    <div class="container">
        <div class="row justify-content-evenly">
            <div class="col" v-for="prod in productsStore.getProductos" :key="prod.id">
                <ProductCard 
                    class="card m-2"
                    :prod=prod
                />
            </div>
        </div>
    </div>
</template>


<script setup>
    import { useProductsStore } from '../../stores/ProductsStore';
    import ProductCard from './ProductCard.vue';

    const productsStore = useProductsStore();
</script>

<style>
</style>