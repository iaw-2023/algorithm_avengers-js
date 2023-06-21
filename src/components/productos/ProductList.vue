<template>
    <div v-for="prod in productos.data" :key="prod.id">
        <ProductCard 
            :imagen=prod.imagen
            :nombre=prod.nombre 
            :precio=prod.precio
            :descripcion=prod.descripcion
            :categoria=prod.categoria.nombre
            :talles=prod.talles
        />
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
</style>