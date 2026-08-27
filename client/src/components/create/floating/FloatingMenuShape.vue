<script setup>
import { defineEmits, toRefs, ref, computed } from 'vue'
import './floatingMenu.css'


const emit = defineEmits([]);

const props = defineProps({
  node: Object,
});

const { node } = toRefs(props);

const shapeWidth = ref(0);
const shapeHeight = ref(0);
const shapeSides = ref(0);
const shapeFillValue = ref('#000000');
const shapeFillColor = computed(() => ({ backgroundColor: shapeFillValue.value }));

const shapeStroke = ref(false);
const shapeStrokeWidth = ref(0);
const shapeStrokeFill = ref('#000000');

const shapeStrokeValue = ref('#000000');
const shapeStrokeColor = computed(() => ({ backgroundColor: shapeStrokeValue.value }));

</script>

<template>
  <div ref="menuRef" class="float-shape">
    <div class="float-shape-list">
      <div class="float-shape-list-item" :class="{ 'active': !node.sides || node.sides === 0 }">
        <div class="float-shape-list-item-icon"><UIcon name="i-lucide-circle" class="size-5" /></div>
        <div class="float-shape-list-item-text">Circle</div>
      </div> 
      <div class="float-shape-list-item" :class="{ 'active': node.sides && node.sides === 4 }">
        <div class="float-shape-list-item-icon"><UIcon name="i-lucide-square" class="size-5" /></div>
        <div class="float-shape-list-item-text">Rectangle</div>
      </div> 
      <div class="float-shape-list-item" :class="{ 'active': node.sides && node.sides !== 4 }">
        <div class="float-shape-list-item-icon"><UIcon name="i-lucide-octagon" class="size-5" /></div>
        <div class="float-shape-list-item-text">Polygon</div>
      </div> 
    </div>

    <div class="float-shape-menu">
      <div class="float-shape-menu-width">
        Width (px):
        <UInput v-model="shapeWidth" class="w-20 py-2" />
      </div>
      <div class="float-shape-menu-height">
        Height (px):
        <UInput v-model="shapeHeight" class="w-20 py-2" />
      </div>
      <div class="float-shape-menu-sides">
        Sides:
        <UInputNumber v-model="shapeSides" class="w-20 py-2" :increment="{ size: 'sm' }" :decrement="{ size: 'sm' }" :min="3" />

      </div>
      <div class="float-shape-menu-fill">
        Fill:
        <UPopover class="py-2">
          <UButton color="neutral" variant="outline" size="lg">
            <template #leading>
              <span :style="shapeFillColor" class="size-4 rounded-full" />
            </template>
            {{ shapeFillValue }}
          </UButton>

          <template #content>
            <UColorPicker v-model="shapeFillValue" @update:modelValue="" class="p-2" />
          </template>
        </UPopover>
      </div>
      <div class="float-shape-menu-stroke">
        <USwitch 
          class="w-50 py-2"
          v-model="shapeStroke" 
          @change="" 
          :items="borderStyles" 
          :default-value="false"
          value-key="value" 
          label="Add stroke" 
        />
      </div>
      <template v-if="shapeStroke === true">
        <div class="float-shape-menu-stroke-width">
          Stroke width:
          <UInput v-model="shapeStrokeWidth" class="w-20 py-2" />
        </div>
        <div class="float-shape-menu-stroke-color">
          Stroke color:
          <UPopover class="py-2">
            <UButton color="neutral" variant="outline" size="lg">
              <template #leading>
                <span :style="shapeStrokeColor" class="size-4 rounded-full" />
              </template>
              {{ shapeStrokeValue }}
            </UButton>
  
            <template #content>
              <UColorPicker v-model="shapeStrokeValue" @update:modelValue="" class="p-2" />
            </template>
          </UPopover>
        </div>
      </template>
    </div>
  </div>
</template>