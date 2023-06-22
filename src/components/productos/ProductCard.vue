<template>
    <div id="card-cuerpo" class="card text-center">
        <img :src="`${imagen}`" class="rounded mx-auto d-block" alt="Foto" id="foto">
        <div class="card-body">
            <h5 class="card-title">{{ nombre }}</h5>
            <h6 class="card-subtitle mb-2 text-body-secondary">$ {{ parseFloat(precio).toFixed(2) }}</h6>
            <p class="card-text" id="descripcion">{{ descripcion }}</p>
            <p class="card-text"><small class="text-body-secondary">Talles: {{ talles }}</small></p>
            <p class="card-text"><small class="text-body-secondary">#{{ categoria }}</small></p>
            <button class="btn btn-primary" @click="$event => addProducto()">
                <v-icon name="bi-cart-plus" animation="wrench" hover scale="1.2" title="Añadir al carrito" />
                Añadir al carrito
            </button>
        </div>
    </div>
</template>

<script>
    export default{
        name:'ProductCard',
            props: {
                id: Number,
                imagen: String,
                nombre: String,
                precio: String,
                descripcion: String,
                categoria: String,
                talles: String,
                cantidad: 1
            },
            methods:{
                addProducto(){
                    console.log("Hola");
                }
            }
    }
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
}

#card-cuerpo{
    height: 37rem;
    width: 18rem;
}
</style>