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
const stageRadius = ref(40);

const resizeCanvas = () => {
  if (!containerRef.value) return;
  
  // Get container width
  const containerWidth = containerRef.value.offsetWidth;
  const containerHeight = containerRef.value.offsetHeight;

  if (containerWidth >= containerHeight) {
    scaleX.value = containerHeight / height.value;
    scaleY.value = containerHeight / height.value;
  }
  else {
    scaleX.value = containerWidth / width.value * 1.05;
    scaleY.value = containerWidth / width.value * 1.05;
  } 

  console.log('stage radius: ', stageRadius.value);
  stageRadius.value = scaleX.value * 120;
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
          <v-circle
            ref="backgroundRef"
            :config="{
              x: stageWidth / 2,
              y: stageHeight / 2 ,
              radius: stageRadius,
              fill: '#fff',
              stroke: '#d9d9d9',
              shadowColor: '#ccc',
              shadowOpacity: 0.25,
              shadowBlur: 4,
              shadowOffsetY: 4,
            }" />
        </v-layer>
      </v-stage>
    </div>
  </div>
</template>

<style scoped>

</style>
