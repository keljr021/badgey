<script setup>
import { defineProps, toRef } from 'vue'

const props = defineProps({
    userLogin: Boolean
});
</script>

<template>
    <div>
        <div v-if="userLogin">
            <ULink as="button" color="neutral" class="nav-link-item" to="/">Dashboard</ULink>
            <ULink as="button" color="neutral" class="nav-link-item" to="/">Badges</ULink>
            <UButton color="neutral" variant="outline" size="md" :avatar="{ src: 'https://github.com/nuxt.png' }">Brad</UButton>
        </div>

        <div v-else>
            <UButton color="neutral" variant="outline" size="md" icon="i-mdi-login">Login / Register</UButton>
        </div>
    </div>
</template>

<style scoped>
.nav-link-item {
    margin: 0 10px;
}
</style>