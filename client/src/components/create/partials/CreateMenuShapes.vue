<script setup>
import { defineEmits } from 'vue'
import './../create.css'

const emit = defineEmits(['close']);
</script>

<template>
  <div class="create-menu-shapes">
    <div class="create-menu-shapes-header">
      Add shape

      <UButton color="neutral" variant="ghost" size="md" icon="i-lucide-x" class="float-right" @click="emit('close')" />
    </div>
    <div class="create-menu-shapes-list">
      <div class="create-menu-shapes-list-item">
        <div class="create-menu-shapes-list-item-icon"><UIcon name="i-lucide-diamond" class="size-5" /></div>
        <div class="create-menu-shapes-list-item-text">Diamond</div>
      </div> 
      <div class="create-menu-shapes-list-item">
        <div class="create-menu-shapes-list-item-icon"><UIcon name="i-lucide-circle" class="size-5" /></div>
        <div class="create-menu-shapes-list-item-text">Circle</div>
      </div> 
      <div class="create-menu-shapes-list-item">
        <div class="create-menu-shapes-list-item-icon"><UIcon name="i-lucide-square" class="size-5" /></div>
        <div class="create-menu-shapes-list-item-text">Square</div>
      </div>
      <div class="create-menu-shapes-list-item">
        <div class="create-menu-shapes-list-item-icon"><UIcon name="i-lucide-star" class="size-5" /></div>
        <div class="create-menu-shapes-list-item-text">Custom</div>
      </div>
    </div>
  </div>
</template>
