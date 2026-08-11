<script setup>
import { ref } from 'vue';

const activeItem = ref('');

const handleCanvasClick = (item) => {
  activeItem.value = item;
};
</script>

<template>
  <div class="create-menu-canvas">
    <div class="create-menu-canvas-header">
      Canvas shape
    </div>
    <div class="create-menu-canvas-list">
      <div class="create-menu-canvas-list-item" :class="{ 'active': activeItem === 'circle' }" @click="handleCanvasClick('circle')">
        <div class="create-menu-canvas-list-item-icon"><UIcon name="i-lucide-circle" class="size-5" /></div>
        <div class="create-menu-canvas-list-item-text">Circle</div>
      </div> 
      <div class="create-menu-canvas-list-item" :class="{ 'active': activeItem === 'octagon' }" @click="handleCanvasClick('octagon')">
        <div class="create-menu-canvas-list-item-icon"><UIcon name="i-lucide-octagon" class="size-5" /></div>
        <div class="create-menu-canvas-list-item-text">Octagon</div>
      </div> 
      <div class="create-menu-canvas-list-item" :class="{ 'active': activeItem === 'square' }" @click="handleCanvasClick('square')">
        <div class="create-menu-canvas-list-item-icon"><UIcon name="i-lucide-square" class="size-5" /></div>
        <div class="create-menu-canvas-list-item-text">Square</div>
      </div> 
    </div>
  </div>
</template>

<style scoped>
.create-menu-canvas {
    position: absolute;
    top: 100px;
    left: 100px;
    min-width: 350px;
    min-height: 100px;
    padding: 20px;
    border-radius: 10px;
    background-color: #fff;
    box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
}

.create-menu-canvas-header {
  font-weight: 600;
  padding: 15px 0;
}

.create-menu-canvas-list {
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 15px 0;
  margin: 0 auto;
  text-align: center;
  cursor: pointer;
}

.create-menu-canvas-list-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 15px 0;
    margin: 0 auto;
    text-align: center;
    cursor: pointer;
}

.create-menu-canvas-list-item:hover {
    background-color: #eee;
}

.create-menu-canvas-list-item-icon {
    margin: 0 auto;
    padding: 10px 0;
    opacity: 0.5;
}

.create-menu-canvas-list-item.active .create-menu-canvas-list-item-icon {
    color: var(--badgey-green);
    opacity: 1;
}

.create-menu-canvas-list-item.active .create-menu-canvas-list-item-text {
    color: var(--badgey-green);
    font-weight: bold;
}
</style>
