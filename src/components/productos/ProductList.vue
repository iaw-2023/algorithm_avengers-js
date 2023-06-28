<template>
    <div class="container text-center">
        <div class="row justify-content-evenly">
            <div class="col" v-for="prod in productsStore.getProductos" :key="prod.id">
                <ProductCard 
                    class="card"
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
.card{
    margin:10px;
}

#card-container{
    display: inline-block;
    flex-direction: column;
}

</style>