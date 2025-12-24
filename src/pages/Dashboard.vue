<script setup>
import { ref } from 'vue' 
import DashOptions from '../components/DashOptions.vue'
import { getImageSrc } from '../assets/js/imgHelpers.js'

const showFollowers = ref(false);

function toggleFollowers() {
  showFollowers.value = !showFollowers.value;
}
</script>

<template>
  <div class="dash">
    <div class="dash-header py-4">
      <div class="dash-header-image">
        <img :src="getImageSrc('badgey_brad.png')" />
      </div>
      <div class="dash-header-text">
        <div class="dash-header-text-welcome">Welcome<br class="mobile" />Brad B. Badger</div>
        <div class="dash-header-text-last">Last login 12/01/2025</div>
      </div>
      <div class="dash-header-status">
        &nbsp;
      </div>
    </div>
    <div class="dash-options">
      <DashOptions 
        @click="toggleFollowers()" 
        icon="i-lucide-users" 
        title="View followers" 
        description="View who's following you, friends, and friend requests."/>

      <DashOptions 
        routeTo="/profile" 
        icon="i-lucide-square-user" 
        title="View profile" 
        description="View your current profile and customize to your liking."/>

      <DashOptions 
        routeTo="/badges/manage" 
        icon="i-lucide-badge" 
        title="Manage badges" 
        description="Organize your badges as you see fit."/>

      <DashOptions 
        routeTo="/settings" 
        icon="i-lucide-settings" 
        title="Go to settings" 
        description="View your account and profile settings."/>
    </div>
  </div>
</template>

<style scoped>
.dash {
  background-color: var(--badgey-light-green);
  width: 100%;
  padding: 50px 200px;
  display: flex;
  flex-direction: column;
}

.dash-header {
  flex: 1;
  display: flex;
  justify-content: flex-start;
  align-items: start;
}

.dash-header-image {
  flex: 1;
  flex-basis: 200px;
  width: 200px;
  height: 200px;
  margin: 20px;
}

.dash-header-image img {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
  object-position: top center;
  border-radius: 50%;
}

.dash-header-text {
  flex: 1;
  flex-basis: 50%;
}

.dash-header-text-welcome {
  font-family: var(--badgey-text-header-font);
  font-size: 40px;
}

.dash-header-text-last {
  font-size: 24px;
  font-style: italic;
}

.dash-header-status {
  flex: 1;
  flex-basis: 25%;
}

.dash-options {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 20px;
}

@media all and (max-width: 1023px) {
  .dash {
    justify-content: center;
    padding: 20px;
  }

  .dash-header {
    flex-direction: column;
    justify-content: center;
    text-align: center;
    align-items: center;
  }

  .dash-header-image {
    margin: 20px auto;
  }

  .dash-header-text {
    flex-basis: 100%;
  }

  .dash-options {
    flex-direction: column;
    padding: 10px;
  }
  
}
</style>
