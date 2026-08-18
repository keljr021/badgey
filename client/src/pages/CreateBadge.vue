<script setup>
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import CreateMenu from '../components/create/CreateMenu.vue'
import CreateUndo from '../components/create/CreateUndo.vue'
import CreateCanvas from '../components/create/CreateCanvas.vue'
import CreateSave from '../components/create/CreateSave.vue'
import { useCanvasStore } from '../store/canvas.js'
import { useDraftStore } from './../store/draft.js';
import { useBadgeStore } from './../store/badge.js'

const canvasStore = useCanvasStore();
const draftStore = useDraftStore();
const badgeStore = useBadgeStore();

const { selectedCanvas, selectedCanvasSides, selectedCanvasAngle, nodes } = storeToRefs(canvasStore);

const undo = () => {
  console.log('undo button clicked.');
};

const redo = () => {
  console.log('redo button clicked.');
};

const reset = () => {
  console.log('reset button clicked.');
  canvasStore.resetCanvas();
}

const openDraft = (id) => {
  console.log('open draft: ', id);
}

const changeCanvas = (input) => {
  console.log('set canvas input: ', input);
  canvasStore.changeCanvas(input);
}

const setCanvasPolygonSides = input => {
  console.log('set polygon sides to: ', input);
  canvasStore.changeCanvasSides(input);
}

const setCanvasAngle = input => {
  console.log('set polygon angle to: ', input);
  canvasStore.changeCanvasAngle(input);
}

const insertItem = (input) => {
  console.log('insert shape: ', input);
  canvasStore.addItem(input);
}

const setBorder = (input) => {
  let id = 'background';
  console.log('set border: - id: ', id, ' - input: ', input);
};

const importFile = (input) => {
  console.log('import file: ', input);
}

const confirmImport = () => {
  console.log('import confirmed');
}

const saveDraft = (input) => {
  console.log('save draft clicked.');
};

const publishBadge = () => {
  console.log('publish badge clicked.');
}

</script>

<template>
  <div class="create">
    <div class="create-body">
      <div class="create-body-menu">
        <create-menu 
          :selectedCanvas="selectedCanvas"
          :selectedCanvasSides="selectedCanvasSides"
          :selectedCanvasAngle="selectedCanvasAngle"
          @draft="openDraft" 
          @canvas="changeCanvas" 
          @insert="insertItem"
          @border="setBorder"
          @sides="setCanvasPolygonSides"
          @rotate="setCanvasAngle"
          @import="importFile"
          @import-confirm="confirmImport"
        />
      </div>
      <div class="create-body-canvas" :class="{ 'loading': canvasStore.loading }">
        <div class="create-body-canvas-undo">
          <create-undo @reset="reset" @undo="undo" @redo="redo" @save="saveDraft" @publish="publishBadge" />
        </div>
        <div class="create-body-canvas-ui">
          <create-canvas 
            :selectedCanvas="selectedCanvas" :selectedSides="selectedCanvasSides" :selectedAngle="selectedCanvasAngle" :parentNodes="nodes"/>
        </div>
        <div class="create-body-canvas-save">
          <create-save @reset="reset" @save="saveDraft" @publish="publishBadge" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.create {
  background-color: var(--badgey-white);
  width: 100%;  
  padding: 50px 0;
  display: flex;
  flex-direction: column;
}


.loading {
  opacity: 0.5;
}

.create-body {
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
}

.create-body-menu {
  flex: 1;
  display: flex;
  width: 20%;
}

.create-body-undo {
  flex: 1;
  display: flex;
  width: 100%;
}

.create-body-canvas {
  flex: 1;
  display: flex;
  flex-direction: column;
  flex-basis: calc(100% - 220px);
  justify-content: center;
  padding: 20px 50px;
}

.create-body-canvas-undo {
  width: 100%;
}

.create-body-canvas-ui {
  width: 100%;
}

.create-body-canvas-save {
  width: 100%;
}

@media all and (max-width: 1023px) and (min-width: 769px) {

}


@media all and (max-width: 768px) {

  .create,
  .create-body {
    display: initial;
  }

  .create-body-canvas {
    padding: 20px;
  }

  .create-body-menu {
    flex: initial;
    display: initial;
    flex-basis: initial;
    width: initial;
    z-index: 9;
  }

  .create-body-canvas-ui {
    height: initial;
  }
}
</style>
