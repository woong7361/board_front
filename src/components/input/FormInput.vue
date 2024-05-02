<script setup>

const model = defineModel();
const props = defineProps(['label', 'rules'])
</script>

<template>
  <v-text-field
    :label="props.label"
    :rules="props.rules"
    variant="outlined"
    v-model="model">
  </v-text-field>
</template>

<style scoped>

</style>
