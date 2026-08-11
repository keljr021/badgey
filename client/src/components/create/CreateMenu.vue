<script setup>
import { ref } from 'vue'
import CreateMenuDrafts from './partials/CreateMenuDrafts.vue'
import CreateMenuCanvas from './partials/CreateMenuCanvas.vue'
import CreateMenuText from './partials/CreateMenuText.vue'
import CreateMenuBorder from './partials/CreateMenuBorder.vue'
import CreateMenuShapes from './partials/CreateMenuShapes.vue'
import CreateMenuImport from './partials/CreateMenuImport.vue'

const showMenu = ref('border');

function handleClickMenuItem(menuItem) {
    if (showMenu.value === menuItem) 
        hideMenuItem();
    else 
        showMenuItem(menuItem);
}

function showMenuItem(menuItem) {
    showMenu.value = menuItem;
}

function hideMenuItem() {
    showMenu.value = '';
}
</script>

<template>
  <div class="menu">
    <div :class="`menu-item ${showMenu === 'drafts' ? 'active' : ''}`" @click="handleClickMenuItem('drafts')">
        <div class="menu-item-icon"><UIcon name="i-lucide-file-pen" class="size-5" /></div>
        <div class="menu-item-text">Drafts</div>
    </div>
    <div :class="`menu-item ${showMenu === 'canvas' ? 'active' : ''}`" @click="handleClickMenuItem('canvas')">
        <div class="menu-item-icon"><UIcon name="i-lucide-badge" class="size-5" /></div>
        <div class="menu-item-text">Canvas</div>
    </div>  
    <div :class="`menu-item ${showMenu === 'text' ? 'active' : ''}`" @click="handleClickMenuItem('text')">
        <div class="menu-item-icon"><UIcon name="i-lucide-text" class="size-5" /></div>
        <div class="menu-item-text">Text</div>
    </div>
    <div :class="`menu-item ${showMenu === 'border' ? 'active' : ''}`" @click="handleClickMenuItem('border')">
        <div class="menu-item-icon"><UIcon name="i-lucide-circle-dashed" class="size-5" /></div>
        <div class="menu-item-text">Border</div>
    </div>
    <div :class="`menu-item ${showMenu === 'shapes' ? 'active' : ''}`" @click="handleClickMenuItem('shapes')">
        <div class="menu-item-icon"><UIcon name="i-lucide-diamond" class="size-5" /></div>
        <div class="menu-item-text">Shapes</div>
    </div>
    <div :class="`menu-item ${showMenu === 'import' ? 'active' : ''}`" @click="handleClickMenuItem('import')">
        <div class="menu-item-icon"><UIcon name="i-lucide-import" class="size-5" /></div>
        <div class="menu-item-text">Import</div>
    </div> 
    
    <create-menu-drafts v-if="showMenu === 'drafts'" />
    <create-menu-canvas v-if="showMenu === 'canvas'" />
    <create-menu-text v-if="showMenu === 'text'" />
    <create-menu-border v-if="showMenu === 'border'" />
    <create-menu-shapes v-if="showMenu === 'shapes'" />
    <create-menu-import v-if="showMenu === 'import'" />

  </div>
</template>

<style scoped>
.menu {
    position: absolute;
    top: 100px;
    width: 100px;
    height: 550px;
    background-color: #fff;
    box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    z-index: 1;
}

.menu-item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    padding: 15px 0;
    margin: 0 auto;
    text-align: center;
    cursor: pointer;
}

.menu-item:hover {
    background-color: #eee;
}

.menu-item.active{
    background-color: #ccc;
}

.menu-item-icon {
    text-align: center;
    margin: 5px auto;
    opacity: 0.5;
}

.menu-item-text {
    font-size: 16px;
}

.menu-item.active .menu-item-icon {
    color: var(--badgey-green);
    opacity: 1;
}

.menu-item.active .menu-item-text {
    color: var(--badgey-green);
    font-weight: bold;
}

</style>
