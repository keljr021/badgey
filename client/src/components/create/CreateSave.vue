<script setup>
import { defineEmits } from 'vue';

const emit = defineEmits(['save', 'publish']);
</script>

<template>
  <div class="save-buttons">
    <UButton @click="emit('save')" class="mx-2 cursor-pointer" icon="i-lucide-file-plus" label="Save as draft" color="neutral" variant="outline" />
    <UButton @click="emit('publish')" class="mx-2 cursor-pointer" icon="i-lucide-upload" label="Publish badge" color="neutral" variant="outline" />
  </div>
</template>

<style scoped>
.save-buttons {
    display: flex;
    justify-content: center;
    padding: 10px 0;
    z-index: 9;
}
</style>
