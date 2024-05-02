<script setup>
import {computed, ref} from "vue";
import {blankDateFormat} from "@/compositor/dateFormat";
import {boardContent, freeBoardOwner, freeBoardTitle} from "@/compositor/stringFormat";
const props = defineProps(['board']);

const board = computed(() => props.board)

</script>

<template>
    <v-card max-width="1100px" class="mx-auto pa-3 pb-3 mt-5" variant="outlined">
      <v-card-title class="text-center text-h4"> {{ freeBoardTitle(board.title) }}</v-card-title>
    </v-card>


    <v-row no-gutters>
      <v-col cols="1"></v-col>
      <v-col cols="7">
        <v-sheet class="pa-2 ma-2 ml-3" v-show="!!board.category">
          <v-icon icon="mdi-view-list"></v-icon>
          {{ board.category }}
        </v-sheet>
      </v-col>
      <v-col cols="1">
        <v-sheet class="pa-2 ma-2">
          <v-icon icon="mdi-account"></v-icon>
          {{ freeBoardOwner(board.memberName) }}
        </v-sheet>
      </v-col>
      <v-col cols="3">
        <v-sheet class="pa-2 ma-2 mr-8">
          <v-icon icon="mdi-calendar-edit"></v-icon>
          {{ blankDateFormat(board.createdAt) }}
        </v-sheet>
      </v-col>
    </v-row>


  <v-card max-width="1100px" min-height="400px" class="mx-auto pa-3 pb-3" variant="tonal">
      <v-card-text class="text-left text-h6">
        <p v-html="boardContent(board.content)"></p>
      </v-card-text>
    </v-card>
</template>

<style scoped>

</style>
