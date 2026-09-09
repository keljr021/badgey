<script setup>
import { useCanvasStore } from './../../store/canvas.js'
import { useDraftStore } from './../../store/draft.js'
import { useBadgeStore } from './../../store/badge.js'
import './create.css'

const emit = defineEmits(['reset-lines']);

const canvasStore = useCanvasStore();
const draftStore = useDraftStore();
const badgeStore = useBadgeStore();

const reset = () => {
  canvasStore.resetCanvas();
  emit('reset-lines');
};

const saveDraft = () => {
  console.log('save draft clicked.');
};

const publishBadge = () => {
  console.log('publish badge clicked.');
};
</script>

<template>
  <div class="save-buttons">
    <UButton @click="reset" class="mx-2 cursor-pointer" icon="i-lucide-trash-2" label="Reset" color="neutral" variant="outline" />
    <UButton @click="saveDraft" class="mx-2 cursor-pointer" icon="i-lucide-file-plus" label="Save as draft" color="neutral" variant="outline" />
    <UButton @click="publishBadge" class="mx-2 cursor-pointer" icon="i-lucide-upload" label="Publish badge" color="neutral" variant="outline" />
  </div>
</template>
