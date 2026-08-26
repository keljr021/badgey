<script setup>
import { ref, defineEmits, toRefs, onMounted } from 'vue'

const props = defineProps({
    x: Number,
    y: Number,
});

const { x, y } = toRefs(props);

const menuStyling = {
    position: 'fixed', 
    background: '#fff',
    width: '300px', 
    height: '200px',
    padding: '10px',
    top: y.value,
    left: x.value
}

onMounted(() => {
    console.log('menu position: y', y.value, ' - x: ', x.value);
})
</script>

<template>
  <div class="float" :style="menuStyling">
    Floating Menu here
  </div>
</template>

<style scoped>
.float {

}

</style>
