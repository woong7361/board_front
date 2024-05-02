<script setup>

import {computed} from "vue";

const props = defineProps(['sizeList']);
const model = defineModel()

const sizeList = computed(() => {
  return props.sizeList
})

</script>

<template>
  <select v-model="model">
    <option
        v-for="size in sizeList"
        :key="size"
        :value="size" >{{ size }}</option>
  </select>
</template>

<style scoped>

</style>