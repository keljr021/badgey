<script setup>
import { ref, defineEmits } from 'vue';
import './../create.css'

const emit = defineEmits(['close', 'canvas']);

const activeItem = ref('');

const setCanvas = (input) => {
  console.log('set canvas to: ', input);
  activeItem.value = input;
  emit('canvas', input);
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
      <div class="create-menu-canvas-list-item" :class="{ 'active': activeItem === 'octagon' }" @click="setCanvas('octagon')">
        <div class="create-menu-canvas-list-item-icon"><UIcon name="i-lucide-octagon" class="size-5" /></div>
        <div class="create-menu-canvas-list-item-text">Octagon</div>
      </div> 
      <div class="create-menu-canvas-list-item" :class="{ 'active': activeItem === 'square' }" @click="setCanvas('square')">
        <div class="create-menu-canvas-list-item-icon"><UIcon name="i-lucide-square" class="size-5" /></div>
        <div class="create-menu-canvas-list-item-text">Square</div>
      </div> 
    </div>
  </div>
</template>