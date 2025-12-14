<script setup>
import NavbarLinks from './NavbarLinks.vue'
import { defineProps } from 'vue'

const props = defineProps({
  userLogin: Boolean
});

</script>

<template>
  <div class="nav">
    <div class="nav-logo">
      <img src="./../assets/img/logo_black.png" />
    </div>
    <div class="nav-links">
      <NavbarLinks :userLogin="userLogin" />
    </div>
  </div>
</template>

<style>
.nav {
  position: sticky;
  height: 52px;
  padding: 10px 50px;
  background: rgba(255, 255, 255, 0.75);
  color: black;  
}

.nav-logo {
  float: left;
}

.nav-logo img {
  height: 30px;
  cursor: pointer;
}

.nav-links {
  float: right;
}
</style>