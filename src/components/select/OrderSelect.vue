<script setup>

const props = defineProps(['orderValue']);
const model = defineModel()

</script>

<template>
  <span>
  <select v-model="model">
    <option
        v-for="order in props.orderValue"
        :key="order.key"
        :value="order.value" >{{ order.key }}</option>
  </select>
  </span>
</template>

<style scoped>

</style>