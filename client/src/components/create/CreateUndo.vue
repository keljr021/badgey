<script setup>

function handleUndo() {
  console.log('undo button clicked.');
}

function handleRedo() {
  console.log('redo button clicked.');
}
</script>

<template>
  <div class="undo-buttons">
    <UButton @click="handleUndo" class="mx-2" icon="i-lucide-undo" color="neutral" variant="outline" />
    <UButton @click="handleRedo" class="mx-2" icon="i-lucide-redo" color="neutral" variant="outline" />
  </div>
</template>

<style scoped>
.undo-buttons {
  display: flex;
  justify-content: space-evenly;
}
</style>
