# 개인 게시판 프로젝트(프론트)


## 주요 기능
<details>
    <summary style="font-size: 20px"> axios를 사용한 Api intercept</summary>

Request: 회원과 관련된 API에서 요청을 보내기전 intercept해 token을 넣어준다.
```
memberApiInstance.interceptors.request.use(
  function (config) {
    const memberStore = useMemberStore()
    const accessToken = memberStore.token;

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
);

```
Response: API응답으로 특정 HTTP Method가 내려왔다면 intercept해 ERROR 페이지로 이동한다.
```
memberApiInstance.interceptors.response.use(function (response) {
  return response;
}, function (error) {

  if (error.response.status === 403) {
    router.replace({
      name: ERROR_ROUTER_NAME,
      query: {statusCode: 403}
    })
  } else if(error.response.status === 404) {
    router.replace({
      name: ERROR_ROUTER_NAME,
      query: {statusCode: 404}
    })
  } else if(error.response.status === 500) {
    router.replace({
      name: ERROR_ROUTER_NAME,
      query: {statusCode: 500}
    })
  } else{
    return Promise.reject(error);
  }
});
```
</details>

<details>
    <summary style="font-size: 20px"> 공통 컴포넌트 추출</summary>
ex. 제출 버튼 컴포넌트 <br>
공통으로 쓰이는 submit 버튼의 component화 (바뀌는 부분을 prop로 뽑아 변경에 대응)

```
<script setup>
import {computed} from "vue";

const props = defineProps(['value', 'formValidate', 'color', 'variant'])

...

</script>

<template>
  <v-btn
    @click="$emit('clickEvent')"
    class="mb-8"
    :color="props.color"
    size="large"
    :variant="variant"
    type="submit"
    :disabled="!form"
    block
  >
    {{ props.value }}
  </v-btn>
</template>

<style scoped>

</style>

```
</details>


## 개발 스택
- vue.js
- vuetify
- pinia 
- vue router


