<script setup>
import { ref } from 'vue'
import ManageBadgeItem from '../components/badges/ManageBadgeItem.vue'

const pageTabs = ref([
  {
    label: 'Obtained badges',
    slot: 'obtained'
  },
  {
    label: 'Badges you created',
    slot: 'created'
  }
]);

const items = ref(['Backlog', 'Todo', 'In Progress', 'Done']);

function handleClick() {
  console.log('badge clicked.');
}

</script>

<template>
  <div class="manage">
    <div class="manage-title">Manage badges</div>
    <div class="manage-sort">
      <USelect class="w-48" :items="items" placeholder="Sort by..." />
    </div>
    <div class="manage-body">
      <UTabs :items="pageTabs" variant="link" size="xl" color="success">
        <template #obtained>
            <div class="manage-body-badges">
               <template v-for="i in 5" :key="i">
                <ManageBadgeItem :image="'custom_badge1.png'" name="Custom Badge 1" @handleClick="handleClick"/>
                <ManageBadgeItem :image="'custom_badge2.png'" name="Custom Badge 2" @handleClick="handleClick"/>
                <ManageBadgeItem :image="'custom_badge3.png'" name="Custom Badge 3" @handleClick="handleClick"/>
              </template>
            </div>
          </template>

          <template #created>
            <div class="manage-body-badges">
               <template v-for="i in 3" :key="i">
                <ManageBadgeItem :image="'custom_badge1.png'" name="Custom Badge 1" @handleClick="handleClick"/>
                <ManageBadgeItem :image="'custom_badge2.png'" name="Custom Badge 2" @handleClick="handleClick"/>
                <ManageBadgeItem :image="'custom_badge3.png'" name="Custom Badge 3" @handleClick="handleClick"/>
              </template>
            </div>
          </template>
        </UTabs>
    </div>
  </div>
</template>

<style scoped>
.manage {
  background-color: var(--badgey-white);
  width: 100%;
  padding: 50px;
  display: flex;
  flex-direction: column;
}

.manage-title {
  flex: 1;
  font-family: var(--badgey-text-title-font);
  font-size: var(--badgey-text-title-size);
  padding-top: 20px;
  padding-bottom: 80px;
}

.manage-sort {
  flex: 1;
  width: 100%;
  padding: 20px 0;
  text-align: right;
}

.manage-body {
  padding: 20px;
}

.manage-body-badges {
  background-color: #fff;
  width: 100%;
  padding: 20px;
  margin: 20px 0;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
}

@media all and (max-width: 1023px) {
  .manage {
    padding: 20px;
  }
}
</style>