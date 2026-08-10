<script setup>
import { defineProps, toRefs } from 'vue';

const props = defineProps({
    title: String,
    text: String,
    imgSrc: String
});

const { imgSrc } = toRefs(props);
</script>

<template>
    <div class="features-list-item">
        <div class="features-list-item-text">
            <h3 class="features-list-item-text-title">{{ title }}</h3>
            <p class="features-list-item-text-description">{{ text }}</p>
        </div>
        <div class="features-list-item-image">
            <img :src="imgSrc" />  
        </div>
    </div>
</template>

<style scoped>
.features-list-item {
  flex: 1;
  display: flex;
  width: 80%;
  justify-content: space-between;
  align-items: center;
  margin: 50px 25px;
  padding: 20px 0 50px 0;
  border-bottom: 1px solid var(--badgey-black);
}

.features-list-item:last-child {
  border-bottom: none !important;
}


.features-list-item-text,
.features-list-item-image {
    flex: 1;
}

.features-list-item-text {
    flex-basis: 66%;
    font-size: 24px;
}

.features-list-item-text-title {
    font-weight: bold;
}

.features-list-item-text-description {
    opacity: 0.7;
}

.features-list-item-image {
    flex-basis: 33%;
}

.features-list-item img {
    max-height: 180px;
    margin: 20px auto;
}

@media all and (max-width: 1023px) {
    .features-list-item {
        flex-basis: calc(100% - 50px);
        flex-direction: column;
        padding-top: 0;
    }

    .features-list-item-text {
        flex-basis: 100%;
    }

    .features-list-item-image {
        width: 100%;
        order: -1;
    }
}
</style>
