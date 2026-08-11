<script setup>
</script>

<template>
  <div class="create-menu-shapes">
    <div class="create-menu-shapes-header">
      Add shape
    </div>
    <div class="create-menu-shapes-list">
      <div class="create-menu-shapes-list-item">
        <div class="create-menu-shapes-list-item-icon"><UIcon name="i-lucide-diamond" class="size-5" /></div>
        <div class="create-menu-shapes-list-item-text">Diamond</div>
      </div> 
      <div class="create-menu-shapes-list-item">
        <div class="create-menu-shapes-list-item-icon"><UIcon name="i-lucide-circle" class="size-5" /></div>
        <div class="create-menu-shapes-list-item-text">Circle</div>
      </div> 
      <div class="create-menu-shapes-list-item">
        <div class="create-menu-shapes-list-item-icon"><UIcon name="i-lucide-square" class="size-5" /></div>
        <div class="create-menu-shapes-list-item-text">Square</div>
      </div>
      <div class="create-menu-shapes-list-item">
        <div class="create-menu-shapes-list-item-icon"><UIcon name="i-lucide-star" class="size-5" /></div>
        <div class="create-menu-shapes-list-item-text">Custom</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.create-menu-shapes {
    position: absolute;
    top: 300px;
    left: 100px;
    min-width: 350px;
    min-height: 100px;
    padding: 20px;
    border-radius: 10px;
    background-color: #fff;
    box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
}

.create-menu-shapes-header {
  font-weight: 600;
  padding: 15px 0;
}

.create-menu-shapes-list {
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 15px 0;
  margin: 0 auto;
  text-align: center;
  cursor: pointer;
}

.create-menu-shapes-list-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 15px 0;
    margin: 0 auto;
    text-align: center;
    cursor: pointer;
}

.create-menu-shapes-list-item:hover {
    background-color: #eee;
}

.create-menu-shapes-list-item-icon {
    margin: 0 auto;
    padding: 10px 0;
    opacity: 0.5;
}

.create-menu-shapes-list-item.active .create-menu-shapes-list-item-icon {
    color: var(--badgey-green);
    opacity: 1;
}

.create-menu-shapes-list-item.active .create-menu-shapes-list-item-text {
    color: var(--badgey-green);
    font-weight: bold;
}
</style>
