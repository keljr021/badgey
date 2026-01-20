<script setup>
import { getImageSrc } from '../../assets/js/imgHelpers.js'
import { defineEmits, resolveComponent, ref, h, onMounted } from 'vue'

import { useBadgeStore } from '../../store/badge.js'
import { useUserStore } from '../../store/user.js'

const UBadge = resolveComponent('UBadge');
const emits = defineEmits(['update-count']);

const badgeStore = useBadgeStore();
const userStore = useUserStore();

const tableData = ref([]);
const totalBadges = ref(null);

const tableColumns = [
  {
    accessoryKey: 'name',
    header: 'Badge',
    cell: ({ row }) => {
      return h('div', { class: 'flex items-center gap-3' }, [
        h('div', {}, [
          h('img', {
            // src: row.original.image ? getImageSrc(row.original.image) : getImageSrc('badgey_brad.png'),
            src: getImageSrc('custom_badge1.png'),
            alt: row.original.name,
            class: 'h-10 rounded-full'
          })
        ]),
        h('div', undefined, [
          h('p', { class: 'font-medium text-highlighted' }, row.original.name),
        ])
      ])
    },
  },
  {
    accessoryKey: 'author',
    header: 'Author',
    cell: ({ row }) => {
      const author = (row.original.users && row.original.users.length > 0) ? row.original.users[0].name : '-'; 
      return author;
    }
  },
  {
    accessoryKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      let badgeColor = 'bg-gray-400';
      let badgeText = 'Pending';

      switch(row.original.status) {
        case 'A':
          badgeColor = 'bg-success';
          badgeText = 'Approved';
          break;
        case 'R':
          badgeColor = 'bg-error';
          badgeText = 'Rejected';
          break;
        default:
          break;
      }

      return h('span', { 
        class: 'p-2 rounded-full text-inverted ' + badgeColor,
      }, badgeText);
    }
  },
  {
    accessoryKey: 'createdAt',
    header: 'Created At',
    cell: ({ row }) => {
      if (row.original.createdAt == null) {
        return '-';
      }
      const createdAt = new Date(row.original.createdAt);
      return isNaN(createdAt.getTime()) ? '-' : createdAt.toLocaleDateString();
    }
  },
];

onMounted(async () => {
  await badgeStore.fetchAllBadges();
  tableData.value = badgeStore.badges;
  totalBadges.value = tableData.value.length;
  emits('update-count', 'badges', totalBadges.value);
})
</script>

<template>
    <div class="badges">
      <UTable 
        :columns="tableColumns" 
        :data="tableData" 
        sticky
        class="flex-1 max-h-[312px] even-rows"
       />
    </div>
</template>

<style scoped>
.badges {
  max-height: 400px;
  overflow-y: auto;
}

:deep(.even-rows tr:nth-child(even)) {
  background-color: #f6f6f6;
}
</style>