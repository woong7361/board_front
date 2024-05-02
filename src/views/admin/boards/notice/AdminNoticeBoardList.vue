<script setup>

import {ref, watchEffect} from "vue";
import {getFixedNoticeBoardsApi, getNoneFixedNoticeBoardsApi} from "@/apis/main-api.js";
import BoardSearch from "@/components/grid/BoardSearch.vue";
import {useRoute} from "vue-router";
import NoticeBoardListTable from "@/components/grid/NoticeBoardListTable.vue";
import PageNavigator from "@/components/nav/PageNavigator.vue";
import router from "@/router";
import {
  ADMIN_NOTICE_BOARD_FORM_ROUTER_NAME,
  ADMIN_NOTICE_BOARD_LIST_ROUTER_NAME, ADMIN_NOTICE_BOARD_VIEW_ROUTER_NAME,
  NOTICE_BOARD_LIST_ROUTER_NAME, NOTICE_BOARD_VIEW_ROUTER_NAME
} from "@/constant/routeNames.js";
import {useDate} from "vuetify";
import {searchEndDate, searchStartDate} from "@/compositor/dateFormat";
import RouteButton from "@/components/button/RouteButton.vue";
import {getFreeBoardCategories, getNoticeBoardCategories} from "@/compositor/category";

const route = useRoute()
const adapter = useDate()

const fixedNoticeBoards = ref({

})
const noneFixedNoticeBoards = ref({

})

const searchParams = ref({
  startDate: adapter.parseISO(searchStartDate()),
  endDate: adapter.parseISO(searchEndDate()),
  category : 'ALL',
  keyWord: null,

  size: 5,
  currentPage: 1,

  orderColumn: null,
  orderType: null
})

const categories = ref([])

watchEffect(
    () => getFixedNoticeBoards()
)

watchEffect(
    () => {
      route.query.size = route.query.size ? route.query.size : '5'
      route.query.currentPage = route.query.currentPage ? route.query.currentPage : '1'

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
  const startDate = adapter.toISO(searchParams.value.startDate)
  const endDate = adapter.toISO(adapter.addDays(searchParams.value.endDate, 1))

  router.push({
    name: ADMIN_NOTICE_BOARD_LIST_ROUTER_NAME,
    query: {
      ...searchParams.value,
      startDate: startDate + "T00:00:00",
      endDate: endDate + "T00:00:00"
    }
  })
}


function goDetail(noticeBoardId) {

  router.push({
    name: ADMIN_NOTICE_BOARD_VIEW_ROUTER_NAME,
    params: {noticeBoardId: noticeBoardId},
    query: route.query,
  })
}

function goPage(pageNum) {
  router.push({
    name: ADMIN_NOTICE_BOARD_LIST_ROUTER_NAME,
    query: {
      ...route.query,
      currentPage: pageNum
    },
  })
}

function goCreate() {
  router.push({
    name: ADMIN_NOTICE_BOARD_FORM_ROUTER_NAME,
    query: route.query,
  })
}
</script>

<template>
  <v-card max-width="1200" class="mx-auto mt-9 mb-16" variant="flat" elevation="4">
    <v-card-title class="">공지게시판 목록 관리</v-card-title>
    <board-search :categories="categories" v-model:params="searchParams" @search="search"/>

    <notice-board-list-table
      class="ml-3 pr-9"
      :fixed-boards="fixedNoticeBoards"
      :none-fixed-boards="noneFixedNoticeBoards.contents"
      @goDetail="goDetail"/>

    <page-navigator :page="noneFixedNoticeBoards" @goPage="goPage"/>

    <div class="d-flex flex-row-reverse">
      <route-button @clickEvent="goCreate" class="mr-5 mb-3" variant="outlined" size="large" value="공지 작성"/>
    </div>
  </v-card>


</template>

<style scoped>

</style>
