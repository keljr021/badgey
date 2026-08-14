<script setup>
import { ref, defineEmits } from 'vue';
import './../create.css'

const emit = defineEmits(['close', 'canvas', 'sides']);

const activeItem = ref('');
const canvasPolygonSides = ref(3);

const setCanvas = (input) => {
  console.log('set canvas to: ', input);
  activeItem.value = input;

  if (input === 'polygon') 
    emit('sides', canvasPolygonSides.value);

  emit('canvas', input);
}

const setCanvasPolygonSides = () => {
  console.log('set polygon sides to: ', canvasPolygonSides.value);
  emit('sides', canvasPolygonSides.value);
}
</script>

<template>
  <div class="create-menu-canvas">
    <div class="create-menu-canvas-header">
      Canvas shape

      <UButton color="neutral" variant="ghost" size="md" icon="i-lucide-x" class="float-right" @click="emit('close')" />
    </div>
    <div class="create-menu-canvas-list">
      <div class="create-menu-canvas-list-item" :class="{ 'active': activeItem === 'circle' }" @click="setCanvas('circle')">
        <div class="create-menu-canvas-list-item-icon"><UIcon name="i-lucide-circle" class="size-5" /></div>
        <div class="create-menu-canvas-list-item-text">Circle</div>
      </div> 
      <div class="create-menu-canvas-list-item" :class="{ 'active': activeItem === 'rectangle' }" @click="setCanvas('rectangle')">
        <div class="create-menu-canvas-list-item-icon"><UIcon name="i-lucide-square" class="size-5" /></div>
        <div class="create-menu-canvas-list-item-text">Rectangle</div>
      </div>
      <div class="create-menu-canvas-list-item" :class="{ 'active': activeItem === 'polygon' }" @click="setCanvas('polygon')">
        <div class="create-menu-canvas-list-item-icon"><UIcon name="i-lucide-octagon" class="size-5" /></div>
        <div class="create-menu-canvas-list-item-text">Polygon</div>
      </div>  
    </div>
    <div class="create-menu-canvas-options">
      Sides:
      <UInputNumber v-model="canvasPolygonSides" @change="setCanvasPolygonSides" class="w-25 mx-2" :increment="{ size: 'sm' }" :decrement="{ size: 'sm' }" :min="3" />
    </div>
  </div>
</template>