<script setup>
</script>

<template>
  <div class="create-menu-import">
    <div class="create-menu-import-header">
      Import image
    </div>
    <div class="create-menu-import-box">
      <UFileUpload
        label="Drop your image here"
        description="SVG, PNG, JPG or GIF (max. 2MB)"
        class="w-96 min-h-48"
      />
    </div>
  </div>
</template>

<style scoped>
.create-menu-import {
    position: absolute;
    top: 220px;
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
}

</style>
