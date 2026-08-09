<script setup>
import { getImageSrc } from '../../assets/js/imgHelpers.js'

</script>

<template>
  <img class="cta-bg" :src="getImageSrc('home-bg.png')" />
  <div style="position: relative; background: var(--badgey-green);">

    <div class="cta">
      <div class="cta-jumbo">
        An online souvenir of your best moments.
      </div>

      <div class="cta-caption">
        <b>Badgey</b> is an application to create, redeem, and share digital badges with your community.<br><br>
        Show off your journey here!<br><br>

        <UButton @click="$router.push({ name: 'login' })" color="neutral" variant="outline" size="xl" class="text-[var(--badgey-black)] hover:text-white p-3">Create an account today!</UButton>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cta {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  width: 50%;
  min-height: 100vh;
  margin: 0 auto;
  padding-bottom: 100px; 
  text-align: center;
  z-index: 2;
}

.cta-jumbo {
  flex: 1;
  flex-basis: 100%;
  padding: 50px 0;
  line-height: 140%;
  font-family: var(--badgey-text-title-font);
  font-size: var(--badgey-text-jumbo-size);
  color: var(--badgey-white);
}

.cta-caption {
  flex: 1;
  flex-basis: 100%;
  font-size: var(--badgey-text-header-size);
  color: var(--badgey-white);
  line-height: 48px;
  padding: 20px 0;
}

@media all and (max-width: 1023px) {
  .cta {
    width: 90%;
  }
}
</style>
