<script setup>
    import { RouterLink, RouterView } from 'vue-router'
    import { useCartStore } from '../stores/CartStore';
    import { useCategoryStore } from '../stores/CategoryStore';
    import { useProductsStore } from '../stores/ProductsStore';

    const cartStore = useCartStore();
    const categoryStore = useCategoryStore();
    const productsStore = useProductsStore();

    function selectCategoria(id){
        productsStore.setProductosByCat(id);
    }

    function selectTodosProductos(){
        productsStore.setProductosAll();
    }
</script>

<template>
    <nav class="navbar navbar-dark bg-dark fixed-top">
        <div class="container-fluid">
            <a id="logo" class="navbar-brand text-center" href="/home">
                <img src="https://manosargentinas.com/inicio/wp-content/uploads/2022/04/logo_new1.png" alt="Logo" class="d-inline-block align-text-top">
            </a>
            <span class="navbar-text">
                <div id="carrito">
                    <RouterLink to="/carrito" class="nav-link active position-relative">
                        <v-icon name="bi-cart" scale="1.5" animation="wrench" hover />
                        <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" :hidden="cartStore.cartItemsSize == 0">
                            {{ cartStore.cartItemsSize }}
                        </span>
                    </RouterLink>
                </div>
            </span>
            <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="offcanvas offcanvas-end text-bg-dark" tabindex="-1" id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">
                <div class="offcanvas-header">
                    <h5 class="offcanvas-title" id="offcanvasDarkNavbarLabel">Menú</h5>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div class="offcanvas-body">
                    <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
                        <li class="nav-item">
                            <RouterLink to="/" class="nav-link active">Home</RouterLink>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Productos
                            </a>
                            <ul class="dropdown-menu dropdown-menu-dark">
                                <li @click="selectTodosProductos()">
                                    <RouterLink to="/productos" class="dropdown-item">
                                        <span class="badge text-bg-secondary">{{ productsStore.getProductosAllSize() }}</span> Todos los productos
                                    </RouterLink>
                                </li>
                                <li><hr class="dropdown-divider"></li>
                                <li v-for="cat in categoryStore.getCategorias" :key="cat.id" @click="selectCategoria(cat.id)">
                                    <RouterLink to="/productos" class="dropdown-item">
                                        <span class="badge text-bg-secondary">{{ productsStore.getProductosByCatSize(cat.id) }}</span> {{ cat.nombre }}
                                    </RouterLink>
                                </li>
                            </ul>
                        </li>
                        <li class="nav-item">
                            <RouterLink to="/about" class="nav-link active">About</RouterLink>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </nav>
</template>

<style>
#logo{
    text-align: center;
    display: block;
    margin:auto;
}

#carrito{
    margin-right: 1.5rem;
}
</style>