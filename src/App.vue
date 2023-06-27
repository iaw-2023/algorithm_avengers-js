<template>
  <header>
    <NavBar />
  </header>

  <RouterView />
</template>

<script>
  	import { useCartStore } from './stores/CartStore';

	export default {
		name: 'App',
		data() {
			return{
				categorias: [],
				cartStore: useCartStore,
				productosAll: []
			}
		},
		mounted() {
			fetch("http://127.0.0.1:8000/rest/productos")
				.then((response) => response.json())
				.then((data) => (this.productosAll = data));
			console.log("productosAll = " + this.productosAll);

			fetch("http://127.0.0.1:8000/rest/categorias")
				.then((response) => response.json())
				.then((data) => (this.categorias = data));

			console.log("categorias = " + this.categorias);
		}
	}
</script>

<script setup>
  import { RouterLink, RouterView } from 'vue-router'
  import NavBar from './components/Navbar.vue'
</script>

<style>

</style>
