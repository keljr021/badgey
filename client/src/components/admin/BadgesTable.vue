<script setup>
import { getImageSrc } from '../../assets/js/imgHelpers.js'
import { defineEmits, resolveComponent, ref, h, onMounted } from 'vue'

import { useBadgeStore } from '../../store/badge.js'
import { useUserStore } from '../../store/user.js'

const UBadge = resolveComponent('UBadge');
const emits = defineEmits(['update-count']);

const badgeStore = useBadgeStore();
const userStore = useUserStore();

const openModal = ref(false);
const tableData = ref([]);
const totalBadges = ref(null);

const viewBadge = ref(null);
const updatedBadge = ref(null);
const toggleUpdate = ref(false);

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
            updatedBadge.value = row.original;
            openModal.value = true;
            toggleUpdate.value = false;
          }
        }, 'View'),
        h('button', {
          class: buttonClass,
          onClick: () => {
            console.log(`Update badge ${row.original.id}`);
            viewBadge.value = row.original;
            updatedBadge.value = row.original;
            openModal.value = true;
            toggleUpdate.value = true;
          }
        }, 'Update')
      ]);
    },
  },
];

async function saveBadge() {
  delete updatedBadge.value.users;
  console.log(' - saveBadge ', updatedBadge.value.id, ' triggered.');
  await badgeStore.modifyBadge(viewBadge.value.id, {
    name: updatedBadge.value.name,
    description: updatedBadge.value.description,
    userId: updatedBadge.value.userId,
    status: updatedBadge.value.status,
    rejectReason: updatedBadge.value.rejectReason
  });
  await refreshTable();
  toggleUpdate.value = false;
}

async function removeBadge() {
  if (window.confirm("Delete this badge? #" + viewBadge.value.id)) {
    console.log(' - badge ', viewBadge.value.id, ' deleted.');
    await badgeStore.removeBadge(viewBadge.value.id);
    await refreshTable();
    openModal.value = false;
  }
}

async function refreshTable() {
  await badgeStore.fetchAllBadges();
  tableData.value = badgeStore.badges;
  totalBadges.value = tableData.value.length;
  emits('update-count', 'badges', totalBadges.value);
}

onMounted(async () => {
 await refreshTable();
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
              <div class="modal-options-view" v-if="!toggleUpdate">
                <UButton @click="toggleUpdate = true" class="mx-2" icon="i-lucide-pencil" label="Update badge" color="neutral" variant="outline" />
                <UButton @click="removeBadge" class="mx-2" icon="i-lucide-delete" label="Remove badge" color="neutral" variant="outline" />      
                <UButton @click="openModal = false" class="mx-2" icon="i-lucide-x" label="Close" color="neutral" variant="outline" />
              </div>
              <div class="modal-options-update" v-if="toggleUpdate">
                <UButton @click="saveBadge" class="mx-2" icon="i-lucide-save" label="Save badge" color="neutral" variant="outline" />
                <UButton @click="openModal = false" class="mx-2" icon="i-lucide-x" label="Close" color="neutral" variant="outline" />
              </div>              
            </div>
            <div class="modal-header">
              <div v-if="!toggleUpdate">
                <span class="modal-header-name">{{ viewBadge.name }}</span><br />
                <span class="modal-header-user">#{{ viewBadge.id }}</span>
              </div>
              <div v-if="toggleUpdate">
                <span class="modal-header-name">Name: <UInput v-model="updatedBadge.name" placeholder="Name" /></span>
              </div>
            </div>
            <div class="modal-info">
              <div class="modal-image">
                <img :src="getImageSrc('custom_badge1.png')" alt="User Image" />
                <div class="modal-text-view-text">
                  <div class="modal-text-view-text-header">Description:</div>
                  <div class="modal-text-view-text-info" v-if="!toggleUpdate">{{ viewBadge.description }}</div>
                  <div class="modal-text-view-text-info" v-if="toggleUpdate">
                    <UTextarea v-model="updatedBadge.description" class="w-full" placeholder="Description" rows="4" autoresize />
                  </div>
                </div>
              </div>
              <div class="modal-text-view" v-if="!toggleUpdate">
                <div class="modal-text-view-text">
                  <div class="modal-text-view-text-header">Author:</div>
                  <div class="modal-text-view-text-info">{{ ' - ' }}</div>
                </div>
                <div class="modal-text-view-text">
                  <div class="modal-text-view-text-header">Status:</div>
                  <div class="modal-text-view-text-info py-4">
                    <span class="p-2 rounded-full text-inverted bg-gray-400" v-if="viewBadge.status === 'P'">Pending</span>
                    <span class="p-2 rounded-full text-inverted bg-success" v-else-if="viewBadge.status === 'A'">Accepted</span>
                    <div v-else-if="viewBadge.status === 'R'">
                      <span class="p-2 rounded-full text-inverted bg-error">Rejected</span>
                      <div class="my-3">{{ viewBadge.rejectReason }}</div>
                    </div>
                    <span v-else>N/A</span>
                </div>
                <div class="modal-text-view-text">
                  <div class="modal-text-view-text-header">Created Date:</div>
                  <div class="modal-text-view-text-info">{{ new Date(viewBadge.createdAt).toLocaleDateString() }}</div>
                </div>
            </div> 
          </div>
          <div class="modal-text-update" v-if="toggleUpdate">
            <div class="modal-text-view-text">
              <div class="modal-text-view-text-header">Author:</div>
              <div class="modal-text-view-text-info">
                <UInput v-model="updatedBadge.author" placeholder="Author" />
              </div>
            </div>
            <div class="modal-text-view-text">
              <div class="modal-text-view-text-header">Status:</div>
              <div class="modal-text-view-text-info">
                <UInputMenu v-model="updatedBadge.status" :items="statusItems" value-key="value" />
                <div v-if="updatedBadge.status === 'R'">
                  <UTextarea v-model="updatedBadge.rejectReason" :rows="4" />
                </div>
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