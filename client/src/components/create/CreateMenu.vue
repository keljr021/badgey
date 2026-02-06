<script setup>
</script>

<template>
  <div class="menu">
    <div class="menu-item">
        <div class="menu-item-icon"><UIcon name="i-lucide-file-pen" class="size-5" /></div>
        <div class="menu-item-text">Drafts</div>
    </div>
    <div class="menu-item">
        <div class="menu-item-icon"><UIcon name="i-lucide-badge" class="size-5" /></div>
        <div class="menu-item-text">Canvas</div>
    </div>  
    <div class="menu-item">
        <div class="menu-item-icon"><UIcon name="i-lucide-text" class="size-5" /></div>
        <div class="menu-item-text">Text</div>
    </div>
    <div class="menu-item">
        <div class="menu-item-icon"><UIcon name="i-lucide-circle-dashed" class="size-5" /></div>
        <div class="menu-item-text">Border</div>
    </div>
    <div class="menu-item">
        <div class="menu-item-icon"><UIcon name="i-lucide-diamond" class="size-5" /></div>
        <div class="menu-item-text">Shapes</div>
    </div>
    <div class="menu-item">
        <div class="menu-item-icon"><UIcon name="i-lucide-import" class="size-5" /></div>
        <div class="menu-item-text">Import</div>
    </div>   
  </div>
</template>

<style scoped>
.menu {
    background-color: #fff;
    box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
    width: 100px;
    min-height: 550px;
}

.menu-item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    padding: 15px 0;
    margin: 0 auto;
    text-align: center;
    cursor: pointer;
}

.menu-item-icon {
    text-align: center;
    margin: 5px auto;
}

.menu-item-text {
    font-size: 16px;
}
</style>
