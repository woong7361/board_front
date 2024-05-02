<script setup>
import {computed} from "vue";

const props = defineProps(['page'])
const emits = defineEmits(['goPage'])
const page = computed(() => props.page)

function goPage(pageNum) {
  emits('goPage', pageNum)
}

</script>

<template>
  <div class="text-center">
    <v-container>
      <v-row justify="center">
        <v-col cols="8">
          <v-container class="max-width">
            <v-pagination
              v-model="page.currentPage"
              @click="goPage(page.currentPage)"
              :length="((page.totalCount - 1) / page.pageSize) + 1"
              class="my-4"
            ></v-pagination>
          </v-container>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style scoped>

</style>
