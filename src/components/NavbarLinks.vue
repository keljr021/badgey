<script setup>
import { defineProps, ref, onUnmounted } from 'vue'
import NavbarLinksMobile from './NavbarLinksMobile.vue'

const props = defineProps({
    userLogin: Boolean
});

const openBadgeSubmenu = ref(false);
const openAccountSubmenu = ref(false);

function toggleSubmenu(target, input) {
    openBadgeSubmenu.value = false;
    openAccountSubmenu.value = false;

    if (target === 'badge') openBadgeSubmenu.value = input;
    if (target === 'account') openAccountSubmenu.value = input;
}

function hideSubmenus() {
    const timeout = setTimeout(() => {
        toggleSubmenu('badge', false);
        toggleSubmenu('account', false);
        clearTimeout(timeout);
    }, 1500);
}

</script>

<template>
    <div @mouseleave="hideSubmenus()">
        <div v-if="userLogin">    
            <div class="desktop">
                <UButton @click="toggleSubmenu();$router.push({ name: 'dashboard' })" @mouseover="hideSubmenus()" color="neutral" variant="link" size="md" class="nav-links-item hover:text-black mr-3">Dashboard</UButton>
                <UButton @click="toggleSubmenu('badge', true)" @mouseover="toggleSubmenu('badge', true)" color="neutral" variant="link" size="md" class="nav-links-item hover:text-black mr-3">Badges</UButton>
                <UButton @click="toggleSubmenu('account', true)" @mouseover="toggleSubmenu('account', true)" :avatar="{ src: 'https://github.com/nuxt.png' }" color="neutral" variant="outline" size="md" class="nav-links-item text-muted border-muted hover:bg-gray-100 hover:text-black">Brad</UButton>


                <div class="nav-links-submenu" :class="{ 'active': openBadgeSubmenu }">
                    <UButton @click="$router.push({ name: 'create' });toggleSubmenu()" color="neutral" variant="link" size="md" class="nav-links-submenu-item hover:text-black mr-3">
                        Create badge
                    </UButton>
                    <UButton @click="$router.push({ name: 'manage' });toggleSubmenu()" color="neutral" variant="link" size="md" class="nav-links-submenu-item hover:text-black mr-3">
                        Manage badges
                    </UButton>
                    <UButton @click="$router.push({ name: 'redeem' });toggleSubmenu()" color="neutral" variant="link" size="md" class="nav-links-submenu-item hover:text-black mr-3">
                        Redeem badge
                    </UButton>
                </div>


                <div class="nav-links-submenu" :class="{ 'active': openAccountSubmenu }">
                    <UButton @click="$router.push({ name: 'profile' });toggleSubmenu()" color="neutral" variant="link" size="md" class="nav-links-submenu-item hover:text-black mr-3">
                        Profile
                    </UButton>
                    <UButton @click="$router.push({ name: 'settings' });toggleSubmenu()" color="neutral" variant="link" size="md" class="nav-links-submenu-item hover:text-black mr-3">
                        Settings
                    </UButton>
                    <UButton @click="$router.push({ name: 'logout' });toggleSubmenu()" color="neutral" variant="link" size="md" class="nav-links-submenu-item hover:text-black mr-3">
                        Logout
                    </UButton>
                </div>
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

.nav-links-submenu {
    position: absolute;
    padding: 10px 25px;
    right: 10px;
    display: flex;
    justify-content: end;
    background-color: white;
    opacity: 0;
    transition: opacity 0.2s ease-in-out;
    
}

.nav-links-submenu.active {
    opacity: 1;
    z-index: 9;
}

.nav-links-submenu-item {
    flex: 1;
    margin-left: 10px !important;
    margin-right: 10px !important;
}
</style>