<script setup>
import {ref} from "vue";

const props = defineProps(['number', 'label'])
const emits = defineEmits(['fileChange'])

const isFileRemove = ref(true);
const file = ref(undefined);

function fileChange(e) {
  const files = e.target.files
  emits('fileChange', props.number, files[0])
}
function clear() {
  isFileRemove.value = false
  emits('fileChange', props.number, null)
}

</script>

<style scoped>

</style>

<template>
  <v-file-input
    clearable
    v-show="isFileRemove"
    @change="fileChange"
    @click:clear="clear"
    :label="props.label"
    variant="outlined">
  </v-file-input>

</template>
