<script setup>
import { defineEmits } from 'vue';
import { useCanvasStore } from './../../store/canvas.js'
import { useDraftStore } from './../../store/draft.js'
import { useBadgeStore } from './../../store/badge.js'
import './create.css'

const emit = defineEmits(['reset-lines']);

const canvasStore = useCanvasStore();
const draftStore = useDraftStore();
const badgeStore = useBadgeStore();

const undo = () => {
   console.log('undo button clicked.');
};

const redo = () => {
   console.log('redo button clicked.');
};

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
  <div class="undo-buttons">
     <UTooltip text="Undo action">
       <UButton @click="undo" class="mx-2 cursor-pointer" icon="i-lucide-undo" color="neutral" variant="outline" caption="Undo" />
     </UTooltip>

     <template class="undo-buttons-mobile">
      <UButton @click="reset" class="mx-2 cursor-pointer" icon="i-lucide-trash-2" color="neutral" variant="outline" />
       <UButton @click="saveDraft" class="mx-2 cursor-pointer" icon="i-lucide-file-plus" label="Save" color="neutral" variant="outline" />
       <UButton @click="publishBadge" class="mx-2 cursor-pointer" icon="i-lucide-upload" label="Publish" color="neutral" variant="outline" />
     </template>

     <UTooltip text="Redo action">
       <UButton @click="redo" class="mx-2 cursor-pointer" icon="i-lucide-redo" color="neutral" variant="outline" caption="Redo" />
     </UTooltip>
  </div>
</template>

