<script setup>
import { ref, defineEmits, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useDraftStore } from '../../../store/draft';
import './../create.css'

const emit = defineEmits(['close']);

const draftStore = useDraftStore();

const { drafts } = storeToRefs(draftStore);

const selectedDraft = ref(null);
const searchTerm = ref('');

const openDraft = id => {
    console.log('open draft: ', id);
}

watch(selectedDraft, (newValue) => {
  const id = newValue.value;
  console.log('Selected draft: ', id);
  openDraft(id);
});
</script>

<template>
  <div class="create-menu-drafts">
    <div class="create-menu-drafts-header">
      Open a saved draft
      <UButton color="neutral" variant="ghost" size="md" icon="i-lucide-x" class="float-right" @click="emit('close')" />
    </div>
    <div class="create-menu-drafts-list">
      <UListbox v-model="selectedDraft" :search-term="searchTerm" filter :items="drafts" class="cursor-pointer" />
    </div>
  </div>
</template>

<style scoped>

</style>
