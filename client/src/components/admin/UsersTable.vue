<script setup>
import { ref, onMounted } from 'vue'

import { useUserStore } from '../../store/user.js'

const userStore = useUserStore()

const tableData = ref(null);
const totalUsers = ref(0);

onMounted(async () => {
  await userStore.fetchAllUsers()
  tableData.value = userStore.users;
  totalUsers.value = tableData.value.length;
})
</script>

<template>
    <div class="pending">
        <div>Total Users: {{ totalUsers }}</div>
        <UTable :data="tableData" sticky class="flex-1 max-h-[312px]" />
    </div>
</template>

<style scoped>
.users {
  padding-top: 25px;
  max-height: 400px;
  overflow-y: auto;
}
</style>