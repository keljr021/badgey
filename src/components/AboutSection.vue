<script setup>
import { getImageSrc } from '../assets/js/imgHelpers.js'
import { defineProps } from 'vue'

const props = defineProps({
    title: String,
    image: String,
});

</script>

<template>
  <div class="about-section">
    <div class="about-section-title">{{ title }}</div>
    <div class="about-section-text">
        <slot></slot>
    </div>
    <div class="about-section-image">
        <img :src="getImageSrc(image)" />
    </div>      
  </div>
    
</template>

<style scoped>
.about-section {
  width: 100%;
  padding: 50px;
  display: flex;
  flex-wrap: wrap;
}

.about-section-title {
    flex: 1;
    flex-basis: 100%;
    justify-content: space-evenly;
    font-family: var(--badgey-text-header-font);
    font-size: var(--badgey-text-header-size);
}

.about-section-text {
    flex: 1;
    flex-basis: 50%;
    font-size: 24px;
    padding: 30px 0;
}

.about-section-image {
    flex: 1;
    flex-basis: 50%;
}

.about-section-image img {
  height: 400px;
  margin: 0 auto;
}

</style>
