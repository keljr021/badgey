<script setup>
function handleSaveDraft() {
    console.log('save draft clicked.');
}

function handlePublish() {
    console.log('publish badge clicked.');
}
</script>

<template>
  <div class="save-buttons">
    <UButton @click="handleSaveDraft" class="mx-2" icon="i-lucide-file-plus" label="Save as draft" color="neutral" variant="outline" />
    <UButton @click="handlePublish" class="mx-2" icon="i-lucide-upload" label="Publish badge" color="neutral" variant="outline" />
  </div>
</template>

<style scoped>
.save-buttons {
    display: flex;
    justify-content: center;
    padding: 10px 0;
}
</style>
