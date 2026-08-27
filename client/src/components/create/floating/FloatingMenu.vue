<script setup>
import { ref, defineEmits, toRefs, onMounted, watch } from 'vue'
import FloatingMenuShape from './FloatingMenuShape.vue'
import FloatingMenuLine from './FloatingMenuLine.vue'
import FloatingMenuText from './FloatingMenuText.vue'
import FloatingMenuImage from './FloatingMenuImage.vue'

const menuRef = ref(null);
const props = defineProps({
    x: Number,
    y: Number,
    node: Object,
});

const { x, y, node } = toRefs(props);


const repositionMenu = () => {
  const menu = menuRef.value;
  const limitY = 450;
  const limitX = 850;

  menu.style.top = ((y.value >= limitY) ?  (y.value - 300) : y.value) + 'px';
  menu.style.left = ((x.value >= limitX) ? (x.value - 300) : x.value) + 'px';
  console.log('menu: y', y.value, ' - x: ', x.value, ' - item: ', node.value);
}

const nodeType = () => {
  const id = node.value.attrs.id;
  if (id.includes('shape')) return 'shape';
  if (id.includes('line')) return 'line';
  if (id.includes('text')) return 'text';
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

    <floating-menu-shape v-if="nodeType() === 'shape'" :node="node" />
    <floating-menu-line v-if="nodeType() === 'line'" :node="node" />
    <floating-menu-text v-if="nodeType() === 'text'" :node="node" />
    <floating-menu-image v-if="nodeType() === 'image'" :node="node" />
  </div>
</template>

<style scoped>
.float {
  position: absolute;
  background: white;
  width: 300px;
  height: 400px;
  max-height: 350px;
  overflow-y: auto;
  padding: 20px;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  z-index: 9;
}

</style>
