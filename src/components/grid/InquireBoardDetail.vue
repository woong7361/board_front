<script setup>
import {computed} from "vue";

const props = defineProps(['inquireBoard'])

const inquireBoard = computed(
    () => props.inquireBoard
)

</script>

<template>
  <div>
    <div> {{ inquireBoard.category }}</div>
    <div> {{ inquireBoard.title }}</div>
    <div> {{ inquireBoard.content }}</div>
    <div>
      {{ inquireBoard.createdAt }}
      <br/>
      {{ inquireBoard.modifiedAt }}
    </div>
    <div>{{ inquireBoard.views }}</div>
    <div>{{ inquireBoard.memberName }}</div>
  </div>

</template>

<style scoped>

</style>