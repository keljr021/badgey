<script setup>
import { ref, toRefs, computed, onMounted, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useCanvasStore } from './../../store/canvas.js';
import './create.css'

const layerRef = ref(null);
const stageRef = ref(null);

const stageConfig = ref({
    width: 400,
    height: 400,
    scaleX: 1,
    scaleY: 1,
});

const bgCircle = ref({
    x: 200,
    y: 200,
    radius: 187,
    fill: '#fff',
    stroke: '#d9d9d9',
    shadowColor: '#ccc',
    shadowOpacity: 0.25,
    shadowBlur: 4,
    shadowOffsetY: 4,
    id: 'circleBackground',
    listening: false,
});
const bgRect = ref({
    x: 0,
    y: 0,
    width: 400,
    height: 400,
    fill: '#fff',
    stroke: '#d9d9d9',
    shadowColor: '#ccc',
    shadowOpacity: 0.25,
    shadowBlur: 4,
    shadowOffsetY: 4,
    id: 'rectBackground',
    listening: false,
});
const bgPoly = ref({
    x: 200,
    y: 200,
    sides: 3,
    radius: 187,
    width: 400,
    height: 400,
    fill: '#fff',
    stroke: '#d9d9d9',
    shadowColor: '#ccc',
    shadowOpacity: 0.25,
    shadowBlur: 4,
    shadowOffsetY: 4,
    id: 'polyBackground',
    listening: false,
});

const props = defineProps({
  selectedCanvas: String,
  selectedSides: Number,
  selectedAngle: Number,
});

const { selectedCanvas, selectedSides, selectedAngle } = toRefs(props);

// const resizeCanvas = () => {
//   if (!containerRef.value) return;
  
//   // Get container width
//   const containerWidth = containerRef.value.offsetWidth;
//   const containerHeight = containerRef.value.offsetHeight;

//   if (containerWidth >= containerHeight) {
//     scaleX.value = containerHeight / 400;
//     scaleY.value = containerHeight / 400;
//   }
//   else {
//     scaleX.value = containerWidth / 400 * 1.05;
//     scaleY.value = containerWidth / 400 * 1.05;
//   } 
// };


const calculatePolyConfig = computed(() => {
  let output = bgPoly.value;
  output.sides = selectedSides.value;
  output.rotation = selectedAngle.value;
  return output;
})

onMounted(async () => {
  // window.addEventListener('resize', resizeCanvas);
});

// onBeforeUnmount(() => {
//   window.removeEventListener('resize', resizeCanvas);
// });
</script>

<template>
  <div class="canvas">
    <div ref="containerRef" id="container" class="canvas-container">
      <v-stage ref="stageRef" :config="stageConfig">
        <v-layer ref="layerRef">
          <v-rect v-if="selectedCanvas === 'rectangle'" :config="bgRect" />
          <v-circle v-if="selectedCanvas === 'circle'" :config="bgCircle" />
          <v-regular-polygon v-if="selectedCanvas === 'polygon'" :config="calculatePolyConfig" />
        </v-layer>
      </v-stage>
    </div>
  </div>
</template>
