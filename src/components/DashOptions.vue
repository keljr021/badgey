<script setup>
import { useRouter } from 'vue-router'
import { defineProps, toRefs } from 'vue'

const props = defineProps({
    icon: String,
    title: String,
    description: String,
    routeTo: String,
});

const { routeTo } = toRefs(props);
const router = useRouter();

function handleLink() {
    if (routeTo.value) router.push(routeTo.value);
}
</script>

<template>
  <div class="optionsitem px-8 py-3">
    <UPageCard 
        @click="handleLink()"
        orientation="vertical" 
        color="primary"
        :ui="{
            leadingIcon: 'text-green-500'
        }"
        :icon="icon" 
        :title="title" 
        :description="description"
        />
  </div>
</template>

<style scoped>
.optionsitem {
    flex: 1;
    flex-basis: 50%;
    cursor: pointer;
}
</style>
