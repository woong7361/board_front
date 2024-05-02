<script setup>

import {commentRule} from "@/compositor/rules";
import SubmitButton from "@/components/button/SubmitButton.vue";
import FormTextArea from "@/components/input/FormTextArea.vue";

const props = defineProps(['isDisable', 'label'])
const model = defineModel()
const emits = defineEmits(['submitComment'])

function submitComment() {
  emits('submitComment')
}

</script>

<template>
  <v-form>
    <form-text-area :disabled="props.isDisable" :label="props.label" v-model="model" :rules="commentRule"></form-text-area>
  </v-form>
  <submit-button :disabled="props.isDisable" value="제출" variant="outlined" @click-event="submitComment"></submit-button>
</template>

<style scoped>

</style>
