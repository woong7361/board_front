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
import ButtonDialog from "@/components/dialog/ButtonDialog.vue";
import {useMemberStore} from "@/store/store";


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

const dialog = ref(false);

const freeBoards = ref({
})
const inquireBoards = ref({
})
const fixedNoticeBoards = ref({
})

/**
 * 자유게시판 게시글 리스트 조회
 * @param params 검색 파라미터
 * @returns {Promise<void>} 서버 응답값
 */
async function getFreeBoards(params) {
  const response = await getFreeBoardsApi(params)
  freeBoards.value = response.data.contents
}

/**
 * 문의 게시판 게시글 리스트 조회
 * @param params 검색 파라미터
 * @returns {Promise<void>} 서버 응답값
 */
async function getInquireBoards(params) {
  const response = await getInquireBoardsApi(params)

  inquireBoards.value = response.data.contents
}

/**
 * 고정 공지게시글 리스트 조회
 * @returns {Promise<void>} 서버 응답값
 */
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

/**
 * 공지 게시판으로 이동
 */
function goNoticeBoard() {
  router.push(
    {name: NOTICE_BOARD_LIST_ROUTER_NAME,}
  )
}

/**
 * 자유 게시판으로 이동
 */
function goFreeBoard() {
  router.push(
    {name: FREE_BOARD_LIST_ROUTER_NAME,}
  )
}

/**
 * 문의 게시판으로 이동
 */
function goInquireBoard() {
  router.push(
    {name: INQUIRE_BOARD_LIST_ROUTER_NAME,}
  )
}

/**
 * 문의 게시판 상세보기 페이지로 이동
 * @param inquireBoardId 게시글 식별자
 * @param memberId 작성자 식별자
 * @param isSecret 비밀글 여부
 */
function goInquireBoardDetail(inquireBoardId, memberId, isSecret) {
  if (!!isSecret && memberId !== useMemberStore().memberId) {
    dialog.value = true
    return
  }

  router.push({
    name: INQUIRE_BOARD_VIEW_ROUTER_NAME,
    params: {inquireBoardId: inquireBoardId}
  });
}

</script>

<template>

  <v-card variant="flat" max-width="1500" class="mx-auto mt-9 mb-16 pb-16">
    <v-img
      class="mb-4"
      height="150"
      src="@/assets/logo.png"
    />
    <VRow class="match-height">
        <VCol
          cols="12"
          md="4"
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
        md="4"
      >
        <VCard class="position-relative" variant="elevated" elevation="5" min-height="400">
          <v-card>
            <v-card-title @click="goInquireBoard" style="cursor:pointer;">문의 게시판</v-card-title>
            <v-table>
              <thead>
              <tr>
                <th class="text-uppercase text-left"  style="width: 4480px">
                  제목
                </th>
                <th class="text-uppercase text-center">
                  작성자
                </th>
              </tr>
              </thead>

              <tbody>
              <tr v-for="board in inquireBoards">
                <td class="text-left" @click="goInquireBoardDetail(board.inquireBoardId, board.memberId, board.isSecret)" style="cursor:pointer;">
                  <span v-if="board.isAnswered"> {{inquireAnsweredFormat(board.title)}} </span>
                  <span v-else> {{inquireNoneAnsweredFormat(board.title)}}  </span>
                  <span v-if="board.isSecret"> <v-icon icon="mdi-lock-outline"/></span>
                  <span v-else> <v-icon icon="mdi-lock-open-outline"/></span>
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
        md="4"
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
    </VRow>
  </v-card>

  <button-dialog v-model:dialog="dialog" dialog-title="알림" dialog-text="접근권한이 부족합니다."/>



</template>

<style scoped>

</style>
