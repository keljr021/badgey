<script setup>
import FeaturesItem from './FeaturesItem.vue'

function getImageSrc(input) {
     return new URL(`../../assets/img/${input}`, import.meta.url).href;
}
</script>

<template>
  <div>
    <div class="features">
      <div class="features-title">
        Collect digital badges
      </div>

      <div class="features-list">
        <FeaturesItem 
          title="Your profile, your collection" 
          text="Customize your profile with a list of your favorite badges." 
          :imgSrc="getImageSrc('feature1.png')" />

        <FeaturesItem 
          title="Collect badges" 
          text="Get your own badge from a QR Code or badge ID." 
          :imgSrc="getImageSrc('feature2.png')" />

        <FeaturesItem 
          title="Create your own badge" 
          text="Create your own custom badge for your events." 
          :imgSrc="getImageSrc('feature3.png')" />

        <FeaturesItem 
          title="Share online" 
          text="Share your QR or ID code with your attendees" 
          :imgSrc="getImageSrc('feature4.png')" />         
          
      </div>

      <div class="features-button">
        <UButton @click="$router.push({ name: 'login' })" color="neutral" variant="outline" size="xl" class="text-[var(--badgey-black)] hover:text-white p-3">Create an account</UButton>
      </div>
    </div>
  </div>
</template>

<style scoped>
.features {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  width: 60%;
  min-height: 100vh;
  margin: 0 auto;
}
.features-title {
  position: abosolute;
  flex: 1;
  flex-basis: 100%;
  padding-top: 50px;
  padding-bottom: 100px;
  font-family: var(--badgey-text-title-font);
  font-size: var(--badgey-text-title-size);
  color: var(--badgey-black);
  text-align: center;
}

.features-list {
  flex: 1;
  flex-basis: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: stretch;
  padding-bottom: 50px; 
}

.features-button {
  padding-bottom: 100px; 
}

@media all and (max-width: 1023px) {
  .features {
    width: 80%;
  }
}
</style>
