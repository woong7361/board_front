<script setup>

const props = defineProps(['label', 'rules'])
const model = defineModel();
</script>

<template>
  <v-textarea
    :label="props.label"
    v-model="model"
    :rules="props.rules"
    prepend-inner-icon="mdi-comment"
    variant="outlined"
    auto-grow
  ></v-textarea>
</template>

<style scoped>

</style>
