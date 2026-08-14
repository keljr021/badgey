<script setup>
import { defineEmits } from 'vue'
import './../create.css'

const emit = defineEmits(['close', 'insert']);

const insertItem = (input) => {
  console.log('insert: ', input);
  emit('insert', input);
};
</script>

<template>
  <div class="create-menu-insert">
    <div class="create-menu-insert-header">
      Insert
      <UButton color="neutral" variant="ghost" size="md" icon="i-lucide-x" class="float-right" @click="emit('close')" />
    </div>
    <div class="create-menu-insert-header-menu">
      <div class="create-menu-insert-header-menu-list">
        <div class="create-menu-insert-list-item" @click="insertItem('shape')">
          <div class="create-menu-insert-list-item-icon"><UIcon name="i-lucide-diamond-plus" class="size-5" /></div>
          <div class="create-menu-insert-list-item-text">Shape</div>
        </div> 
        <div class="create-menu-insert-list-item" @click="insertItem('line')">
          <div class="create-menu-insert-list-item-icon"><UIcon name="i-lucide-slash" class="size-5" /></div>
          <div class="create-menu-insert-list-item-text">Line</div>
        </div> 
        <div class="create-menu-insert-list-item" @click="insertItem('text')">
          <div class="create-menu-insert-list-item-icon"><UIcon name="i-lucide-list-plus" class="size-5" /></div>
          <div class="create-menu-insert-list-item-text">Text</div>
        </div> 
      </div>
    </div>
  </div>
</template>