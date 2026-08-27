<script setup>
import { ref, defineEmits, toRefs, onMounted, watch } from 'vue'

const props = defineProps({
    x: Number,
    y: Number,
});

const { x, y } = toRefs(props);

const menuRef = ref(null);

const repositionMenu = () => {
  const menu = menuRef.value;
  menu.style.top = y.value + 'px';
  menu.style.left = x.value + 'px';
}

watch(() => x.value, () => {
    repositionMenu();
});

watch(() => y.value, () => {
    repositionMenu();
});

onMounted(() => {
  repositionMenu();
})
</script>

<template>
  <div ref="menuRef" class="float">
    Floating Menu here
  </div>
</template>

<style scoped>
.float {
  position: absolute;
  background: white;
  width: 300px;
  height: 200px;
  padding: 20px;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  z-index: 9;
}

</style>
