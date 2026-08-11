<script setup>
import { ref, computed } from 'vue';

const textValue = ref('');
const textSize = ref(16);
const textColor = ref('#000000');

const textButtonBold = ref(false);
const textButtonItalic = ref(false);
const textButtonUnderline = ref(false);

const chipColor = computed(() => ({ backgroundColor: textColor.value }));

const toggleButton = (button) => {
  console.log(`Toggling button: ${button}`);
  switch (button) {
    case 'bold':
      textButtonBold.value = !textButtonBold.value;
      break;
    case 'italic':
      textButtonItalic.value = !textButtonItalic.value;
      break;
    case 'underline':
      textButtonUnderline.value = !textButtonUnderline.value;
      break;
  }
};

</script>

<template>
  <div class="create-menu-text">
    <div class="create-menu-text-header">
      Text
    </div>
    <div class="create-menu-text-content">
      <div class="create-menu-text-content-text">
        <UInput v-model="textValue" placeholder="New text..." size="lg" />
      </div>
      <div class="create-menu-text-content-menu">
        <div class="create-menu-text-content-menu-buttons">
          <UFieldGroup>
            <UButton color="neutral" variant="outline" size="md" icon="i-lucide-bold" :class="{ 'active': textButtonBold }" @click="toggleButton('bold')" />
            <UButton color="neutral" variant="outline" size="md" icon="i-lucide-italic" :class="{ 'active': textButtonItalic }" @click="toggleButton('italic')" />
            <UButton color="neutral" variant="outline" size="md" icon="i-lucide-underline" :class="{ 'active': textButtonUnderline }" @click="toggleButton('underline')" />
          </UFieldGroup>
        </div>
        <div class="create-menu-text-content-menu-size">
          <UInputNumber v-model="textSize" :min="1" icon="i-lucide-a-large-small" label="Size" />
        </div>
        <div class="create-menu-text-content-menu-color">
          <UPopover>
            <UButton color="neutral" variant="outline" size="xl">
              <template #leading>
                <span :style="chipColor" class="size-4 rounded-full" />
              </template>
            </UButton>

            <template #content>
              <UColorPicker v-model="textColor" class="p-2" />
            </template>
          </UPopover>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.create-menu-text {
    position: absolute;
    top: 180px;
    left: 100px;
    min-width: 350px;
    min-height: 100px;
    padding: 20px;
    background-color: #fff;
    box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
}

.create-menu-text-header {
  font-weight: 600;
  padding: 15px 0;
}

.create-menu-text-content-text {
  width: 100%;
}

.create-menu-text-content-menu {
  display: flex;
  flex-direction: row;
  gap: 10px;
}

.create-menu-text-content-menu-size, 
.create-menu-text-content-menu-color, 
.create-menu-text-content-menu-buttons {
  flex: 1;
  flex-basis: 33%;
  padding: 15px 0;
}

.create-menu-text-content-menu-buttons button {
  opacity: 0.5;
}

.create-menu-text-content-menu-buttons button:hover {
  opacity: 0.8;
}

.create-menu-text-content-menu-buttons .active {
  opacity: 1;
}
</style>
