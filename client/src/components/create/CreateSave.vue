<script setup>
import { defineEmits } from 'vue';
import './create.css'

const emit = defineEmits(['reset', 'save', 'publish']);
</script>

<template>
  <div class="save-buttons">
    <UButton @click="emit('reset')" class="mx-2 cursor-pointer" icon="i-lucide-trash-2" label="Reset" color="neutral" variant="outline" />
    <UButton @click="emit('save')" class="mx-2 cursor-pointer" icon="i-lucide-file-plus" label="Save as draft" color="neutral" variant="outline" />
    <UButton @click="emit('publish')" class="mx-2 cursor-pointer" icon="i-lucide-upload" label="Publish badge" color="neutral" variant="outline" />
  </div>
</template>
