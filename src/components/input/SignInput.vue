<script setup>
const model = defineModel()
const props = defineProps(['placeholder']);
</script>

<template>
    <v-text-field
      density="compact"
      v-bind:placeholder="props.placeholder"
      v-model="model"
      prepend-inner-icon="mdi-email-outline"
      variant="outlined"
    >
    </v-text-field>
</template>

<style scoped>

</style>
