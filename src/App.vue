<script setup>
  import { RouterLink, RouterView } from 'vue-router'
  import NavBar from './components/Navbar.vue'
  import { useCartStore } from './stores/CartStore';

  const cartStore = useCartStore();
</script>

<template>
  <header>
    <NavBar />
  </header>

  <RouterView />
</template>

<style>

</style>
