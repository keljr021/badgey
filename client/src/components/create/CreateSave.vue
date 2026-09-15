<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia' 
import { useCanvasStore } from './../../store/canvas.js'
import { useDraftStore } from './../../store/draft.js'
import { useBadgeStore } from './../../store/badge.js'
import './create.css'

const emit = defineEmits(['reset-lines']);

const canvasStore = useCanvasStore();
const draftStore = useDraftStore();
const badgeStore = useBadgeStore();

const { drafts } = storeToRefs(draftStore);

const openModal = ref(false);
const filename = ref('');
const selectedDraft = ref(null);

const toggleModal = (input) => {
  openModal.value = input ? input : !openModal.value;
}

const reset = () => {
  canvasStore.resetCanvas();
  emit('reset-lines');
};

const saveDraft = () => {
  console.log('save draft clicked.');
  toggleModal(false);
};

const publishBadge = () => {
  console.log('publish badge clicked.');
};
</script>

<template>
  <div class="save-buttons" size="xl">
     <UFieldGroup orientation="horizontal">
       <UButton @click="reset" class="cursor-pointer" icon="i-lucide-trash-2" label="Reset" color="neutral" variant="outline" />
            
        <UModal 
          v-model:open="openModal"
          title="Save as draft"
          :close="{
            color: 'primary',
            variant: 'link',
            class: 'border-none'
          }">

          <UButton @click="toggleModal(true)" class="cursor-pointer" icon="i-lucide-file-plus-2" label="Save as draft" color="neutral" variant="outline" />

          <template #body class="py-4 px-4">
            <div class="save-dialog-filename">
               Name: <UInput v-model="filename" ref="filenameRef" class="mx-2" :autofocus="openModal === true" />
            </div>
            <div class="save-dialog-buttons">
              <UButton @click="saveDraft" color="neutral" variant="outline" size="md" icon="i-lucide-save" class="float-right" label="Save"/>
            </div>
          </template>
        </UModal>
       
       <UButton @click="publishBadge" class="cursor-pointer" icon="i-lucide-upload" label="Publish badge" color="neutral" variant="outline" />
     </UFieldGroup>
  </div>
</template>
