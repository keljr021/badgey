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
  <div class="save-buttons" size="lg">
     <UFieldGroup orientation="horizontal">
       <UButton @click="reset" class="cursor-pointer" icon="i-lucide-trash-2" label="Reset" color="neutral" variant="outline" />
       <UButton @click="saveDraft" class="cursor-pointer" icon="i-lucide-file-plus-2" label="Save as draft" color="neutral" variant="outline" />
       <UButton @click="publishBadge" class="cursor-pointer" icon="i-lucide-upload" label="Publish badge" color="neutral" variant="outline" />
     </UFieldGroup>
  </div>
</template>
