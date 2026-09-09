<script setup>
import { ref } from 'vue'
import CreateMenuDrafts from './partials/CreateMenuDrafts.vue'
import CreateMenuCanvas from './partials/CreateMenuCanvas.vue'
import CreateMenuInsert from './partials/CreateMenuInsert.vue'
import CreateMenuImport from './partials/CreateMenuImport.vue'
import './create.css'

const showMenu = ref('');

const handleClickMenuItem = (menuItem) => {
    if (showMenu.value === menuItem) 
        hideMenuItem();
    else 
        showMenuItem(menuItem);
}

const showMenuItem = (menuItem) => {
    showMenu.value = menuItem;
}

const hideMenuItem = () => {
    showMenu.value = '';
}
</script>

<template>
  <div class="menu">
    <div :class="`menu-item ${showMenu === 'drafts' ? 'active' : ''}`" @click="handleClickMenuItem('drafts')">
        <div class="menu-item-icon"><UIcon name="i-lucide-folder-pen" class="size-5" /></div>
        <div class="menu-item-text">Drafts</div>
    </div>
    <div :class="`menu-item ${showMenu === 'canvas' ? 'active' : ''}`" @click="handleClickMenuItem('canvas')">
        <div class="menu-item-icon"><UIcon name="i-lucide-badge" class="size-5" /></div>
        <div class="menu-item-text">Canvas</div>
    </div>  
    <div :class="`menu-item ${showMenu === 'insert' ? 'active' : ''}`" @click="handleClickMenuItem('insert')">
        <div class="menu-item-icon"><UIcon name="i-lucide-plus" class="size-5" /></div>
        <div class="menu-item-text">Insert</div>
    </div>
    <div :class="`menu-item ${showMenu === 'import' ? 'active' : ''}`" @click="handleClickMenuItem('import')">
        <div class="menu-item-icon"><UIcon name="i-lucide-import" class="size-5" /></div>
        <div class="menu-item-text">Import</div>
    </div> 
    
    <create-menu-drafts v-if="showMenu === 'drafts'" @close="hideMenuItem" />
    <create-menu-canvas v-if="showMenu === 'canvas'" @close="hideMenuItem" />
    <create-menu-insert v-if="showMenu === 'insert'" @close="hideMenuItem" />
    <create-menu-import v-if="showMenu === 'import'" @close="hideMenuItem" />
  </div>
</template>

<style scoped>


</style>
