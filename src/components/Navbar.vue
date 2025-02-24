<script setup>
    import { RouterLink, RouterView, useRouter } from 'vue-router'
    import { useCartStore } from '../stores/CartStore';
    import { useCategoryStore } from '../stores/CategoryStore';
    import { useProductsStore } from '../stores/ProductsStore';
    import { ref, computed } from 'vue';
    import { useAuthStore } from '@/stores/AuthStore';

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

    // Refs for form inputs
    const email = ref('');
    const contrasena = ref('');

    // Computed properties
    const isAuthenticated = computed(() => authStore.isAuthenticated);
    const user = computed(() => authStore.user);

    // Login handler
    const handleLogin = async () => {
    try {
        await authStore.login({ email: email.value, contrasena: contrasena.value });
        email.value = '';
        contrasena.value = '';
        router.push('/'); // Redirect to home after login
    } catch (error) {
        console.error('Login failed', error);
    }
    };

    // Logout handler
    const handleLogout = async () => {
    await authStore.logout();
    router.push('/login'); // Redirect to login after logout
    };

</script>

<template>
    <nav class="navbar navbar-dark bg-dark fixed-top">
        <div class="container-fluid">
            <RouterLink to="/" id="logo">
                <img src="https://res.cloudinary.com/drspuruy2/image/upload/v1738273320/MA_logo_ob_tb7inf.png" alt="Logo" class="d-inline-block align-text-top" style="max-width: 150px;">
            </RouterLink>  
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
                        <!-- Login Form or User Info -->
                        <div class="auth-section">
                            <div v-if="!isAuthenticated">
                                <form @submit.prevent="login" class="login-form">
                                    <input v-model="email" type="email" placeholder="Email" required />
                                    <input v-model="contrasena" type="password" placeholder="Contraseña" required />
                                    <button type="submit">Login</button>
                                </form>
                                <router-link to="/register" class="register-link">Registrar</router-link>
                            </div>
                            <div v-else>
                                <span>Welcome, {{ user.nombre }}</span>
                                <button @click="logout" class="logout-button">Logout</button>
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

#carrito{
    margin-right: 1.5rem;
}
</style>