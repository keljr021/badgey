<script setup>
import { defineEmits } from 'vue';
import './create.css'

const emit = defineEmits(['undo', 'redo', 'save', 'publish']);
</script>

<template>
  <div class="undo-buttons">
     <UTooltip text="Undo action">
       <UButton @click="emit('undo')" class="mx-2 cursor-pointer" icon="i-lucide-undo" color="neutral" variant="outline" caption="Undo" />
     </UTooltip>

     <template class="undo-buttons-mobile">
       <UButton @click="emit('save')" class="mx-2 cursor-pointer" icon="i-lucide-file-plus" label="Save" color="neutral" variant="outline" />
       <UButton @click="emit('publish')" class="mx-2 cursor-pointer" icon="i-lucide-upload" label="Publish" color="neutral" variant="outline" />
     </template>

     <UTooltip text="Redo action">
       <UButton @click="emit('redo')" class="mx-2 cursor-pointer" icon="i-lucide-redo" color="neutral" variant="outline" caption="Redo" />
     </UTooltip>
  </div>
</template>

