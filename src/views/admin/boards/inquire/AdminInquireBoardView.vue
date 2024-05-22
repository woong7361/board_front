<script setup>

import {useRoute} from "vue-router";
import {getInquireBoardApi} from "@/apis/main-api.js";
import {ref, watchEffect} from "vue";
import router from "@/router";
import {
  ADMIN_INQUIRE_BOARD_LIST_ROUTER_NAME,
  INQUIRE_BOARD_EDIT_ROUTER_NAME,
  INQUIRE_BOARD_LIST_ROUTER_NAME
} from "@/constant/routeNames.js";
import BoardDetail from "@/components/grid/BoardDetail.vue";
import {blankDateFormat} from "@/compositor/dateFormat";
import ButtonDialog from "@/components/dialog/ButtonDialog.vue";
import RouteButton from "@/components/button/RouteButton.vue";
import {useAdminStore, useMemberStore} from "@/store/store";
import CommentForm from "@/components/form/CommentForm.vue";
import {
  createInquireBoardAnswerApi,
  deleteInquireBoardAnswerApi,
  deleteInquireBoardByAdminApi,
  getInquireBoardByAdminApi
} from "@/apis/admin-api";
import {boardContent, inquireAnsweredFormat, inquireNoneAnsweredFormat} from "@/compositor/stringFormat";
import {SUCCESS_CODE} from "@/constant/statusCode";

const route = useRoute()

const dialog = ref({
  board: false,
  deleteAnswer: false,
  createAnswer: false
})

const inquireBoard = ref({
  category: '',
  title: '',
  createdAt: '',
  modifiedAt: '',
  memberName: '',
  memberId: '',
  views: ''
})
const inquireAnswers = ref([]);
const inquireAnswerForm = ref({
  answer: ''
})


/**
 * 문의 게시판 게시글 조회
 * @param inquireBoardId 게시글 식별자
 * @returns {Promise<void>} 서버 응답값
 */
async function getInquireBoard(inquireBoardId) {
  const response = await getInquireBoardByAdminApi(inquireBoardId)

  if (response.status === 200) {
    inquireBoard.value = response.data.inquireBoard;
    inquireAnswers.value = response.data.inquireAnswers

    if (!!inquireAnswers.value.length) {
      inquireBoard.value.title = inquireAnsweredFormat(inquireBoard.value.title)
    } else {
      inquireBoard.value.title = inquireNoneAnsweredFormat(inquireBoard.value.title)
    }
  }
}
watchEffect(
  () => getInquireBoard(route.params.inquireBoardId)
)

/**
 * 문의게시판 검색페이지로 이동
 */
function goList() {
  router.push(
      {
        name: ADMIN_INQUIRE_BOARD_LIST_ROUTER_NAME,
        params: route.params,
      })
}

/**
 * 게시글 삭제
 * @returns {Promise<void>} 서버 응답값
 */
async function deleteBoard() {
  const response = await deleteInquireBoardByAdminApi(route.params.inquireBoardId)
    .catch(() => {dialog.value.board = true})

  if (response.status === SUCCESS_CODE) {
    goList()
  }
}

/**
 * 문의 응답 폼 제출
 * @returns {Promise<void>} 서버 응답값
 */
async function submitAnswer() {
  const response = await createInquireBoardAnswerApi(inquireAnswerForm.value, route.params.inquireBoardId)
    .catch(() => {dialog.value.createAnswer = true})

  if (response.status === SUCCESS_CODE) {
    inquireAnswerForm.value.answer = ' '
    getInquireBoard(route.params.inquireBoardId)
  }
}

/**
 * 문의 응답 삭제
 * @param inquireAnswerId 문의 답변 식별자
 * @returns {Promise<void>} 서버 응답값
 */
async function deleteAnswer(inquireAnswerId) {
  const response = await deleteInquireBoardAnswerApi(inquireAnswerId)
    .catch(() => {dialog.value.deleteAnswer = true})

  if (response.status === 200) {
    getInquireBoard(route.params.inquireBoardId)
  }
}


</script>

<template>
  <v-row>
    <v-col cols="9" class="mx-auto pa-12 pb-8 mb-10">
      <div class="text-h3 pa-10" >문의 게시판 게시글 조회</div>
      <v-card min-height="600"  variant="elevated" elevation="3" class="pb-8">

        <board-detail :board="inquireBoard" :is-answered="true"/>

        <v-card max-width="1100px"  min-height="200" class="mx-auto mt-8 pa-3"  variant="tonal">
          <v-card-title> 답변 </v-card-title>

          <comment-form
            :isDisable="false"
            @submitComment="submitAnswer"
            v-model="inquireAnswerForm.answer"
            label="답변 작성"
          />

          <div v-for="answer in inquireAnswers">
            <v-card min-height="200" class="mx-auto mt-8 ml-3 mr-3 mb-3" variant="tonal">
              <v-card-subtitle class="mt-3">
                <v-row no-gutters>
                  <v-col cols="9">
                    <v-icon icon="mdi-account"></v-icon>
                    {{answer.memberName}}
                  </v-col>
                  <v-col cols="2">
                    <v-icon icon="mdi-calendar-edit"></v-icon>
                    {{ blankDateFormat(answer.createdAt) }}
                  </v-col>
                  <v-col cols="1" class="pl-10">
                    <button-dialog v-model:dialog="dialog.deleteAnswer" title="알림" dialog-text="답변 삭제에 실패했습니다.">
                      <v-icon
                        @click="deleteAnswer(answer.inquireAnswerId)"
                        icon="mdi-close-circle-outline">
                      </v-icon>
                    </button-dialog>
                  </v-col>
                </v-row>
              </v-card-subtitle>
              <v-card-text class="ml-2 mr-2">
                <p v-html="boardContent(answer.answer)"></p>
              </v-card-text>
            </v-card>
          </div>

        </v-card>
      </v-card>

      <v-card class="mt-5 pa-3" variant="flat">
        <div class="d-flex flex-row-reverse">
          <route-button value="목록" class="ml-1" variant="outlined" @clickEvent="goList" size="large"/>
          <button-dialog v-show="useAdminStore().isLogin" dialog-title="알림" dialog-text="게시글 삭제에 실패했습니다." v-model:dialog="dialog.board">
            <route-button value="삭제" variant="outlined" @clickEvent="deleteBoard" size="large"/>
          </button-dialog>
        </div>
      </v-card>
    </v-col>
  </v-row>

  <button-dialog v-model:dialog="dialog.createAnswer" title="알림" dialog-text="답변 작성에 실패했습니다."/>
</template>

<style scoped>

</style>
