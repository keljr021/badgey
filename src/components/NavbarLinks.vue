<script setup>
import { defineProps, toRef } from 'vue'
import NavbarLinksMobile from './NavbarLinksMobile.vue'

const props = defineProps({
    userLogin: Boolean
});
</script>

<template>
    <div>
        <div v-if="userLogin">    
            <div class="desktop">
                <UButton @click="$router.push({ name: 'dashboard' })" color="neutral" variant="link" size="md" class="nav-links-item hover:text-black mr-3">Dashboard</UButton>
                <UButton color="neutral" variant="link" size="md" class="nav-links-item hover:text-black mr-3">Badges</UButton>
                <UButton :avatar="{ src: 'https://github.com/nuxt.png' }" color="neutral" variant="outline" size="md" class="nav-links-item text-muted border-muted hover:bg-gray-100 hover:text-black">Brad</UButton>
            </div>
            
            <NavbarLinksMobile class="mobile" />
        </div>

        <div v-else>
            <UButton @click="$router.push({ name: 'login' })" color="neutral" variant="outline" size="md" icon="i-mdi-login" class="nav-links-item text-muted border-muted hover:bg-gray-100 hover:text-black">Login / Register</UButton>
        </div>
    </div>
</template>

<style scoped>
.nav-links-item {
    margin-left: 10px !important;
    margin-right: 10px !important;
}
</style>