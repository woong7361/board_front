<template>
  <v-app>
    <header>
      <admin-header v-if="adminStore.isLogin"/>

      <default-header v-else/>
    </header>

<!--    <nav>-->
<!--      <router-link v-bind:to="SIGN_UP_ROUTE_URL">  memberSignUP </router-link> |-->
<!--      <router-link v-bind:to="SIGN_IN_ROUTE_URL">  memberSignIn </router-link> |-->
<!--      <router-link v-bind:to="FREE_BOARD_FORM_ROUTE_URL">  freeBoardForm </router-link> |-->
<!--      <router-link v-bind:to="FREE_BOARD_VIEW_ROUTE_URL(1)">  freeBoardView </router-link> |-->
<!--      <router-link v-bind:to="FREE_BOARD_LIST_ROUTE_URL">  freeBoardList </router-link> |-->
<!--      <router-link v-bind:to="FREE_BOARD_EDIT_ROUTE_URL(1)">  freeBoardEdit </router-link> |-->
<!--      <router-link v-bind:to="NOTICE_BOARD_VIEW_ROUTE_URL(4)">  noticeBoardView </router-link> |-->
<!--      <router-link v-bind:to="NOTICE_BOARD_LIST_ROUTE_URL">  noticeBoardList </router-link> |-->
<!--      <router-link v-bind:to="INQUIRE_BOARD_VIEW_ROUTE_URL(3)">  inquireBoardView </router-link> |-->
<!--      <router-link v-bind:to="INQUIRE_BOARD_LIST_ROUTE_URL">  inquireBoardList </router-link> |-->
<!--      <router-link v-bind:to="INQUIRE_BOARD_FORM_ROUTE_URL">  inquireBoardForm </router-link> |-->
<!--      <router-link v-bind:to="INQUIRE_BOARD_EDIT_ROUTE_URL(3)">  inquireBoardEdit </router-link> |-->
<!--      <router-link v-bind:to="ADMIN_FREE_BOARD_LIST_ROUTE_URL">  adminFreeBoardList </router-link> |-->
<!--      <router-link v-bind:to="ADMIN_FREE_BOARD_VIEW_ROUTE_URL(1)">  adminFreeBoardView </router-link> |-->
<!--      <router-link v-bind:to="ADMIN_FREE_BOARD_FORM_ROUTE_URL">  adminFreeBoardForm </router-link> |-->
<!--      <router-link v-bind:to="ADMIN_FREE_BOARD_EDIT_ROUTE_URL(1)">  adminFreeBoardEdit </router-link> |-->
<!--    </nav>-->
    <admin-side-bar v-if="adminStore.isLogin">
      <v-main style="min-height: 800px">
        <router-view/>
      </v-main>
    </admin-side-bar>

    <side-bar v-else>
      <v-main style="min-height: 800px">
        <router-view/>
      </v-main>
    </side-bar>

    <AppFooter />
  </v-app>
</template>

<script setup>
import {
  ADMIN_FREE_BOARD_EDIT_ROUTE_URL,
  ADMIN_FREE_BOARD_FORM_ROUTE_URL,
  ADMIN_FREE_BOARD_LIST_ROUTE_URL, ADMIN_FREE_BOARD_VIEW_ROUTE_URL,
  FREE_BOARD_EDIT_ROUTE_URL,
  FREE_BOARD_FORM_ROUTE_URL,
  FREE_BOARD_LIST_ROUTE_URL,
  FREE_BOARD_VIEW_ROUTE_URL, INQUIRE_BOARD_EDIT_ROUTE_URL, INQUIRE_BOARD_FORM_ROUTE_URL,
  INQUIRE_BOARD_LIST_ROUTE_URL,
  INQUIRE_BOARD_VIEW_ROUTE_URL,
  NOTICE_BOARD_LIST_ROUTE_URL,
  NOTICE_BOARD_VIEW_ROUTE_URL,
  SIGN_IN_ROUTE_URL,
  SIGN_UP_ROUTE_URL
} from "@/constant/routeUrlConstant";
  import DefaultHeader from "@/components/header/DefaultHedear.vue";
  import SideBar from "@/components/header/SideBar.vue";
  import AdminHeader from "@/components/header/AdminHeader.vue";
  import {useAdminStore} from "@/store/store";
  import AdminSideBar from "@/components/header/AdminSideBar.vue";
import Error from "@/views/Error.vue";

  const adminStore = useAdminStore()




</script>
