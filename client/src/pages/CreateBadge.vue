<script setup>
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import CreateMenu from '../components/create/CreateMenu.vue'
import CreateUndo from '../components/create/CreateUndo.vue'
import CreateCanvas from '../components/create/CreateCanvas.vue'
import CreateSave from '../components/create/CreateSave.vue'
import { useCanvasStore } from '../store/canvas.js'
import { useDraftStore } from './../store/draft.js'
import { useBadgeStore } from './../store/badge.js'
import  * as canvasConfig from './../components/create/canvasConfig.js';
import './../style.css'

const canvasStore = useCanvasStore();
const draftStore = useDraftStore();
const badgeStore = useBadgeStore();

const { selectedCanvas, selectedCanvasSides, selectedCanvasAngle, selectedCanvasBorder, nodes, triggerReset } = storeToRefs(canvasStore);

const isDrawing = ref(false);
const drawTool = ref('brush');
const drawSize = ref(1);
const drawColor = ref('#000000');
const resetDrawnLines = ref(false);

const importedFile = ref(null);

const reset = () => {
  console.log('reset button clicked.');
  canvasStore.resetCanvas();
  setResetDrawnLines(true);
}

const setResetDrawnLines = (input) => {
  resetDrawnLines.value = input;
}
</script>

<template>
  <div class="create">
    <div class="create-body">
      <div class="create-body-menu">
        <create-menu />
      </div>
      <div class="create-body-canvas" :class="{ 'loading': canvasStore.loading, 'drawing': isDrawing === true }">
        <div class="create-body-canvas-undo">
          <create-undo @reset-lines="resetDrawnLines" />
        </div>
        <div class="create-body-canvas-ui">
          <create-canvas />
        </div>
        <div class="create-body-canvas-save">
          <create-save @reset-lines="resetDrawnLines" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
