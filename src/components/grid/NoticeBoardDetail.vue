<script setup>
import {computed} from "vue";

const props = defineProps(['noticeBoard']);

const noticeBoard = computed(() => props.noticeBoard)
</script>

<template>
  <div>
    <div> {{ noticeBoard.category }}</div>
    <div> {{ noticeBoard.title }}</div>
    <div>
      {{ noticeBoard.createdAt }}
      <br/>
      {{ noticeBoard.modifiedAt }}
    </div>
    <div>{{ noticeBoard.views }}</div>
    <div>{{ noticeBoard.memberName }}</div>
    <div>
      {{ noticeBoard.content }}
    </div>
  </div>
</template>

<style scoped>

</style>