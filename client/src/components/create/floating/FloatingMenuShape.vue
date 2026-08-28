<script setup>
import { defineEmits, toRefs, ref, computed, onUpdated, onMounted, watch } from 'vue'
import './floatingMenu.css'


const emit = defineEmits(['shape:update']);

const props = defineProps({
  node: Object,
  width: Number,
  height: Number,
});

const { node, width, height } = toRefs(props);

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

  if (attrs.sides) {
    activeShape.value = (attrs.sides === 4) ? 'rectangle' : 'polygon';
  } else {
    activeShape.value = 'circle';
  }

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

  let output = {};

  switch(input) {
    case 'circle':
      output.type = 'circle';
      break;
    case 'rectangle':
      output.type = 'rectangle';
      break;
    case 'polygon':
      output.type = 'polygon';
      break;
    default:
      break;
  }

  output.konvaValues = {
    x: node.value.attrs.x,
    y: node.value.attrs.y,
  }

  emit('shape:update', output);
}

const updateShape = (key) => {
  console.log(' - [updateShape] key: ', key);
  switch(key) {
    case 'width':
      emit('shape:update', { width: shapeWidth.value });
      break;
    case 'height':
      emit('shape:update', { height: shapeHeight.value });
      break;      
    case 'sides':
      emit('shape:update', { sides: shapeSides.value });
      break;
    case 'fill':
      emit('shape:update', { fill: shapeFillValue.value });
      break;
    case 'stroke': case 'strokeFill':
      emit('shape:update', { stroke: shapeStrokeValue.value ? shapeStrokeValue.value : '' });
      break;
    case 'strokeWidth':
      emit('shape:update', { strokeWidth: shapeStrokeWidth.value });
      break;
    default:
      break;
  }
}

onMounted(() => {
  loadValues();
});

watch(() => width.value, () => {
  loadValues();
}, { deep: true });

watch(() => height.value, () => {
  loadValues();
}, { deep: true })
</script>

<template>
  <div ref="menuShapeRef" class="float-shape">
    <div class="float-shape-list">
      <div class="float-shape-list-item" :class="{ 'active': activeShape === 'circle' }" @click="setNewShape('circle')">
        <div class="float-shape-list-item-icon"><UIcon name="i-lucide-circle" class="size-5" /></div>
        <div class="float-shape-list-item-text">Circle</div>
      </div> 
      <div class="float-shape-list-item" :class="{ 'active': activeShape === 'rectangle' }" @click="setNewShape('rectangle')">
        <div class="float-shape-list-item-icon"><UIcon name="i-lucide-square" class="size-5" /></div>
        <div class="float-shape-list-item-text">Rectangle</div>
      </div> 
      <div class="float-shape-list-item" :class="{ 'active': activeShape === 'polygon' }" @click="setNewShape('polygon')">
        <div class="float-shape-list-item-icon"><UIcon name="i-lucide-octagon" class="size-5" /></div>
        <div class="float-shape-list-item-text">Polygon</div>
      </div> 
    </div>

    <div class="float-shape-menu">
      <div class="float-shape-menu-width">
        Width (px): <br />
        <UInputNumber v-model="shapeWidth" @update:modelValue="updateShape('width')" orientation="vertical" class="w-20 py-2" :min="1" :increment="false" :decrement="false" />
      </div>
      <div class="float-shape-menu-height">
        Height (px): <br />
        <UInputNumber v-model="shapeHeight" @update:modelValue="updateShape('height')" orientation="vertical" class="w-20 py-2" :min="1" :increment="false" :decrement="false" />
      </div>
      <div class="float-shape-menu-sides" v-if="activeShape === 'polygon'">
        Sides: <br />
        <UInputNumber v-model="shapeSides" @update:modelValue="updateShape('sides')" class="w-20 py-2" :increment="{ size: 'sm' }" :decrement="{ size: 'sm' }" :min="3" />

      </div>
      <div class="float-shape-menu-fill">
        Fill: <br />
        <UPopover class="py-2">
          <UButton color="neutral" variant="outline" size="lg">
            <template #leading>
              <span :style="shapeFillColor" class="size-4 rounded-full" />
            </template>
            {{ shapeFillValue }}
          </UButton>

          <template #content>
            <UColorPicker v-model="shapeFillValue" @change="updateShape('fill')" @update:modelValue="shapeFillColor" class="p-2" />
          </template>
        </UPopover>
      </div>
      <div class="float-shape-menu-stroke">
        <USwitch 
          class="w-50 py-2"
          v-model="shapeStroke" 
          @change="updateShape('stroke')"
          label="Add stroke" 
        />
      </div>
      <template v-if="shapeStroke === true">
        <div class="float-shape-menu-stroke-width">
          Stroke width:
          <UInputNumber v-model="shapeStrokeWidth" @update:modelValue="updateShape('strokeWidth')" orientation="vertical" class="w-20 py-2" :min="1" :increment="false" :decrement="false" />
        </div>
        <div class="float-shape-menu-stroke-color">
          Stroke color:
          <UPopover class="py-2">
            <UButton color="neutral" variant="outline" size="lg">
              <template #leading>
                <span :style="shapeStrokeColor" class="size-4 rounded-full" />
              </template>
              {{ shapeStrokeValue }}
            </UButton>
  
            <template #content>
              <UColorPicker v-model="shapeStrokeValue" @change="updateShape('strokeFill')"  @update:modelValue="shapeStrokeColor" class="p-2" />
            </template>
          </UPopover>
        </div>
      </template>
    </div>
  </div>
</template>