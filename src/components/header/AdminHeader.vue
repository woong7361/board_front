<script setup>
import {useAdminStore} from "@/store/store";
import router from "@/router";
import {
  ADMIN_MAIN_ROUTER_NAME,
  MEMBER_SIGN_IN_ROUTER_NAME,
  MEMBER_SIGN_UP_ROUTER_NAME
} from "@/constant/routeNames";
import MainView from "@/views/member/main/MainView.vue";

const adminStore = useAdminStore()

function logout() {
  adminStore.reset()

  router.replace({
    path: "/"
  })
}

function goSignIn() {
  router.push({
    name: MEMBER_SIGN_IN_ROUTER_NAME}
  )
}

function goSignUp() {
  router.push({
    name: MEMBER_SIGN_UP_ROUTER_NAME,
  })
}

function goHome() {
  router.push({
    name: ADMIN_MAIN_ROUTER_NAME,
  })
}
</script>

<template>
  <div>
    <v-toolbar
      dark
      prominent
    >
      <v-app-bar-nav-icon>아이콘</v-app-bar-nav-icon>
      <v-app-bar-nav-icon @click="goHome"><v-icon icon="mdi-developer-board"/></v-app-bar-nav-icon>
      <v-toolbar-title @click="goHome"><button>관리자용 게시판</button></v-toolbar-title>

      <v-spacer></v-spacer>

      <div v-if="adminStore.isLogin" class="text-center">{{adminStore.name + '님 환영합니다!'}}</div>

      <v-toolbar-items v-if="adminStore.isLogin">
        <v-btn @click="logout"> LOG OUT <v-icon>mdi-export</v-icon> </v-btn>
      </v-toolbar-items>

      <v-toolbar-items v-if="!adminStore.isLogin">
        <v-btn @click="goSignIn"> SIGN IN </v-btn>
        <v-btn @click="goSignUp"> SIGN UP </v-btn>
      </v-toolbar-items>

    </v-toolbar>
  </div>
</template>

<style scoped>

</style>
