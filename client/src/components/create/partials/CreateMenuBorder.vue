<script setup>
import { ref, defineEmits, computed, watch } from 'vue'
import './../create.css'

const emit = defineEmits(['close', 'border']);

const borderStyles = ref([
  {
    label: 'None',
    value: 'none',
    icon: 'i-lucide-square-off'
  },
  {
    label: 'Dotted',
    value: 'dotted',
    icon: 'i-lucide-ellipsis'
  },
  {
    label: 'Dashed',
    value: 'dashed',
    icon: 'i-lucide-circle-dashed'
  },
  {
    label: 'Double',
    value: 'double',
    icon: 'i-lucide-equal'
  }
]);

const borderStylesValue = ref(borderStyles.value[0]?.value);
const borderSizeValue = ref(1);
const borderFillValue = ref('#000000');
const borderStrokeValue = ref('#000000');


const borderStylesIcon = computed(() => borderStyles.value.find(item => item.value === borderStylesValue.value)?.icon);

const borderFillColor = computed(() => ({ backgroundColor: borderFillValue.value }));
const borderStrokeColor = computed(() => ({ backgroundColor: borderStrokeValue.value }));

const setBorderStyle = () => {
  console.log('set border style: ', borderStylesValue.value);
  emit('border', { style: borderStylesValue.value });
};

const setBorderSize = () => {
  console.log('set border size: ', borderSizeValue.value);
  emit('border', { size: borderSizeValue.value })
};

const setBorderFill = () => {
  console.log('set border fill: ', borderFillValue.value);
  emit('border', { fill: borderFillValue.value })
};

const setBorderStroke = () => {
  console.log('set border stroke: ', borderStrokeValue.value);
  emit('border', { stroke: borderStrokeValue.value })
};
</script>

<template>
  <div class="create-menu-border">
    <div class="create-menu-border-header">
      Border
      <UButton color="neutral" variant="ghost" size="md" icon="i-lucide-x" class="float-right" @click="emit('close')" />
    </div>
    <div class="create-menu-border-header-menu">
      <div class="create-menu-border-header-menu-list">
        Style: 
        <USelect v-model="borderStylesValue" @change="setBorderStyle" :items="borderStyles" value-key="value" :icon="borderStylesIcon" class="w-30 mx-2" />
      </div>
      <div class="create-menu-border-header-menu-buttons">

        <div class="createmenu-border-header-menu-buttons-size">
          Size:
          <UInputNumber v-model="borderSizeValue" @change="setBorderSize" class="w-25 mx-2" :increment="{ size: 'sm' }" :decrement="{ size: 'sm' }" :min="1" />
        </div>

        <div class="createmenu-border-header-menu-buttons-color">
          <UPopover class="my-8 mx-2">
              <UButton color="neutral" variant="outline" size="lg">
                <template #leading>
                  <span :style="borderFillColor" class="size-4 rounded-full" />
                </template>
                Fill
              </UButton>
  
              <template #content>
                <UColorPicker v-model="borderFillValue" @update:modelValue="setBorderFill" class="p-2" />
              </template>
            </UPopover>
  
            <UPopover class="my-8 mx-2">
              <UButton color="neutral" variant="outline" size="lg">
                <template #leading>
                  <span :style="borderStrokeColor" class="size-4 rounded-full" />
                </template>
                Stroke
              </UButton>
  
              <template #content>
                <UColorPicker v-model="borderStrokeValue" @update:modelValue="setBorderStroke" class="p-2" />
              </template>
            </UPopover>
        </div>
      </div>
    </div>
  </div>
</template>
