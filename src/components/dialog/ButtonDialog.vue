<script setup>
import {ref} from "vue";
import SubmitButton from "@/components/button/SubmitButton.vue";

const model = defineModel('dialog')
const props = defineProps(['dialogTitle', 'dialogText'])

</script>

<template>
  <div class="text-center">
    <slot></slot>
    <v-dialog
      v-model="model"
      width="auto"
    >
      <v-card
        max-width="400"
        min-width="400"
        prepend-icon="mdi-update"
        :text="props.dialogText"
        :title="props.dialogTitle"
      >
        <template v-slot:actions>
          <v-btn
            class="ms-auto"
            text="Ok"
            @click="model = false"
          ></v-btn>
        </template>
      </v-card>
    </v-dialog>
  </div>
</template>

<style scoped>

</style>
