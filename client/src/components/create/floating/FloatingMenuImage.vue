<script setup>
import { defineEmits, toRefs, ref, computed, onUpdated, onMounted, watch } from 'vue'
import './floatingMenu.css'

const emit = defineEmits(['image:update']);

const props = defineProps({
  node: Object,
  width: Number,
  height: Number,
});

const { node, width, height } = toRefs(props);

const imageWidth = ref(0);
const imageHeight = ref(0);
const imageStroke = ref(false);

const imageStrokeWidth = ref(1);
const imageStrokeValue = ref('#000000');
const imageStrokeColor = computed(() => ({ backgroundColor: imageStrokeValue.value }));

const setValues = () => {
  const item = node.value;
  const attrs = item.attrs;

  imageWidth.value = Math.round(width.value);
  imageHeight.value = Math.round(height.value);
  console.log('stroke: ',  attrs.stroke);
  imageStroke.value = (attrs.stroke && attrs.stroke !== '');
  
  if (imageStroke.value) {
    imageStrokeWidth.value = item.strokeWidth();
    imageStrokeValue.value = attrs.stroke;
  }
}

const updateImage = (key) => {
  console.log(' - [updateImage] key: ', key);
  switch(key) {
    case 'width':
      emit('image:update', { konvaValues: { width: imageWidth.value } });
      break;
    case 'height':
      emit('image:update', { konvaValues: { height: imageHeight.value } });
      break;      
    case 'sides':
      emit('image:update', { konvaValues: { sides: imageSides.value } });
      break;
    case 'fill':
      emit('image:update', { konvaValues: { fill: imageFillValue.value } });
      break;
    case 'stroke':
      emit('image:update', { konvaValues: { stroke: imageStroke.value ? imageStrokeValue.value : '' } });
      break;
    case 'strokeFill':
      emit('image:update', { konvaValues: { stroke: imageStrokeValue.value } });
      break;
    case 'strokeWidth':
      emit('image:update', { konvaValues: { strokeWidth: imageStrokeWidth.value } });
      break;
    default:
      break;
  }
}

onMounted(() => {
  setValues();
});
</script>

<template>
  <div ref="menuImageRef" class="float-image">
    <div class="float-image-menu">
      <div class="float-image-menu-width">
        Width (px): <br />
        <UInputNumber v-model="imageWidth" @update:modelValue="updateImage('width')" orientation="vertical" class="w-20 py-2" :min="1" :increment="false" :decrement="false" />
      </div>
      <div class="float-image-menu-height">
        Height (px): <br />
        <UInputNumber v-model="imageHeight" @update:modelValue="updateImage('height')" orientation="vertical" class="w-20 py-2" :min="1" :increment="false" :decrement="false" />
      </div>
      <div class="float-image-menu-stroke">
        <USwitch 
          class="w-50 py-2"
          v-model="imageStroke" 
          @change="updateImage('stroke')"
          label="Add stroke" 
        />
      </div>
      <template v-if="imageStroke === true">
        <div class="float-image-menu-stroke-width">
          Stroke width:
          <UInputNumber v-model="imageStrokeWidth" @update:modelValue="updateImage('strokeWidth')" orientation="vertical" class="w-20 py-2" :min="1" :increment="false" :decrement="false" />
        </div>
        <div class="float-image-menu-stroke-color">
          Stroke color:
          <UPopover class="py-2">
            <UButton color="neutral" variant="outline" size="lg">
              <template #leading>
                <span :style="imageStrokeColor" class="size-4 rounded-full" />
              </template>
              {{ imageStrokeValue }}
            </UButton>
  
            <template #content>
              <UColorPicker v-model="imageStrokeValue" @update:modelValue="updateImage('strokeFill')" class="p-2" />
            </template>
          </UPopover>
        </div>
      </template>
    </div>
  </div>
</template>

