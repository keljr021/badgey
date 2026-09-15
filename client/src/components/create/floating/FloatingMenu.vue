<script setup>
import { ref, defineEmits, toRefs, onMounted, watch } from 'vue'
import FloatingMenuShape from './FloatingMenuShape.vue'
import FloatingMenuLine from './FloatingMenuLine.vue'
import FloatingMenuText from './FloatingMenuText.vue'
import FloatingMenuImage from './FloatingMenuImage.vue'
import './floatingMenu.css';

const emit = defineEmits([ 'close', 'update', 'delete' ]);

const menuRef = ref(null);
const props = defineProps({
    node: Object,
    itemWidth: Number,
    itemHeight: Number,
});

const { node, itemWidth, itemHeight } = toRefs(props);

const nodeType = () => {
  const id = node.value.attrs.id;
  if (id.includes('shape')) return 'shape';
  if (id.includes('circle')) return 'circle';
  if (id.includes('rectangle')) return 'rectangle';
  if (id.includes('polygon')) return 'polygon';
  if (id.includes('line')) return 'line';
  if (id.includes('text')) return 'text';
  if (id.includes('img') || id.includes('image')) return 'image';
}

const updateNode = (input) => {
  console.log(' - [updateNode]: id: ', node.value.attrs.id, ' - input: ', input);
  emit('update', node.value.attrs.id, input);
}

const deleteNode = () => {
  emit('delete', node.value.attrs.id);
  emit('close');
  node.value.destroy();
}
</script>

<template>
  <div ref="menuRef" class="floatbox">
    <div class="floatbox-header">
      <UButton color="neutral" variant="ghost" size="md" icon="i-lucide-x" class="float-right" @click="emit('close')" />
      <div class="floatbox-header-text">{{  node.attrs.id }}</div>
    </div>

    <div class="floatbox-menu">
      <floating-menu-shape 
        v-if="nodeType() === 'shape' || nodeType() === 'circle' || nodeType() === 'rectangle' || nodeType() === 'polygon'"
        @shape:update="updateNode"
        :node="node"
        :type="nodeType()"
        :width="itemWidth"
        :height="itemHeight" 
      />
      <floating-menu-line v-if="nodeType() === 'line'" :node="node" @line:update="updateNode" />
      <floating-menu-text v-if="nodeType() === 'text'" :node="node" @text:update="updateNode" />
      <floating-menu-image 
        v-if="nodeType() === 'image'"
        @image:update="updateNode"
        :node="node"
        :width="itemWidth"
        :height="itemHeight" 
      />

      <div class="floatbox-menu-arrange">
        Arrange: <br />
        <UFieldGroup orientation="horizontal" class="py-2">
          <UTooltip text="Bring to front">
            <UButton color="neutral" variant="outline" icon="i-lucide-bring-to-front" />
          </UTooltip>
          <UTooltip text="Bring forward">
            <UButton color="neutral" variant="outline" icon="i-lucide-arrow-up-narrow-wide" />
          </UTooltip>
          <UTooltip text="Send backwards">
            <UButton color="neutral" variant="outline" icon="i-lucide-arrow-down-narrow-wide" />
          </UTooltip>
          <UTooltip text="Send to back">
            <UButton color="neutral" variant="outline" icon="i-lucide-send-to-back" />
          </UTooltip>
        </UFieldGroup>
      </div>
    </div>

    <div class="floatbox-footer">
      <div class="floatbox-footer-delete">
        <UTooltip :text="'Delete ' + nodeType()">
          <UButton color="neutral" variant="outline" size="md" icon="i-lucide-trash" label="Delete" class="my-4" @click="deleteNode" />
        </UTooltip>
      </div>
    </div>
  </div>
</template>
