<script setup>
import { ref, defineEmits, toRefs } from 'vue'
import CreateMenuDrafts from './partials/CreateMenuDrafts.vue'
import CreateMenuCanvas from './partials/CreateMenuCanvas.vue'
import CreateMenuInsert from './partials/CreateMenuInsert.vue'
import CreateMenuText from './partials/CreateMenuText.vue'
import CreateMenuShapes from './partials/CreateMenuShapes.vue'
import CreateMenuImport from './partials/CreateMenuImport.vue'
import './create.css'

const emit = defineEmits([
    'draft', 
    'canvas', 
    'sides', 
    'insert', 
    'border', 
    'rotate', 
    'import',
]);

const props = defineProps({
    selectedCanvas: String,
    selectedSides: Number,
    selectedAngle: Number,
    selectedBorder: Object,
})

const { selectedCanvas, selectedSides, selectedAngle, selectedBorder } = toRefs(props);

const showMenu = ref('');

const openDraft = id => {
    console.log('open draft: ', id);
    emit('draft', id);
}

const setCanvas = input => {
    console.log('set canvas: ', input);
    emit('canvas', input);
}

const setCanvasPolygonSides = input => {
  console.log('set polygon sides to: ', input);
  emit('sides', input);
}

const setCanvasAngle = input => {
    console.log('set polygon angle to: ', input);
    emit('rotate', input)
}

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
    
    <create-menu-drafts v-if="showMenu === 'drafts'" @close="hideMenuItem" @draft="openDraft" />
    <create-menu-canvas 
        v-if="showMenu === 'canvas'" 
        :selectedCanvas="selectedCanvas"
        :selectedSides="selectedSides" 
        :selectedAngle="selectedAngle" 
        :selectedBorder="selectedBorder"
        @close="hideMenuItem" 
        @canvas="setCanvas" 
        @sides="setCanvasPolygonSides" 
        @rotate="setCanvasAngle" 
        @border="setBorder" 
    />
    <create-menu-insert v-if="showMenu === 'insert'" @close="hideMenuItem" @insert="insertItem" />
    <create-menu-import v-if="showMenu === 'import'" @close="hideMenuItem" @import="importFile" />

    <create-menu-text v-if="showMenu === 'text'" @close="hideMenuItem" />
    <create-menu-shapes v-if="showMenu === 'shapes'" @close="hideMenuItem" />
  </div>
</template>

<style scoped>


</style>
