<script setup>
import {ref} from "vue";

const visible = ref(false);
const model = defineModel()
const props = defineProps(['placeholder', 'rules']);
</script>

<template>

  <v-text-field
    :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
    :type="visible ? 'text' : 'password'"
    density="compact"
    :placeholder="props.placeholder"
    v-model="model"
    prepend-inner-icon="mdi-lock-outline"
    variant="outlined"
    @click:append-inner="visible = !visible"
    :rules="props.rules"
  ></v-text-field>

</template>

<style scoped>

</style>
