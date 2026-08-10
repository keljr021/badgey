<script setup>
import { ref } from 'vue'
import CreateMenuDrafts from './partials/CreateMenuDrafts.vue'
import CreateMenuCanvas from './partials/CreateMenuCanvas.vue'
import CreateMenuText from './partials/CreateMenuText.vue'
import CreateMenuBorder from './partials/CreateMenuBorder.vue'
import CreateMenuShapes from './partials/CreateMenuShapes.vue'
import CreateMenuImport from './partials/CreateMenuImport.vue'

const showMenu = ref('');

function handleClickMenuItem(menuItem) {
    showMenu.value = (menuItem) ? menuItem : '';
}
</script>

<template>
  <div class="menu">
    <div class="menu-item">
        <div class="menu-item-icon"><UIcon name="i-lucide-file-pen" class="size-5" /></div>
        <div class="menu-item-text" @click="handleClickMenuItem('drafts')">Drafts</div>
        <create-menu-drafts v-if="showMenu === 'drafts'" />
    </div>
    <div class="menu-item">
        <div class="menu-item-icon"><UIcon name="i-lucide-badge" class="size-5" /></div>
        <div class="menu-item-text" @click="handleClickMenuItem('canvas')">Canvas</div>
        <create-menu-canvas v-if="showMenu === 'canvas'" />
    </div>  
    <div class="menu-item">
        <div class="menu-item-icon"><UIcon name="i-lucide-text" class="size-5" /></div>
        <div class="menu-item-text" @click="handleClickMenuItem('text')">Text</div>
        <create-menu-text v-if="showMenu === 'text'" />
    </div>
    <div class="menu-item">
        <div class="menu-item-icon"><UIcon name="i-lucide-circle-dashed" class="size-5" /></div>
        <div class="menu-item-text" @click="handleClickMenuItem('border')">Border</div>
        <create-menu-border v-if="showMenu === 'border'" />
    </div>
    <div class="menu-item">
        <div class="menu-item-icon"><UIcon name="i-lucide-diamond" class="size-5" /></div>
        <div class="menu-item-text" @click="handleClickMenuItem('shapes')">Shapes</div>
        <create-menu-shapes v-if="showMenu === 'shapes'" />
    </div>
    <div class="menu-item">
        <div class="menu-item-icon"><UIcon name="i-lucide-import" class="size-5" /></div>
        <div class="menu-item-text" @click="handleClickMenuItem('import')">Import</div>
        <create-menu-import v-if="showMenu === 'import'" />
    </div>   
  </div>
</template>

<style scoped>
.menu {
    background-color: #fff;
    box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
    width: 100px;
    min-height: 550px;
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

.menu-item-icon {
    text-align: center;
    margin: 5px auto;
}

.menu-item-text {
    font-size: 16px;
}
</style>
