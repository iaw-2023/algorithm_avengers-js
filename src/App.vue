<template>
  <div class="container-fluid px-3 px-md-5">
	<header>
		<NavBar />
	</header>
	<div class="content">
		<RouterView />
	</div>
  </div>
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
.content{
	padding-top: 6em;	
}
</style>
