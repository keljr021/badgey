<script setup>
import { ref, defineProps, defineEmits } from 'vue'

const showMenu = ref(false);
const emit = defineEmits(['logout']);

const props = defineProps({
    loggedInUser: Object,
    userLoggedIn: Boolean
});

function toggleMenu() {
    showMenu.value = !showMenu.value;
}
</script>

<template>
    <div>
        <UButton @click="toggleMenu()" variant="ghost" icon="i-mdi-menu" size="xl" />

        <div v-if="showMenu" class="nav-menu">
            <div class="nav-menu-user">
                <UAvatar src="https://github.com/benjamincanac.png" />
                <div class="nav-menu-user-name">
                    Brad
                </div>
            </div>
            <div v-if="loggedInUser.userType === '3'" class="nav-menu-link" @click="toggleMenu();$router.push({ name: 'admin' })">Dashboard</div>
            <div class="nav-menu-link" @click="toggleMenu();$router.push({ name: 'dashboard' })">Dashboard</div>
            <div class="nav-menu-link" @click="toggleMenu();$router.push({ name: 'create' })">Create badge</div>
            <div class="nav-menu-link" @click="toggleMenu();$router.push({ name: 'manage' })">Manage badges</div>
            <div class="nav-menu-link" @click="toggleMenu();$router.push({ name: 'redeem' })">Redeem badge</div>
            <div class="nav-menu-link" @click="toggleMenu();$router.push({ path: 'profile/me' })">Profile</div>
            <div class="nav-menu-link" @click="toggleMenu();$router.push({ name: 'settings' })">Settings</div>
            <div class="nav-menu-link" @click="toggleMenu();emit('logout')">Logout</div>
        </div>
    </div>
</template>

<style scoped>
.nav-menu {
    position: fixed;
    right: 0;
    width: 50%;
    height: 100%;
    background: rgba(255, 255, 255, 0.95);
    z-index: 9;
}

.nav-menu-user,
.nav-menu-link {
    width: 100%;
    padding: 20px 25px;
    text-align: right;
    color: var(--badgey-black);
    cursor: pointer;
}

.nav-menu-user-name {
    float: right;
    padding-left: 20px;
    font-weight: bold;
}
</style>