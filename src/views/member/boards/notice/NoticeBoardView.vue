<script setup>

import {ref, watchEffect} from "vue";
import {getNoticeBoardApi} from "@/apis/main-api.js";
import {useRoute} from "vue-router";
import RouteButton from "@/components/button/RouteButton.vue";
import BoardDetail from "@/components/grid/BoardDetail.vue";
import ButtonDialog from "@/components/dialog/ButtonDialog.vue";
import {useMemberStore} from "@/store/store";
import router from "@/router";
import {NOTICE_BOARD_LIST_ROUTER_NAME, NOTICE_BOARD_VIEW_ROUTER_NAME} from "@/constant/routeNames";

const route = useRoute()
const memberStore = useMemberStore()

const dialog = ref(false)

const noticeBoard = ref({
  noticeBoardId: '',
  category: '',
  title: '',
  content: '',
  views: '',
  createdAt: '',
  modifiedAt: '',
  memberName: '',
  memberId: ''
})

watchEffect(
    () => getNoticeBoard(route.params.noticeBoardId)
)

async function getNoticeBoard(noticeBoardId) {
  const response = await getNoticeBoardApi(noticeBoardId)

  noticeBoard.value = response.data
}

function goList() {
  router.push({
    name: NOTICE_BOARD_LIST_ROUTER_NAME,
    query: {
      ...route.query,
    },
  })
}
</script>

<template>

  <v-row>
    <v-col cols="9" class="mx-auto pa-12 pb-8 mb-10">
      <div class="text-h3 pa-10" >공지 게시판 게시글 조회</div>

      <v-card min-height="600" class="ml-8"  elevation="2" variant="flat">
        <board-detail :board="noticeBoard"/>
      </v-card>

      <v-card class="mt-5 pa-3" variant="flat">
        <div class="d-flex flex-row-reverse">
          <route-button value="목록" class="ml-1" variant="outlined" @clickEvent="goList" size="large"/>
        </div>
      </v-card>

    </v-col>
  </v-row>

</template>

<style scoped>

</style>
