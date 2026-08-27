<script setup>
import { defineEmits, ref, toRefs, computed, onMounted, watch } from 'vue'
import FloatingMenu from './../create/floating/FloatingMenu.vue'
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

const selectedIds = ref([]);
const isSelecting = ref(false);
const selectionRectangle = ref({
  visible: false,
  x1: 0,
  y1: 0,
  x2: 0,
  y2: 0
});

const showFloatingMenu = ref(false);
const menuX = ref(0);
const menuY = ref(0);

const emit = defineEmits(['update'])

const props = defineProps({
  selectedCanvas: String,
  selectedSides: Number,
  selectedAngle: Number,
  selectedBorder: Object,
  parentNodes: Array,
  resetDrawnLines: Boolean,
  file: File,
});

const { 
  selectedCanvas, 
  selectedSides, 
  selectedAngle, 
  selectedBorder, 
  parentNodes
} = toRefs(props);

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

const resetMenuPosition = (e) => {
  menuX.value = e.target.attrs.x + 700;
  menuY.value = e.target.attrs.y + 100;
}

const handleClick = (e) => {

  // if we are selecting with rect, do nothing
  // But allow point clicks through (when width/height are 0)
  const selWidth = Math.abs(selectionRectangle.x2 - selectionRectangle.x1);
  const selHeight = Math.abs(selectionRectangle.y2 - selectionRectangle.y1);
  if (selectionRectangle.visible && selWidth > 0 && selHeight > 0) {
    return;
  }

  // if click on empty area - remove all selections
  if (e.target === e.target.getStage()) {
    selectedIds.value = [];
    showFloatingMenu.value = false;
    return;
  }

  // do nothing if clicked NOT on our nodes
  if (!e.target.attrs.id) {
    showFloatingMenu.value = false;
    return;
  }
  
  let clickedId = e.target.attrs.id;
  
  // do we pressed shift or ctrl?
  const metaPressed = e.evt.shiftKey || e.evt.ctrlKey || e.evt.metaKey;
  const isSelected = selectedIds.value.includes(clickedId);

  if (!metaPressed && !isSelected) {
    // if no key pressed and the node is not selected
    // select just one
    selectedIds.value = [clickedId];
  } else if (metaPressed && isSelected) {
    // if we pressed keys and node was selected
    // we need to remove it from selection:
    selectedIds.value = selectedIds.value.filter(id => id !== clickedId);
  } else if (metaPressed && !isSelected) {
    // add the node into selection
    selectedIds.value = [...selectedIds.value, clickedId];
  }

  //Set menu position
  resetMenuPosition(e);
  showFloatingMenu.value = true;
};

const handleMouseDown = (e) => {
  mousePressed.value = true;

  // do nothing if we mousedown on any shape
  if (e.target !== e.target.getStage()) {
    return;
  }
  
  // start selection rectangle
  isSelecting.value = true;

  const pos = e.target.getStage().getPointerPosition();
  selectionRectangle.visible = true;
  selectionRectangle.x1 = pos.x;
  selectionRectangle.y1 = pos.y;
  selectionRectangle.x2 = pos.x;
  selectionRectangle.y2 = pos.y;  
}

const handleMouseMove = (e) => {
  // do nothing if we didn't start selection
  if (!isSelecting.value) {
    return;
  }
  
  const pos = e.target.getStage().getPointerPosition();
  selectionRectangle.x2 = pos.x;
  selectionRectangle.y2 = pos.y;
}

const handleMouseUp = (e) => {
  mousePressed.value = false;

   // do nothing if we didn't start selection
  if (!isSelecting.value) {
    return;
  }
  
  isSelecting.value = false;
  
  // update visibility in timeout, so we can check it in click event
  setTimeout(() => {
    selectionRectangle.visible = false;
  });

  const selBox = {
    x: Math.min(selectionRectangle.x1, selectionRectangle.x2),
    y: Math.min(selectionRectangle.y1, selectionRectangle.y2),
    width: Math.abs(selectionRectangle.x2 - selectionRectangle.x1),
    height: Math.abs(selectionRectangle.y2 - selectionRectangle.y1),
  };

  // Only select shapes if selection box has actual size (not just a point click)
  if (selBox.width > 0 && selBox.height > 0) {
    const selected = nodes.value.filter(node => {
      // Check if rectangle intersects with selection box
      return Konva.Util.haveIntersection(selBox, getClientRect(node.konvaValues));
    });
    
    selectedIds.value = selected.map(shape => shape.id);
  }
  showFloatingMenu.value = true;
};

const inheritNodes = async () => {
  console.log('- [inheritNodes]: parentNodes: ', parentNodes.value);
  nodes.value = parentNodes.value;

  if (parentNodes.value.length === 0 && nodes.value.length) {
    clearAllNodes('nodes');
  }
};

const clearAllNodes = () => {
  let nodes = parentNodes.value;

  for (let node in nodes) {
    let id = node.id;
    console.log(' - [clearAllNodes]: target id - ', id);
    deleteNode(id);
  } 
}

const deleteNode = (id) => {
  console.log(' - [deleteNode]: target id - ', id);
  let targetNode = layerRef.value.getNode().findOne(id);
  targetNode.destroy();
}

// Helper functions for calculating bounding boxes of rotated rectangles
const degToRad = (angle) => (angle / 180) * Math.PI;

const getCorner = (pivotX, pivotY, diffX, diffY, angle) => {
  const distance = Math.sqrt(diffX * diffX + diffY * diffY);
  angle += Math.atan2(diffY, diffX);
  const x = pivotX + distance * Math.cos(angle);
  const y = pivotY + distance * Math.sin(angle);
  return { x, y };
};

const getClientRect = (element) => {
  const { x, y, width, height, rotation = 0 } = element;
  const rad = degToRad(rotation);

  const p1 = getCorner(x, y, 0, 0, rad);
  const p2 = getCorner(x, y, width, 0, rad);
  const p3 = getCorner(x, y, width, height, rad);
  const p4 = getCorner(x, y, 0, height, rad);

  const minX = Math.min(p1.x, p2.x, p3.x, p4.x);
  const minY = Math.min(p1.y, p2.y, p3.y, p4.y);
  const maxX = Math.max(p1.x, p2.x, p3.x, p4.x);
  const maxY = Math.max(p1.y, p2.y, p3.y, p4.y);

  return {
    x: minX,
    y: minY,
    width: maxX - minX,
    height: maxY - minY,
  };
};

const handleDragEnd = (e, index) => {
  const nodeList = [...nodes.value];
  nodeList[index] = {
    ...nodeList[index],
    x: e.target.x(),
    y: e.target.y(),
  };
  nodes.value = nodeList;
  
  resetMenuPosition(e);
};

const handleTransformEnd = (e, index) => {
  console.log('target: ', e.target);
  const id = e.target.attrs.id;
  const node = layerRef.value.getNode().findOne('#' + id);
  console.log('node: ', node);
  const scaleX = node.scaleX();
  const scaleY = node.scaleY();

  node.scaleX(1);
  node.scaleY(1);
  
  const nodeList = [...nodes.value];

  const updatedConfigs = {
    ...nodeList[index],
    x: node.x(),
    y: node.y(),
    width: node.width() * scaleX,
    height: node.height() * scaleY,
    rotation: node.rotation(),
  };

  nodeList[index] = updatedConfigs;
  nodes.value = nodeList;
  emit('update', id, updatedConfigs);
  resetMenuPosition(e);
};

// Update transformer nodes when selection changes
watch(selectedIds, () => {
  if (!trRef.value) return;
  
  const nodes = selectedIds.value.map(id => {
    return layerRef.value.getNode().findOne('#' + id);
  }).filter(Boolean);
  
  trRef.value.getNode().nodes(nodes);
});

onMounted(async () => {
  await inheritNodes();
});

watch(() => parentNodes.value, () => {
  inheritNodes();
}, { deep: true });

</script>

<template>
  <div class="canvas">
    <floating-menu 
      v-if="showFloatingMenu"
      :x="menuX"
      :y="menuY"
    />
    <div ref="containerRef" id="container" class="canvas-container">
      <v-stage 
        ref="stageRef" 
        :config="canvasConfig.stage"
        @click="handleClick"
        @tap="handleClick"
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
            <v-regular-polygon
              @dragend="(e) => handleDragEnd(e, i)"
              @transformend="(e) => handleTransformEnd(e, i)" 
              v-if="node.type === 'shape'" 
              :id="node.id" 
              :config="node.konvaValues" 
            />
            
            <v-line 
              @dragend="(e) => handleDragEnd(e, i)"
              @transformend="(e) => handleTransformEnd(e, i)" 
              v-if="node.type === 'line'" 
              :id="node.id" 
              :config="node.konvaValues" 
            />
            
            <v-text 
              @dragend="(e) => handleDragEnd(e, i)"
              @transformend="(e) => handleTransformEnd(e, i)" 
              v-if="node.type === 'text'" 
              :id="node.id" 
              :config="node.konvaValues" 
            />
              
            <v-image 
              v-if="node.type === 'image'" 
              :id="node.id"
              :config="configImg(node.element)"
              @dragend="(e) => handleDragEnd(e, i)"
              @transformend="(e) => handleTransformEnd(e, i)"  
            />
          </template>

          <v-transformer ref="trRef" />
            <v-rect
              v-if="selectionRectangle.visible"
              :config="{
                x: Math.min(selectionRectangle.x1, selectionRectangle.x2),
                y: Math.min(selectionRectangle.y1, selectionRectangle.y2),
                width: Math.abs(selectionRectangle.x2 - selectionRectangle.x1),
                height: Math.abs(selectionRectangle.y2 - selectionRectangle.y1),
                fill: 'rgba(0,0,255,0.5)'
              }"
            />
        </v-layer>
      </v-stage>
    </div>
  </div>
</template>
