<script setup>

import {useRoute} from "vue-router";
import {computed, ref, watchEffect} from "vue";
import {getInquireBoardsApi} from "@/apis/main-api.js";
import InquireBoardListTable from "@/components/grid/InquireBoardListTable.vue";
import PageNavigator from "@/components/nav/PageNavigator.vue";
import router from "@/router";
import {
  FREE_BOARD_LIST_ROUTER_NAME,
  INQUIRE_BOARD_FORM_ROUTER_NAME, INQUIRE_BOARD_LIST_ROUTER_NAME,
  INQUIRE_BOARD_VIEW_ROUTER_NAME,
} from "@/constant/routeNames.js";
import BoardSearch from "@/components/grid/BoardSearch.vue";
import {useDate} from "vuetify";
import RouteButton from "@/components/button/RouteButton.vue";
import {dateToServerDateTimeFormat, searchEndDate, searchStartDate} from "@/compositor/dateFormat";
import {useMemberStore} from "@/store/store";
import Dialog from "@/components/dialog/Dialog.vue";

const route = useRoute()
const adapter = useDate()

const dialog = ref(false)

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
    searchParams.value.searchMemberId = useMemberStore().memberId;
  } else {
    searchParams.value.searchMemberId = null
  }
})


/**
 * 문의 게시판 게시글 검색
 * @param params 게시글 검색 파라미터
 * @returns {Promise<void>} 서버 응답값
 */
async function getInquireBoards(params) {
  const response = await getInquireBoardsApi(params)

  inquireBoards.value = response.data
}

watchEffect(
    () => {
      route.query.size = route.query.size ? route.query.size : import.meta.env.VITE_DEFAULT_PAGE_SIZE
      route.query.currentPage = route.query.currentPage ? route.query.currentPage : import.meta.env.VITE_DEFAULT_PAGE

      getInquireBoards(route.query)
    }
)


/**
 * 검색 버튼을 눌렀을때 검색 페이지로 리로딩
 */
function search() {
  router.push({
    name: INQUIRE_BOARD_LIST_ROUTER_NAME,
    query: {
      ...searchParams.value,
      startDate: dateToServerDateTimeFormat(searchParams.value.startDate, adapter),
      endDate: dateToServerDateTimeFormat(adapter.addDays(searchParams.value.endDate, 1), adapter),
    }
  })
}

/**
 * 문의게시판 생성 폼 페이지로 이동
 */
function goCreate() {
  router.push({
    name: INQUIRE_BOARD_FORM_ROUTER_NAME
      }
  )
}

/**
 * 문의 게시글 상세보기 페이지로 이동
 * @param inquireBoardId 게시글 식별자
 * @param isAllow 권한 여부
 */
function goDetail(inquireBoardId, isAllow) {
  if (isAllow) {
    router.push({
      name: INQUIRE_BOARD_VIEW_ROUTER_NAME,
      params: {inquireBoardId: inquireBoardId},
      query: route.query
    });
  } else {
    dialog.value = true
  }
}

/**
 * 검색 페이지 이동
 * @param pageNum 페이시 넘버
 */
function goPage(pageNum) {
  router.push({
    name: INQUIRE_BOARD_LIST_ROUTER_NAME,
    query: {
      ...route.query,
      currentPage: pageNum
    },
  })
}
</script>

<template>
  <v-card max-width="1200" class="mx-auto mt-9 mb-16" variant="flat" elevation="4">
    <v-card-title class="">문의게시판 목록</v-card-title>

    <board-search v-model:params="searchParams" type="inquire" @search="search"></board-search>

    <inquire-board-list-table class="ml-3 pr-9" :inquire-boards="inquireBoards.contents" @goDetail="goDetail"/>

    <page-navigator :page="inquireBoards" @goPage="goPage"/>

    <div class="d-flex flex-row-reverse">
      <route-button @clickEvent="goCreate" class="mr-5 mb-3" variant="outlined" size="large" value="게시글 작성"/>
    </div>
  </v-card>

  <Dialog v-model:dialog="dialog" dialog-title="알림" dialog-text="접근권한이 없습니다."/>
</template>

<style scoped>

</style>
