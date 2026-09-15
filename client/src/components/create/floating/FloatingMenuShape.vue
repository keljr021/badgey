<script setup>
import { defineEmits, toRefs, ref, computed, onUpdated, onMounted, watch } from 'vue'
import './floatingMenu.css'


const emit = defineEmits(['shape:update']);

const props = defineProps({
  node: Object,
  type: String,
  width: Number,
  height: Number,
});

const { node, type, width, height } = toRefs(props);

const activeShape = ref(null);
const shapeWidth = ref(1);
const shapeHeight = ref(1);
const shapeSides = ref(3);
const shapeFillValue = ref('#000000');
const shapeFillColor = computed(() => ({ backgroundColor: shapeFillValue.value }));

const shapeStroke = ref(false);
const shapeStrokeWidth = ref(0);
const shapeStrokeValue = ref('#000000');
const shapeStrokeColor = computed(() => ({ backgroundColor: shapeStrokeValue.value }));

const loadValues = () => {
  let item = node.value;
  let attrs = item.attrs;

  activeShape.value = type.value;

  shapeWidth.value = Math.round(width.value);
  shapeHeight.value = Math.round(height.value);
  shapeSides.value = (attrs.sides) ? attrs.sides : null;

  shapeFillValue.value = attrs.fill;
  shapeStroke.value = item.strokeWidth() > 0;
  
  if (shapeStroke.value) {
    shapeStrokeWidth.value = item.strokeWidth();
    shapeStrokeValue.value = attrs.stroke;
  }
}

const setNewShape = (input) => {
  console.log('[setNewShape] input: ', input);
  activeShape.value = input;

  let timestamp = new Date().getTime();

  let output = {};

  switch(input) {
    case 'circle':
      output.type = 'circle';
      output.id = 'circle-' + timestamp;
      output.konvaValues = {
        id: 'circle-' + timestamp,
        radius: 50,
        x: node.value.x(),
        y: node.value.y(),
      }
      break;
    case 'rectangle':
      output.type = 'rectangle';
      output.id = 'rectangle-' + timestamp;
      output.konvaValues = {
        id: 'rectangle-' + timestamp,
        x: node.value.x(),
        y: node.value.y(),
      }
      break;
    case 'polygon':
      output.type = 'polygon';
      output.id = 'polygon-' + timestamp;
      output.konvaValues = {
        sides: shapeSides.value,
        rotation: 0,
        id: 'polygon-' + timestamp,
        x: node.value.x(),
        y: node.value.y(),
      }
      break;
    default:
      break;
  }

 

  emit('shape:update', output);
}

const updateShape = (key) => {
  console.log(' - [updateShape] key: ', key);
  switch(key) {
    case 'width':
      emit('shape:update', { konvaValues: { width: shapeWidth.value } });
      break;
    case 'height':
      emit('shape:update', { konvaValues: { height: shapeHeight.value } });
      break;      
    case 'sides':
      emit('shape:update', { konvaValues: { sides: shapeSides.value } });
      break;
    case 'fill':
      emit('shape:update', { konvaValues: { fill: shapeFillValue.value } });
      break;
    case 'stroke':
      emit('shape:update', { konvaValues: { stroke: shapeStroke.value ? shapeStrokeValue.value : '' } });
      break;
    case 'strokeFill':
      emit('shape:update', { konvaValues: { stroke: shapeStrokeValue.value } });
      break;
    case 'strokeWidth':
      emit('shape:update', { konvaValues: { strokeWidth: shapeStrokeWidth.value } });
      break;
    default:
      break;
  }
}

onMounted(() => {
  loadValues();
});

watch(() => node.value, () => {
  loadValues();
}, { deep: true });

watch(() => width.value, () => {
  loadValues();
}, { deep: true });

watch(() => height.value, () => {
  loadValues();
}, { deep: true })
</script>

<template>
  <div ref="menuShapeRef" class="floatbox-shape">
    <div class="floatbox-shape-list">
      <div class="floatbox-shape-list-item" :class="{ 'active': activeShape === 'circle' }" @click="setNewShape('circle')">
        <div class="floatbox-shape-list-item-icon"><UIcon name="i-lucide-circle" class="size-5" /></div>
        <div class="floatbox-shape-list-item-text">Circle</div>
      </div> 
      <div class="floatbox-shape-list-item" :class="{ 'active': activeShape === 'rectangle' }" @click="setNewShape('rectangle')">
        <div class="floatbox-shape-list-item-icon"><UIcon name="i-lucide-square" class="size-5" /></div>
        <div class="floatbox-shape-list-item-text">Rectangle</div>
      </div> 
      <div class="floatbox-shape-list-item" :class="{ 'active': activeShape === 'polygon' }" @click="setNewShape('polygon')">
        <div class="floatbox-shape-list-item-icon"><UIcon name="i-lucide-octagon" class="size-5" /></div>
        <div class="floatbox-shape-list-item-text">Polygon</div>
      </div> 
    </div>

    <div class="floatbox-shape-menu">
      <div class="floatbox-shape-menu-width">
        Width (px): <br />
        <UInputNumber v-model="shapeWidth" @update:modelValue="updateShape('width')" orientation="vertical" class="w-20 py-2" :min="1" :increment="false" :decrement="false" />
      </div>
      <div class="floatbox-shape-menu-height">
        Height (px): <br />
        <UInputNumber v-model="shapeHeight" @update:modelValue="updateShape('height')" orientation="vertical" class="w-20 py-2" :min="1" :increment="false" :decrement="false" />
      </div>
      <div class="floatbox-shape-menu-sides" v-if="activeShape === 'polygon'">
        Sides: <br />
        <UInputNumber v-model="shapeSides" @update:modelValue="updateShape('sides')" class="w-20 py-2" :increment="{ size: 'sm' }" :decrement="{ size: 'sm' }" :min="3" />

      </div>
      <div class="floatbox-shape-menu-fill">
        Fill: <br />
        <UPopover class="py-2">
          <UButton color="neutral" variant="outline" size="lg">
            <template #leading>
              <span :style="shapeFillColor" class="size-4 rounded-full" />
            </template>
            {{ shapeFillValue }}
          </UButton>

          <template #content>
            <UColorPicker v-model="shapeFillValue" @update:modelValue="updateShape('fill')" class="p-2" />
          </template>
        </UPopover>
      </div>
      <div class="floatbox-shape-menu-stroke">
        <USwitch 
          class="w-50 py-2"
          v-model="shapeStroke" 
          @change="updateShape('stroke')"
          label="Add stroke" 
        />
      </div>
      <template v-if="shapeStroke === true">
        <div class="floatbox-shape-menu-stroke-width">
          Stroke width:
          <UInputNumber v-model="shapeStrokeWidth" @update:modelValue="updateShape('strokeWidth')" orientation="vertical" class="w-20 py-2" :min="1" :increment="false" :decrement="false" />
        </div>
        <div class="floatbox-shape-menu-stroke-color">
          Stroke color:
          <UPopover class="py-2">
            <UButton color="neutral" variant="outline" size="lg">
              <template #leading>
                <span :style="shapeStrokeColor" class="size-4 rounded-full" />
              </template>
              {{ shapeStrokeValue }}
            </UButton>
  
            <template #content>
              <UColorPicker v-model="shapeStrokeValue" @update:modelValue="updateShape('strokeFill')" class="p-2" />
            </template>
          </UPopover>
        </div>
      </template>
    </div>
  </div>
</template>