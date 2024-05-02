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


watchEffect(
    () => getFixedNoticeBoards()
)

watchEffect(
    () => {
      route.query.size = route.query.size ? route.query.size : import.meta.env.VITE_DEFAULT_PAGE_SIZE
      route.query.currentPage = route.query.currentPage ? route.query.currentPage : import.meta.env.VITE_DEFAULT_PAGE

      getNoneFixedNoticeBoards(route.query)
      getCategories()
    }
)

async function getFixedNoticeBoards() {
  const response = await getFixedNoticeBoardsApi()

  if (response.status === 200) {
    fixedNoticeBoards.value = response.data.fixedNoticeBoards;
  }
}

async function getNoneFixedNoticeBoards(params) {
  const response = await getNoneFixedNoticeBoardsApi(params)

  noneFixedNoticeBoards.value = response.data
}

async function getCategories() {
  categories.value = await getNoticeBoardCategories()
}

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


function goDetail(noticeBoardId) {

  router.push({
    name: NOTICE_BOARD_VIEW_ROUTER_NAME,
    params: {noticeBoardId: noticeBoardId},
    query: route.query,
  })
}

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
