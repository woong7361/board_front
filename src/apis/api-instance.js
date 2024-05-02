import axios from "axios";
import {useMemberStore} from "@/store/store";
import router from "@/router";
import {
  ADMIN_SIGN_IN_ROUTER_NAME,
  ERROR_ROUTER_NAME,
  MEMBER_SIGN_IN_ROUTER_NAME,
  MEMBER_SIGN_UP_ROUTER_NAME
} from "@/constant/routeNames";

// const baseUrl = `http://13.125.243.251:8888`
const baseUrl = `http://localhost:8888`
export const memberApiInstance = axios.create({
  baseURL: baseUrl,
})

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

memberApiInstance.interceptors.response.use(function (response) {
  return response;
}, function (error) {

  if (error.response.status === 403) {
    router.push({
      name: ERROR_ROUTER_NAME,
      query: {statusCode: 403}
    })
  } else if(error.response.status === 404) {
    router.push({
      name: ERROR_ROUTER_NAME,
      query: {statusCode: 404}
    })
  } else if(error.response.status === 500) {
    router.push({
      name: ERROR_ROUTER_NAME,
      query: {statusCode: 500}
    })
  } else{
    return Promise.reject(error);
  }
});


export const adminApiInstance = axios.create({
  baseURL: baseUrl,
  withCredentials: true
})

adminApiInstance.interceptors.response.use(function (response) {
  return response;
}, function (error) {

  if (error.response.status === 401) {
    router.push({
      name: ERROR_ROUTER_NAME,
      query: {statusCode: 401, admin: true}
    })
  } else if(error.response.status === 404) {
    router.push({
      name: ERROR_ROUTER_NAME,
      query: {statusCode: 404, admin: true}
    })
  } else if(error.response.status === 500) {
    router.push({
      name: ERROR_ROUTER_NAME,
      query: {statusCode: 500, admin: true}
    })
  } else{
    return Promise.reject(error);
  }
});

