<script setup>
import { getImageSrc } from '../../assets/js/imgHelpers.js'
import { defineEmits, h, resolveComponent, ref, onMounted } from 'vue'

import { useBadgeStore } from '../../store/badge.js'

const UBadge = resolveComponent('UBadge');
const emits = defineEmits(['update-count']);

const badgeStore = useBadgeStore();

const viewBadge = ref(null);

const openModal = ref(false);
const openReason = ref(false);
const tableData = ref([]);
const totalPending = ref(null);

const reasonText = ref('');

const statusItems = ref([
{
  label: 'Pending',
  value: 'P'
},
{
  label: 'Accepted',
  value: 'A'
},
{
  label: 'Rejected',
  value: 'R'
}
]);

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
    {
    accessoryKey: 'actions',
    header: ' ',
    cell: ({ row }) => {
      const buttonClass = 'text-sm bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-1 px-2 rounded mx-2';
      const isUserActive = row.original.isActive && row.original.isActive === '3';
      const lockOrUnlockLabel = isUserActive ? 'Lock' : 'Unlock';

      return h('div', [
        h('button', {
          class: buttonClass,
          onClick: () => {
            console.log(`View badge ${row.original.id}`);
            viewBadge.value = row.original;
            openModal.value = true;
          }
        }, 'View')
      ]);
    },
  },
];

async function approveBadge() {
  console.log('Badge ', viewBadge.value.id + ' approved.');
  await badgeStore.modifyBadge(viewBadge.value.id, { status: 'A' });
  openModal.value = false;
  await refreshTable();
}

async function rejectBadge() {
  console.log('Badge ', viewBadge.value.id + ' rejected with reason: ', reasonText.value);
  await badgeStore.modifyBadge(viewBadge.value.id, { status: 'R', rejectReason: reasonText.value });
  openReason.value = false;
  openModal.value = false;
  await refreshTable();
}

async function refreshTable() {
  await badgeStore.fetchAllBadges();
  tableData.value = badgeStore.pendingBadges;
  console.log('pending badges: ', badgeStore.pendingBadges);
  totalPending.value = tableData.value.length;
  emits('update-count', 'pending', totalPending.value);
}

onMounted(async () => {
  await refreshTable();
})
</script>

<template>
    <div class="pending">
      <UTable         
        :columns="tableColumns" 
        :data="tableData" 
        sticky
        class="flex-1 max-h-[312px] even-rows"
      />

      <UModal 
        v-model:open="openModal"
        :ui="{ 
            content: 'w-full h-full px-2 py-2 sm:max-w-4xl sm:px-8 sm:py-4', 
            header: 'border-0 sm:px-0',
            body: 'border-0 px-8 py-4', 
            footer: 'justify-center' 
        }">

        <template #content>
          <div class="modal">
            <div class="modal-options">
              <UButton @click="approveBadge" class="mx-2" icon="i-lucide-check" label="Approve badge" color="neutral" variant="outline" />
              <UButton @click="openReason = true" class="mx-2" icon="i-lucide-x" label="Reject badge" color="neutral" variant="outline" />      
            </div>
            <div class="modal-header">
              <div>
                <span class="modal-header-name">{{ viewBadge.name }}</span><br />
                <span class="modal-header-user">#{{ viewBadge.id }}</span>
              </div>
            </div>
            <div class="modal-info">
              <div class="modal-image">
                <img :src="getImageSrc('custom_badge1.png')" alt="User Image" />
                <div class="modal-text-view-text">
                  <div class="modal-text-view-text-header">Description:</div>
                  <div class="modal-text-view-text-info">{{ viewBadge.description }}</div>
                </div>
              </div>
              <div class="modal-text-view">
                <div class="modal-text-view-text">
                  <div class="modal-text-view-text-header">Author:</div>
                  <div class="modal-text-view-text-info">{{ ' - ' }}</div>
                </div>
                <div class="modal-text-view-text">
                  <div class="modal-text-view-text-header">Status:</div>
                  <div class="modal-text-view-text-info py-4">
                    <span class="p-2 rounded-full text-inverted bg-gray-400" v-if="viewBadge.status === 'P'">Pending</span>
                    <span class="p-2 rounded-full text-inverted bg-success" v-else-if="viewBadge.status === 'A'">Accepted</span>
                    <span class="p-2 rounded-full text-inverted bg-error" v-else-if="viewBadge.status === 'R'">Rejected</span>
                    <span v-else>N/A</span>
                </div>
                <div class="modal-text-view-text">
                  <div class="modal-text-view-text-header">Created Date:</div>
                  <div class="modal-text-view-text-info">{{ new Date(viewBadge.createdAt).toLocaleDateString() }}</div>
                </div>
            </div> 
          </div>
        </div>
      </div>
        </template>
      </UModal>

      <UModal
        v-model:open="openReason"
        :ui="{ 
            content: 'w-full h-full px-2 py-2 sm:max-w-4xl sm:px-8 sm:py-4', 
            header: 'border-0 sm:px-0',
            body: 'border-0 px-8 py-4', 
            footer: 'justify-center'
        }"
      >
        <template #content>
          <div class="modal-text">
            <div class="modal-text-view-text">
              <div class="modal-text-view-text-header py-4">Reason for rejecting this badge:</div>
              <div class="modal-text-view-text-info">
                <UTextarea v-model="reasonText" class="w-full" size="xl" :rows="5" autoresize></UTextarea>
              </div>
            </div>
            <div class="modal-text-view-text">
              <div class="modal-text-view-text-info">
                <UButton @click="rejectBadge" class="mx-2" icon="i-lucide-save" label="Save reason" color="neutral" variant="outline" />
              </div>
            </div>
          </div>
        </template>
      </UModal>
    </div>
</template>

<style scoped>
.pending {
  max-height: 400px;
  overflow-y: auto;
}

:deep(.even-rows tr:nth-child(even)) {
  background-color: #f6f6f6;
}

.modal {
  display: flex;
  flex-direction: column;
  gap: 10px;
  overflow-y: auto;
}

.modal-options {
  flex: 1;
  flex-basis: 100%;
  width: 100%;
  text-align: right;
}

.modal-header {
  flex: 1;
  flex-basis: 100%;
  align-items: baseline;
  padding: 20px;
}

.modal-header-name {
  font-size: 24px;
}

.modal-header-user {
  font-size: 18px;
  color: gray;
}

.modal-description {
  font-size: 16px;
  padding: 10px 0;
}

.modal-info {
  flex: 2;
  flex-basis: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  gap: 10px;
}

.modal-image {
  flex: 1;
  box-sizing: border-box;
  width: 100%;
}

.modal-image img {
  height: 250px;
  margin: 0 auto;
}

.modal-text-view,
.modal-text-update {
  flex: 1;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}

.modal-text-view-text {
  padding: 20px 0;
}

.modal-text-view-text-header {
  font-weight: bold;
}

.modal-text-view-text-info {
  font-size: 16px;
}
</style>