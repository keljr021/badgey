<script setup>
import { ref, toRefs, computed, onMounted, watch } from 'vue'
import  * as canvasConfig from './canvasConfig.js'
import './create.css'

const nodes = ref([]);
const layerRef = ref(null);
const stageRef = ref(null);
const trRef = ref(null);

const bgCircle = ref(canvasConfig.bgCircle);
const bgRect = ref(canvasConfig.bgRect);
const bgPoly = ref(canvasConfig.bgPoly);

const W = window.innerWidth;
const H = window.innerHeight - 50;

const image = ref(null);
const imgW = ref(200);
const imgH = ref(137);
const rotation = ref(0);
const flipScaleX = ref(1);
const flipScaleY = ref(1);

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

const configImg = (input) => {
  
  console.log(' - configImg triggered - input: ', input);
  if (!input || !input.name)
    return null;  

  const img = new Image();
  img.crossOrigin = 'anonymous';
  img.src = URL.createObjectURL(input);
  img.onload = () => {
    console.log( ' -- img onLoad');
    image.value = img;
  }

  console.log(' -- img: ', img);

  const output = {
    image: img,
    id: 'img' + new Date().getTime(),
    x: 150, 
    y: 150,
    width: 200, 
    height: 200,
    offsetX: 100, 
    offsetY: 100,
    rotation: 0,
    scaleX: 1,
    scaleY: 1,
    draggable: true,
  }

  console.log(' -- output: ', output);
  return output;
};

const inheritNodes = async () => {
  console.log('- [inheritNodes]: parentNodes: ', parentNodes.value);
  nodes.value = parentNodes.value;

  if (parentNodes.value.length === 0 && nodes.value.length) {
    clearAllNodes();
  }
};

const clearAllNodes = () => {
  let nodes = parentNodes.value;

  for (let node in nodes) {
    let id = node.id;
    console.log(' - [clearAllNodes]: target id - ', id);
    deleteNode(node.id);
  } 
}

const deleteNode = (id) => {
  console.log(' - [deleteNode]: target id - ', id);
  let targetNode = layerRef.value.getNode().findOne(id);
  targetNode.destroy();
} 

onMounted(async () => {
  // window.addEventListener('resize', resizeCanvas);
  await inheritNodes();
});

// onBeforeUnmount(() => {
//   window.removeEventListener('resize', resizeCanvas);
// });

watch(() => parentNodes.value, () => {
  inheritNodes();
}, { deep: true });
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
            <v-regular-polygon v-if="node.type === 'shape'" :id="node.id" :config="canvasConfig.shape" />
            <v-line v-if="node.type === 'line'" :id="node.id" :config="canvasConfig.line" />
            <v-text v-if="node.type === 'text'" :id="node.id" :config="canvasConfig.text" />
            
            <v-image v-if="node.type === 'image'" :id="node.id"
            :config="configImg(node.element)" />

          </template>

          <v-transformer ref="trRef" />
        </v-layer>
      </v-stage>
    </div>
  </div>
</template>
