<script setup>

import {useRoute} from "vue-router";
import {computed, ref, watchEffect} from "vue";
import {getInquireBoardsApi} from "@/apis/main-api.js";
import InquireBoardListTable from "@/components/grid/InquireBoardListTable.vue";
import PageNavigator from "@/components/nav/PageNavigator.vue";
import router from "@/router";
import {
  ADMIN_INQUIRE_BOARD_FORM_ROUTER_NAME,
  ADMIN_INQUIRE_BOARD_LIST_ROUTER_NAME, ADMIN_INQUIRE_BOARD_VIEW_ROUTER_NAME,
  INQUIRE_BOARD_FORM_ROUTER_NAME, INQUIRE_BOARD_LIST_ROUTER_NAME,
  INQUIRE_BOARD_VIEW_ROUTER_NAME,
} from "@/constant/routeNames.js";
import BoardSearch from "@/components/grid/BoardSearch.vue";
import {useDate} from "vuetify";
import RouteButton from "@/components/button/RouteButton.vue";
import {dateToServerDateTimeFormat, searchEndDate, searchStartDate} from "@/compositor/dateFormat";
import {useAdminStore, useMemberStore} from "@/store/store";

const route = useRoute()
const adapter = useDate()

const inquireBoards = ref({
  contents: [],
  pageOffset: '',
  currentPage: '',
  totalCount: '',
  contentSize: '',
  pageSize: ''

})

const searchParams = ref({
  startDate: adapter.parseISO(searchStartDate()),
  endDate: adapter.parseISO(searchEndDate()),

  keyWord: null,
  onlyMine: false,
  searchMemberId: null,

  size: import.meta.env.VITE_DEFAULT_PAGE_SIZE,
  currentPage: import.meta.env.VITE_DEFAULT_PAGE,

  orderColumn: null,
  orderType: null
})

watchEffect(() => {
  if (searchParams.value.onlyMine === true) {
    searchParams.value.searchMemberId = useAdminStore().memberId;
  } else {
    searchParams.value.searchMemberId = null
  }
})


watchEffect(
    () => {
      route.query.size = route.query.size ? route.query.size : import.meta.env.VITE_DEFAULT_PAGE_SIZE
      route.query.currentPage = route.query.currentPage ? route.query.currentPage : import.meta.env.VITE_DEFAULT_PAGE

      getInquireBoards(route.query)
    }
)

/**
 * 문의게시판 게시글 검색
 * @param params 검색 파라미터
 * @returns {Promise<void>} 서버 응답값
 */
async function getInquireBoards(params) {
  const response = await getInquireBoardsApi(params)

  inquireBoards.value = response.data
}


/**
 * 검색시 검색 페이지 리로딩
 */
function search() {
  router.push({
    name: ADMIN_INQUIRE_BOARD_LIST_ROUTER_NAME,
    query: {
      ...searchParams.value,
      startDate: dateToServerDateTimeFormat(searchParams.value.startDate, adapter),
      endDate: dateToServerDateTimeFormat(adapter.addDays(searchParams.value.endDate, 1), adapter),
    }
  })
}

/**
 * 게시글 상세보기 페이지로 이동
 * @param inquireBoardId 게시글 식별자
 */
function goDetail(inquireBoardId) {
  router.push({
    name: ADMIN_INQUIRE_BOARD_VIEW_ROUTER_NAME,
    params: {inquireBoardId: inquireBoardId},
    query: route.query
  })
}

/**
 * 검색 페이지 이동
 * @param pageNum 페이지 넘버
 */
function goPage(pageNum) {
  router.push({
    name: ADMIN_INQUIRE_BOARD_LIST_ROUTER_NAME,
    query: {
      ...route.query,
      currentPage: pageNum
    },
  })
}

</script>

<template>
  <v-card max-width="1200" class="mx-auto mt-9 mb-16" variant="flat" elevation="4">
    <v-card-title class="">문의게시판 목록 관리</v-card-title>

    <board-search
      v-model:params="searchParams"
      type="inquire"
      @search="search"/>

    <inquire-board-list-table
      class="ml-3 pr-9"
      :inquire-boards="inquireBoards.contents"
      @goDetail="goDetail"/>

    <page-navigator :page="inquireBoards" @goPage="goPage"/>

  </v-card>

</template>

<style scoped>

</style>
