<script setup>

import ContentInput from "@/components/input/FormTextArea.vue";
import {ref, watchEffect} from "vue";
import {editInquireBoardApi, getInquireBoardApi} from "@/apis/main-api.js";
import {useRoute} from "vue-router";
import router from "@/router";
import {INQUIRE_BOARD_VIEW_ROUTER_NAME} from "@/constant/routeNames.js";
import {contentRule, titleRule} from "@/compositor/rules";
import SubmitButton from "@/components/button/SubmitButton.vue";
import ButtonDialog from "@/components/dialog/ButtonDialog.vue";
import FormInput from "@/components/input/FormInput.vue";
import {SUCCESS_CODE} from "@/constant/statusCode";

const route = useRoute()

const formValidate = ref(false)
const dialog = ref(false)

/**
 * 문의게시판 조회
 * @param inquireBoardId 문의게시판 게시글 식별자
 * @returns {Promise<void>} 서버 응답값
 */
async function getInquireBoard(inquireBoardId) {
  const response = await getInquireBoardApi(inquireBoardId)

  if (response.status === SUCCESS_CODE) {
    inquireBoard.value = response.data.inquireBoard;
  }
}

/**
 * 게시글 식별자에 대한 문의게시판 조회
 */
watchEffect(
  () => getInquireBoard(route.params.inquireBoardId)
)


const inquireBoard = ref({
  title: '',
  content: '',
  isSecret: false,
})

/**
 * 문의게시판 게시글 수정폼 제출
 * @returns {Promise<void>} 서버 응답값
 */
async function submit() {
  const response = await editInquireBoardApi(inquireBoard.value, route.params.inquireBoardId)
      .catch(() => {dialog.value = true})

  if (response.status === SUCCESS_CODE) {
    router.push({
          name: INQUIRE_BOARD_VIEW_ROUTER_NAME,
          params: route.params
        })
  }
}

</script>

<template>
  <v-card
    class="mx-auto pa-12 pb-8 mt-9 mb-16"
    elevation="4"
    max-width="1000"
    rounded="lg">

    <v-card-title class="text-center text-h4 mb-6">문의 게시글 수정</v-card-title>
    <v-form v-model="formValidate">
      <form-input v-model="inquireBoard.title" :rules="titleRule" label="제목"/>

      <content-input v-model="inquireBoard.content" :rules="contentRule" label="본문"/>

      <v-checkbox v-model="inquireBoard.isSecret" label="비밀글"></v-checkbox>
    </v-form>
    <button-dialog dialog-title="알림" dialog-text="게시글 작성 실패" v-model:dialog="dialog">
      <submit-button value="제출" color="black" variant="outlined" @clickEvent="submit"></submit-button>
    </button-dialog>
  </v-card>

</template>

<style scoped>

</style>
