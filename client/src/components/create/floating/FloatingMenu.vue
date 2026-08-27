<script setup>
import { ref, defineEmits, toRefs, onMounted, watch } from 'vue'
import FloatingMenuShape from './FloatingMenuShape.vue'
import FloatingMenuLine from './FloatingMenuLine.vue'
import FloatingMenuText from './FloatingMenuText.vue'
import FloatingMenuImage from './FloatingMenuImage.vue'
import './floatingMenu.css';

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
    <div class="float-header">
      <span v-if="nodeType() === 'shape'">Shape</span>
      <span v-if="nodeType() === 'line'">Line</span>
      <span v-if="nodeType() === 'text'">Text</span>
      <span v-if="nodeType() === 'image'">Image</span>
      <UButton color="neutral" variant="ghost" size="md" icon="i-lucide-x" class="float-right" @click="emit('close')" />
    </div>

    <div class="float-menu">
      <floating-menu-shape v-if="nodeType() === 'shape'" :node="node" />
      <floating-menu-line v-if="nodeType() === 'line'" :node="node" />
      <floating-menu-text v-if="nodeType() === 'text'" :node="node" />
      <floating-menu-image v-if="nodeType() === 'image'" :node="node" />
    </div>

    <div class="float-footer">
      <div class="float-footer-arrange">
        Arrange
      </div>
      <div class="float-footer-delete">
        Delete
      </div>
    </div>
  </div>
</template>
