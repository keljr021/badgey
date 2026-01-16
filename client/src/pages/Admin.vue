<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import PendingBadgesTable from '../components/admin/PendingBadgesTable.vue'
import BadgesTable from '../components/admin/BadgesTable.vue'
import UsersTable from '../components/admin/UsersTable.vue'


import { useUserStore } from './../store/user.js'

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
</script>

<template>
    <div class="admin">
        <div class="admin-title">Admin Page</div>
        <div class="admin-content">
          <UTabs :items="pageTabs" orientation="vertical" variant="link" size="xl" color="success" class="flex items-start">

            <template #pending>
              <div class="admin-content-tab flex flex-col">
                <div class="admin-content-tab-title">Pending badges</div>
                <div class="admin-content-tab-description">
                  Badges pending approval from Administrators before being published on site.
                </div>
                <div class="admin-content-tab-table">
                  <PendingBadgesTable />
                </div>

              </div>
            </template>
            <template #badges>
              <div class="admin-content-tab flex flex-col">
                <div class="admin-content-tab-title">Badges</div>
                <div class="admin-content-tab-description">
                  Collection of all badges in the application.
                </div>
                <div class="admin-content-tab-table">
                  <BadgesTable />
                </div>
              </div>
            </template>
            <template #users>
              <div class="admin-content-tab flex flex-col">
                <div class="admin-content-tab-title">Users</div>
                <div class="admin-content-tab-description">
                  Collection of all users in the application.
                </div>
                <div class="admin-content-tab-table">
                  <UsersTable />
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
  font-size: var(--badgey-text-title-size);
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
  padding: 20px;
}

.admin-content-tab-title {
  font-size: 28px;
  font-weight: bold;
  padding-bottom: 10px;
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
