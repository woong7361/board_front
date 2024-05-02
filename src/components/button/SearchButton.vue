<script setup>
const emits = defineEmits(['search'])

function search() {
  emits('search')
}
</script>

<template>
  <input type="button" value=" 검 색 " @click="search"/>
</template>

<style scoped>

</style>