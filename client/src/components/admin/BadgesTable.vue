<script setup>
import { ref, onMounted } from 'vue'

import { useBadgeStore } from '../../store/badge.js'

const badgeStore = useBadgeStore();

const tableData = ref([]);
const totalBadges = ref(null);

onMounted(async () => {
  await badgeStore.fetchAllBadges();
  tableData.value = badgeStore.badges;
  totalBadges.value = tableData.value.length;
})
</script>

<template>
    <div class="pending">
        <div class="pb-5">Total Badges: {{ totalBadges }}</div>
        <UTable :data="tableData" sticky class="flex-1 max-h-[312px]" />
    </div>
</template>

<style scoped>
.badges {
  padding-top: 25px;
  max-height: 400px;
  overflow-y: auto;
}
</style>