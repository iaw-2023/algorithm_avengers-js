<template>
  <header>
    <NavBar />
  </header>

  <RouterView />
</template>

<script setup>
	import { RouterLink, RouterView } from 'vue-router';
	import NavBar from './components/Navbar.vue';
	import { useCartStore } from './stores/CartStore';
	import { useCategoryStore } from './stores/CategoryStore';
	import { useProductsStore } from './stores/ProductsStore';
	import { onMounted } from 'vue';

	const cartStore = useCartStore();
	const categoryStore = useCategoryStore();
	const productsStore = useProductsStore();

	onMounted( () => {
		productsStore.loadProductos();
		categoryStore.loadCategorias();
	});
</script>

<style>

</style>
