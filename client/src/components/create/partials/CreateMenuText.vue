<script setup>
import { ref, defineEmits, computed } from 'vue';

const emit = defineEmits(['close']);

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

      <UButton color="neutral" variant="ghost" size="md" icon="i-lucide-x" class="float-right" @click="emit('close')" />
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
          <UInputNumber :increment="{ size: 'sm' }" :decrement="{ size: 'sm' }" v-model="textSize" :min="1" icon="i-lucide-a-large-small" label="Size" />
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