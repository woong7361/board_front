<script setup>

import {computed, ref, watchEffect} from "vue";
import {getFreeBoardsApi} from "@/apis/main-api.js";
import FreeBoardSearch from "@/components/grid/BoardSearch.vue";
import {useRoute} from "vue-router";
import FreeBoardListTable from "@/components/grid/FreeBoardListTable.vue";
import router from "@/router";
import {
  FREE_BOARD_FORM_ROUTER_NAME,
  FREE_BOARD_LIST_ROUTER_NAME,
  FREE_BOARD_VIEW_ROUTER_NAME
} from "@/constant/routeNames.js";
import PageNavigator from "@/components/nav/PageNavigator.vue";
import { useDate } from 'vuetify'
import RouteButton from "@/components/button/RouteButton.vue";
import {
  dateToServerDateTimeFormat,
  searchEndDate,
  searchStartDate
} from "@/compositor/dateFormat";
import {ALL_CATEGORY} from "@/constant/categoryConstant";
import {getFreeBoardCategories} from "@/compositor/category";

const route = useRoute();
const adapter = useDate()

const categories =  ref([ALL_CATEGORY])

const searchParams = ref({
  startDate: adapter.parseISO(searchStartDate()),
  endDate: adapter.parseISO(searchEndDate()),

  category: ALL_CATEGORY,
  keyWord: null,

  size: import.meta.env.VITE_DEFAULT_PAGE_SIZE,
  currentPage: import.meta.env.VITE_DEFAULT_PAGE,

  orderColumn: null,
  orderType: null
})

const page = ref({
  contents:[{
    freeBoardId: '',
    category: '',
    title: '',
    content: '',
    views: '',
    createdAt: '',
    modifiedAt: '',
    memberName: '',
    memberId: ''
  }],

  pageOffset: '',
  currentPage: '',
  totalCount: '',
  contentSize: '',
  pageSize: ''
});

watchEffect(
    () => {
      route.query.size = route.query.size ? route.query.size : import.meta.env.VITE_DEFAULT_PAGE_SIZE
      route.query.currentPage = route.query.currentPage ? route.query.currentPage : import.meta.env.VITE_DEFAULT_PAGE

      getFreeBoards(route.query)
      getCategories()
    }
)

function search() {
  router.push({
    name: FREE_BOARD_LIST_ROUTER_NAME,
    query: {
      ...searchParams.value,
      startDate: dateToServerDateTimeFormat(searchParams.value.startDate, adapter),
      endDate: dateToServerDateTimeFormat(adapter.addDays(searchParams.value.endDate, 1), adapter),
    }
  })
}

function goDetail(freeBoardId) {
  router.push({
        name: FREE_BOARD_VIEW_ROUTER_NAME,
        params: {freeBoardId: freeBoardId},
        query: route.query,
      })
}

function goPage(pageNum) {
  router.push({
    name: FREE_BOARD_LIST_ROUTER_NAME,
    query: {
      ...route.query,
      currentPage: pageNum
    },
  })
}

function goCreate() {
  router.push({
    name: FREE_BOARD_FORM_ROUTER_NAME,
    query: {
      ...route.query,
    },
  })
}

async function getFreeBoards(params) {
  const response = await getFreeBoardsApi(params)
  page.value = response.data
}


async function getCategories() {
  categories.value = await getFreeBoardCategories()
}


</script>

<template>
  <v-card max-width="1200" class="mx-auto mt-9 mb-16" variant="flat" elevation="4">
    <v-card-title class="">자유게시판 목록</v-card-title>

    <free-board-search v-model:params="searchParams" :categories="categories" @search="search"/>

    <free-board-list-table class="ml-3 pr-9" :freeBoards="page.contents" @goDetail="goDetail"/>

    <page-navigator :page="page" @goPage="goPage"/>

    <div class="d-flex flex-row-reverse">
      <route-button @clickEvent="goCreate" class="mr-5 mb-3" variant="outlined" size="large" value="글 작성"/>
    </div>

  </v-card>
</template>

<style scoped>

</style>
