<script setup>
import {ref, watchEffect} from "vue";
import CategorySelect from "@/components/select/CategorySelect.vue";
import FormInput from "@/components/input/FormInput.vue";
import ContentInput from "@/components/input/FormTextArea.vue";
import {createFreeBoardApi, getFreeBoardCategoriesApi} from "@/apis/main-api.js";
import router from "@/router";
import {FREE_BOARD_LIST_ROUTER_NAME} from "@/constant/routeNames.js";
import {useRoute} from "vue-router";
import FileInput from "@/components/input/FileInput.vue";
import SubmitButton from "@/components/button/SubmitButton.vue";
import {contentRule, titleRule} from "@/compositor/rules";
import ButtonDialog from "@/components/dialog/ButtonDialog.vue";
import {getFreeBoardCategories} from "@/compositor/category";
import FileSaveDialog from "@/components/dialog/FileSaveDialog.vue";

const route = useRoute();

const formValidate = ref(false)
const dialog = ref({
  submit: false,
  file: null
})


const categoryList = ref([])

/**
 * 자유게시판 카테고리 조회
 * @returns {Promise<void>} 서버 응답값
 */
async function getCategories() {
  const response = await getFreeBoardCategoriesApi()
  categoryList.value = response.data.categories
  writeFormData.value.category = categoryList.value[0]
}
getCategories()



const writeFormData = ref({
  category : '',
  title : '',
  content: '',
})
const boardCreateResponse = ref({
  freeBoardId: '',
  fileResult: {
    successes: [],
    fails: [],
  }
});

/**
 * 자유게시판 생성 폼 제출
 * @returns {Promise<void>} 서버 응답값
 */
async function submit() {
  const files = fileFormData.value.map(obj => obj.file)

  const response = await createFreeBoardApi(writeFormData.value, files)
    .catch(() => {dialog.value.submit = true})

  if (response){
    boardCreateResponse.value = response.data
    dialog.value.file = true;
  }
}

watchEffect(
  () => {
    if (dialog.value.file === false) {
      router.push({
        name: FREE_BOARD_LIST_ROUTER_NAME,
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
 * 파일 변경 감지
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

</script>

<template>

  <v-card
    class="mx-auto pa-12 pb-8 mt-9 mb-16"
    elevation="4"
    max-width="1000"
    rounded="lg">

    <v-card-title class="text-center text-h4 mb-6">게시글 작성</v-card-title>

    <v-form @submit.prevent="submit" v-model="formValidate">
      <category-select v-bind:categoryList="categoryList" v-model="writeFormData.category"></category-select>

      <form-input v-model="writeFormData.title" :rules="titleRule" label="제목"/>

      <content-input v-model="writeFormData.content" :rules="contentRule" label="본문"/>

      <v-card elevation="0" max-width="1000" class="pa-12 pb-8">
        <div v-for="files in fileFormData">
          <file-input :number="files.number" label="파일 추가 ( .jpg, .gif, .png, .zip 파일만 가능 - 최대 5MB)" @fileChange="fileChange"/>
        </div>

      </v-card>

      <button-dialog dialog-title="알림" dialog-text="게시글 작성 실패" v-model:dialog="dialog.submit">
        <submit-button value="제출" color="black" variant="outlined"></submit-button>
      </button-dialog>
    </v-form>
  </v-card>

  <FileSaveDialog
    dialog-title="성공"
    dialog-text="파일 저장 결과"
    :save-success="boardCreateResponse.fileResult.successes"
    :save-fail="boardCreateResponse.fileResult.fails"
    v-model:dialog="dialog.file" />
</template>

<style scoped>

</style>
