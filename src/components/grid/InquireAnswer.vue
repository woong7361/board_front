<script setup>
const props = defineProps(['answers'])


</script>

<template>
  <div v-for="answer in props.answers">
    <div>{{ answer.answer }}</div>
    <div>{{ answer.memberName }}</div>
  </div>
</template>

<style scoped>

</style>