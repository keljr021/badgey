<script setup>
import { ref, toRefs, defineEmits, computed, onMounted } from 'vue';
import './../create.css'

const emit = defineEmits(['close', 'canvas', 'sides', 'rotate']);

const props = defineProps({
  selectedCanvas: String,
  selectedSides: Number,
  selectedAngle: Number,
})

const { selectedCanvas, selectedSides, selectedAngle } = toRefs(props);

const canvasPolygonSides = ref(3);
const canvasPolygonAngle = ref(0);

const borderStyles = ref([
  {
    label: 'None',
    value: 'none',
    icon: 'i-lucide-square-off'
  },
  {
    label: 'Solid',
    value: 'solid',
    icon: 'i-lucide-minus'
  },
]);

const setBorder = ref(false);
const borderSizeValue = ref(1);
const borderFillValue = ref('#ffffff');
const borderStrokeValue = ref('#000000');

const borderFillColor = computed(() => ({ backgroundColor: borderFillValue.value }));
const borderStrokeColor = computed(() => ({ backgroundColor: borderStrokeValue.value }));

const showBorderOptions = ref(false);


const setCanvas = (input) => {
  console.log('set canvas to: ', input);

  if (input === 'polygon') 
    emit('sides', canvasPolygonSides.value);

  emit('canvas', input);
}

const setCanvasPolygonSides = () => {
  console.log('set polygon sides to: ', canvasPolygonSides.value);
  emit('sides', canvasPolygonSides.value);
}

const setCanvasPolygonAngle = () => {
  canvasPolygonAngle.value += 90;
  console.log('set polygon angle to: ', canvasPolygonAngle.value);
  emit('rotate', canvasPolygonAngle.value);
}

const setBorderStyle = () => {
  console.log('set border style: ', setBorder.value);
  showBorderOptions.value = setBorder.value !== null;

  if (setBorder.value)
    emit('border', { style: 'solid', strokeWidth: 1, fill: '#fff', stroke: '#000' });
  else
    emit('border', { style: 'none' });

};

const setBorderSize = () => {
  console.log('set border size: ', borderSizeValue.value);
  emit('border', { strokeWidth: borderSizeValue.value })
};

const setBorderFill = () => {
  console.log('set border fill: ', borderFillValue.value);
  emit('border', { fill: borderFillValue.value })
};

const setBorderStroke = () => {
  console.log('set border stroke: ', borderStrokeValue.value);
  emit('border', { stroke: borderStrokeValue.value })
};
</script>

<template>
  <div class="create-menu-canvas">
    <div class="create-menu-canvas-header">
      Canvas shape

      <UButton color="neutral" variant="ghost" size="md" icon="i-lucide-x" class="float-right" @click="emit('close')" />
    </div>
    <div class="create-menu-canvas-list">
      <div class="create-menu-canvas-list-item" :class="{ 'active': selectedCanvas === 'circle' }" @click="setCanvas('circle')">
        <div class="create-menu-canvas-list-item-icon"><UIcon name="i-lucide-circle" class="size-5" /></div>
        <div class="create-menu-canvas-list-item-text">Circle</div>
      </div> 
      <div class="create-menu-canvas-list-item" :class="{ 'active': selectedCanvas === 'rectangle' }" @click="setCanvas('rectangle')">
        <div class="create-menu-canvas-list-item-icon"><UIcon name="i-lucide-square" class="size-5" /></div>
        <div class="create-menu-canvas-list-item-text">Rectangle</div>
      </div>
      <div class="create-menu-canvas-list-item" :class="{ 'active': selectedCanvas === 'polygon' }" @click="setCanvas('polygon')">
        <div class="create-menu-canvas-list-item-icon"><UIcon name="i-lucide-octagon" class="size-5" /></div>
        <div class="create-menu-canvas-list-item-text">Polygon</div>
      </div>  
    </div>
    <div class="create-menu-canvas-options" v-if="selectedCanvas === 'polygon'">
      <div class="py-2">
        Sides:
        <UInputNumber v-model="canvasPolygonSides" @change="setCanvasPolygonSides" class="w-25 mx-2" :increment="{ size: 'sm' }" :decrement="{ size: 'sm' }" :min="3" />
      </div>
      <div class="py-2">
      </div>
      <UButton @click="setCanvasPolygonAngle" class="mx-2 cursor-pointer" icon="i-lucide-rotate-cw" color="neutral" variant="outline" caption="Rotate 90°" label="Rotate 90°" />
    </div>

    <div class="create-menu-border-header-menu">
      <div class="create-menu-border-header-menu-list">
        <USwitch 
          class="w-30 mx-2"
          v-model="setBorder" 
          @change="setBorderStyle" 
          :items="borderStyles" 
          :default-value="setBorder"
          value-key="value" 
          label="Set Border" 
        />
      </div>
      <div class="create-menu-border-header-menu-buttons" v-if="setBorder">

        <div class="createmenu-border-header-menu-buttons-size">
          Size:
          <UInputNumber v-model="borderSizeValue" @change="setBorderSize" class="w-25 mx-2" :increment="{ size: 'sm' }" :decrement="{ size: 'sm' }" :min="1" />
        </div>

        <div class="createmenu-border-header-menu-buttons-color">
          <UPopover class="my-8 mx-2">
              <UButton color="neutral" variant="outline" size="lg">
                <template #leading>
                  <span :style="borderFillColor" class="size-4 rounded-full" />
                </template>
                Fill
              </UButton>
  
              <template #content>
                <UColorPicker v-model="borderFillValue" @update:modelValue="setBorderFill" class="p-2" />
              </template>
            </UPopover>
  
            <UPopover class="my-8 mx-2">
              <UButton color="neutral" variant="outline" size="lg">
                <template #leading>
                  <span :style="borderStrokeColor" class="size-4 rounded-full" />
                </template>
                Stroke
              </UButton>
  
              <template #content>
                <UColorPicker v-model="borderStrokeValue" @update:modelValue="setBorderStroke" class="p-2" />
              </template>
            </UPopover>
        </div>
      </div>
    </div>


  </div>
</template>