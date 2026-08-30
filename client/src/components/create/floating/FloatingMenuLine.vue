<script setup>
import { ref, defineEmits, toRefs, computed, onMounted } from 'vue'

const emit = defineEmits(['update:line', 'delete']);

const props = defineProps({
  node: Object,
});

const { node } = toRefs(props);

const menuRef = ref(null);
const lineWidth = ref(0);
const lineStrokeWidth = ref(0);

const lineFillValue = ref('#f92a2a');
const lineFillColor = computed(() => ({ backgroundColor: lineFillValue.value }));

const updateLine = (input) => {
  if (input === 'width') {
    let newPoints = node.value.attrs.points;
    newPoints[2] = node.value.attrs.points[0] + lineWidth.value;
    emit('update:line', { konvaValues: { points: newPoints }})
  }

  if (input === 'stroke') {
    emit('update:line', { konvaValues: { strokeWidth: lineStrokeWidth.value } });
  }

  if (input === 'fill')
    emit('update:line', { konvaValues: { stroke: lineFillValue.value } });
}

const setValues = () => {
  lineWidth.value = node.value.attrs.points[2] - node.value.attrs.points[0];
  lineStrokeWidth.value = node.value.attrs.strokeWidth;
  lineFillValue.value = node.value.attrs.stroke;
}

onMounted(() => {
  setValues();
})
</script>

<template>
  <div ref="menuRef" class="float-line">
    <div class="float-line-menu">
      <div class="float-line-menu-width">
        Width (px): <br />
        <UInputNumber v-model="lineWidth" @update:modelValue="updateLine('width')" orientation="vertical" class="w-20 py-2" :min="1" :increment="false" :decrement="false" />
      </div>
      <div class="float-line-menu-stroke">
        Stroke width (px): <br />
        <UInputNumber v-model="lineStrokeWidth" @update:modelValue="updateLine('stroke')" orientation="vertical" class="w-20 py-2" :min="1" :increment="false" :decrement="false" />
      </div>
    </div>
    <div class="float-line-menu-fill">
        Fill: <br />
        <UPopover class="py-2">
          <UButton color="neutral" variant="outline" size="lg">
            <template #leading>
              <span :style="lineFillColor" class="size-4 rounded-full" />
            </template>
            {{ lineFillValue }}
          </UButton>

          <template #content>
            <UColorPicker v-model="lineFillValue" @update:modelValue="updateLine('fill')" class="p-2" />
          </template>
        </UPopover>
      </div>
  </div>
</template>
