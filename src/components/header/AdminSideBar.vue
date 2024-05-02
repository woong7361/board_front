<script setup>

import {
  ADMIN_FREE_BOARD_LIST_ROUTE_URL, ADMIN_INQUIRE_BOARD_LIST_ROUTE_URL, ADMIN_NOTICE_BOARD_LIST_ROUTE_URL,
} from "@/constant/routeUrlConstant";
import {useAdminStore, useMemberStore} from "@/store/store";
</script>

<template>
    <v-card>
      <v-layout>
        <v-navigation-drawer
          expand-on-hover
          rail
        >

          <v-list v-if="useAdminStore().isLogin">
            <v-list-item
              prepend-avatar="https://randomuser.me/api/portraits/lego/5.jpg"
              :title="useAdminStore().name + '님 환영합니다!'"
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
            <router-link v-bind:to=ADMIN_FREE_BOARD_LIST_ROUTE_URL style="text-decoration: none; color: black">
              <v-list-item prepend-icon="mdi-account-multiple" title="자유게시판 관리" />
            </router-link>
            <router-link v-bind:to="ADMIN_NOTICE_BOARD_LIST_ROUTE_URL" style="text-decoration: none; color: black">
              <v-list-item prepend-icon="mdi-folder" title="공지 게시판 관리"/>
            </router-link>
            <router-link v-bind:to="ADMIN_INQUIRE_BOARD_LIST_ROUTE_URL" style="text-decoration: none; color: black">
              <v-list-item prepend-icon="mdi-star" title="문의 게시판 관리"/>
            </router-link>
          </v-list>
        </v-navigation-drawer>
        <slot></slot>
      </v-layout>
    </v-card>
</template>

<style scoped>

</style>
