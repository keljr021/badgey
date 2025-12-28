<script setup>
import { getImageSrc } from '../assets/js/imgHelpers.js'
import { useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'

const route = useRoute();

const badgeId = ref(route.params.badgeId);

function submitCode() {
  console.log('code ', badgeId, ' submitted.');
}

onMounted(() => {
  console.log('loading with badge ID: ' + badgeId);
});
</script>

<template>
  <div class="claim">
    <div class="claim-title">New badge!</div>
    <div class="claim-image">
      <img :src="getImageSrc('custom_badge3.png')" />
    </div>
    <div class="claim-info">
      <div class="claim-info-id">{{ badgeId }}</div>
      <div class="claim-info-name">Badge Name</div>
      <div>
        <div class="claim-info-company">Event Company</div>
        <div class="claim-info-date">Created 11/24/2025</div>
      </div>
    </div>
    <div class="claim-button">
      <UButton @click="submitCode()" size="xl" color="neutral" variant="outline" icon="i-lucide-badge-plus" class="text-[var(--badgey-black)] hover:text-white">Claim this badge</UButton>
    </div>
  </div>
</template>

<style scoped>
.claim {
  background-color: var(--badgey-light-white);
  width: 100%;
  padding: 50px;
  display: flex;
  align-items: center;
  flex-direction: column;
}

.claim-title {
  flex: 1;
  font-family: var(--badgey-text-title-font);
  font-size: var(--badgey-text-title-size);
  padding-top: 20px;
  padding-bottom: 20px;
}

.claim-image {
  width: 250px;
  height: 250px;
  margin: 20px auto;
}

.claim-image img {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
}

.claim-info {
  text-align: center;
}

.claim-info-id {
  padding-top: 10px;
  padding-bottom: 20px;
  font-size: 20px;
}

.claim-info-name {
  padding: 20px 0;
  font-size: 32px;
}

.claim-info-company {
  font-size: 28px;
}

.claim-info-date {
  padding-bottom: 20px;
  font-size: 28px;
  font-style: italic;
}

.claim-button {
  padding: 40px;
}
</style>
