<script setup>
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
</script>

<template>
  <UApp>
    <Navbar />
    <router-view></router-view>
    <Footer />
  </UApp>
</template>

<style scoped>
</style>
