<script setup>
const dialog = defineModel('dialog')
const date = defineModel('date')
</script>

<template>
  <div>
    <slot></slot>
    <v-dialog
      v-model="dialog"
      width="auto"
    >
      <v-card
        max-width="400"
        min-width="400"
      >
        <v-date-picker v-model="date"></v-date-picker>
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
