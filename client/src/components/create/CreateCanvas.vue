<script setup>
import { reactive } from 'vue'

const konvaConfig = reactive({
  width: 400,
  height: 400,
  blue: 100,
});
</script>

<template>
  <div class="canvas">
    <div class="canvas-container">
      <v-stage :config="konvaConfig" style="width: 100%; height: 100%; background-color: #eee;">
        <v-layer>
        </v-layer>
      </v-stage>
    </div>
  </div>
</template>

<style scoped>
.canvas {
  width: 100%;
  height: 100%;
  padding: 10px;
}

.canvas-container {
  width: 50%;
  height: 100%;
  margin: 0 auto;
}
</style>
