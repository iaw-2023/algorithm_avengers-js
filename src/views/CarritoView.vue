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
            <tr v-for="item in cartStore.getCartItems" :key="item.id">
                <th scope="row">{{ item.id }}</th>
                <td><img :src="item.imagen" :alt="item.nombre" class="img-thumbnail rounded" id="imagen"></td>
                <td>{{ item.nombre }}</td>
                <td>
                    <button @click="cartStore.decrementQty(item)" class="btn btn-primary btn-sm"> - </button>
                    <span>
                        {{item.quantity}}
                    </span>
                    <button @click="cartStore.incrementQty(item)" class="btn btn-primary btn-sm"> + </button>
                    
                </td>
                <td>
                    <select class="form-select form-select-sm" aria-label=".form-select-sm example" label="Talle" required>
                        <option v-for="talle in item.talles.split(',')" :key="talle" :value="talle" @click="cartStore.selectTalle(item, talle)"> {{ talle }}</option>
                    </select>
                </td>
                <td>${{ item.precio }}</td>
                <td>${{ item.precio * item.quantity }} </td>
                <td>
                    <button @click="cartStore.removeFromCart(item)" class="btn btn-danger btn-sm"><v-icon name="bi-cart-dash" /> Eliminar</button>
                </td>
            </tr>
            <tr>
                <td></td>
                <td></td>
                <td>
                    <div class="mb-3">
                        <input type="email" 
                            class="form-control" 
                            id="exampleFormControlInput1" 
                            placeholder="Ingrese su e-mail" 
                            v-model="emailCliente"
                            v-on:input="verificarMail()"
                            >
                    </div>
                </td>
                <td></td>
                <td></td>
                <td><p class="fw-bold">Total</p>
                </td>
                <td>
                    <p class="fw-bold">${{ (cartStore.cartItems.reduce((acc,item) => acc += item.precio * item.quantity,0)).toFixed(2) }}</p>
                </td>
                <td></td>
            </tr>
        </tbody>
    </table>

    <!-- Button trigger modal -->
    <div class="d-grid gap-2 d-md-flex justify-content-md-end">
        <button type="button" class="btn btn-primary btn-lg" data-bs-toggle="modal" data-bs-target="#exampleModal" v-bind:disabled="deshabilitarBoton">
            <v-icon name="bi-cart-check" scale="1.5"/> Comprar
        </button>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">Confirmar compra</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                ¿Desea realizar la compra?
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                <button type="button" class="btn btn-primary" @click="comprar()" data-bs-dismiss="modal">Continuar</button>
            </div>
            </div>
        </div>
    </div>

</template>

<script setup>
    import { useCartStore } from '../stores/CartStore';
    import {ref, computed} from 'vue';

    const cartStore = useCartStore();

    let emailCliente = "";
    const emailValido = ref(false); 


    function verificarMail(){
        const res = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        emailValido.value = res.test(String(emailCliente).toLowerCase());
    };

    let deshabilitarBoton = computed( () => {
            return ((cartStore.cartItemsSize == 0) || !emailValido.value);
    });

    function comprar(){
        let detalle = [];
        cartStore.getCartItems.forEach(item => {
            detalle.push(
                {
                "producto_id": item.id,
                "talle": item.talle_seleccionado, 
                "cantidad": item.quantity
                }
            )
        });

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email_cliente: emailCliente,
                detalle: detalle
            })
        };
        
        fetch('https://algorithm-avengers-laravel.vercel.app/rest/compras', requestOptions);

        emailCliente = "";
        cartStore.vaciarCart();
    }
</script>

<style>
#imagen{
    width:auto;
    max-height: 100px;
    text-align: center;
}
</style>