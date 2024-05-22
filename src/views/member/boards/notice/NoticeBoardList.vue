<script setup>

import {ref, watchEffect} from "vue";
import {getFixedNoticeBoardsApi, getNoneFixedNoticeBoardsApi} from "@/apis/main-api.js";
import BoardSearch from "@/components/grid/BoardSearch.vue";
import {useRoute} from "vue-router";
import NoticeBoardListTable from "@/components/grid/NoticeBoardListTable.vue";
import PageNavigator from "@/components/nav/PageNavigator.vue";
import router from "@/router";
import {
  NOTICE_BOARD_LIST_ROUTER_NAME, NOTICE_BOARD_VIEW_ROUTER_NAME
} from "@/constant/routeNames.js";
import {useDate} from "vuetify";
import {dateToServerDateTimeFormat, searchEndDate, searchStartDate} from "@/compositor/dateFormat";
import {ALL_CATEGORY} from "@/constant/categoryConstant";
import {getFreeBoardCategories, getNoticeBoardCategories} from "@/compositor/category";

const route = useRoute()
const adapter = useDate()

const fixedNoticeBoards = ref({

})
const noneFixedNoticeBoards = ref({

})
const categories = ref([ALL_CATEGORY])

const searchParams = ref({
  startDate: adapter.parseISO(searchStartDate()),
  endDate: adapter.parseISO(searchEndDate()),
  category : ALL_CATEGORY,
  keyWord: null,

  size: import.meta.env.VITE_DEFAULT_PAGE_SIZE,
  currentPage: import.meta.env.VITE_DEFAULT_PAGE,

  orderColumn: null,
  orderType: null
})


/**
 * 고정 공지 게시글 리스트 조회
 * @returns {Promise<void>} 서버 응답값
 */
async function getFixedNoticeBoards() {
  const response = await getFixedNoticeBoardsApi()

  if (response.status === 200) {
    fixedNoticeBoards.value = response.data.fixedNoticeBoards;
  }
}
watchEffect(
  () => getFixedNoticeBoards()
)

/**
 * 고정 공지를 제외한 공지 게시글 검색
 * @param params 검색 파라미터
 * @returns {Promise<void>} 서버 응답값
 */
async function getNoneFixedNoticeBoards(params) {
  const response = await getNoneFixedNoticeBoardsApi(params)

  noneFixedNoticeBoards.value = response.data
}

/**
 * 공지 게시판 카테고리 조회
 * @returns {Promise<void>} 서버 응답값
 */
async function getCategories() {
  categories.value = await getNoticeBoardCategories()
}

watchEffect(
  () => {
    route.query.size = route.query.size ? route.query.size : import.meta.env.VITE_DEFAULT_PAGE_SIZE
    route.query.currentPage = route.query.currentPage ? route.query.currentPage : import.meta.env.VITE_DEFAULT_PAGE

    getNoneFixedNoticeBoards(route.query)
    getCategories()
  }
)

/**
 * 검색조건이 변경시 검색페이지 리로딩
 */
function search() {
  router.push({
    name: NOTICE_BOARD_LIST_ROUTER_NAME,
    query: {
      ...searchParams.value,
      startDate: dateToServerDateTimeFormat(searchParams.value.startDate, adapter),
      endDate: dateToServerDateTimeFormat(adapter.addDays(searchParams.value.endDate, 1), adapter),
    }
  })
}

/**
 * 공지 게시판 상세보기 페이지로 이동
 * @param noticeBoardId 게시글 식별자
 */
function goDetail(noticeBoardId) {
  router.push({
    name: NOTICE_BOARD_VIEW_ROUTER_NAME,
    params: {noticeBoardId: noticeBoardId},
    query: route.query,
  })
}

/**
 * 검색 페이지 이동
 * @param pageNum 페이지 넘버
 */
function goPage(pageNum) {
  router.push({
    name: NOTICE_BOARD_LIST_ROUTER_NAME,
    query: {
      ...route.query,
      currentPage: pageNum
    },
  })
}
</script>

<template>
  <v-card max-width="1200" class="mx-auto mt-9 mb-16" variant="flat" elevation="4">
    <v-card-title class="">공지게시판 목록</v-card-title>
    <board-search :categories="categories" v-model:params="searchParams" @search="search"/>

    <notice-board-list-table
      class="ml-3 pr-9"
      :fixed-boards="fixedNoticeBoards"
      :none-fixed-boards="noneFixedNoticeBoards.contents"
      @goDetail="goDetail"/>

    <page-navigator :page="noneFixedNoticeBoards" @goPage="goPage"/>
  </v-card>


</template>

<style scoped>

</style>
