<script setup>
import {blankDateFormat} from "@/compositor/dateFormat";
import {useMemberStore} from "@/store/store";
import {inquireAnsweredFormat, inquireNoneAnsweredFormat} from "../../compositor/stringFormat";

const props = defineProps(['inquireBoards']);
const emits = defineEmits(['goDetail'])

function goDetail(inquireBoardId, isSecret, memberId) {

  const isAllow = !isSecret || (memberId === useMemberStore().memberId)
  emits('goDetail', inquireBoardId, isAllow);
}
</script>

<template>
  <v-col cols="12">
    <v-card title="목록">
      <v-table>
        <thead>
        <tr>
          <th class="text-left" style="width: 500px">제목</th>
          <th class="text-center">작성자</th>
          <th class="text-center">조회수</th>
          <th class="text-center">등록 일시</th>
          <th class="text-center">수정 일시</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="board in props.inquireBoards">
          <td class="text-left">
            <a @click="goDetail(board.inquireBoardId, board.isSecret, board.memberId)" style="cursor:pointer;">
              <span v-if="board.isAnswered" class="ml-3"> {{ inquireAnsweredFormat(board.title) }} </span>
              <span v-else class="ml-3"> {{inquireNoneAnsweredFormat(board.title)}}  </span>
              <v-icon v-if="board.isSecret" icon="mdi-lock-outline" class="ml-3"></v-icon>
              <v-icon v-else icon="mdi-lock-open-outline" class="ml-3"></v-icon>
            </a>
          </td>
          <td class="text-center"> {{board.memberName}} </td>
          <td class="text-center"> {{board.views}} </td>
          <td class="text-center"> {{ blankDateFormat(board.createdAt) }} </td>
          <td class="text-center"> {{ blankDateFormat(board.modifiedAt) }} </td>
        </tr>
        </tbody>
      </v-table>
    </v-card>
  </v-col>
</template>

<style scoped>

</style>
