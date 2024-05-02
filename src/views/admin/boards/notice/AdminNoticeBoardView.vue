<script setup>

import {ref, watchEffect} from "vue";
import {getNoticeBoardApi} from "@/apis/main-api.js";
import {useRoute} from "vue-router";
import RouteButton from "@/components/button/RouteButton.vue";
import BoardDetail from "@/components/grid/BoardDetail.vue";
import ButtonDialog from "@/components/dialog/ButtonDialog.vue";
import {useAdminStore, useMemberStore} from "@/store/store";
import router from "@/router";
import {
  ADMIN_NOTICE_BOARD_EDIT_ROUTER_NAME,
  ADMIN_NOTICE_BOARD_LIST_ROUTER_NAME,
  ADMIN_NOTICE_BOARD_VIEW_ROUTER_NAME,
  NOTICE_BOARD_VIEW_ROUTER_NAME
} from "@/constant/routeNames";
import {deleteNoticeBoardByAdminAPi} from "@/apis/admin-api";

const route = useRoute()

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
    name: ADMIN_NOTICE_BOARD_LIST_ROUTER_NAME,
    query: {
      ...route.query,
    },
  })
}

function goEdit() {
  router.push({
    name: ADMIN_NOTICE_BOARD_EDIT_ROUTER_NAME,
    query: {
      ...route.query,
    },
    params: route.params
  })

}

async function deleteBoard() {
  const response = await deleteNoticeBoardByAdminAPi(route.params.noticeBoardId)
    .catch(() => {dialog.value = true})

  if (response.status === 200) {
    goList()
  }
}
</script>

<template>
  <v-row>
    <v-col cols="9" class="mx-auto pa-12 pb-8 mb-10">
      <div class="text-h3 pa-10" >공지 게시판 게시글 조회</div>
      <v-card min-height="600"  elevation="2" variant="flat">
        <board-detail :board="noticeBoard"/>
      </v-card>

      <v-card class="mt-5 pa-3" variant="flat">
        <div class="d-flex flex-row-reverse">
          <route-button value="목록" class="ml-1" variant="outlined" @clickEvent="goList" size="large"/>
          <route-button v-show="useAdminStore().isLogin" value="수정" class="ml-1" variant="outlined" @clickEvent="goEdit" size="large"/>
          <button-dialog v-show="useAdminStore().isLogin" dialog-title="알림" dialog-text="게시글 삭제 실패" v-model:dialog="dialog">
            <route-button value="삭제" variant="outlined" @clickEvent="deleteBoard" size="large"/>
          </button-dialog>
        </div>
      </v-card>

    </v-col>
  </v-row>

</template>

<style scoped>

</style>
