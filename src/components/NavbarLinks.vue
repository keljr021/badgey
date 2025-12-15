<script setup>
import { defineProps, toRef } from 'vue'

const props = defineProps({
    userLogin: Boolean
});
</script>

<template>
    <div>
        <div v-if="userLogin">           
            <UButton color="neutral" variant="link" size="md" class="nav-links-item">Dashboard</UButton>
            <UButton color="neutral" variant="link" size="md" class="nav-links-item">Badges</UButton>
            <UButton :avatar="{ src: 'https://github.com/nuxt.png' }" color="neutral" variant="outline" size="lg" class="nav-links-item" >Brad</UButton>
        </div>

        <div v-else>
            <UButton color="neutral" variant="outline" size="md" icon="i-mdi-login">Login / Register</UButton>
        </div>
    </div>
</template>

<style scoped>
.nav-links-item {
    margin-left: 10px !important;
    margin-right: 10px !important;
}
</style>