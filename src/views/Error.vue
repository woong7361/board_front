<script setup>
import {computed} from "vue";
import {useRoute} from "vue-router";
import {ADMIN_MAIN_ROUTE_URL, HOME_PAGE_ROUTE_URL} from "@/constant/routeUrlConstant";
import {FORBIDDEN, NOT_FOUND_CODE} from "@/constant/statusCode";

const route = useRoute()

const error = computed(() => {
  const statusCode = route.query.statusCode
  console.log(statusCode)
  if (statusCode === String(NOT_FOUND_CODE)) {
    return notFound
  }
  else if (statusCode === String(FORBIDDEN)) {
    return forbidden
  }
  else {
    return serverError
  }
})

const notFound = {
  statusCode: "404",
  title: "Page Not Found ⚠️",
  description: "We couldn't find the page you are looking for.",
}

const forbidden = {
  statusCode: "403",
  title: "Forbidden ⚠️",
  description: "허용되지 않은 권한입니다.",
}

const serverError = {
  statusCode: "500",
  title: "Server Error ⚠️",
  description: "sorry server error",
}



</script>

<template>
  <div class="misc-wrapper mt-16">

    <div class="text-center mb-4 ">
      <h1
        class="text-h1 font-weight-medium"
      >
        {{ error.statusCode }}
      </h1>
      <h5
        class="text-h5 font-weight-medium mb-3"
      >
        {{ error.title }}
      </h5>
        {{ error.description }}
    </div>

    <div class="misc-avatar w-100 text-center">
      <VBtn v-if="route.query.admin" :to="ADMIN_MAIN_ROUTE_URL" class="mt-10">
        Back to Home
      </VBtn>
      <VBtn v-else :to="HOME_PAGE_ROUTE_URL" class="mt-10">
        Back to Home
      </VBtn>
    </div>

  </div>
</template>

<style lang="scss">
</style>
