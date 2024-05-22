<script setup>
import {blankDateFormat} from "@/compositor/dateFormat";
import {freeBoardOwner, freeBoardTitle} from "@/compositor/stringFormat";

const props = defineProps(['freeBoards']);
const emits = defineEmits(['goDetail'])

function goDetail(freeBoardId) {
  emits('goDetail', freeBoardId)
}

</script>

<template>
  <v-col cols="12">
    <v-card title="목록">
      <v-table>
        <thead>
        <tr>
          <th class="text-uppercase">
            카테고리
          </th>
          <th class="text-uppercase text-left"  style="width: 300px">
            제목
          </th>
          <th class="text-uppercase text-center">
            작성자
          </th>
          <th class="text-uppercase text-center">
            조회수
          </th>
          <th class="text-uppercase text-center">
            작성 일자
          </th>
          <th class="text-uppercase text-center">
            수정 일자
          </th>
        </tr>
        </thead>

        <tbody>
        <tr
          v-for="board in props.freeBoards"
        >
          <td>
            {{ board.category }}
          </td>
          <td class="text-left">
            <a @click="goDetail(board.freeBoardId)" style="cursor:pointer;"> {{freeBoardTitle(board.title)}}</a>
          </td>
          <td class="text-center">
            {{ freeBoardOwner(board.memberName) }}
          </td>
          <td class="text-center">
            {{ board.views }}
          </td>
          <td class="text-center">
            {{ blankDateFormat(board.createdAt) }}
          </td>
          <td class="text-center">
            {{ blankDateFormat(board.modifiedAt) }}
          </td>
        </tr>
        </tbody>
      </v-table>
    </v-card>
  </v-col>
</template>

<style scoped>

</style>
