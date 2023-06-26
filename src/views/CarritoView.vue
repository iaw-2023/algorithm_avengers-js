<template>
    <table class="table table-hover">
        <thead>
            <tr>
            <th scope="col">#</th>
            <th scope="col">Imagen</th>
            <th scope="col">Nombre</th>
            <th scope="col">Cantidad</th>
            <th scope="col">Talle</th>
            <th scope="col">Precio</th>
            <th scope="col">Subtotal</th>
            <th scope="col"></th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in data.getCartItems" :key="item.id">
                <th scope="row">{{ item.id }}</th>
                <td><img :src="item.imagen" :alt="item.nombre" class="img-thumbnail rounded" id="imagen"></td>
                <td>{{ item.nombre }}</td>
                <td>
                    <button @click="data.decrementQty(item)" class="btn btn-primary btn-sm"> - </button>
                    <span>
                        {{item.quantity}}
                    </span>
                    <button @click="data.incrementQty(item)" class="btn btn-primary btn-sm"> + </button>
                    
                </td>
                <td>
                    <select class="form-select form-select-sm" aria-label=".form-select-sm example" label="Talle" required>
                        <option v-for="talle in item.talles.split(',')" :key="talle" :value="talle"> {{ talle }}</option>
                    </select>
                </td>
                <td>${{ item.precio }}</td>
                <td>${{ item.precio * item.quantity }} </td>
                <td>
                    <button @click="data.removeFromCart(item)" class="btn btn-danger btn-sm">Eliminar</button>
                </td>
            </tr>
        </tbody>
    </table>
    <div class="d-grid gap-2 d-md-flex justify-content-md-end">
        <button class="btn btn-primary btn-lg" type="button">Comprar</button>
    </div>
</template>

<script setup>
    import { useCartStore } from '../stores/CartStore';

    const data = useCartStore();
</script>

<style>
#imagen{
    width:auto;
    max-height: 100px;
}
</style>