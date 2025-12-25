<script setup>
import { getImageSrc } from '../assets/js/imgHelpers.js'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter();

const badgeId = ref('');

function submitCode() {
  console.log('claim badge id ', badgeId.value);
  router.push({ path: `/claim/${badgeId.value}` });
}
</script>

<template>
  <div class="redeem">
    <div class="redeem-title">Create badges</div>
    <div class="redeem-body">
      <div class="redeem-body-form">
        <UPageCard
            variant="solid"
            class="redeem-body-form-card border-none ring-0 bg-white text-[var(--badgey-black)]"
            reverse
        >
            <div class="redeem-body-form-card-title">Got an ID code? Enter here!</div>
            <div class="redeem-body-form-card-form">
              <UFormField size="lg" class="py-4 text-[var(--badgey-black)]" :ui="inputStyling" required>
                <UInput v-model="badgeId" class="w-full"/>
              </UFormField>
              <UFormField size="lg" class="py-4 text-[var(--badgey-black)]" :ui="inputStyling" required>
                <UButton @click="submitCode()" color="neutral" variant="outline" class="text-[var(--badgey-black)] hover:text-white">Submit code</UButton>
              </UFormField>
            </div>
        </UPageCard>
      </div>
      <div class="redeem-body-form">
        <UPageCard
            variant="solid"
            class="redeem-body-form-card border-none ring-0 bg-white text-[var(--badgey-black)]"
            reverse
        >
            <div class="redeem-body-form-card-title">Got a QR code?</div> 
            <div class="redeem-body-form-card-text py-2">
              Use your phone or tablet to scan the QR code.
            </div>
            <div class="redeem-body-form-card-image py-2">
              <img :src="getImageSrc('qr-code-89.png')" />
            </div> 
        </UPageCard>
      </div>
    </div>
  </div>
</template>

<style scoped>
.redeem {
  background-color: var(--badgey-light-white);
  width: 100%;
  padding: 50px;
  display: flex;
  flex-direction: column;
}

.redeem-title {
  flex: 1;
  font-family: var(--badgey-text-title-font);
  font-size: var(--badgey-text-title-size);
  padding-top: 20px;
  padding-bottom: 20px;
}

.redeem-body {
  flex: 1;
  flex-direction: row;
  display: flex;
}

.redeem-body-form {
  flex: 1;
  flex-basis: 50%;
  padding: 50px;
}

.redeem-body-form-card-title {
  font-family: var(--badgey-text-header-font);
  font-size: var(--badgey-text-header-size);
}

.redeem-body-form-card-image {
  text-align: center;
  margin: 0 auto;
}

.redeem-body-form-card-image img {
  height: 200px;
}

@media all and (max-width: 1023px) {
  .redeem {
    padding: 20px;
  }

  .redeem-body {
    flex-direction: column;
  }
  .redeem-body-form {
    width: 100%;
    padding: 20px 0;
  }
}
</style>
