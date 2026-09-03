<script setup>
import { defineEmits, ref, toRefs, computed, onMounted, watch } from 'vue'
import  * as canvasConfig from './canvasConfig.js'
import FloatingMenu from './../create/floating/FloatingMenu.vue'
import { useImage } from 'vue-konva'
import './create.css'
import imagePlaceholder from './../../assets/img/image-placeholder.png'

const [myImage, status] = useImage(imagePlaceholder);

const nodes = ref([]);
const nodeImages = ref([]);
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
const menuItem = ref(null);
const menuItemW = ref(0);
const menuItemH = ref(0);
const restrictForLine = ref(false);

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

const configImg = (el) => {
  if (!el || !el.name)
    return null;  

  else {
    const nodeImg = new window.Image();
    nodeImg.crossOrigin = 'anonymous';
    nodeImg.src = URL.createObjectURL(el);
    nodeImg.image = useImage(nodeImg);
    nodeImg.onload = (e) => {
      let target = e.target;
      if (target.naturalWidth && target.naturalHeight) {
        let w = target.naturalWidth;
        let h = target.naturalHeight;
        let ratio = Math.min(200 / w, 200 / h);
        
        if (w && h) {
          let outputWidth = w * ratio;
          let outputHeight = h * ratio;
          
          console.log('- [configImg] scaled: ', outputWidth, ' x ', outputHeight);
          nodeImg.width = outputWidth;
          nodeImg.height = outputHeight;
        }
      }
    }
    return nodeImg;
  }
};

const setTargetNode = (e, w, h) => {
  
  const id = e.target.attrs.id;
  const node = layerRef.value.getNode().findOne('#' + id);
  menuItem.value = node;
  menuItemW.value = w ? w : node.width();
  menuItemH.value = h ? h : node.height();

  restrictForLine.value = (id.includes('line')) ? true : false;

  console.log(' - [setTargetNode] id', id, ' menuItem: ', menuItem.value, ' - width: ', menuItemW.value, ' - height: ', menuItemH.value);
}

const handleClickById = (id) => {

  const node = layerRef.value.getNode().findOne('#' + id);

  if (!node) {
    return;
  }

  // if click on empty area - remove all selections
  if (node === node.getStage()) {
    selectedIds.value = [];
    showFloatingMenu.value = false;

    const transformerNode = trRef.value.getNode();
    transformerNode.nodes([]);
    return;
  }

  // do nothing if clicked NOT on our nodes
  if (!node.attrs.id) {
    showFloatingMenu.value = false;
    return;
  }
  
  let clickedId = node.attrs.id;
  
  selectedIds.value = [clickedId];

  //Set menu position
  setTargetNode(node);
  showFloatingMenu.value = true;

  const transformerNode = trRef.value.getNode();
  transformerNode.nodes([node]);
}

const handleClick = (e) => {
  console.log(' - [handleClick] - e.target: ', e.target, ' - e.target.attrs.id: ', e.target.attrs.id);

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

    const transformerNode = trRef.value.getNode();
    transformerNode.nodes([]);
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
  setTargetNode(e);
  showFloatingMenu.value = true;

  const transformerNode = trRef.value.getNode();
  transformerNode.nodes([e.target]);
};

const handleMouseOver = (e) => {
  e.target.getStage().container().style.cursor = 'pointer';
};

const handleMouseOut = (e) => {
  e.target.getStage().container().style.cursor = 'default';
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

const handleMouseUp = () => {
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
};

const setImportedNodes = async () => {
  console.log('- [setImportedNodes]: parentNodes: ', parentNodes.value);
  nodes.value = parentNodes.value;
};

const deleteNode = async (id) => {
  await emit('delete', id);
  setImportedNodes();
  refreshCanvas();
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
  emit('update', nodeList[index].konvaValues.id, { konvaValues: { x: e.target.x(), y: e.target.y() } });
  nodes.value = nodeList;
};

const handleTransformEnd = (e, index, img) => {
  console.log('target: ', e.target);
  const id = e.target.attrs.id;
  const node = layerRef.value.getNode().findOne('#' + id);
  console.log('node: ', node);
  const scaleX = node.scaleX();
  const scaleY = node.scaleY();

  node.scaleX(1);
  node.scaleY(1);
  
  const nodeList = [...nodes.value];

  let updatedConfigs = {};

  updatedConfigs = { 
    konvaValues: {
      x: node.x(),
      y: node.y(),
      rotation: node.rotation(),
    }
  }

  if (id.includes('line')) {
    let updatedPts = node.points();
    const pos = e.target.getStage().getPointerPosition();
    updatedPts[2] = pos.x;
    updatedConfigs.konvaValues.points = updatedPts;
  } else {
    updatedConfigs.konvaValues.width = node.width() * scaleX;
    updatedConfigs.konvaValues.height = node.height() * scaleY;
  }

  nodeList[index] = updatedConfigs;
  nodes.value = nodeList;
  emit('update', id, updatedConfigs);

  refreshCanvas();
  setTargetNode(e, updatedConfigs.konvaValues.width, updatedConfigs.konvaValues.height);
};

const closeFloatingMenu = () => {
  showFloatingMenu.value = false;
  selectedIds.value = [];
  isSelecting.value = false;
}

const updateNodeFromMenu = async (id, input) => {
  console.log('update: ', id, JSON.stringify(input));
  emit('update', id , input);
  refreshCanvas();
}

const repositionSelectionBox = () => {
  if (menuItem.value && isSelecting.value) {
    const menuId = menuItem.value.attrs.id;
    const layer = layerRef.value;
    const node = layer.getNode().findOne('#' + menuId);
    
    const x = node.x();
    const y = node.y();
    selectionRectangle.x1 = x;
    selectionRectangle.y1 = y;
    selectionRectangle.x2 = x;
    selectionRectangle.y2 = y; 
    
  }
}

const refreshCanvas = () => {
   if (trRef.value) {
    const transformer = trRef.value.getNode();
      if (typeof transformer.forceUpdate() !== null)
        transformer.forceUpdate();
  }
}

onMounted(async () => {
  await setImportedNodes();
});

// Update transformer nodes when selection changes
watch(selectedIds, () => {
  if (!trRef.value) return;
  
  const nodes = selectedIds.value.map(id => {
    return layerRef.value.getNode().findOne('#' + id);
  }).filter(Boolean);
  
  trRef.value.getNode().nodes(nodes);
});

watch(() => parentNodes.value, (newVal) => {
  setImportedNodes();
}, { deep: true });



</script>

<template>
  <div class="canvas">
    <floating-menu 
      v-if="showFloatingMenu"
      :node="menuItem"
      :itemWidth="menuItemW"
      :itemHeight="menuItemH"
      @close="closeFloatingMenu(input)"
      @update="updateNodeFromMenu"
      @delete="deleteNode"
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
        <v-layer ref="layerRef" @drawend="repositionSelectionBox">
          <v-circle v-if="selectedCanvas === 'circle'" :config="calculateCircleConfig" />
          <v-rect v-if="selectedCanvas === 'rectangle'" :config="calculateRectConfig" />
          <v-regular-polygon v-if="selectedCanvas === 'polygon'" :config="calculatePolyConfig" />


          <template v-for="(node, i) in nodes">
            <v-circle
              @mouseover="handleMouseOver($event)"
              @mouseout = "handleMouseOut($event)"  
              @dragend="(e) => handleDragEnd(e, i)"
              @transformend="(e) => handleTransformEnd(e, i)" 
              v-if="node.type === 'circle'" 
              :id="node.id" 
              :config="node.konvaValues" 
            />

            <v-rect
              @mouseover="handleMouseOver($event)"
              @mouseout = "handleMouseOut($event)"              
              @dragend="(e) => handleDragEnd(e, i)"
              @transformend="(e) => handleTransformEnd(e, i)" 
              v-if="node.type === 'rectangle'" 
              :id="node.id" 
              :config="node.konvaValues" 
            />

            <v-regular-polygon
              @mouseover="handleMouseOver($event)"
              @mouseout = "handleMouseOut($event)"               
              @dragend="(e) => handleDragEnd(e, i)"
              @transformend="(e) => handleTransformEnd(e, i)" 
              v-if="node.type === 'polygon'" 
              :id="node.id" 
              :config="node.konvaValues" 
            />
            

            <v-line 
              @mouseover="handleMouseOver($event)"
              @mouseout = "handleMouseOut($event)"               
              @dragend="(e) => handleDragEnd(e, i)"
              @transformend="(e) => handleTransformEnd(e, i)" 
              v-if="node.type === 'line'" 
              :id="node.id" 
              :config="node.konvaValues" 
            />
            
            <v-text 
              @mouseover="handleMouseOver($event)"
              @mouseout = "handleMouseOut($event)"             
              @dragend="(e) => handleDragEnd(e, i)"
              @transformend="(e) => handleTransformEnd(e, i)" 
              v-if="node.type === 'text'" 
              :id="node.id" 
              :config="node.konvaValues" 
            />
              
            <v-image
              @mouseover="handleMouseOver($event)"
              @mouseout = "handleMouseOut($event)"                 
              @dragend="(e) => handleDragEnd(e, i)"
              @transformend="(e) => handleTransformEnd(e, i, node.element)"  
              v-if="node.type === 'image'" 
              :id="node.id"
              :config="{ 
                ...node.konvaValues,
                id: node.id,
                image: configImg(node.element) || myImage,
              }"
            />
          </template>

          <v-transformer ref="trRef" :config="{ 
            keepRatio: false, 
            enabledAnchors: restrictForLine ? 
              ['middle-right', 'middle-left'] :
              ['top-left', 'top-center', 'top-right', 'middle-right', 'middle-left', 'bottom-left', 'bottom-center', 'bottom-right']
          }" />
            <v-rect
              v-if="selectionRectangle.visible"
              @mouseover="handleMouseOver($event)"
              @mouseout = "handleMouseOut($event)"   
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
<style scoped>
.konvajs-content {
  margin: 0 auto;
}

</style>