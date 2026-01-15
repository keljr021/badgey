<script setup>
import NavbarLinks from './NavbarLinks.vue'
import { ref, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia'
import { useUserStore } from './../store/user.js'

const userStore = useUserStore();
const route = useRoute();
const { loggedInUser } = storeToRefs(userStore);

const userLoggedIn = ref(false);

async function logout() {
    await userStore.handleLogout();
}

watch(loggedInUser, (newValue) => {
  userLoggedIn.value = newValue !== null;
});

onMounted(() => {
  userLoggedIn.value = loggedInUser.value !== null;
  console.log('Navbar mounted. userLoggedIn: ', userLoggedIn.value);
});
</script>

<template>
  <div class="nav">
    <div class="nav-logo" @click="$router.push({ name: 'home'})">
      <img src="./../assets/img/logo_black.png" />
    </div>
    <div class="nav-links">
      <NavbarLinks @logout="logout()" :loggedInUser="loggedInUser" :userLoggedIn="userLoggedIn" />
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
  width: 100%;
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
    width: 100%;
    padding: 0 25px;
  }
}
</style>