<script setup>
import { reactive, ref, nextTick, onMounted, onBeforeUnmount } from 'vue'
import './create.css'

const width = ref(440);
const height = ref(440);

const konvaConfig = reactive({
  width: width,
  height: height,
  margin: '0 auto',
});

const canvasBackgroundRef = ref(null);
const canvasBackgroundConfig = reactive({
  x: 0,
  y: 0,
  width: width,
  height: height,
  fill: '#ccc'
});

</script>

<template>
  <div class="canvas">
    <div class="canvas-container">
      <v-stage ref="canvasStageRef" :config="konvaConfig">
        <v-layer>
          <v-rect
            ref="canvasBackgroundRef"
            :config="canvasBackgroundConfig"
          />
        </v-layer>
      </v-stage>
    </div>
  </div>
</template>

<style scoped>

</style>
