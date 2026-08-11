<script setup>
import { defineEmits, ref } from 'vue';

const emit = defineEmits(['close', 'import', 'import-confirm']);

const upload = ref(null);

const setImportedFile = () => {
  emit('import', upload.value);
}

const confirmImport = () => {
  emit('import-confirm');
};
</script>

<template>
  <div class="create-menu-import">
    <div class="create-menu-import-header">
      Import image

      <UButton color="neutral" variant="ghost" size="md" icon="i-lucide-x" class="float-right" @click="emit('close')" />
    </div>
    <div class="create-menu-import-box">
      <UFileUpload
        v-model="upload"
        @update:modelValue="setImportedFile"
        label="Drop your image here"
        description="SVG, PNG, JPG or GIF (max. 2MB)"
        class="w-96 min-h-48"
      />
      <UButton class="mt-6" color="neutral" variant="outline" size="md" icon="i-lucide-upload" @click="confirmImport" label="Confirm" />
    </div>
  </div>
</template>

<style scoped>
.create-menu-import {
    position: absolute;
    top: 130px;
    left: 100px;
    min-width: 350px;
    min-height: 100px;
    padding: 20px;
    border-radius: 10px;
    background-color: #fff;
    box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
}

.create-menu-import-header {
  font-weight: 600;
  padding: 15px 0;
}

.create-menu-import-box {
  padding: 20px 0;
  cursor: pointer;
  text-align: right;
}

</style>
