<script setup>
import {ref} from "vue";

const dialog = ref(true)
</script>

<template>
  <div class="text-center">
    <v-dialog
      v-model="dialog"
      width="auto"
    >
      <v-card
        max-width="400"
        min-width="400"
        prepend-icon="mdi-update"
        text="test"
        title="test"
      >
        <template v-slot:actions>
          <v-btn
            class="ms-auto"
            text="Ok"
            @click="dialog = false"
          ></v-btn>
        </template>
      </v-card>
    </v-dialog>
  </div>
</template>

<style scoped>

</style>
