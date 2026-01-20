<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import PendingBadgesTable from '../components/admin/PendingBadgesTable.vue'
import BadgesTable from '../components/admin/BadgesTable.vue'
import UsersTable from '../components/admin/UsersTable.vue'


import { useUserStore } from './../store/user.js'

const pendingBadgesTotal = ref(0);
const badgesTotal = ref(0);
const usersTotal = ref(0);

const pageTabs = ref([
  {
    label: 'Pending badges',
    slot: 'pending',
    icon: 'i-lucide-badge-question-mark'
  },
  {
    label: 'Badges',
    slot: 'badges',
    icon: 'i-lucide-badge'
  },
  {
    label: 'Users',
    slot: 'users',
    icon: 'i-lucide-users'
  },
]);

function updateTableCount(type, number) {
  switch(type) {
    case 'pending':
      pendingBadgesTotal.value = number;
      break;
    case 'badges':
      badgesTotal.value = number;
      break;
    case 'users':
      usersTotal.value = number;
      break;
  }
};
</script>

<template>
    <div class="admin">
        <div class="admin-title">Admin Page</div>
        <div class="admin-content">
          <UTabs :items="pageTabs" orientation="vertical" variant="link" size="xl" color="success" class="flex items-start">

            <template #pending>
              <div class="admin-content-tab flex flex-col">
                <div class="admin-content-tab-title">
                  Pending badges 
                  <span class="admin-content-tab-title-count">({{ pendingBadgesTotal }})</span>
                </div>
                <div class="admin-content-tab-table">
                  <PendingBadgesTable @update-count="updateTableCount" />
                </div>

              </div>
            </template>
            <template #badges>
              <div class="admin-content-tab flex flex-col">
                <div class="admin-content-tab-title">
                  Badges
                  <span class="admin-content-tab-title-count">({{ badgesTotal }})</span>
                </div>
                <div class="admin-content-tab-table">
                  <BadgesTable @update-count="updateTableCount" />
                </div>
              </div>
            </template>
            <template #users>
              <div class="admin-content-tab flex flex-col">
                <div class="admin-content-tab-title">
                  Users
                  <span class="admin-content-tab-title-count">({{ usersTotal }})</span>
                </div>
                <div class="admin-content-tab-table">
                  <UsersTable @update-count="updateTableCount" />
                </div>
              </div>
            </template>
          </UTabs>
        </div>
    </div>
</template>

<style scoped>
.admin {
  background-color: var(--badgey-white);
  width: 100%;
  padding: 20px;
}

.admin-title {
  font-size: var(--badgey-text-subheader-size);
  padding-bottom: 30px;
}

.admin-content {
  width: 100%;
  padding-top: 20px;
}

.admin-content-tab {
  background-color: var(--badgey-light-gray);
  width: 100%;
  height: 500px;
  padding: 0 20px;
}

.admin-content-tab-title {
  font-size: 28px;
  font-weight: bold;
  padding-bottom: 5px;
}

.admin-content-tab-title-count {
  font-size: 18px;
  font-weight: normal;
  margin-left: 5px;
  color: var(--badgey-text-secondary-color);
}

.admin-content-tab-description {
  font-size: 18px;
}

.admin-content-tab-table {
  padding-top: 25px;
  max-height: 400px;
  overflow-y: auto;
}
</style>
