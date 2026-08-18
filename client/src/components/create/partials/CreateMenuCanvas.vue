<script setup>
import { ref, toRefs, defineEmits, onMounted } from 'vue';
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
  </div>
</template>