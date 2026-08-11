<script setup>
import { defineEmits, ref } from 'vue';
import './../create.css'

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