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
  display: flex;
  justify-content: space-between;
  align-content: center;
  align-items: center;
  height: 52px;
  padding: 0 50px;
  background: rgba(255, 255, 255, 0.75);
  color: black;  
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
</style>