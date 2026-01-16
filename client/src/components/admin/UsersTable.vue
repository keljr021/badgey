<script setup>
import { ref } from 'vue'

const tableData = ref([
  {
    id: '338181a3-9213-48ff-817a-299371ba49e3',
    userType: '3',
    image: 'null',
    name: 'Test User 1',
    username: 'testuser1',
    email: 'testuser@email.com',
    dob: '1990-01-01',
    password: '********',
    company: 's',
    description: 'x',
    lastLogin: '2024-06-10T12:34:56Z',
    isEmailVerified: false,
    isLocked: false,
    createdAt: '2024-06-10T12:34:56Z',
  }
]);

const totalUsers = ref(tableData.value.length);

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