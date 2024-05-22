<script setup>

import CategorySelect from "@/components/select/CategorySelect.vue";
import ContentInput from "@/components/input/FormTextArea.vue";
import FileInput from "@/components/input/FileInput.vue";
import FormInput from "@/components/input/FormInput.vue";
import {ref, watchEffect} from "vue";
import {editFreeBoardApi, getFreeBoardApi, getFreeBoardCategoriesApi, getFreeBoardFilesApi} from "@/apis/main-api.js";
import {useRoute} from "vue-router";
import router from "@/router";
import {
  ADMIN_FREE_BOARD_LIST_ROUTER_NAME,
  ADMIN_FREE_BOARD_VIEW_ROUTER_NAME,
  FREE_BOARD_LIST_ROUTER_NAME,
  FREE_BOARD_VIEW_ROUTER_NAME
} from "@/constant/routeNames.js";
import {contentRule, titleRule} from "@/compositor/rules";
import SubmitButton from "@/components/button/SubmitButton.vue";
import ButtonDialog from "@/components/dialog/ButtonDialog.vue";
import {editFreeBoardByAdminApi} from "@/apis/admin-api";
import {SUCCESS_CODE} from "@/constant/statusCode";
import FileSaveDialog from "@/components/dialog/FileSaveDialog.vue";

const route = useRoute();

const formValidate = ref(false)

const dialog = ref({
  edit: false,
  file: null
})

const categoryList = ref([])
/**
 * 자유게시판 카테고리 조회
 */
async function getCategories() {
  const response = await getFreeBoardCategoriesApi()
  categoryList.value = response.data.categories
}
getCategories()

const freeBoard = ref({
  category: '',
  title: '',
  content: '',
})
const files = ref([{
  fileId: '',
  freeBoardId: '',
  originalName: ''
}]);

watchEffect(
    () => getFreeBoard(route.params.freeBoardId)
)
watchEffect(
    () => getFiles()
)

/**
 * 자유게시판 게시글 조회
 * @param freeBoardId
 * @returns {Promise<void>} 서버 응답값
 */
async function getFreeBoard(freeBoardId) {
  const response = await getFreeBoardApi(freeBoardId);

  if (response) {
    freeBoard.value = response.data;
  }
}

/**
 * 자유게시판 게시글의 파일 조회
 * @returns {Promise<void>} 서버 응답값
 */
async function getFiles() {
  const response = await getFreeBoardFilesApi(route.params.freeBoardId)
  files.value = response.data
}

const boardEditResponse = ref({
  freeBoardId: '',
  fileResult: {
    successes: [],
    fails: [],
  }
});

/**
 * 자유게시판 게시글 수정 폼 제출
 * @returns {Promise<void>} 서버 응답값
 */
async function submit() {
  const files = fileFormData.value.map(obj => obj.file)
  const deleteIds = deleteFileIds.value.filter(id => !!id)

  const response = await editFreeBoardByAdminApi(route.params.freeBoardId, freeBoard.value, files, deleteIds)
    .catch(() => dialog.value.edit = true)

  if (response.status === SUCCESS_CODE) {
    boardEditResponse.value = response.data
    dialog.value.file = true;
  }
}

watchEffect(
  () => {
    if (dialog.value.file === false) {
      router.push({
        name: ADMIN_FREE_BOARD_LIST_ROUTER_NAME,
        query: route.query,
      });
    }})


const fileNumber = ref(3)
const fileFormData = ref([
  {
    number: 1,
    file: undefined
  }, {
    number: 2,
    file: undefined
  }, {
    number: 3,
    file: undefined
  }])

/**
 * 저장할 파일 추가
 * @param number 파일 식별자
 * @param file 파일
 */
function fileChange(number, file) {
  fileFormData.value.filter(obj => obj.number === number)
    .map(obj => obj.file = file)

  if (file === undefined) {
    fileFormData.value = fileFormData.value.filter(obj => obj.number !== number);
  }

  if (! fileFormData.value.filter(obj => obj.file === undefined).length) {
    fileFormData.value.push({number: fileNumber.value, file: undefined});
  }
  fileNumber.value += 1
}


const deleteFileIds= ref([])

/**
 * 삭제할 파일 추가
 * @param fileId 파일 식별자
 */
function addDeleteFileId(fileId) {
  deleteFileIds.value[fileId] = deleteFileIds.value[fileId] ? null : fileId
}



</script>

<template>
  <v-card
    class="mx-auto pa-12 pb-8 mt-9 mb-16"
    elevation="4"
    max-width="1000"
    rounded="lg">
    <v-card-title class="text-center text-h4">게시글 수정</v-card-title>
      <v-form v-model="formValidate">
        <v-card-title>내용 수정</v-card-title>
        <category-select v-bind:categoryList="categoryList" v-model="freeBoard.category"></category-select>
        <form-input v-model="freeBoard.title" :rules="titleRule" label="제목"/>
        <content-input v-model="freeBoard.content" :rules="contentRule" label="본문"/>

        <v-card-title>파일 추가</v-card-title>
        <div v-for="file in fileFormData">
          <file-input :number="file.number" label="파일 추가 ( .jpg, .gif, .png, .zip 파일만 가능 - 최대 5MB)" @fileChange="fileChange"/>
        </div>

        <v-card-title>파일 삭제</v-card-title>
        <div v-for="file in files">
          <div class="d-flex">
            <v-text-field
              :model-value="file.originalName"
              @deleteFile="addDeleteFileId(file.fileId)"
              :disabled="!!deleteFileIds[file.fileId]"
              variant="underlined"
              readonly
              ></v-text-field>
              <v-icon icon="mdi-trash-can-outline" @click="addDeleteFileId(file.fileId)"/>
          </div>
        </div>
      </v-form>

    <button-dialog class="mt-9" dialog-title="알림" dialog-text="게시글 수정 실패" v-model:dialog="dialog.edit">
      <submit-button value="제출" color="black" variant="outlined" @click-event="submit"></submit-button>
    </button-dialog>
    </v-card>
  <FileSaveDialog
    dialog-title="성공"
    dialog-text="파일 저장 결과"
    :save-success="boardEditResponse.fileResult.successes"
    :save-fail="boardEditResponse.fileResult.fails"
    v-model:dialog="dialog.file" />
</template>

<style scoped>

</style>
