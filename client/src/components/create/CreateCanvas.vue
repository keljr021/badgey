<script setup>
import { ref, toRefs, computed, onMounted, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useCanvasStore } from './../../store/canvas.js';
import  * as canvasConfig from './canvasConfig.js';
import './create.css'

const nodes = ref([]);
const layerRef = ref(null);
const stageRef = ref(null);

const bgPoly = ref(canvasConfig.bgPoly);

const props = defineProps({
  selectedCanvas: String,
  selectedSides: Number,
  selectedAngle: Number,
  parentNodes: Array,
});

const { selectedCanvas, selectedSides, selectedAngle, parentNodes } = toRefs(props);

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
});

const inheritNodes = () => {
  debugger;
  if (parentNodes.value && parentNodes.value.length)
    nodes.value = parentNodes.value;
}

onMounted(async () => {
  // window.addEventListener('resize', resizeCanvas);
  await inheritNodes();
});

// onBeforeUnmount(() => {
//   window.removeEventListener('resize', resizeCanvas);
// });

watch(parentNodes, () => {
  console.log('-parent nodes changed');
  nodes.value = parentNodes.value;
});
</script>

<template>
  <div class="canvas">
    <div ref="containerRef" id="container" class="canvas-container">
      <v-stage ref="stageRef" :config="canvasConfig.stage">
        <v-layer ref="layerRef">
          <v-circle v-if="selectedCanvas === 'circle'" :config="canvasConfig.bgCircle" />
          <v-rect v-if="selectedCanvas === 'rectangle'" :config="canvasConfig.bgRect" />
          <v-regular-polygon v-if="selectedCanvas === 'polygon'" :config="calculatePolyConfig" />


          <template v-for="node in nodes">
            <v-regular-polygon v-if="node.type === 'shape'" :config="canvasConfig.shape" />
            <v-line v-if="node.type === 'line'" :config="canvasConfig.line" />
            <v-text v-if="node.type === 'text'" :config="canvasConfig.text" />
          </template>

        </v-layer>
      </v-stage>
    </div>
  </div>
</template>
