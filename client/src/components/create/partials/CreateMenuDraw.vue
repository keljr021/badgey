<script setup>
import { ref, computed, defineEmits, watch } from 'vue';
import './../create.css'

const emit = defineEmits(['close', 'draft']);

const drawSize = ref(1);
const drawFillValue = ref('#000000')
const drawFillColor = computed(() => ({ backgroundColor: drawFillValue.value }));
const activeTool = ref('brush');

const setDrawColor = () => {
  emit('draw', drawFillColor.value);
};

const setActiveTool = (input) => {
  activeTool.value = input;
}
</script>

<template>
  <div class="create-menu-draw">
    <div class="create-menu-draw-header">
      Draw Options
    </div>
    <div class="create-menu-draw-list">
      <div class="create-menu-draw-list-item">
        <UInputNumber v-model="drawSize" @change="setBorderSize" class="w-25 mx-2" :increment="{ size: 'sm' }" :decrement="{ size: 'sm' }" :min="1" size="lg" />
      </div>
      <div class="create-menu-draw-list-item">
        <UPopover class="mb-8 mx-2">
          <UButton color="neutral" variant="outline" size="lg">
            <template #leading>
              <span :style="drawFillColor" class="size-4 rounded-full" />
            </template>
            Color
          </UButton>

          <template #content>
            <UColorPicker v-model="drawFillValue" @update:modelValue="setDrawColor" class="p-2" />
          </template>
        </UPopover>
      </div>
      <div class="create-menu-draw-list-icons">
        <UFieldGroup>
          <UTooltip text="Set brush tool">
            <UButton
              @click="setActiveTool('brush')" 
              icon="i-lucide-brush" 
              size="lg" 
              :color="activeTool === 'brush' ? 'success' : 'primary'" 
              variant="link" 
            />
          </UTooltip>
          <UTooltip text="Set eraser tool">
            <UButton 
              @click="setActiveTool('eraser')" 
              icon="i-lucide-eraser" 
              size="lg" 
              :color="activeTool === 'eraser' ? 'success' : 'primary'" 
              variant="link" 
            />
          </UTooltip>
        </UFieldGroup>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
