<script setup>
import { ref, defineEmits } from 'vue'
import CreateMenuDrafts from './partials/CreateMenuDrafts.vue'
import CreateMenuCanvas from './partials/CreateMenuCanvas.vue'
import CreateMenuInsert from './partials/CreateMenuInsert.vue'
import CreateMenuText from './partials/CreateMenuText.vue'
import CreateMenuBorder from './partials/CreateMenuBorder.vue'
import CreateMenuShapes from './partials/CreateMenuShapes.vue'
import CreateMenuImport from './partials/CreateMenuImport.vue'
import './create.css'

const emit = defineEmits(['draft', 'canvas', 'insert', 'border', 'import', 'import-confirm'])

const showMenu = ref('');

const openDraft = id => {
    console.log('open draft: ', id);
    emit('draft', id);
}

const setCanvas = input => {
    console.log('set canvas: ', input);
    emit('canvas', input);
}

const handleClickMenuItem = (menuItem) => {
    if (showMenu.value === menuItem) 
        hideMenuItem();
    else 
        showMenuItem(menuItem);
}

const insertItem = (input) => {
    console.log('insert: ', input);
    emit('insert', input);
}

const setBorder = (input) => {
    console.log('set border: ', input);
    emit('border', input);
}

const importFile = (input) => {
    console.log('import: ', input);
    emit('import', input);
}

const confirmImport = () => {
    emit('import-confirm');
    hideMenuItem();
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
        <div class="menu-item-icon"><UIcon name="i-lucide-file-pen" class="size-5" /></div>
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
    <div :class="`menu-item ${showMenu === 'border' ? 'active' : ''}`" @click="handleClickMenuItem('border')">
        <div class="menu-item-icon"><UIcon name="i-lucide-circle-dashed" class="size-5" /></div>
        <div class="menu-item-text">Border</div>
    </div>
    <div :class="`menu-item ${showMenu === 'import' ? 'active' : ''}`" @click="handleClickMenuItem('import')">
        <div class="menu-item-icon"><UIcon name="i-lucide-import" class="size-5" /></div>
        <div class="menu-item-text">Import</div>
    </div> 
    
    <create-menu-drafts v-if="showMenu === 'drafts'" @close="hideMenuItem" @draft="openDraft" />
    <create-menu-canvas v-if="showMenu === 'canvas'" @close="hideMenuItem" @canvas="setCanvas" />
    <create-menu-insert v-if="showMenu === 'insert'" @close="hideMenuItem" @insert="insertItem" />
    <create-menu-border v-if="showMenu === 'border'" @close="hideMenuItem" @border="setBorder" />
    <create-menu-import v-if="showMenu === 'import'" @close="hideMenuItem" @import="importFile" @import-confirm="confirmImport" />
    
    <create-menu-text v-if="showMenu === 'text'" @close="hideMenuItem" />
    <create-menu-shapes v-if="showMenu === 'shapes'" @close="hideMenuItem" />
  </div>
</template>

<style scoped>


</style>
