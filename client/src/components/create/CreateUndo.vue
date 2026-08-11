<script setup>
import { defineEmits } from 'vue';
import './create.css'

const emit = defineEmits(['undo', 'redo']);
</script>

<template>
  <div class="undo-buttons">
     <UTooltip text="Undo action">
       <UButton @click="emit('undo')" class="mx-2 cursor-pointer" icon="i-lucide-undo" color="neutral" variant="outline" caption="Undo" />
     </UTooltip>
     <UTooltip text="Redo action">
       <UButton @click="emit('redo')" class="mx-2 cursor-pointer" icon="i-lucide-redo" color="neutral" variant="outline" caption="Redo" />
     </UTooltip>
  </div>
</template>

