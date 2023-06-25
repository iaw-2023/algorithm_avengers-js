<template>
    <div class="container text-center">
        <div class="row justify-content-evenly">
            <div class="col" v-for="prod in productos.data" :key="prod.id">
                <ProductCard 
                    class="card"
                    :prod=prod
                />
            </div>
        </div>
    </div>
</template>

<script>
    import ProductCard from './ProductCard.vue';

    export default{
        components: {ProductCard},

        data(){
            return {
                productos: [],
            };
        },

        mounted(){
            fetch("http://127.0.0.1:8000/rest/productos")
                .then((response) => response.json())
                .then((data) => (this.productos = data));
        }
    }
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