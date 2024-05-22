<script setup>

import {contentRule, titleRule} from "@/compositor/rules";
import {ref} from "vue";
import FormInput from "@/components/input/FormInput.vue";
import ButtonDialog from "@/components/dialog/ButtonDialog.vue";
import SubmitButton from "@/components/button/SubmitButton.vue";
import FormTextArea from "@/components/input/FormTextArea.vue";
import {createNoticeBoardByAdminApi} from "@/apis/admin-api";
import router from "@/router";
import {ADMIN_NOTICE_BOARD_VIEW_ROUTER_NAME} from "@/constant/routeNames";
import CategorySelect from "@/components/select/CategorySelect.vue";
import {getFreeBoardCategoriesApi, getNoticeBoardCategoriesApi} from "@/apis/main-api";

const formValidate = ref(false)
const dialog = ref(false)


/**
 * 공지 게시판 카테고리 조회
 * @type {Ref<UnwrapRef<*[]>>} 서버 응답값
 */
const categoryList = ref([])
async function getCategories() {
  const response = await getNoticeBoardCategoriesApi()
  categoryList.value = response.data.categories
  writeFormData.value.category = categoryList.value[0]
}
getCategories()


const writeFormData = ref({
  category: '',
  title: '',
  content: '',
  isFixed: false
})

/**
 * 공지 게시글 생성 폼 제출
 * @returns {Promise<void>} 서버 응답값
 */
async function submit() {
  const response = await createNoticeBoardByAdminApi(writeFormData.value)
    .catch(() => {dialog.value = true})

  if (response.status === 200) {
    router.push({
      name: ADMIN_NOTICE_BOARD_VIEW_ROUTER_NAME,
      params: {noticeBoardId: response.data.noticeBoardId}
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
      <category-select v-bind:categoryList="categoryList" v-model="writeFormData.category"></category-select>

      <form-input v-model="writeFormData.title" :rules="titleRule" label="제목"/>

      <form-text-area v-model="writeFormData.content" :rules="contentRule" label="본문"/>

      <v-checkbox v-model="writeFormData.isFixed" label="상단 고정"></v-checkbox>

    </v-form>
      <button-dialog dialog-title="알림" dialog-text="게시글 작성 실패" v-model:dialog="dialog">
        <submit-button value="제출" color="black" variant="outlined" @clickEvent="submit"></submit-button>
      </button-dialog>
  </v-card>
</template>

<style scoped>

</style>
