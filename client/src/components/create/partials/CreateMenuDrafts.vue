<script setup>
import { ref } from 'vue';

const selectedDraft = ref(null);

const searchTerm = ref('');
const items = [
 {
    label: 'draft1',
    description: 'Last updated: 2024-06-01 12:00 PM',
    icon: 'i-lucide-file-pen',
    value: 'draft1'
  },
  {
    label: 'draft2',
    description: 'Last updated: 2024-06-01 12:00 PM',
    icon: 'i-lucide-file-pen',
    value: 'draft2'
  },
  {
    label: 'draft3',
    description: 'Last updated: 2024-06-01 12:00 PM',
    icon: 'i-lucide-file-pen',
    value: 'draft3'
  },
];
</script>

<template>
  <div class="create-menu-drafts">
    <div class="create-menu-drafts-header">
      Drafts List
    </div>
    <div class="create-menu-drafts-list">
      <UListbox v-model="selectedDraft" :search-term="searchTerm" filter :items="items" />
    </div>
  </div>
</template>

<style scoped>
.create-menu-drafts {
    position: absolute;
    top: 0;
    left: 100px;
    min-width: 350px;
    min-height: 200px;
    padding: 20px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
}

.create-menu-drafts-header,
.create-menu-drafts-list {
  text-align: left;
}

.create-menu-drafts-header {
  font-weight: 600;
  padding: 15px 0;
}
</style>
