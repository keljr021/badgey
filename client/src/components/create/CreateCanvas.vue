<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import './create.css'

const width = ref(400);
const height = ref(400);
const scaleX = ref(1);
const scaleY = ref(1);

const containerRef = ref(null);
const stageRef = ref(null);
const backgroundRef = ref(null);

const stageWidth = computed(() => width.value * scaleX.value);
const stageHeight = computed(() => height.value * scaleY.value);

const resizeCanvas = () => {
  if (!containerRef.value) return;
  
  // Get container width
  const containerWidth = containerRef.value.offsetWidth;
  const containerHeight = containerRef.value.offsetHeight;

  console.log('container size: - ', containerWidth, ' - ', containerHeight);

  // scaleX.value = containerWidth / width.value * 0.68;
  //   scaleY.value = containerWidth / width.value * 0.68;

  if (containerWidth >= containerHeight) {
    console.log('width >= height, width: ', containerWidth, ' - height: ', containerHeight);
    scaleX.value = containerHeight / height.value;
    scaleY.value = containerHeight / height.value;
  }

  else {
    console.log('width < height, width: ', containerWidth, ' - height: ', containerHeight);
    scaleX.value = containerWidth / width.value * 1.05;
    scaleY.value = containerWidth / width.value * 1.05;
  } 

  console.log('scale size: - ', scaleX.value, ' - ', scaleY.value);
};

onMounted(() => {
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', resizeCanvas);
});

</script>

<template>
  <div class="canvas">
    <div ref="containerRef" class="canvas-container">
      <v-stage 
        ref="stageRef" 
        :config="{
          width: stageWidth,
          height: stageHeight,
          scaleX: scaleX,
          scaleY: scaleY,
        }">
        <v-layer>
          <v-rect
            ref="backgroundRef"
            :config="{
              x: 0,
              y: 0,
              width: stageWidth,
              height: stageHeight,
              scaleX: scaleX,
              scaleY: scaleY,
              fill: '#ccc'
            }" />
        </v-layer>
      </v-stage>
    </div>
  </div>
</template>

<style scoped>

</style>
