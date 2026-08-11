<script setup>
import { ref, defineEmits, computed } from 'vue'

const emit = defineEmits(['close']);

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
        <USelect v-model="borderStylesValue" :items="borderStyles" value-key="value" :icon="borderStylesIcon" class="w-30 mx-2" />
      </div>
      <div class="create-menu-border-header-menu-buttons">

        <div class="createmenu-border-header-menu-buttons-size">
          Size:
          <UInputNumber class="w-25 mx-2" :increment="{ size: 'sm' }" :decrement="{ size: 'sm' }" v-model="borderSizeValue" :min="1" />
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
                <UColorPicker v-model="borderFillValue" class="p-2" />
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
                <UColorPicker v-model="borderStrokeValue" class="p-2" />
              </template>
            </UPopover>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.create-menu-border {
    position: absolute;
    top: 130px;
    left: 100px;
    min-width: 350px;
    min-height: 100px;
    padding: 20px;
    border-radius: 10px;
    background-color: #fff;
    box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
}

.create-menu-border-header {
  font-weight: 600;
  padding: 15px 0;
}

.create-menu-border-header-menu-list,
.create-menu-border-header-menu-buttons {
  padding: 15px 0;
}

.create-menu-border-header-menu-buttons-size,
.create-menu-border-header-menu-buttons-color {
  padding: 15px 0;
  margin: 0 auto;
}

</style>
