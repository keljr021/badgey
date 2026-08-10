<script setup>
import FeaturesSection from './FeaturesSection.vue'
import FeaturesItem from './FeaturesItem.vue'
import { getImageSrc } from '../../assets/js/imgHelpers.js'

</script>

<template>
  <div>
    <FeaturesSection text="Share and create badges online" />

    <div class="features">
      <div class="features-list">
        <FeaturesItem 
          title="Create your own profile" 
          text="Customize your profile with a list of favorite badges." 
          :imgSrc="getImageSrc('feature1.png')" />

        <FeaturesItem 
          title="Collect badges" 
          text="Get badges from vendors using their QR Code or Badge ID." 
          :imgSrc="getImageSrc('feature2.png')" />

        <FeaturesItem 
          title="Show off your collection" 
          text="Share your profile with friends online." 
          :imgSrc="getImageSrc('feature3.png')" />

        <FeaturesItem 
          title="View your friends' profile" 
          text="Follow and view badges from your friends." 
          :imgSrc="getImageSrc('feature4.png')" />         
          
      </div>
    </div>

    <FeaturesSection text="Create badges for your next event" />


    <div class="features">
      <div class="features-list">
        <FeaturesItem 
          title="Create your own badge" 
          text="Create your own custom badge for your events." 
          :imgSrc="getImageSrc('feature5.png')" />

        <FeaturesItem 
          title="Create a company profile" 
          text="Share your profile with a list of created badges." 
          :imgSrc="getImageSrc('feature6.png')" /> 

        <FeaturesItem 
          title="Share your new badge online" 
          text="Share your QR and ID code with your attendees." 
          :imgSrc="getImageSrc('feature7.png')" />

      </div>
    </div>
    <div class="features-button">
      <UButton @click="$router.push({ name: 'login' })" color="neutral" variant="outline" size="xl" class="text-[var(--badgey-black)] hover:text-white p-3">Create an account</UButton>
    </div>
  </div>
</template>

<style scoped>
.features {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
  min-height: 100vh;
  margin: 0 auto;
  z-index: 2;
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
  flex-basis: 80%;
  width: 80%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  padding-bottom: 50px; 
}

.features-button {
  text-align: center;
  padding-bottom: 100px; 
  z-index: 2;
}

@media all and (max-width: 1023px) {
  .features {
    width: 90%;
  }
}
</style>
