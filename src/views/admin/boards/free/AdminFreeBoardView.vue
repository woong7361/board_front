<script setup>
import {
  createFreeBoardCommentApi, deleteCommentApi, deleteFreeBoardApi, downloadFileApi,
  getFreeBoardApi,
  getFreeBoardCommentsApi,
  getFreeBoardFilesApi
} from "@/apis/main-api.js";
import {useRoute} from "vue-router";
import {ref, watchEffect} from "vue";
import FreeBoardDetail from "@/components/grid/BoardDetail.vue";
import FreeBoardComment from "@/components/grid/FreeBoardComment.vue";
import CommentForm from "@/components/form/CommentForm.vue";
import FreeBoardFile from "@/components/grid/FreeBoardFile.vue";
import router from "@/router";
import {
  ADMIN_FREE_BOARD_EDIT_ROUTER_NAME,
  ADMIN_FREE_BOARD_LIST_ROUTER_NAME,
  FREE_BOARD_EDIT_ROUTER_NAME,
  FREE_BOARD_LIST_ROUTER_NAME
} from "@/constant/routeNames.js";
import RouteButton from "@/components/button/RouteButton.vue";
import ButtonDialog from "@/components/dialog/ButtonDialog.vue";
import {useAdminStore, useMemberStore} from "@/store/store";
import {createCommentByAdminApi, deleteCommentByAdminApi, deleteFreeBoardByAdminApi} from "@/apis/admin-api";
import axios from "axios";
import {CREATE_FREE_BOARD_COMMENT_BY_ADMIN_URL} from "@/constant/urlConstant";
import {SUCCESS_CODE} from "@/constant/statusCode";

const route = useRoute()

const freeBoard = ref({
  freeBoardId: '',
  category: '',
  title: '',
  content: '',
  views: '',
  createdAt: '',
  modifiedAt: '',
  memberName: '',
  memberId: ''
})

const comments = ref(
    {comments: [
        {
          commentId: '',
          freeBoardId: '',
          content: '',
          createdAt: '',
          modifiedAt: '',
          memberName: '',
          memberId: '',
        },
      ]}
);
const files = ref([{
  fileId: '',
  freeBoardId: '',
  originalName: ''
}]);

const commentFormData = ref({
  content: ''
});

const dialog = ref({
  board: false,
  comment: false
})

watchEffect(
    () => getFreeBoard()
)

watchEffect(
    () => getComments()
)

watchEffect(
    () => getFiles()
)

async function submitComment() {
  const response = await createCommentByAdminApi(route.params.freeBoardId, commentFormData.value)

  if (response.status === SUCCESS_CODE) {
    commentFormData.value.content = ' '
    await getComments();
  }
}

async function fileDownload(fileId) {
  await downloadFileApi(fileId)
}

async function deleteBoard() {
  const response = await deleteFreeBoardByAdminApi(route.params.freeBoardId)
    .catch(() => {dialog.value.board = true})

  if (response) {
    goList()
  }
}

async function deleteComment(commentId) {
  const response = await deleteCommentByAdminApi(commentId)
    .catch(() => {dialog.value.comment = true})

  if (response) {
    await getComments()
  }
}

function goList() {
  router.push({
    name: ADMIN_FREE_BOARD_LIST_ROUTER_NAME,
    query: {
      ...route.query,
    },
  })
}

function goEdit() {
  router.push({
    name: ADMIN_FREE_BOARD_EDIT_ROUTER_NAME,
    params: route.params
  })
}

async function getFreeBoard() {
  const response = await getFreeBoardApi(route.params.freeBoardId);
  freeBoard.value = response.data
}

async function getComments() {
  const response = await getFreeBoardCommentsApi(route.params.freeBoardId)
  comments.value = response.data
}

async function getFiles() {
  const response = await getFreeBoardFilesApi(route.params.freeBoardId)
  files.value = response.data
}
</script>

<template>
  <v-row>
    <v-col cols="9" class="mx-auto pa-12 pb-8 mb-10">
      <div class="text-h3 pa-10" >자유게시판 게시글 조회</div>
      <v-card min-height="800"  elevation="2" variant="flat">
        <free-board-detail :board="freeBoard"/>

        <free-board-file :files="files" @fileDownload="fileDownload"/>

        <v-card max-width="1100px" min-height="100px" class="mx-auto pa-3 pb-3 mt-10 mb-10" variant="tonal">
          <v-card-title>댓글</v-card-title>

          <comment-form :isDisable="false" v-model="commentFormData.content" @submitComment="submitComment" label="댓글 작성"/>

          <free-board-comment :comments="comments" v-model="dialog.comment" @remove-comment="deleteComment"></free-board-comment>
        </v-card>
      </v-card>

      <v-card class="mt-5 pa-3" variant="flat">
        <div class="d-flex flex-row-reverse">
          <route-button value="목록" class="ml-1" variant="outlined" @clickEvent="goList" size="large"/>
          <route-button v-show="useAdminStore().memberId == freeBoard.memberId" value="수정" class="ml-1" variant="outlined" @clickEvent="goEdit" size="large"/>
          <button-dialog v-show="useAdminStore().isLogin" dialog-title="알림" dialog-text="게시글 삭제 실패" v-model:dialog="dialog.board">
            <route-button value="삭제" variant="outlined" @clickEvent="deleteBoard" size="large"/>
          </button-dialog>
        </div>
      </v-card>

    </v-col>
  </v-row>

</template>

<style scoped>

</style>
