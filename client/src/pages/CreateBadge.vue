<script setup>
import { reactive } from 'vue'
import CreateMenu from '../components/create/CreateMenu.vue'
import CreateUndo from '../components/create/CreateUndo.vue'
import CreateCanvas from '../components/create/CreateCanvas.vue'
import CreateSave from '../components/create/CreateSave.vue'
import { useCanvasStore } from './../store/canvas.js';
import { useDraftStore } from './../store/draft.js';


const canvasStore = useCanvasStore();
const draftStore = useDraftStore();

const border = reactive({
  style: 'none',
  size: null,
  fill: null,
  stroke: null
});

const undo = () => {
  console.log('undo button clicked.');
  canvasStore.undo();
};

const redo = () => {
  console.log('redo button clicked.');
  canvasStore.redo();
};

const openDraft = (id) => {
  console.log('open draft: ', id);
  draftStore.fetchDraft(id);
}

const setCanvas = (input) => {
  console.log('set canvas: ', input);
  canvasStore.updateItem(id, input);
}

const insertItem = (input) => {
  console.log('insert shape: ', input);
  canvasStore.addItem(input);
}

const setBorder = (input) => {
  console.log('set border: ', input);
  Object.assign(border, input);
  canvasStore.updateItem(id, border);
};

const importFile = (input) => {
  console.log('import file: ', input);
}

const confirmImport = () => {
  console.log('import confirmed');
  canvasStore.importFile(input);
}

const saveDraft = (input) => {
  console.log('save draft clicked.');
  draftStore.saveDraft(input);
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
          @draft="openDraft" 
          @canvas="setCanvas" 
          @insert="insertItem"
          @border="setBorder"
          @import="importFile"
          @import-confirm="confirmImport"
        />
      </div>
      <div class="create-body-canvas">
        <div class="create-body-canvas-undo">
          <create-undo @undo="undo" @redo="redo" @save="saveDraft" @publish="publishBadge" />
        </div>
        <div class="create-body-canvas-ui">
          <create-canvas  

          />
        </div>
        <div class="create-body-canvas-save">
          <create-save @save="saveDraft" @publish="publishBadge" />
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
