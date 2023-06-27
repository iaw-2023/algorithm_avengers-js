<template>
    <div class="container text-center">
        <div class="row justify-content-evenly">
            <div class="col" v-for="prod in data.getProductos" :key="prod.id">
                <ProductCard 
                    class="card"
                    :prod=prod
                />
            </div>
        </div>
    </div>
</template>


<script setup>
    import { useCartStore } from '../../stores/CartStore';
    import ProductCard from './ProductCard.vue';

    const data = useCartStore();
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