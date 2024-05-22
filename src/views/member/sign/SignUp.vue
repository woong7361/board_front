<script setup>

import {ref, watchEffect} from "vue";
import SignInput from "@/components/input/SignInput.vue";
import SignButton from "@/components/button/SubmitButton.vue";
import {memberSignUpApi} from "@/apis/main-api.js";
import router from "@/router";
import {MEMBER_SIGN_IN_ROUTER_NAME} from "@/constant/routeNames.js";
import PasswordInput from "@/components/input/passwordInput.vue";
import {
  loginIdDuplicateRule,
  loginIdRule,
  nickNameRule,
  notMatchedLoginIdRule,
  passwordConfirmRule,
  passwordRule,
  testRule
} from "@/compositor/rules";
import ButtonDialog from "@/components/dialog/ButtonDialog.vue";

const memberRequest = ref({
  name: "",
  loginId: "",
  password: "",
  passwordConfirm: ""
})

const formValidate = ref(false)
const dialog= ref({
  signUpFail: false,
  signUpSuccess: null
})

/**
 * 회원가입 요청 보내기
 */
async function submit() {
  let response = await memberSignUpApi(memberRequest.value)
      .catch(() => {dialog.value.signUpFail = true})

  if (response) {
    dialog.value.signUpSuccess = true
  }
}

/**
 * 회원가입 성공시 로그인 페이지로 이동
 */
watchEffect(() => {
  if (dialog.value.signUpSuccess === false) {
    router.push({
      name: MEMBER_SIGN_IN_ROUTER_NAME
    })
  }
})

/**
 * 로그인 페이지로 이동
 */
function goSignIn() {
  router.push({
    name: MEMBER_SIGN_IN_ROUTER_NAME}
  )
}

</script>

<template>

  <v-card
    class="mx-auto pa-12 pb-8 mt-16"
    elevation="8"
    max-width="448"
    rounded="lg"
  >
    <v-form @submit.prevent="submit" v-model="formValidate">

      <div class="text-h4 text-center"> 회원가입 </div>

      <div class="text-subtitle-1 text-medium-emphasis">Account</div>
      <sign-input v-model="memberRequest.loginId" :rules="[...loginIdRule, loginIdDuplicateRule]" placeholder="아이디"/>
      <div class="text-subtitle-1 text-medium-emphasis">Password</div>
      <password-input v-model="memberRequest.password" :rules="[...passwordRule, notMatchedLoginIdRule(memberRequest.loginId, memberRequest.password)]" placeholder="비밀번호"/>
      <div class="text-subtitle-1 text-medium-emphasis">Password Confirm</div>
      <password-input v-model="memberRequest.passwordConfirm" :rules="[passwordConfirmRule(memberRequest.password, memberRequest.passwordConfirm)]" placeholder="비밀번호 확인"/>
      <div class="text-subtitle-1 text-medium-emphasis">Nickname</div>
      <sign-input v-model="memberRequest.name" placeholder="이름" :rules="nickNameRule"/>

      <button-dialog dialog-title="알림" dialog-text="회원가입 실패" v-model:dialog="dialog.signUpFail">
        <SignButton value="회원 가입 하기" :form-validate="formValidate"/>
      </button-dialog>
    </v-form>
    <SignButton value="로그인 하러 가기" @click-event="goSignIn"/>
  </v-card>

  <button-dialog dialog-title="알림" dialog-text="회원가입 성공!" v-model:dialog="dialog.signUpSuccess"/>
</template>

<style scoped>

</style>
