<script setup>
import { defineProps, toRefs } from 'vue';

const props = defineProps({
    text: String
});
</script>

<template>
    <div class="features-section">
        <div class="features-section-text">
            {{ text }}
        </div>
    </div>
</template>

<style scoped>
.features-section {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 60px 20px;
  background: #ddd;
  z-index: 3;
}

.features-section-text {
  text-align: center;
  font-family: var(--badgey-text-header-font);
  font-size: var(--badgey-text-header-size);
  color: var(--badgey-black);
}
</style>