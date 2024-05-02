<script setup>
const model = defineModel('dialog')
const props = defineProps(['dialogTitle', 'dialogText', 'saveSuccess', 'saveFail'])

</script>

<template>
  <div class="text-center">
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
        <v-card-text>저장 성공: {{ props.saveSuccess }}</v-card-text>
        <v-card-text>저장 실패: {{ props.saveFail }}</v-card-text>
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
