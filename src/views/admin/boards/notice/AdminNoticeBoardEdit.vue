<script setup>

import {contentRule, titleRule} from "@/compositor/rules";
import CategorySelect from "@/components/select/CategorySelect.vue";
import FormInput from "@/components/input/FormInput.vue";
import FormTextArea from "@/components/input/FormTextArea.vue";
import ButtonDialog from "@/components/dialog/ButtonDialog.vue";
import SubmitButton from "@/components/button/SubmitButton.vue";
import {ref, watchEffect} from "vue";
import {editNoticeBoardByAdminApi} from "@/apis/admin-api";
import router from "@/router";
import {ADMIN_NOTICE_BOARD_VIEW_ROUTER_NAME} from "@/constant/routeNames";
import {getFreeBoardCategoriesApi, getNoticeBoardApi, getNoticeBoardCategoriesApi} from "@/apis/main-api";
import {useRoute} from "vue-router";

const route = useRoute()
const formValidate = ref(false)
const dialog = ref(false)

/**
 * 공지 게시판 카테고리 조회
 * @type {Ref<UnwrapRef<string[]>>}
 */
const categoryList = ref(['공지', '급공지'])
async function getCategories() {
  const response = await getNoticeBoardCategoriesApi()
  categoryList.value = response.data.categories
}
getCategories()

/**
 * 공지 게시글 조회
 * @param noticeBoardId 게시글 식별자
 * @returns {Promise<void>} 서버 응답값
 */
async function getNoticeBoard(noticeBoardId) {
  const response = await getNoticeBoardApi(noticeBoardId)

  noticeBoard.value = response.data
}
watchEffect(
  () => getNoticeBoard(route.params.noticeBoardId)
)


const noticeBoard = ref({
  category: '',
  title: '',
  content: '',
  isFixed: false
})

/**
 * 공지 게시글 수정 폼 제출
 * @returns {Promise<void>} 서버 응답값
 */
async function submit() {
  const response = await editNoticeBoardByAdminApi(noticeBoard.value, route.params.noticeBoardId)
    .catch(() => {dialog.value = true})

  if (response.status === 200) {
    router.push({
      name: ADMIN_NOTICE_BOARD_VIEW_ROUTER_NAME,
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

    <v-card-title class="text-center text-h4">공지 게시글 작성</v-card-title>

    <v-form v-model="formValidate">
      <category-select v-bind:categoryList="categoryList" v-model="noticeBoard.category"></category-select>

      <form-input v-model="noticeBoard.title" :rules="titleRule" label="제목"/>

      <form-text-area v-model="noticeBoard.content" :rules="contentRule" label="본문"/>

      <v-checkbox v-model="noticeBoard.isFixed" label="상단 고정"></v-checkbox>

    </v-form>
    <button-dialog dialog-title="알림" dialog-text="게시글 수정 실패" v-model:dialog="dialog">
      <submit-button value="제출" color="black" variant="outlined" @clickEvent="submit"></submit-button>
    </button-dialog>
  </v-card>
</template>

<style scoped>

</style>
