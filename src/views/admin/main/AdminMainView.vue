<script setup>

import {getFixedNoticeBoardsApi, getFreeBoardsApi, getInquireBoardsApi} from "@/apis/main-api";
import {ref, watchEffect} from "vue";
import {useDate} from "vuetify";
import router from "@/router";
import {
  ADMIN_FREE_BOARD_LIST_ROUTER_NAME,
  ADMIN_FREE_BOARD_VIEW_ROUTER_NAME, ADMIN_INQUIRE_BOARD_LIST_ROUTER_NAME,
  ADMIN_INQUIRE_BOARD_VIEW_ROUTER_NAME, ADMIN_NOTICE_BOARD_LIST_ROUTER_NAME, ADMIN_NOTICE_BOARD_VIEW_ROUTER_NAME,
  FREE_BOARD_LIST_ROUTER_NAME,
  FREE_BOARD_VIEW_ROUTER_NAME, INQUIRE_BOARD_LIST_ROUTER_NAME,
  INQUIRE_BOARD_VIEW_ROUTER_NAME, NOTICE_BOARD_LIST_ROUTER_NAME,
  NOTICE_BOARD_VIEW_ROUTER_NAME
} from "@/constant/routeNames";
import {searchEndDateTime, searchStartDateTime} from "@/compositor/dateFormat";
import {ALL_CATEGORY} from "@/constant/categoryConstant";
import {freeBoardOwner, freeBoardTitle} from "@/compositor/stringFormat";


const params = ref({
  startDate: searchStartDateTime(),
  endDate: searchEndDateTime(),

  category: ALL_CATEGORY,
  keyWord: null,

  size: import.meta.env.VITE_DEFAULT_PAGE_SIZE,
  currentPage: import.meta.env.VITE_DEFAULT_PAGE,

  orderColumn: null,
  orderType: null
})

const freeBoards = ref({
})
const inquireBoards = ref({
})
const fixedNoticeBoards = ref({
})
async function getFreeBoards(params) {
  const response = await getFreeBoardsApi(params)
  freeBoards.value = response.data.contents
}

async function getInquireBoards(params) {
  const response = await getInquireBoardsApi(params)

  inquireBoards.value = response.data.contents
}

async function getFixedNoticeBoards() {
  const response = await getFixedNoticeBoardsApi()

  if (response.status === 200) {
    fixedNoticeBoards.value = response.data.fixedNoticeBoards;
  }
}

watchEffect(
  () => {
    getFreeBoards(params.value)
    getInquireBoards(params.value)
    getFixedNoticeBoards()
  }
)

function goNoticeBoardDetail(noticeBoardId) {
  router.push(
    {
      name: ADMIN_NOTICE_BOARD_VIEW_ROUTER_NAME,
      params: {noticeBoardId: noticeBoardId}
    }
  )
}
function goFreeBoardDetail(freeBoardId) {
  router.push(
    {
      name: ADMIN_FREE_BOARD_VIEW_ROUTER_NAME,
      params: {freeBoardId: freeBoardId}
    }
  )
}
function goInquireBoardDetail(inquireBoardId) {
  router.push(
    {
      name: ADMIN_INQUIRE_BOARD_VIEW_ROUTER_NAME,
      params: {inquireBoardId: inquireBoardId}
    }
  )
}

function goNoticeBoard() {
  router.push(
    {
      name: ADMIN_NOTICE_BOARD_LIST_ROUTER_NAME,
    }
  )
}
function goFreeBoard() {
  router.push(
    {
      name: ADMIN_FREE_BOARD_LIST_ROUTER_NAME,
    }
  )
}
function goInquireBoard() {
  router.push(
    {
      name: ADMIN_INQUIRE_BOARD_LIST_ROUTER_NAME,
    }
  )
}

</script>

<template>

  <v-card variant="flat" max-width="1200" class="mx-auto mt-9 mb-16 pb-16">
    <v-img
      class="mb-4"
      height="150"
      src="@/assets/logo.png"
    />
    <VRow class="match-height">
        <VCol
          cols="12"
          md="6"
        >
          <VCard class="position-relative" variant="elevated" elevation="5"  min-height="400">
              <v-card>
                <v-card-title @click="goFreeBoard" style="cursor:pointer;">자유 게시판 관리</v-card-title>
                <v-table>
                  <thead>
                  <tr>
                    <th class="text-uppercase">
                      카테고리
                    </th>
                    <th class="text-uppercase text-left"  style="width: 350px">
                      제목
                    </th>
                    <th class="text-uppercase text-center">
                      작성자
                    </th>
                  </tr>
                  </thead>

                  <tbody>
                  <tr
                    v-for="board in freeBoards"
                  >
                    <td>
                      {{ board.category }}
                    </td>
                    <td class="text-left">
                      <a @click="goFreeBoardDetail(board.freeBoardId)" style="cursor:pointer;"> {{freeBoardTitle(board.title)}}</a>
                    </td>
                    <td class="text-center">
                      {{ freeBoardOwner(board.memberName) }}
                    </td>
                  </tr>
                  </tbody>
                </v-table>
              </v-card>
          </VCard>
        </VCol>
      <VCol
        cols="12"
        md="6"
      >
        <VCard class="position-relative" variant="elevated" elevation="5" min-height="400">
          <v-card>
            <v-card-title @click="goInquireBoard" style="cursor:pointer;">문의 게시판 관리</v-card-title>
            <v-table>
              <thead>
              <tr>
                <th class="text-uppercase text-left"  style="width: 480px">
                  제목
                </th>
                <th class="text-uppercase text-center">
                  작성자
                </th>
              </tr>
              </thead>

              <tbody>
              <tr
                v-for="board in inquireBoards"
              >
                <td class="text-left">
                  <div @click="goInquireBoardDetail(board.inquireBoardId)" style="cursor:pointer;">
                    <span class="mr-3"> {{board.title}} </span>
                    <span v-if="board.isAnswered"> [답변 완료] </span>
                    <span v-else> [답변 대기] </span>
                    <span v-if="board.isSecret"> <v-icon icon="mdi-lock-outline"/></span>
                    <span v-else> <v-icon icon="mdi-lock-open-outline"/></span>
                  </div>
                </td>
                <td class="text-center">
                  {{ board.memberName }}
                </td>
              </tr>
              </tbody>
            </v-table>
          </v-card>

        </VCard>
      </VCol>
      <VCol
        cols="12"
        md="6"
      >
        <VCard class="position-relative" variant="elevated" elevation="5" min-height="400">
          <v-card>
            <v-card-title @click="goNoticeBoard" style="cursor:pointer;">공지 게시판 관리</v-card-title>
            <v-table>
              <thead>
              <tr>
                <th class="text-uppercase">
                  카테고리
                </th>
                <th class="text-uppercase text-left"  style="width: 350px">
                  제목
                </th>
                <th class="text-uppercase text-center">
                  작성자
                </th>
              </tr>
              </thead>

              <tbody>
              <tr
                v-for="board in fixedNoticeBoards"
              >
                <td>
                  {{ board.category }}
                </td>
                <td class="text-left">
                  <a @click="goNoticeBoardDetail(board.noticeBoardId)" style="cursor:pointer;"> {{board.title}}</a>
                </td>
                <td class="text-center">
                  {{ board.memberName }}
                </td>
              </tr>
              </tbody>
            </v-table>
          </v-card>
        </VCard>
      </VCol>
      <VCol
        cols="12"
        md="6"
      >
        <VCard class="position-relative" variant="elevated" elevation="5" min-height="400">
          <v-card-title>?</v-card-title>
        </VCard>
      </VCol>
    </VRow>
  </v-card>


</template>

<style scoped>

</style>
