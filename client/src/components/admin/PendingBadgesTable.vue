<script setup>
import { getImageSrc } from '../../assets/js/imgHelpers.js'
import { defineEmits, h, resolveComponent, ref, onMounted } from 'vue'

import { useBadgeStore } from '../../store/badge.js'

const UBadge = resolveComponent('UBadge');
const emits = defineEmits(['update-count']);

const badgeStore = useBadgeStore();


const tableData = ref([]);
const totalPending = ref(null);

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
      return 'First Last';
    }
  },
  {
    accessoryKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      let badgeColor = 'neutral';
      let badgeIcon = 'i-lucide-circle-dashed'
      let badgeText = 'Pending';

      switch(row.original.status) {
        case 'A':
          badgeColor = 'success';
          badgeIcon = 'i-lucide-check-circle';
          badgeText = 'Approved';
          break;
        case 'R':
          badgeColor = 'danger';
          badgeIcon = 'i-lucide-x-circle';
          badgeText = 'Rejected';
          break;
        default:
          break;
      }

      return h(UBadge, { 
        class: 'rounded-full',
        size: 'md',
        icon: badgeIcon,
        color: badgeColor,
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
  tableData.value = badgeStore.pendingBadges;
  totalPending.value = tableData.value.length;
  emits('update-count', 'pending', totalPending.value);
})
</script>

<template>
    <div class="pending">
      <UTable :data="tableData" :columns="tableColumns" sticky class="flex-1 max-h-[312px]" />
    </div>
</template>

<style scoped>
.pending {
  max-height: 400px;
  overflow-y: auto;
}
</style>