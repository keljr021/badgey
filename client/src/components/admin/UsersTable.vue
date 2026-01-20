<script setup>
import { getImageSrc } from '../../assets/js/imgHelpers.js'
import { defineEmits, ref, h, onMounted } from 'vue'

import { useUserStore } from '../../store/user.js'

const userStore = useUserStore();

const emits = defineEmits(['update-count']);

const tableData = ref(null);
const totalUsers = ref(0);

const tableColumns = [
  {
    accessoryKey: 'user',
    header: 'User',
    cell: ({ row }) => {
      return h('div', { class: 'flex items-center gap-3' }, [
        h('div', {}, [
          h('img', {
            src: row.original.image ? getImageSrc(row.original.image) : getImageSrc('badgey_brad.png'),
            alt: row.original.username,
            class: 'h-10 rounded-full'
          })
        ]),
        h('div', undefined, [
          h('p', { class: 'font-medium text-highlighted' }, row.original.name),
          h('p', { class: '' }, `@${row.original.username}`)
        ])
      ])
    }
  },
  {
    accessoryKey: 'company',
    header: 'Company',
    cell: ({ row }) => `${row.original.company || '-'}`,
  },
  {
    accessoryKey: 'dob',
    header: 'DOB',
    cell: ({ row }) => {
      const dob = new Date(row.original.dob);
      return isNaN(dob.getTime()) ? '-' : dob.toLocaleDateString();
    }
  },
  {
    accessoryKey: 'email',
    header: 'Email',
    cell: ({ row }) => `${row.original.email}`,
  },
  {
    accessoryKey: 'role',
    header: 'Role',
    cell: ({ row }) => {
      switch(row.original.userType) {
        case '1':
          return 'Attendee';
        case '2':
          return 'Host';
        case '3':
          return 'Admin';
        default:
          return null;
      }
    },
  },
  {
    accessoryKey: 'createdAt',
    header: 'Created At',
    cell: ({ row }) => `${new Date(row.original.createdAt).toLocaleDateString()}`,
  },
  {
    accessoryKey: 'status',
    header: 'Status',
    cell: ({ row }) => row.original.isActive ? 'Active' : 'Locked',
  },
  {
    accessoryKey: 'lastLogin',
    header: 'Last Login',
    cell: ({ row }) => `${row.original.lastLogin ? new Date(row.original.lastLogin).toLocaleString() : '-'}`,
  },
];

onMounted(async () => {
  await userStore.fetchAllUsers()
  tableData.value = userStore.users;
  totalUsers.value = tableData.value.length;
  emits('update-count', 'users', totalUsers.value);
})
</script>

<template>
    <div class="users">
      <UTable 
        :columns="tableColumns" 
        :data="tableData" 
        sticky
        class="flex-1 max-h-[312px] even-rows"
      />
    </div>
</template>

<style scoped>
.users {
  max-height: 400px;
  overflow-y: auto;
}

:deep(.even-rows tr:nth-child(even)) {
  background-color: #f6f6f6;
}
</style>