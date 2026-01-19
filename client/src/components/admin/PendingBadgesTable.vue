<script setup>
import { ref, onMounted } from 'vue'

import { useBadgeStore } from '../../store/badge.js'

const badgeStore = useBadgeStore();

const tableData = ref([]);
const totalPending = ref(null);

onMounted(async () => {
  await badgeStore.fetchAllBadges();
  tableData.value = badgeStore.pendingBadges;
  console.log('-- tableData pending badges: ', tableData.value);
  totalPending.value = tableData.value.length;
})
</script>

<template>
    <div class="pending">
        <div class="pb-5">Total Pending: {{ totalPending }}</div>
        <UTable :data="tableData" sticky class="flex-1 max-h-[312px]" />
    </div>
</template>

<style scoped>
.pending {
  padding-top: 25px;
  max-height: 400px;
  overflow-y: auto;
}
</style>