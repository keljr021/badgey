<script setup>
import { ref } from 'vue'

const tableData = ref([
    {
    id: '338181a3-9213-48ff-817a-299371ba49e3',
    userId: '338181a3-9213-48ff-817a-299371ba49e3',
    image: 'null',
    name: 'Test Badge 1',
    description: 'This is a test badge pending approval.',
    createdAt: '2024-06-10T12:34:56Z',
    isDraft: false,
    isApproved: true,
    rejectReason: null,
  }
]);

const totalBadges = ref(tableData.value.length);
</script>

<template>
    <div class="pending">
        <div>Total Badges: {{ totalBadges }}</div>
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