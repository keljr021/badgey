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
        <UPageCard
            :title="title"
            :description="text"
            icon="i-simple-icons-tailwindcss"
            :ui="{
                body: {
                    base: 'border-none'
                },
                ring: 'ring-0',
                title: 'text-[var(--badgey-black)]',
            }"
            spotlight
            reverse
        >
            <img :src="imgSrc" />
        </UPageCard>
    </div>
</template>

<style scoped>
.features-list-item {
  flex: 1;
  flex-basis: calc(50% - 50px);
  margin: 50px 25px;
}

.features-list-item img {
    max-height: 180px;
    margin: 0 auto;
}
</style>
