import {computed, reactive, ref} from 'vue'
import {
  LOCAL_STORAGE_ADMIN_ID_KEY,
  LOCAL_STORAGE_ADMIN_NAME_KEY, LOCAL_STORAGE_ADMIN_TIME_OUT_KEY,
  LOCAL_STORAGE_TOKEN_KEY
} from "@/constant/authConstant.js";
import {defineStore} from "pinia";

export const useMemberStore = defineStore('member', () => {
  const token = ref(localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY))

  const isLogin = computed(
    () => !!token.value
  )
  const memberId = computed(
    () => token.value ? JSON.parse(atob(token.value.split(".")[1])).memberId : null
  )
  const name = computed(
    () => token.value ? JSON.parse(atob(token.value.split(".")[1])).name : null
  )

  function setToken(jwtToken) {
    localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, jwtToken);

    token.value = jwtToken
  }

  function logout() {
    token.value = null
    localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
  }

  return { memberId, name, token, isLogin, setToken, logout }
})


export const useAdminStore = defineStore('admin', () => {
  const name = ref(localStorage.getItem(LOCAL_STORAGE_ADMIN_NAME_KEY))
  const memberId = ref(localStorage.getItem(LOCAL_STORAGE_ADMIN_ID_KEY))
  const timeOut = ref(localStorage.getItem(LOCAL_STORAGE_ADMIN_TIME_OUT_KEY))

  function setAdmin(adminName, id, sessionLength){
    const maxTimeOut = String(Date.now() + sessionLength*1000)

    localStorage.setItem(LOCAL_STORAGE_ADMIN_NAME_KEY, adminName)
    localStorage.setItem(LOCAL_STORAGE_ADMIN_ID_KEY, id)
    localStorage.setItem(LOCAL_STORAGE_ADMIN_TIME_OUT_KEY, maxTimeOut)

    name.value = adminName
    memberId.value = id
    timeOut.value = maxTimeOut
  }

  function reset() {
    localStorage.removeItem(LOCAL_STORAGE_ADMIN_NAME_KEY)
    localStorage.removeItem(LOCAL_STORAGE_ADMIN_ID_KEY)
    localStorage.removeItem(LOCAL_STORAGE_ADMIN_TIME_OUT_KEY)

    name.value = null
    memberId.value = null
    timeOut.value = null
  }

  const isLogin = computed(
    () => !!name.value
  )

  return {name, memberId, timeOut, isLogin, setAdmin, reset}
})



