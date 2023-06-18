<script setup>
import { RouterLink, RouterView } from 'vue-router'
import NavBar from './components/Navbar.vue'
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <header>
    <NavBar />
  </header>

  <RouterView />
</template>

<style scoped>

</style>
