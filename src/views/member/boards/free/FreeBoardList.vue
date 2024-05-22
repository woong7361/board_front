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

/**
 * 자유게시판 게시글 검색
 * @param params 검색 조건
 * @returns {Promise<void>} 검색 결과
 */
async function getFreeBoards(params) {
  const response = await getFreeBoardsApi(params)
  page.value = response.data
}

/**
 * 변경 감지
 */
watchEffect(
    () => {
      route.query.size = route.query.size ? route.query.size : import.meta.env.VITE_DEFAULT_PAGE_SIZE
      route.query.currentPage = route.query.currentPage ? route.query.currentPage : import.meta.env.VITE_DEFAULT_PAGE

      getFreeBoards(route.query)
      getCategories()
    }
)

/**
 * 검색버튼을 눌렀을시 페이지 리로딩
 */
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

/**
 * 게시글 상세보기 페이지로 이동
 * @param freeBoardId 게시글 식별자
 */
function goDetail(freeBoardId) {
  router.push({
        name: FREE_BOARD_VIEW_ROUTER_NAME,
        params: {freeBoardId: freeBoardId},
        query: route.query,
      })
}

/**
 * 검색 페이지 이동
 * @param pageNum 페이지 넘버
 */
function goPage(pageNum) {
  router.push({
    name: FREE_BOARD_LIST_ROUTER_NAME,
    query: {
      ...route.query,
      currentPage: pageNum
    },
  })
}

/**
 * 게시글 생성 폼으로 이동
 */
function goCreate() {
  router.push({
    name: FREE_BOARD_FORM_ROUTER_NAME,
    query: {
      ...route.query,
    },
  })
}


const categories =  ref([ALL_CATEGORY])

/**
 * 자유게시판 카테고리 조회
 * @returns {Promise<void>} 서버 응답값
 */
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
