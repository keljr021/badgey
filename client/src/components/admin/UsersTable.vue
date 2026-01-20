<script setup>
import { getImageSrc } from '../../assets/js/imgHelpers.js'
import { defineEmits, ref, h, onMounted } from 'vue'

import { useUserStore } from '../../store/user.js'

const userStore = useUserStore();

const emits = defineEmits(['update-count']);

const openModal = ref(false);
const tableData = ref(null);
const totalUsers = ref(0);

const viewUser = ref(null);
const toggleUpdate = ref(false);

const updatedUser = ref(null);

const userTypeItems = ref([
  {
    label: 'User',
    value: '1'
  },
  {
    label: 'Host',
    value: '2'
  },
  {
    label: 'Admin',
    value: '3'
  }
]);
const lockUserItems = ref([ 
  {
    label: 'Active',
    value: true,
  },
  {
    label: 'Locked',
    value: false
  }
]);

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
            class: 'w-10 h-10 rounded-full'
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
            console.log(`View user ${row.original.id}`);
            viewUser.value = row.original;
            updatedUser.value = row.original;
            toggleUpdate.value = false;
            openModal.value = true;
          }
        }, 'View'),
        h('button', {
          class: buttonClass,
          onClick: () => {
            console.log(`Update user ${row.original.id}`);
            viewUser.value = row.original;
            updatedUser.value = row.original;
            toggleUpdate.value = true;
            openModal.value = true;
          }
        }, 'Update'),
        h('button', {
          class: buttonClass,
          onClick: () => {
            console.log(`${lockOrUnlockLabel} user ${row.original.id}`);
          }
        }, lockOrUnlockLabel)
      ]);
    },
  },
];

function saveUser() {
  console.log(' - SaveUser triggered.');
  toggleUpdate.value = false;
}

function toggleLockUser() {
  console.log(' - ToggleLockUser triggered.');
  updatedUser.value.isActive = !updatedUser.value.isActive;
}

function removeUser() {
  console.log(' - RemoveUser triggered.');
  openModal.value = false;
}

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
                <UButton @click="toggleUpdate = true;updatedUser=viewUser" class="mx-2" icon="i-lucide-pencil" label="Update user" color="neutral" variant="outline" />
                <UButton @click="toggleLockUser" class="mx-2" :icon="(viewUser.isActive) ? 'i-lucide-lock' : 'i-lucide-unlock'" :label="(viewUser.isActive) ? 'Lock user' : 'Unlock user'" color="neutral" variant="outline" />
                <UButton @click="removeUser" class="mx-2" icon="i-lucide-delete" label="Remove user" color="neutral" variant="outline" />      
                <UButton @click="openModal = false" class="mx-2" icon="i-lucide-x" label="Close" color="neutral" variant="outline" />
              </div>
              <div class="modal-options-update" v-if="toggleUpdate">
                <UButton @click="saveUser" class="mx-2" icon="i-lucide-save" label="Save user" color="neutral" variant="outline" />
                <UButton @click="toggleLockUser" class="mx-2" :icon="(viewUser.isActive) ? 'i-lucide-lock' : 'i-lucide-unlock'" :label="(viewUser.isActive) ? 'Lock user' : 'Unlock user'" color="neutral" variant="outline" />
                <UButton @click="openModal = false" class="mx-2" icon="i-lucide-x" label="Close" color="neutral" variant="outline" />
              </div>              
            </div>
            <div class="modal-header">
              <div v-if="!toggleUpdate">
                <span class="modal-header-name">{{ viewUser.name }}</span><br />
                <span class="modal-header-user">@{{ viewUser.username }}</span>
              </div>
              <div v-if="toggleUpdate">
                <span class="modal-header-name">Name: <UInput v-model="updatedUser.name" placeholder="Name" /></span><br />
                <span class="modal-header-user">Username: <UInput v-model="updatedUser.username" placeholder="Username" /></span>
              </div>
            </div>
            <div class="modal-info">
              <div class="modal-image">
                <img :src="getImageSrc('badgey_brad.png')" alt="User Image" />
                <div class="modal-text-view-text">
                  <div class="modal-text-view-text-header">Description:</div>
                  <div class="modal-text-view-text-info" v-if="!toggleUpdate">{{ viewUser.description }}</div>
                  <div class="modal-text-view-text-info" v-if="toggleUpdate">
                    <UTextarea v-model="updatedUser.description" placeholder="Description" rows="4" autoresize />
                  </div>
                </div>
              </div>
              <div class="modal-text-view" v-if="!toggleUpdate">
                <div class="modal-text-view-text">
                  <div class="modal-text-view-text-header">Company:</div>
                  <div class="modal-text-view-text-info">{{ viewUser.company || ' - ' }}</div>
                </div>
                <div class="modal-text-view-text">
                  <div class="modal-text-view-text-header">Type:</div>
                  <div class="modal-text-view-text-info">
                    <span v-if="viewUser.userType === '1'">Attendee</span>
                    <span v-else-if="viewUser.userType === '2'">Host</span>
                    <span v-else-if="viewUser.userType === '3'">Admin</span>
                    <span v-else>N/A</span>
                </div>
                <div class="modal-text-view-text">
                  <div class="modal-text-view-text-header">DOB:</div>
                  <div class="modal-text-view-text-info">{{ new Date(viewUser.dob).toLocaleDateString() || 'N/A' }}</div>
                </div>
                <div class="modal-text-view-text">
                  <div class="modal-text-view-text-header">Email:</div>
                  <div class="modal-text-view-text-info">{{ viewUser.email }}</div>
                </div>
                <div class="modal-text-view-text">
                  <div class="modal-text-view-text-header">Status:</div>
                  <div class="modal-text-view-text-info">{{ viewUser.isActive ? 'Active' : 'Locked' }}</div>
                </div>
                <div class="modal-text-view-text">
                  <div class="modal-text-view-text-header">Created Date:</div>
                  <div class="modal-text-view-text-info">{{ new Date(viewUser.createdAt).toLocaleDateString() }}</div>
                </div>
                <div class="modal-text-view-text">
                  <div class="modal-text-view-text-header">Last Login:</div>
                  <div class="modal-text-view-text-info">{{ viewUser.lastLogin ? new Date(viewUser.lastLogin).toLocaleString() : 'N/A' }}</div>
                </div>
            </div> 
          </div>
          <div class="modal-text-update" v-if="toggleUpdate">
            <div class="modal-text-view-text">
              <div class="modal-text-view-text-header">Company:</div>
              <div class="modal-text-view-text-info">
                <UInput v-model="updatedUser.company" placeholder="Company" />
              </div>
            </div>
            <div class="modal-text-view-text">
              <div class="modal-text-view-text-header">Type:</div>
              <div class="modal-text-view-text-info">
                <UInputMenu v-model="updatedUser.userType" :items="userTypeItems" value-key="value" />
            </div>
            <div class="modal-text-view-text">
              <div class="modal-text-view-text-header">DOB:</div>
              <div class="modal-text-view-text-info">
                <UInput v-model="updatedUser.dob" placeholder="mm/dd/yyyy" />
              </div>
            </div>
            <div class="modal-text-view-text">
              <div class="modal-text-view-text-header">Email:</div>
              <div class="modal-text-view-text-info">
                <UInput v-model="updatedUser.email" placeholder="Email" />
              </div>
            </div>
            <div class="modal-text-view-text">
              <div class="modal-text-view-text-header">Status:</div>
              <div class="modal-text-view-text-info">{{ updatedUser.isActive ? 'Active' : 'Locked' }}</div>
            </div>
            <div class="modal-text-view-text">
              <div class="modal-text-view-text-header">Created Date:</div>
              <div class="modal-text-view-text-info">{{ new Date(updatedUser.createdAt).toLocaleDateString() }}</div>
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
.users {
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
  padding-bottom: 10px;
}

.modal-text-view-text-header {
  font-weight: bold;
}

.modal-text-view-text-info {
  font-size: 16px;
}
</style>