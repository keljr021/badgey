<script setup>
import { onMounted } from 'vue';
import { useColorMode } from '#imports';
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';

const colorMode = useColorMode();

onMounted(() => {
  if (colorMode.preference !== 'light') {
    colorMode.preference = 'light';
  }

  console.log('-env files:----');
  console.log(import.meta.env);
})

</script>

<template>
  <UApp>
    <Navbar :userLogin="true" />

    <div class="page">
      <router-view></router-view>
    </div>

    <Footer />
  </UApp>
</template>

<style scoped>
</style>
