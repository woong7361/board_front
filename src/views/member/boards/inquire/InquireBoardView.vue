<script setup>

import {useRoute} from "vue-router";
import {deleteInquireBoardApi, getInquireBoardApi} from "@/apis/main-api.js";
import {ref, watchEffect} from "vue";
import router from "@/router";
import {INQUIRE_BOARD_EDIT_ROUTER_NAME, INQUIRE_BOARD_LIST_ROUTER_NAME} from "@/constant/routeNames.js";
import BoardDetail from "@/components/grid/BoardDetail.vue";
import {blankDateFormat} from "@/compositor/dateFormat";
import ButtonDialog from "@/components/dialog/ButtonDialog.vue";
import RouteButton from "@/components/button/RouteButton.vue";
import {useMemberStore} from "@/store/store";
import {SUCCESS_CODE} from "@/constant/statusCode";
import {boardContent, inquireAnsweredFormat, inquireNoneAnsweredFormat} from "@/compositor/stringFormat";

const route = useRoute()
const memberStore = useMemberStore()

const dialog = ref(false)

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

watchEffect(
    () => getInquireBoard(route.params.inquireBoardId)
)

async function getInquireBoard(inquireBoardId) {
  const response = await getInquireBoardApi(inquireBoardId)

  if (response.status === SUCCESS_CODE) {
    inquireBoard.value = response.data.inquireBoard;
    inquireAnswers.value = response.data.inquireAnswers

    if (!!inquireAnswers.value.length) {
      inquireBoard.value.title = inquireAnsweredFormat(inquireBoard.value.title)
    } else {
      inquireBoard.value.title = inquireNoneAnsweredFormat(inquireBoard.value.title)
    }
  }
}

function goList() {
  router.push(
      {
        name: INQUIRE_BOARD_LIST_ROUTER_NAME,
        params: route.params,
      })
}

function goEdit() {
  router.push({
        name: INQUIRE_BOARD_EDIT_ROUTER_NAME
      }
  )
}

async function deleteBoard() {
  const response = await deleteInquireBoardApi(route.params.inquireBoardId)
    .catch(() => {dialog.value = true})

  if (response.status === SUCCESS_CODE) {
    router.push({
        name: INQUIRE_BOARD_LIST_ROUTER_NAME,
        query: route.query
      }
    )
  }
}


</script>

<template>
  <v-row>
    <v-col cols="9" class="mx-auto pa-12 pb-8 mb-10">
      <div class="text-h3 pa-10" >문의 게시판 게시글 조회</div>
      <v-card min-height="600"  variant="elevated">

        <board-detail :board="inquireBoard" :is-answered="true"/>

        <v-card max-width="1100px"  min-height="200" class="mx-auto mt-8 mb-8" variant="outlined">
          <v-card-title> 답변 </v-card-title>

          <div v-if="!!inquireAnswers.length" v-for="answer in inquireAnswers">
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
                </v-row>
              </v-card-subtitle>
              <v-card-text class="ml-2 mr-2">
                <p v-html="boardContent(answer.answer)"></p>
              </v-card-text>
            </v-card>
          </div>

          <div v-else>
            <v-card  min-height="200" class="mx-auto mt-8 ml-3 mr-3 mb-3" variant="tonal">
              <v-card-subtitle class="mt-3">
              </v-card-subtitle>
              <v-card-subtitle class="ml-2 mr-2 mt-16 text-center text-h6">답변 대기중...</v-card-subtitle>
            </v-card>
          </div>
        </v-card>
      </v-card>

      <v-card class="mt-5 pa-3" variant="flat">
        <div class="d-flex flex-row-reverse">
          <route-button value="목록" class="ml-1" variant="outlined" @clickEvent="goList" size="large"/>
          <route-button v-show="memberStore.memberId === inquireBoard.memberId" value="수정" class="ml-1" variant="outlined" @clickEvent="goEdit" size="large"/>
          <button-dialog v-show="memberStore.memberId === inquireBoard.memberId" dialog-title="알림" dialog-text="게시글 삭제 실패" v-model:dialog="dialog">
            <route-button value="삭제" variant="outlined" @clickEvent="deleteBoard" size="large"/>
          </button-dialog>
        </div>
      </v-card>
    </v-col>
  </v-row>
</template>

<style scoped>

</style>
