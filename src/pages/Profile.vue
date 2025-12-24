<script setup>
import { getImageSrc } from '../assets/js/imgHelpers.js'
import { ref } from 'vue'
import BadgeItem from '../components/badges/BadgeItem.vue'

const items = ref(['Backlog', 'Todo', 'In Progress', 'Done']);

function handleClick() {
  console.log('badge clicked.');
}

</script>

<template>
  <div class="profile">
    <div class="profile-header">
      <div class="profile-header-image">
        <img :src="getImageSrc('badgey_brad.png')" />
      </div>
      <div class="profile-header-text">
        <div class="profile-header-text-name">Brad B. Badger</div>
        <div class="profile-header-text-user">@badgey_brad</div>
        <div class="profile-header-text-follow">
          <div class="profile-header-text-followers">3 Followers</div>
          <div class="profile-header-text-following">12 Following</div>
        </div>
        <div class="profile-header-text-about">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce et interdum arcu. Etiam neque purus, facilisis non nisl et, facilisis egestas lorem.
        </div>
      </div>
    </div>

    <div class="profile-top">
      <div class="profile-top-header">Top badges</div>
      <div class="profile-top-badges">
        <BadgeItem :image="'custom_badge1.png'" name="Custom Badge 1" @handleClick="handleClick"/>
        <BadgeItem :image="'custom_badge2.png'" name="Custom Badge 2" @handleClick="handleClick"/>
        <BadgeItem :image="'custom_badge3.png'" name="Custom Badge 3" @handleClick="handleClick"/>
      </div>
    </div>

    <div class="profile-list">
      <div class="profile-list-sort">
        <USelect class="w-48" :items="items" placeholder="Sort by..." />
      </div>
      <div class="profile-list-badges">
        <template v-for="i in 3" :key="i">
          <BadgeItem :image="'custom_badge1.png'" name="Custom Badge 1" @handleClick="handleClick"/>
          <BadgeItem :image="'custom_badge2.png'" name="Custom Badge 2" @handleClick="handleClick"/>
          <BadgeItem :image="'custom_badge3.png'" name="Custom Badge 3" @handleClick="handleClick"/>
        </template>
      </div>
    </div>

  </div>
</template>

<style scoped>
.profile {
  background-color: var(--badgey-white);
  width: 100%;
  padding: 50px 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.profile-header {
  flex: 1;
  display: flex;
  justify-content: flex-start;
  align-items: start;
}

.profile-header-image {
  flex: 1;
  width: 200px;
  height: 200px;
  margin: 20px;
}

.profile-header-image img {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
  object-position: top center;
  border-radius: 50%;
}

.profile-header-text {
  flex: 1;
  flex-basis: 50%;
}

.profile-header-text-name {
  font-size: 36px;
}

.profile-header-text-user {
  font-size: 24px;
}

.profile-header-text-follow {
  display: inline-block;
  padding: 10px 0;
}

.profile-header-text-followers,
.profile-header-text-following {
  float: left;
  margin-right: 10px;
  font-size: 20px;
  font-style: italic;
  opacity: 0.75; 
}

.profile-top {
  flex: 1;
  width: 100%;
  padding: 20px 0;
}

.profile-top-header {
  font-size: var(--badgey-text-subheader-size);
}

.profile-top-badges {
  background-color: white;
  padding: 20px;
  margin: 20px 0;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}

.profile-list {
  flex: 1;
  width: 100%;
  padding: 20px 0;
}

.profile-list-sort {
  text-align: right;
}

.profile-list-badges {
  background-color: #fff;
  width: 100%;
  padding: 20px;
  margin: 20px 0;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}

@media all and (max-width: 1023px) {
  .profile {
    flex-direction: column;
  }

  .profile-header-image {
    width: 85px;
    height: 85px;
  }

}
</style>
