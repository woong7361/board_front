<template>
  <v-app>
    <header>
      <admin-header v-if="adminStore.isLogin"/>

      <default-header v-else/>
    </header>
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
  import DefaultHeader from "@/components/header/DefaultHedear.vue";
  import SideBar from "@/components/header/SideBar.vue";
  import AdminHeader from "@/components/header/AdminHeader.vue";
  import {useAdminStore} from "@/store/store";
  import AdminSideBar from "@/components/header/AdminSideBar.vue";

  const adminStore = useAdminStore()
</script>
