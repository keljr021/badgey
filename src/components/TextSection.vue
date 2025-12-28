<script setup>
</script>

<template>
    <div class="section pb-8">
        <div class="section-header py-2" v-if="$slots.header">
            <slot name="header"></slot>
        </div>
        <div class="section-subheader py-2" v-if="$slots.subheader">
            <slot name="subheader"></slot>
        </div>
        <div class="section-body">
            <slot></slot>
        </div>
    </div>
</template>

<style scoped>
.section-header {
    text-transform: uppercase;
    font-weight: bold;
    font-size: 20px;
}

.section-subheader {
    font-weight: bold;
}
</style>
