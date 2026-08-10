<script setup>
import CreateMenu from '../components/create/CreateMenu.vue'
import CreateUndo from '../components/create/CreateUndo.vue'
import CreateCanvas from '../components/create/CreateCanvas.vue'
import CreateSave from '../components/create/CreateSave.vue'

</script>

<template>
  <div class="create">
    <div class="create-body">
      <div class="create-body-menu">
        <create-menu />
      </div>
      <div class="create-body-canvas">
        <div class="create-body-canvas-undo">
          <create-undo />
        </div>
        <div class="create-body-canvas-ui">
          <create-canvas />
        </div>
        <div class="create-body-canvas-save">
          <div class="create-body-canvas-save-autosave">
            Autosaved at 12/24/2025 02:06PM
          </div>
          <create-save />
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
  padding: 20px 50px;
}

.create-body-canvas-undo {
  width: 100%;
}

.create-body-canvas-ui {
  width: 100%;
  height: calc(80vh - 60px);
}

.create-body-canvas-save {
  width: 100%;
}

.create-body-canvas-save-autosave {
  text-align: right;
  font-style: italic;
  opacity: 0.7;
}
</style>
