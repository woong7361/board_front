<script setup>
const props = defineProps(['files'])
</script>


<template>
  <v-card max-width="1100px" min-height="100px" class="mx-auto pa-3 pb-3 mt-10" variant="tonal">
    <v-card-title>파일</v-card-title>
    <v-card-text class="text-left text-h6">
      <div v-for="file in files">
        <v-hover  v-slot="{ isHovering, props }" open-delay="200">
          <v-card
            :class="{ 'on-hover': isHovering }"
            class="mb-3"
            :elevation="isHovering ? 16 : 2"
            v-bind="props"
            variant="flat"
            @click="$emit('fileDownload', file.fileId)"
          >
            <v-card-text class="font-weight-medium text-left text-subtitle-2">
              <v-icon icon="mdi-file-star-outline"></v-icon>
              {{file.originalName}}
            </v-card-text>
          </v-card>
        </v-hover>
      </div>
    </v-card-text>
  </v-card>
</template>

<style scoped>

</style>
