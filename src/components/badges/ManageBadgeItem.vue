<script setup>
import { getImageSrc } from '../../assets/js/imgHelpers.js'
import { isOnMobile } from '../../assets/js/screenHelpers.js'
import { defineProps, defineEmits, ref } from 'vue'

const props = defineProps({
    image: String,
    name: String,
});

const open = ref(false);

function toggleModal(input) {
    open.value = input;
}

function clickBadge() {
    toggleModal(true);
}

function updateBadge() {
    toggleModal(false);
    console.log('update badge button clicked.')
}

</script>

<template>
    <UModal 
        :fullscreen="isOnMobile"
        v-model:open="open"
        :title="name" 
        :ui="{ 
            content: 'max-w-4xl px-8 py-4', 
            header: 'border-0 sm:px-0',
            body: 'border-0 px-8 py-4', 
            footer: 'justify-center' 
        }">
        <div class="badge" @click="clickBadge()">
            <div class="badge-image"><img :src="getImageSrc(image)" /></div>
            <div class="badge-name">{{ name }}</div>
        </div>

        <template #header>
            <div class="badge-modal-header">
                <div class="badge-modal-header-title">{{ name }}</div>
                <div class="badge-modal-header-close">
                    <UButton class="mx-4" color="white" size="lg" icon="i-lucide-x" @click="toggleModal()" />
                </div>
            </div>
        </template>

        <template #body>
            <div class="badge-modal">
                <div class="badge-modal-image">
                    <img :src="getImageSrc(image)" />
                </div>
                <div class="badge-modal-text">
                    <div class="badge-modal-text-section">
                        <div class="badge-modal-text-section-title">Description:</div>
                        <div class="badge-modal-text-section-info">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce et interdum arcu. Etiam neque purus, facilisis non nisl et, facilisis egestas lorem. Donec sed eros eget ipsum euismod fringilla interdum a risus. Duis dapibus id ex at mollis. 
                        </div>
                    </div>
                    <div class="badge-modal-text-section">
                        <div class="badge-modal-text-section-title">Created by:</div>
                        <div class="badge-modal-text-section-info">
                            John Doe 
                        </div>
                    </div>
                    <div class="badge-modal-text-section">
                        <div class="badge-modal-text-section-title">Badge created:</div>
                        <div class="badge-modal-text-section-info">
                            December 5, 2025
                        </div>
                    </div>
                </div>
            </div>
        </template>

         <template #footer>
            <UButton class="mx-4" size="lg" icon="i-lucide-square-pen" label="Update Badge" color="neutral" variant="outline" @click="updateBadge()" />
            <UButton class="mx-4" size="lg" icon="i-lucide-badge-minus" label="Delete Badge" color="neutral" variant="outline" @click="toggleModal(false)" />
        </template>
    </UModal>
</template>

<style scoped>
.badge {
    flex: 1;
    flex-basis: calc(20% - 50px);
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

.badge-modal {
    display: flex;
}

.badge-modal-header {
    display: flex;
    width: 100%;
    justify-content: space-between;
}

.badge-modal-header-title {
    flex: 1;
    font-size: var(--badgey-text-subheader-size) !important;
    font-weight: normal;
}

.badge-modal-header-close {
    flex: 1;
    text-align: right;
}

.badge-modal-image {
    flex: 1;
}

.badge-modal-image img {
    width: 157px;
    text-align: center;
}

.badge-modal-text {
    flex: 2;
}

.badge-modal-text-section {
    padding-bottom: 20px;
}

.badge-modal-text-section-title {
    font-weight: bold;
}

@media all and (max-width: 1023px) {
    .badge {
        flex-basis: calc(50% - 10px);
        padding: 10px 5px;
        margin: 20px 5px;
    }

    .badge-image {
        width: 75px;
        height: 75px;
    }
}
</style>