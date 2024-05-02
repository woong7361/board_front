<script setup>

import {
  ADMIN_SIGN_IN_ROUTE_URL,
  FREE_BOARD_LIST_ROUTE_URL,
  INQUIRE_BOARD_LIST_ROUTE_URL,
  NOTICE_BOARD_LIST_ROUTE_URL
} from "@/constant/routeUrlConstant";
import {useMemberStore} from "@/store/store";
</script>

<template>
  <v-card>
    <v-layout>
      <v-navigation-drawer
        expand-on-hover
        rail
      >

        <v-list v-if="useMemberStore().isLogin">
          <v-list-item
            prepend-avatar="https://randomuser.me/api/portraits/lego/4.jpg"
            :title="useMemberStore().name + '님 환영합니다!'"
          ></v-list-item>
        </v-list>

        <v-list v-else>
          <v-list-item
            prepend-avatar="https://randomuser.me/api/portraits/lego/1.jpg"
            title="비회원"
          ></v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list density="compact" nav>
          <router-link v-bind:to="FREE_BOARD_LIST_ROUTE_URL" style="text-decoration: none; color: black">
            <v-list-item prepend-icon="mdi-account-multiple" title="자유게시판" />
          </router-link>
          <router-link v-bind:to="NOTICE_BOARD_LIST_ROUTE_URL" style="text-decoration: none; color: black">
            <v-list-item prepend-icon="mdi-folder" title="공지 게시판"/>
          </router-link>
          <router-link v-bind:to="INQUIRE_BOARD_LIST_ROUTE_URL" style="text-decoration: none; color: black">
            <v-list-item prepend-icon="mdi-star" title="문의 게시판"/>
          </router-link>
          <router-link v-bind:to="ADMIN_SIGN_IN_ROUTE_URL" style="text-decoration: none; color: black">
            <v-list-item prepend-icon="mdi-shield-crown" title="관리자 페이지로"/>
          </router-link>
        </v-list>
      </v-navigation-drawer>
      <slot></slot>
    </v-layout>
  </v-card>
</template>

<style scoped>

</style>
