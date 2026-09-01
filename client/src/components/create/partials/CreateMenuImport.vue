<script setup>
import { defineEmits, ref } from 'vue';
import './../create.css'

const emit = defineEmits(['close', 'import']);

const upload = ref(null);

const setImportedFile = () => {
  if (upload.value !== null)
    emit('import', upload.value);
}
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
    </div>
  </div>
</template>