<script setup>
import NavbarLinks from './NavbarLinks.vue'
import NavbarLinksMobile from './NavbarLinksMobile.vue'
import { defineProps } from 'vue'

const props = defineProps({
  userLogin: Boolean
});

</script>

<template>
  <div class="nav">
    <div class="nav-logo" @click="$router.push({ name: 'home'})">
      <img src="./../assets/img/logo_black.png" />
    </div>
    <div class="nav-links">
      <NavbarLinks class="desktop" :userLogin="userLogin" />
      <NavbarLinksMobile class="mobile" />
    </div>
  </div>
</template>

<style>
.nav {
  position: fixed;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-content: center;
  align-items: center;
  width: calc(100% - 100px);
  height: 52px;
  padding: 0 50px;
  background: rgba(255, 255, 255, 0.95);
  color: black;  
  z-index: 9;
}

.nav-logo {
  flex: 1;
}

.nav-logo img {
  height: 30px;
  cursor: pointer;
}

.nav-links {
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  align-items: center;
  align-content: center;
}

@media all and (max-width: 1023px) {
  .nav {
    width: calc(100% - 50px);
    padding: 0 25px;
  }
}
</style>