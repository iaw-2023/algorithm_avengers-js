<template>
    <div v-for="prod in productos" :key="prod.id">
        <div class="card text-center" style="width: 18rem;">
        <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.4nA_HWcexSy_0_GDiHF0TAHaEK%26pid%3DApi&f=1&ipt=e66bc6cec331c355c96d7a9d9ac32f90b61aacca8139b2204cdc98f00d9fee3e&ipo=images" class="card-img-top" alt="Foto">
            <div class="card-body">
                <h5 class="card-title">{{ prod.nombre }}</h5>
                <h6 class="card-subtitle mb-2 text-body-secondary">{{ prod.precio }}</h6>
                <p class="card-text">{{ prod.descripcion }}</p>
             <!--   <p class="card-text"><small class="text-body-secondary">{{ prod.categoria["nombre"] }}</small></p> -->
                <a href="#" class="btn btn-primary">
                    <v-icon name="bi-cart-plus" animation="wrench" hover scale="1.2" title="Añadir al carrito" />
                    Añadir al carrito
                </a>
            </div>
        </div>
    </div>
</template>

<script>
    export default{
        name: "ProductCards",

        data(){
            return {
                productos: [],
            };
        },

        created(){
            fetch("https://algorithm-avengers-laravel.vercel.app/rest/productos")
                .then((response) => response.json())
                .then((data) => (this.productos = data));
            
            console.log(this.productos);
        }
        
    }
</script>

<style>
</style>