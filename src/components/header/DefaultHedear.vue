<script setup>

import {useMemberStore} from "@/store/store";
import router from "@/router";
import {HOME_PAGE_ROUTER_NAME, MEMBER_SIGN_IN_ROUTER_NAME, MEMBER_SIGN_UP_ROUTER_NAME} from "@/constant/routeNames";

const memberStore = useMemberStore()

function logout() {
  memberStore.logout()
  router.replace({
    path: "/",
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
    name: HOME_PAGE_ROUTER_NAME,
  })
}

</script>

<template>
  <div>
    <v-toolbar
      image="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"
      dark
      prominent
    >

      <v-app-bar-nav-icon @click="goHome"><v-icon icon="mdi-developer-board"/></v-app-bar-nav-icon>
      <v-toolbar-title @click="goHome"><button>게시판</button></v-toolbar-title>

      <v-spacer></v-spacer>

      <div v-if="memberStore.isLogin" class="text-center">{{memberStore.name + '님 환영합니다!'}}</div>

      <v-toolbar-items v-if="memberStore.isLogin">
        <v-btn @click="logout"> LOG OUT <v-icon>mdi-export</v-icon> </v-btn>
      </v-toolbar-items>

      <v-toolbar-items v-if="!memberStore.isLogin">
        <v-btn @click="goSignIn"> SIGN IN </v-btn>
        <v-btn @click="goSignUp"> SIGN UP </v-btn>
      </v-toolbar-items>

    </v-toolbar>
  </div>
</template>

<style scoped>

</style>
