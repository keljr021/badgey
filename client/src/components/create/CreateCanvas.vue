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

const mousePressed = ref(false);
const lines = ref([]);

const props = defineProps({
  selectedCanvas: String,
  selectedSides: Number,
  selectedAngle: Number,
  selectedBorder: Object,
  parentNodes: Array,
  file: File,
  isDrawing: Boolean,
  drawTool: String,
  drawSize: Number,
  drawColor: String,
});

const { 
  selectedCanvas, 
  selectedSides, 
  selectedAngle, 
  selectedBorder, 
  parentNodes, 
  file, 
  isDrawing, 
  drawTool, 
  drawSize,
  drawColor } = toRefs(props);

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

const setDrawnLineConfig = computed(() => {
  return (line) => {
    const color = drawColor.value;
    const size = drawSize.value;
    return {
      points: line.points,
      stroke:  color,
      strokeWidth: size,
      tension: 2,
      lineCap: 'round',
      lineJoin: 'round',
      draggable: true,
      globalCompositeOperation:
        line.tool === 'eraser' ? 'destination-out' : 'source-over'
    };
  }
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

const handleMouseDown = (e) => {
  mousePressed.value = true;
  const pos = e.target.getStage().getPointerPosition();
  lines.value.push({ tool: drawTool.value, points: [pos.x, pos.y] });

  //Move this event into Canvas store
  //Figure out way to separate width and color for each line
  
}

const handleMouseMove = (e) => {
  if (!mousePressed.value) {
    return;
  }
  // prevent scrolling on touch devices
  e.evt.preventDefault();
  
  const stage = e.target.getStage();
  const point = stage.getPointerPosition();
  
  let lastLine = lines.value[lines.value.length - 1];
  lastLine.points = lastLine.points.concat([point.x, point.y]);
  lines.value.splice(lines.value.length - 1, 1, { ...lastLine });
}

const handleMouseUp = () => {
  mousePressed.value = false;
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
  await inheritNodes();
});

watch(() => parentNodes.value, () => {
  inheritNodes();
}, { deep: true });

watch(() => isDrawing.value, () => {
  console.log('- isDrawing is now: ', isDrawing.value);
}, { deep: true });

watch(() => drawTool.value, () => {
  console.log('- drawTool is now: ', drawTool.value);
}, { deep: true });

watch(() => drawSize.value, () => {
  console.log('- drawSize is now: ', drawSize.value);
}, { deep: true });

watch(() => drawColor.value, () => {
  console.log('- drawColor is now: ', drawColor.value);
}, { deep: true });
</script>

<template>
  <div class="canvas">
    <div ref="containerRef" id="container" class="canvas-container">
      <v-stage 
        ref="stageRef" 
        :config="canvasConfig.stage"
        @mousedown="handleMouseDown"
        @mousemove="handleMouseMove"
        @mouseup="handleMouseUp"
        @touchstart="handleMouseDown"
        @touchmove="handleMouseMove"
        @touchend="handleMouseUp"
      >
        <v-layer ref="layerRef">
          <v-circle v-if="selectedCanvas === 'circle'" :config="calculateCircleConfig" />
          <v-rect v-if="selectedCanvas === 'rectangle'" :config="calculateRectConfig" />
          <v-regular-polygon v-if="selectedCanvas === 'polygon'" :config="calculatePolyConfig" />


          <template v-for="node in nodes">
            <v-regular-polygon v-if="node.type === 'shape'" :id="node.id" :config="node.konvaValues" />
            <v-line v-if="node.type === 'line'" :id="node.id" :config="node.konvaValues" />
            <v-text v-if="node.type === 'text'" :id="node.id" :config="node.konvaValues" />
              
            <v-image v-if="node.type === 'image'" :id="node.id"
            :config="configImg(node.element)" />
          </template>

          <v-line 
            v-for="(line, i) in lines" 
            :key="i" :id="'drawnLine' + (i+1)" 
            :config="setDrawnLineConfig(line)" 
          />
          
          <v-transformer ref="trRef" />
        </v-layer>
      </v-stage>
    </div>
  </div>
</template>
