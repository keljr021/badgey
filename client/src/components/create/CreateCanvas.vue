<script setup>
import { ref, toRefs, computed, onMounted, onBeforeUnmount } from 'vue'
import { useCanvasStore } from './../../store/canvas.js';
import { useDraftStore } from './../../store/draft.js';
import { useBadgeStore } from './../../store/badge.js';
import './create.css'

const canvasStore = useCanvasStore();
const draftStore = useDraftStore();
const badgeStore = useBadgeStore();

const { canvas, canvasLayer, backgroundLayer, loading, undoStep, redoStep } = toRefs(canvasStore);

const width = ref(400);
const height = ref(400);
const scaleX = ref(1);
const scaleY = ref(1);

const containerRef = ref(null);
const layerRef = ref(null);
const stageRef = ref(null);
const backgroundRef = ref(null);

const stageWidth = computed(() => width.value * scaleX.value);
const stageHeight = computed(() => height.value * scaleY.value);
const stageRadius = ref(185);

const resizeCanvas = () => {
  if (!containerRef.value) return;
  
  // Get container width
  const containerWidth = containerRef.value.offsetWidth;
  const containerHeight = containerRef.value.offsetHeight;

  if (containerWidth >= containerHeight) {
    scaleX.value = containerHeight / height.value;
    scaleY.value = containerHeight / height.value;
  }
  else {
    scaleX.value = containerWidth / width.value * 1.05;
    scaleY.value = containerWidth / width.value * 1.05;
  } 

  // console.log('stage radius: ', stageRadius.value);
  // stageRadius.value = scaleX.value;
};

const bgCircleConfig = {
  x: stageWidth / 2,
  y: stageHeight / 2,
  radius: stageRadius,
  fill: '#fff',
  stroke: '#d9d9d9',
  shadowColor: '#ccc',
  shadowOpacity: 0.25,
  shadowBlur: 4,
  shadowOffsetY: 4,
};
const bgSquareConfig = {
  x: 0,
  y: 0,
  width: width.value,
  height: width.value,
  fill: '#fff',
  stroke: '#d9d9d9',
  shadowColor: '#ccc',
  shadowOpacity: 0.25,
  shadowBlur: 4,
  shadowOffsetY: 4,
};
const bgOctConfig = {
  x: 200,
  y: 200,
  sides: 8,
  radius: stageRadius,
  width: width.value,
  height: width.value,
  fill: '#fff',
  stroke: '#d9d9d9',
  shadowColor: '#ccc',
  shadowOpacity: 0.25,
  shadowBlur: 4,
  shadowOffsetY: 4,
};

onMounted(() => {
  resizeCanvas();
  canvasLayer.value = layerRef.value;
  console.log('canvas layer: ', canvasLayer.value);
  console.log('canvas config: ', backgroundLayer.value, ' - ', bgOctConfig);
  window.addEventListener('resize', resizeCanvas);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', resizeCanvas);
});

</script>

<template>
  <div class="canvas">
    <div ref="containerRef" class="canvas-container">
      <v-stage 
        ref="stageRef" 
        :config="{
          width: stageWidth,
          height: stageHeight,
          scaleX: scaleX,
          scaleY: scaleY,
        }">
        <v-layer ref="layerRef">
          <v-circle v-if="false" :config="bgCircleConfig" />
          <v-rect v-if="false" :config="bgSquareConfig" />
          <v-regular-polygon v-if="true" :config="bgOctConfig" />
        </v-layer>
      </v-stage>
    </div>
  </div>
</template>

<style scoped>

</style>
