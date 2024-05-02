<script setup>
import {ADMIN_FREE_BOARD_LIST_ROUTE_URL, NOTICE_BOARD_VIEW_ROUTE_URL} from "@/constant/routeUrlConstant";

  const props = defineProps(['fixedBoards', 'noneFixedBoards']);
  const emits = defineEmits(['goDetail'])

  function goDetail(noticeBoardId) {
    emits('goDetail', noticeBoardId)
  }
</script>

<template>
  <v-col cols="12">
  <v-card title="목록">
    <v-table>
      <thead>
      <tr>
        <th class="text-uppercase text-left">카테고리</th>
        <th class="text-left"  style="width: 300px">제목</th>
        <th class="text-uppercase text-center">작성자</th>
        <th class="text-uppercase text-center">조회수</th>
        <th class="text-uppercase text-center">등록 일시</th>
        <th class="text-uppercase text-center">수정 일시</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="board in props.fixedBoards" style="background-color: cornsilk">
        <td class="text-left"> {{board.category}} </td>
        <td class="text-left">
          <a @click="goDetail(board.noticeBoardId)" style="cursor:pointer;"> {{board.title}} </a>
        </td>
        <td class="text-center"> {{board.memberName}} </td>
        <td class="text-center"> {{board.views}} </td>
        <td class="text-center"> {{board.createdAt}} </td>
        <td class="text-center"> {{board.modifiedAt}} </td>
      </tr>

      <tr v-for="board in props.noneFixedBoards">
        <td class="text-left"> {{board.category}} </td>
        <td class="text-left" >
          <a @click="goDetail(board.noticeBoardId)" style="cursor:pointer;"> {{board.title}}</a>
        </td>
        <td class="text-center"> {{board.memberName}} </td>
        <td class="text-center"> {{board.views}} </td>
        <td class="text-center"> {{board.createdAt}} </td>
        <td class="text-center"> {{board.modifiedAt}} </td>
      </tr>
      </tbody>
    </v-table>
  </v-card>
  </v-col>
</template>

<style scoped>

</style>
