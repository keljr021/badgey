<script setup>
import { ref, defineEmits, toRefs, computed, onMounted } from 'vue'

const emit = defineEmits(['update:line']);

const props = defineProps({
  node: Object,
});

const { node } = toRefs(props);

const menuRef = ref(null);
const lineWidth = ref(0);
const lineStrokeWidth = ref(0);
const lineRotation = ref(0);
const lineFillValue = ref('#f92a2a');
const lineFillColor = computed(() => ({ backgroundColor: lineFillValue.value }));

const updateLine = (input) => {
  console.log(' - [updateLine] input: ', input, ' - lineWidth: ', lineWidth.value, ' - lineFillValue: ', lineFillValue.value);
  if (input === 'width') {
    let newPoints = node.value.attrs.points;
    newPoints[2] = node.value.attrs.points[0] + lineWidth.value;
    emit('line:update', { konvaValues: { points: newPoints }})
  }

  if (input === 'fill')
    emit('line:update', { konvaValues: { stroke: lineFillValue.value } });

  if (input === 'stroke')
    emit('line:update', { konvaValues: { strokeWidth: lineStrokeWidth.value } });

  if (input === 'rotate')
    emit('line:update', { konvaValues: { rotation: lineRotation.value } });
}

const setValues = () => {
  lineWidth.value = node.value.attrs.points[2] - node.value.attrs.points[0];
  lineFillValue.value = node.value.attrs.stroke;
  lineStrokeWidth.value = node.value.attrs.strokeWidth;
  lineRotation.value = node.value.attrs.rotation;
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
        Stroke: <br />
        <UInputNumber v-model="lineStrokeWidth" @update:modelValue="updateLine('stroke')" class="w-20 py-2" :min="0" :increment="{ size: 'sm' }" :decrement="{ size: 'sm' }" />
      </div>
      <div class="float-line-menu-rotate">
        Rotate: <br />
        <UInputNumber v-model="lineRotation" @update:modelValue="updateLine('rotate')" class="w-20 py-2" :min="0" :max="360" :increment="{ size: 'sm' }" :decrement="{ size: 'sm' }"/>
      </div>
      <div class="float-line-menu-fill">
          Fill: <br />
          <UPopover class="py-2">
            <UButton color="neutral" variant="outline" size="md">
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
  </div>
</template>
