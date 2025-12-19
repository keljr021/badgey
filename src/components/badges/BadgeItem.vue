<script setup>
import { getImageSrc } from '../../assets/js/imgHelpers.js'
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
    image: String,
    name: String,
});

const emit = defineEmits([ 'handleClick' ]);

function clickBadge() {
    emit('handleClick');
}

</script>

<template>
    <div class="badge" @click="clickBadge()">
        <div class="badge-image"><img :src="getImageSrc(image)" /></div>
        <div class="badge-name">{{ name }}</div>
    </div>
</template>

<style scoped>
.badge {
    flex: 1;
    flex-basis: calc(33% - 50px);
    border-radius: 10%;
    margin: 20px 10px;
    padding: 10px;
    text-align: center;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
}

.badge:hover {
    font-weight: bold;
    background-color: rgb(226, 243, 241, 0.25);
}

.badge-image {
  width: 145px;
  height: 145px;
  margin: 20px auto;
}

.badge-image img {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
}

.badge-text {
    font-size: 20px;
} 
</style>