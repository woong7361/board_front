<script setup>
import {ref} from "vue";
import SignInput from "@/components/input/SignInput.vue";
import SubmitButton from "@/components/button/SubmitButton.vue";
import router from "@/router";
import {ADMIN_MAIN_ROUTER_NAME, MEMBER_SIGN_UP_ROUTER_NAME} from "@/constant/routeNames.js";
import PasswordInput from "@/components/input/passwordInput.vue";
import {loginIdRule, passwordRule} from "@/compositor/rules";
import ButtonDialog from "@/components/dialog/ButtonDialog.vue";
import {useAdminStore, useMemberStore} from "@/store/store";
import {adminLoginApi} from "@/apis/admin-api";

const loginRequest = ref({
  loginId: "",
  password: "",
})

const adminStore = useAdminStore()
const memberStore = useMemberStore()

const dialog =ref(false)

async function submit() {
  let response = await adminLoginApi(loginRequest.value)
    .catch(() => {dialog.value = true});

  if (response) {
    memberStore.logout()
    adminStore.setAdmin(response.data.name, response.data.memberId, response.data.sessionTimeOut);

    router.push(
      {name: ADMIN_MAIN_ROUTER_NAME}
    )
  }
}

const formValidate = ref(false)

</script>

<template>
  <v-card
    class="mx-auto pa-12 pb-8 mt-16"
    elevation="8"
    max-width="448"
    rounded="lg"
  >
    <v-form @submit.prevent="submit" v-model="formValidate">
      <div class="text-h4 text-center"> 관리자 로그인 </div>

      <div class="text-subtitle-1 text-medium-emphasis">Account</div>
      <sign-input v-model="loginRequest.loginId" placeholder="아이디" :rules="loginIdRule"/>

      <div class="text-subtitle-1 text-medium-emphasis">Password</div>
      <password-input v-model="loginRequest.password" placeholder="비밀번호" :rules="passwordRule"/>

      <button-dialog dialog-title="알림" dialog-text="로그인 실패" v-model:dialog="dialog">
        <submit-button value="로그인" :formValidate="formValidate"/>
      </button-dialog>
    </v-form>
  </v-card>

</template>

<style scoped>

</style>
