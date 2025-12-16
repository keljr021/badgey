<script setup>
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'

</script>

<template>
  <UApp>
    <Navbar :userLogin="false" />

    <div class="page">
      <router-view></router-view>
    </div>

    <Footer />
  </UApp>
</template>

<style scoped>
</style>
