<script setup>
    import { RouterLink, RouterView, useRouter } from 'vue-router'
    import { useCartStore } from '../stores/CartStore';
    import { useCategoryStore } from '../stores/CategoryStore';
    import { useProductsStore } from '../stores/ProductsStore';
    import { ref, computed } from 'vue';
    import { useAuthStore } from '@/stores/AuthStore';
    import Login from '../components/Login.vue'

    const cartStore = useCartStore();
    const categoryStore = useCategoryStore();
    const productsStore = useProductsStore();
    // Auth store and router
    const authStore = useAuthStore();
    const router = useRouter();

    function selectCategoria(id){
        productsStore.setProductosByCat(id);
    }

    function selectTodosProductos(){
        productsStore.setProductosAll();
    }

    const isAuthenticated = computed(() => authStore.isAuthenticated);
    const user = computed(() => authStore.user);

    const logout = () => authStore.logout();
    const purchases = () => authStore.purchases();

   // console.log(`Usuario: ${JSON.stringify(user)}`);
</script>

<template>
    <nav class="navbar navbar-dark bg-dark fixed-top">
        <div class="container-fluid">
            <RouterLink to="/" id="logo">
                <img src="https://res.cloudinary.com/drspuruy2/image/upload/v1738273320/MA_logo_ob_tb7inf.png" alt="Logo" class="d-inline-block align-text-top" style="max-width: 150px;">
            </RouterLink>  
            <span class="navbar-text">
                <div class="row align-items-end">
                    <div class="col text-center" v-if="isAuthenticated" >
                        <RouterLink to="/compras" class="nav-link active position-relative" aria-label="Mis compras">
                            <v-icon @click="purchases" name="bi-handbag" scale="1.5" animation="wrench" hover inverse/>
                            <p class="m-0">Compras</p>
                        </RouterLink>
                    </div>
                    <div class="col text-center me-4">
                        <RouterLink to="/carrito" class="nav-link active position-relative" aria-label="Carrito">
                            <v-icon name="bi-cart" scale="1.5" animation="wrench" hover />
                            <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" :hidden="cartStore.cartItemsSize == 0">
                                {{ cartStore.cartItemsSize }}
                            </span>
                            <p class="m-0">Carrito</p>
                        </RouterLink>
                    </div>
                </div>
            </span>
            <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar" aria-label="Toggle de navegación">
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
                        <!-- Login Form or User Info -->
                        <div class="auth-section">
                            <div v-if="!isAuthenticated">
                                <div class="d-flex justify-content-end pe-1">
                                    <p class="me-1">¿Eres nuevo?</p>
                                    <router-link to="/register" class="link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover">
                                        Registrarse
                                    </router-link>
                                </div>
                                <Login />
                            </div>
                            <div v-else>
                                <span>Bienvenido, {{ user.nombre }}</span>
                                <button @click="logout" class="d-flex justify-content-end pe-1 btn btn-danger btn-sm">Cerrar sesión</button>
                            </div>
                        </div>
                        </li>

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
</style>