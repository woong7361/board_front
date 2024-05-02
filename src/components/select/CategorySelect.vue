<script setup>

import {computed} from "vue";

const props = defineProps(['categoryList']);
const model = defineModel()

const categoryList = computed(() => {
  return props.categoryList
})

</script>

<template>
  <v-select
    label="카테고리"
    variant="outlined"
    v-model="model"
    :items="categoryList"
  ></v-select>
</template>

<style scoped>

</style>
