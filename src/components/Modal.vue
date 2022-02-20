<script setup lang="ts">

import { defineEmits } from 'vue';

const emit = defineEmits(['on:close'])

</script>

<template>
    <div class="modal-background fade-in" @click.self="$emit('on:close')">
        <div class="modal-container">
            <slot name="header" />
            <slot name="body" />
            <slot name="footer" />
        </div>
    </div>
</template>

<style scoped>
.modal-background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;

    display: flex;
    background-color: rgba(0, 0, 0, 0.5);
    align-items: center;
    justify-content: center;
}

.modal-container {
    width: 250px;
    height: 250px;
    background-color: white;
    border-radius: 5px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
}

.center {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 250px;
    height: 250px;
    color: red;
}
</style>