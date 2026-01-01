<script setup>
import { getImageSrc } from '../../assets/js/imgHelpers.js'
import { defineProps, ref } from 'vue'

const props = defineProps({
    image: String,
    name: String,
});

const open = ref(false);

function toggleModal(input) {
    open.value = input;
}

function clickBadge() {
    console.log('profile badge clicked.');
    toggleModal(true);
}

</script>

<template>
    <UModal 
        v-model:open="open"
        :ui="{ 
            content: 'w-full h-full px-2 py-2 sm:max-w-4xl sm:px-8 sm:py-4', 
            header: 'border-0 sm:px-0',
            body: 'border-0 px-8 py-4', 
            footer: 'justify-center' 
        }">
        <div class="badge" @click="clickBadge()">
            <div class="badge-image"><img :src="getImageSrc(image)" /></div>
            <div class="badge-name">{{ name }}</div>
        </div>

        <template #body>
            <div class="badge-modal">
                <div class="badge-modal-image pb-4">
                    <img :src="getImageSrc(image)" />
                </div>
                <div class="badge-modal-text">
                    <div class="badge-modal-text-section py-4">
                        <div class="badge-modal-text-section-title">
                            {{ name }}
                        </div>
                        <div class="badge-modal-text-section-date py-2">
                            Obtained December 5, 2025
                        </div>
                    </div>
                    <div class="badge-modal-text-section-info">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce et interdum arcu. Etiam neque purus, facilisis non nisl et, facilisis egestas lorem. Donec sed eros eget ipsum euismod fringilla interdum a risus. Duis dapibus id ex at mollis. 
                    </div>
                </div>
            </div>
        </template>

        <template #footer>
            <div class="mobile flex justify-center">
                <UButton size="xl" icon="i-lucide-x" label="Close" color="neutral" variant="outline" @click="toggleModal(false)" />
            </div>
        </template>
    </UModal>
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

.badge-modal {
    display: flex;
    justify-content: center;
    flex-direction: column;
}

.badge-modal-image {
    flex: 1;
    margin: 0 auto;
}

.badge-modal-image img {
    width: 157px;
}

.badge-modal-text {
    flex: 1;
    width: 50%;
    margin: 0 auto;
}

.badge-modal-text-section {
    padding-bottom: 20px;
    text-align: center;
}

.badge-modal-text-section-title {
    font-size: 24px;
}

@media all and (max-width: 1023px) {
    .badge-image {
        width: 75px;
        height: 75px;
    }

    .badge-modal-text {
        width: 90%;
    }
}
</style>