<script setup>

import FormTextArea from "@/components/input/FormTextArea.vue";
import {ref} from "vue";
import {createInquireBoardApi} from "@/apis/main-api.js";
import router from "@/router";
import {INQUIRE_BOARD_LIST_ROUTER_NAME, INQUIRE_BOARD_VIEW_ROUTER_NAME} from "@/constant/routeNames.js";
import {contentRule, titleRule} from "@/compositor/rules";
import FormInput from "@/components/input/FormInput.vue";
import SubmitButton from "@/components/button/SubmitButton.vue";
import ButtonDialog from "@/components/dialog/ButtonDialog.vue";
import {SUCCESS_CODE} from "@/constant/statusCode";

const formValidate = ref(false)
const dialog = ref(false)

const writeFormData = ref({
  title: '',
  content: '',
  isSecret: false,
    }
)

/**
 * 문의게시판 생성폼 제출
 * @returns {Promise<void>} 서버 응답값
 */
async function submit() {
  const response = await createInquireBoardApi(writeFormData.value)
      .catch(() => {dialog.value = true})

  if (response.status === SUCCESS_CODE) {
    router.push({
      name: INQUIRE_BOARD_VIEW_ROUTER_NAME,
      params: {inquireBoardId: response.data.inquireBoardId}
    });
  }
}

/**
 * 검색 페이지로 이동
 */
function goList() {
  router.push({
        name: INQUIRE_BOARD_LIST_ROUTER_NAME
      }
  )
}
</script>

<template>
  <v-card
    class="mx-auto pa-12 pb-8 mt-9 mb-16"
    elevation="4"
    max-width="1000"
    rounded="lg">

    <v-card-title class="text-center text-h4 mb-6">문의 게시글 작성</v-card-title>
    <v-form v-model="formValidate">
      <form-input v-model="writeFormData.title" :rules="titleRule" label="제목"/>

      <form-text-area v-model="writeFormData.content" :rules="contentRule" label="본문"/>

      <v-checkbox v-model="writeFormData.isSecret" label="비밀글"></v-checkbox>
    </v-form>
    <button-dialog dialog-title="알림" dialog-text="게시글 작성 실패" v-model:dialog="dialog">
      <submit-button value="제출" color="black" variant="outlined" @clickEvent="submit"></submit-button>
    </button-dialog>
  </v-card>
</template>

<style scoped>

</style>
