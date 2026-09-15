<script setup>
import { ref, defineEmits, onMounted, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useDraftStore } from '../../../store/draft';
import './../create.css'

const emit = defineEmits(['close']);

const draftStore = useDraftStore();

const { drafts, selectedDraft } = storeToRefs(draftStore);

const loading = ref(true);
const draftsList = ref([]);
const searchTerm = ref('');

const closeMenu = () => {
  selectedDraft.value = null;
  emit('close');
}

const loadDrafts = async () => {
  for (let i = 0; i < drafts.value.length; i++) {
    let draftItem = drafts.value[i];

    draftsList.value.push({
      icon: 'i-lucide-file-pen',
      label: draftItem.name,
      description: 'Last updated: ' + draftItem.createdAt,
      value: draftItem.name,
    });
  }

  loading.value = false;
}

const openDraft = () => {
    console.log('open draft: ', selectedDraft.value.value);
    draftStore.loadDraft();
}

const deleteDraft = () => {
  const confirmDelete = confirm('Are you sure you want to this draft: ' + selectedDraft.value.value + '?');
  if (confirmDelete) {
      console.log('delete draft: ', selectedDraft.value.value);
  }
} 

onMounted(() => {
  draftStore.fetchAllDrafts();
})

watch(() => drafts.value, () => {
  loadDrafts();
});
</script>

<template>
  <div class="create-menu-drafts">
    <div class="create-menu-drafts-header">
      Open a saved draft
      <UButton color="neutral" variant="ghost" size="md" icon="i-lucide-x" class="float-right" @click="closeMenu" />
    </div>
    <div class="create-menu-drafts-list">
      <UListbox v-model="selectedDraft" :loading="loading" :search-term="searchTerm" filter :items="draftsList" class="cursor-pointer" />
    </div>
    <div class="create-menu-drafts-manage float-right">
      <UButton :disabled="selectedDraft === null" color="neutral" variant="outline" size="md" class="px-2 mr-2" icon="i-lucide-file-down" label="Open" @click="openDraft" />
      <UButton :disabled="selectedDraft === null" color="neutral" variant="outline" size="md" class="px-2 ml-2" icon="i-lucide-trash" label="Delete" @click="deleteDraft" />
    </div>
  </div>
</template>

<style scoped>

</style>
