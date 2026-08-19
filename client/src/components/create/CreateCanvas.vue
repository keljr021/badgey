<script setup>
import { ref, toRefs, computed, onMounted, watch } from 'vue'
import  * as canvasConfig from './canvasConfig.js'
import './create.css'

const nodes = ref([]);
const layerRef = ref(null);
const stageRef = ref(null);

const bgCircle = ref(canvasConfig.bgCircle);
const bgRect = ref(canvasConfig.bgRect);
const bgPoly = ref(canvasConfig.bgPoly);

const props = defineProps({
  selectedCanvas: String,
  selectedSides: Number,
  selectedAngle: Number,
  selectedBorder: Object,
  parentNodes: Array,
  file: File,
});

const { selectedCanvas, selectedSides, selectedAngle, selectedBorder, parentNodes, file } = toRefs(props);

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

const calculateCircleConfig = computed(() => {
  if (selectedBorder.value) {
    let output = bgCircle.value;
    output.fill = selectedBorder.value.fill;
    output.stroke = selectedBorder.value.stroke;
    output.strokeWidth = selectedBorder.value.strokeWidth;
    return output;
  }
  return canvasConfig.bgCircle;
});

const calculateRectConfig = computed(() => {
  if (selectedBorder.value) {
    let output = bgRect.value;
    output.fill = selectedBorder.value.fill;
    output.stroke = selectedBorder.value.stroke;
    output.strokeWidth = selectedBorder.value.strokeWidth;
    return output;
  }
  return canvasConfig.bgRect;
});

const calculatePolyConfig = computed(() => {
  if (selectedBorder.value) {
    let output = bgPoly.value;
    output.rotation = selectedAngle.value;
    output.sides = selectedSides.value;
    output.fill = selectedBorder.value.fill;
    output.stroke = selectedBorder.value.stroke;
    output.strokeWidth = selectedBorder.value.strokeWidth;
    return output;
  }
  return canvasConfig.bgPoly;
});

const inheritNodes = () => {
  if (parentNodes.value && parentNodes.value.length)
    nodes.value = parentNodes.value;
};

const loadImg = () => {
  const img = new Image();
  img.crossOrigin = 'anonymous';
  img.onload = () => {
    const ratio = Math.min((W - 40) / img.width, (H - 40) / img.height, 1);
    imgW.value = img.width * ratio;
    imgH.value = img.height * ratio;
    image.value = img;
    rotation.value = 0;
    flipScaleX.value = 1;
    flipScaleY.value = 1;
  };
  img.src = src;
}

onMounted(async () => {
  // window.addEventListener('resize', resizeCanvas);
  inheritNodes();
});

// onBeforeUnmount(() => {
//   window.removeEventListener('resize', resizeCanvas);
// });
</script>

<template>
  <div class="canvas">
    <div ref="containerRef" id="container" class="canvas-container">
      <v-stage ref="stageRef" :config="canvasConfig.stage">
        <v-layer ref="layerRef">
          <v-circle v-if="selectedCanvas === 'circle'" :config="calculateCircleConfig" />
          <v-rect v-if="selectedCanvas === 'rectangle'" :config="calculateRectConfig" />
          <v-regular-polygon v-if="selectedCanvas === 'polygon'" :config="calculatePolyConfig" />


          <template v-for="node in nodes">
            <v-regular-polygon v-if="node.type === 'shape'" :config="canvasConfig.shape" />
            <v-line v-if="node.type === 'line'" :config="canvasConfig.line" />
            <v-text v-if="node.type === 'text'" :config="canvasConfig.text" />
            
            <v-image v-if="node.type === 'image'"
            :config="{ 
              ...canvasConfig.image,
              image: node.element,
            }" />
          </template>

        </v-layer>
      </v-stage>
    </div>
  </div>
</template>
