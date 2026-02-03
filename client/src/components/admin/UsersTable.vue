<script setup>
import ChangePasswordModal from '../ChangePasswordModal.vue' 
import { getImageSrc } from '../../assets/js/imgHelpers.js'
import { defineEmits, ref, h, onMounted } from 'vue'

import { useUserStore } from '../../store/user.js'

const userStore = useUserStore();

const emits = defineEmits(['update-count']);

const openModal = ref(false);
const tableData = ref(null);
const totalUsers = ref(0);

const viewUser = ref(null);
const updatedUser = ref(null);
const toggleUpdate = ref(false);
const togglePassword = ref(false);

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
    cell: ({ row }) => row.original.isLocked ? 'Locked' : 'Active',
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
      const isUserActive = row.original.isLocked === false;
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
            viewUser.value = row.original;
            updatedUser.value = row.original;
            toggleLockUser();
          }
        }, lockOrUnlockLabel)
      ]);
    },
  },
];

async function saveUser() {
  console.log(' - SaveUser triggered.');
  await userStore.modifyUser(viewUser.value.id, {
    name: updatedUser.value.name,
    username: updatedUser.value.username,
    company: updatedUser.value.company,
    userType: updatedUser.value.userType,
    description: updatedUser.value.description,
    dob: updatedUser.value.dob,
    email: updatedUser.value.email,
    isLocked: updatedUser.value.isLocked,
  });
  await refreshTable();
  toggleUpdate.value = false;
}

async function toggleLockUser() {
  updatedUser.value.isLocked = !updatedUser.value.isLocked;
  updatedUser.value = updatedUser.value;
  console.log (' -- updatedUser.isLocked: ', updatedUser.value.isLocked);
  await saveUser();
}

async function removeUser() {
  if (window.confirm("Delete this user? " + viewUser.value.name)) {
    console.log('User ', viewUser.value.id, ' deleted.');
    await userStore.removeUser(viewUser.value.id);
    await refreshTable(); 
    openModal.value = false;
  }
}

async function refreshTable() {
  await userStore.fetchAllUsers()
  tableData.value = userStore.users;
  totalUsers.value = tableData.value.length;
  emits('update-count', 'users', totalUsers.value);
  console.log('Users: ', userStore.users);
}

function showPasswordModal(input) {
  togglePassword.value = input;

  if (input === false)
    toggleUpdate.value = false;
}

onMounted(async () => {
  await refreshTable();
})
</script>

<template>
    <div class="users">
      <UButton @click="$router.push('/login')" variant="outlined" color="neutral" icon="i-lucide-user-plus" class="text-sm bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded mx-2">Create User</UButton>

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
                <UButton @click="showPasswordModal(true)" class="mx-2" icon="i-lucide-rectangle-ellipsis" label="Change Password" color="neutral" variant="outline" />
                <UButton @click="toggleUpdate = true" class="mx-2" icon="i-lucide-user-pen" label="Update user" color="neutral" variant="outline" />
                <UButton @click="toggleLockUser" class="mx-2" :icon="(viewUser.isLocked) ? 'i-lucide-unlock' : 'i-lucide-lock'" :label="(viewUser.isLocked) ? 'Unlock user' : 'Lock user'" color="neutral" variant="outline" />
                <UButton @click="removeUser" class="mx-2" icon="i-lucide-user-round-x" label="Remove user" color="neutral" variant="outline" />      
                <UButton @click="openModal = false" class="mx-2" icon="i-lucide-x" label="Close" color="neutral" variant="outline" />
              </div>
              <div class="modal-options-update" v-if="toggleUpdate">
                <UButton @click="toggleUpdate = false" class="mx-2" icon="i-lucide-eye" label="View user" color="neutral" variant="outline" />
                <UButton @click="saveUser" class="mx-2" icon="i-lucide-save" label="Save user" color="neutral" variant="outline" />
                <UButton @click="toggleLockUser" class="mx-2" :icon="(viewUser.isLocked) ? 'i-lucide-unlock' : 'i-lucide-lock'" :label="(viewUser.isLocked) ? 'Unlock user' : 'Lock user'" color="neutral" variant="outline" />
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
                    <UTextarea v-model="updatedUser.description" class="w-full" placeholder="Description" rows="4" autoresize />
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
                  <div class="modal-text-view-text-info">{{ viewUser.isLocked ? 'Locked' : 'Active' }}</div>
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
              <div class="modal-text-view-text-info">{{ updatedUser.isLocked ? 'Locked' : 'Active' }}</div>
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

    <change-password-modal :showModal="togglePassword" @toggle-modal="showPasswordModal" />
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