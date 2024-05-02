<script setup>

import {getFixedNoticeBoardsApi, getFreeBoardsApi, getInquireBoardsApi} from "@/apis/main-api";
import {ref, watchEffect} from "vue";
import {useDate} from "vuetify";
import router from "@/router";
import {
  FREE_BOARD_LIST_ROUTER_NAME,
  FREE_BOARD_VIEW_ROUTER_NAME, INQUIRE_BOARD_LIST_ROUTER_NAME,
  INQUIRE_BOARD_VIEW_ROUTER_NAME, NOTICE_BOARD_LIST_ROUTER_NAME,
  NOTICE_BOARD_VIEW_ROUTER_NAME
} from "@/constant/routeNames";
import {searchEndDateTime, searchStartDateTime} from "@/compositor/dateFormat";
import {ALL_CATEGORY} from "@/constant/categoryConstant";
import {SUCCESS_CODE} from "@/constant/statusCode";
import {
  freeBoardOwner,
  freeBoardTitle,
  inquireAnsweredFormat,
  inquireNoneAnsweredFormat
} from "@/compositor/stringFormat";
import {
  ADMIN_FREE_BOARD_LIST_ROUTE_URL,
  FREE_BOARD_VIEW_ROUTE_URL,
  INQUIRE_BOARD_VIEW_ROUTE_URL, NOTICE_BOARD_VIEW_ROUTE_URL
} from "@/constant/routeUrlConstant";


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

  if (response.status === SUCCESS_CODE) {
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

function goNoticeBoard() {
  router.push(
    {name: NOTICE_BOARD_LIST_ROUTER_NAME,}
  )
}
function goFreeBoard() {
  router.push(
    {name: FREE_BOARD_LIST_ROUTER_NAME,}
  )
}
function goInquireBoard() {
  router.push(
    {name: INQUIRE_BOARD_LIST_ROUTER_NAME,}
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
                <v-card-title @click="goFreeBoard" style="cursor:pointer;">자유 게시판</v-card-title>
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
                      <router-link v-bind:to=FREE_BOARD_VIEW_ROUTE_URL(board.freeBoardId) style="text-decoration: none; color: black">
                        {{freeBoardTitle(board.title)}}
                      </router-link>
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
            <v-card-title @click="goInquireBoard" style="cursor:pointer;">문의 게시판</v-card-title>
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
                  <router-link v-bind:to=INQUIRE_BOARD_VIEW_ROUTE_URL(board.inquireBoardId) style="text-decoration: none; color: black">
                    <span v-if="board.isAnswered" class="ml-3"> {{ inquireAnsweredFormat(board.title) }} </span>
                    <span v-else class="ml-3"> {{inquireNoneAnsweredFormat(board.title)}}  </span>
                    <span v-if="board.isSecret"> <v-icon icon="mdi-lock-outline"/></span>
                    <span v-else> <v-icon icon="mdi-lock-open-outline"/></span>
                  </router-link>
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
            <v-card-title @click="goNoticeBoard" style="cursor:pointer;">공지 게시판</v-card-title>
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
                  <router-link v-bind:to=NOTICE_BOARD_VIEW_ROUTE_URL(board.noticeBoardId) style="text-decoration: none; color: black">
                   {{board.title}}
                  </router-link>
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
          <v-img
            color="surface-variant"
            height="400"
            src="https://cdn.vuetifyjs.com/docs/images/cards/purple-flowers.jpg"
            cover
          >
          </v-img>
        </VCard>
      </VCol>
    </VRow>
  </v-card>


</template>

<style scoped>

</style>
