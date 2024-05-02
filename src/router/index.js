import { createRouter, createWebHistory } from 'vue-router'
import SignIn from "@/views/member/sign/SignIn.vue";
import SignUp from "@/views/member/sign/SignUp.vue";
import {
  FREE_BOARD_EDIT_ROUTER_NAME,
  FREE_BOARD_FORM_ROUTER_NAME,
  FREE_BOARD_LIST_ROUTER_NAME,
  FREE_BOARD_VIEW_ROUTER_NAME,
  INQUIRE_BOARD_EDIT_ROUTER_NAME,
  INQUIRE_BOARD_FORM_ROUTER_NAME,
  INQUIRE_BOARD_LIST_ROUTER_NAME,
  INQUIRE_BOARD_VIEW_ROUTER_NAME,
  HOME_PAGE_ROUTER_NAME,
  MEMBER_SIGN_IN_ROUTER_NAME,
  MEMBER_SIGN_UP_ROUTER_NAME,
  NOTICE_BOARD_LIST_ROUTER_NAME,
  NOTICE_BOARD_VIEW_ROUTER_NAME,
  ADMIN_FREE_BOARD_FORM_ROUTER_NAME,
  ADMIN_FREE_BOARD_VIEW_ROUTER_NAME,
  ADMIN_FREE_BOARD_LIST_ROUTER_NAME,
  ADMIN_FREE_BOARD_EDIT_ROUTER_NAME,
  ADMIN_NOTICE_BOARD_FORM_ROUTER_NAME,
  ADMIN_NOTICE_BOARD_VIEW_ROUTER_NAME,
  ADMIN_NOTICE_BOARD_LIST_ROUTER_NAME,
  ADMIN_NOTICE_BOARD_EDIT_ROUTER_NAME,
  ADMIN_INQUIRE_BOARD_VIEW_ROUTER_NAME,
  ADMIN_INQUIRE_BOARD_LIST_ROUTER_NAME,
  ADMIN_SIGN_IN_ROUTER_NAME, ERROR_ROUTER_NAME, ADMIN_MAIN_ROUTER_NAME
} from "@/constant/routeNames.js";
import {
  FREE_BOARD_EDIT_ROUTE_URL,
  FREE_BOARD_FORM_ROUTE_URL,
  FREE_BOARD_LIST_ROUTE_URL,
  FREE_BOARD_VIEW_ROUTE_URL,
  INQUIRE_BOARD_EDIT_ROUTE_URL,
  INQUIRE_BOARD_FORM_ROUTE_URL,
  INQUIRE_BOARD_LIST_ROUTE_URL,
  INQUIRE_BOARD_VIEW_ROUTE_URL,
  HOME_PAGE_ROUTE_URL,
  NOTICE_BOARD_LIST_ROUTE_URL,
  NOTICE_BOARD_VIEW_ROUTE_URL,
  SIGN_IN_ROUTE_URL,
  SIGN_UP_ROUTE_URL,
  ADMIN_FREE_BOARD_FORM_ROUTE_URL,
  ADMIN_FREE_BOARD_LIST_ROUTE_URL,
  ADMIN_FREE_BOARD_VIEW_ROUTE_URL,
  ADMIN_FREE_BOARD_EDIT_ROUTE_URL,
  ADMIN_NOTICE_BOARD_FORM_ROUTE_URL,
  ADMIN_NOTICE_BOARD_VIEW_ROUTE_URL,
  ADMIN_NOTICE_BOARD_LIST_ROUTE_URL,
  ADMIN_NOTICE_BOARD_EDIT_ROUTE_URL,
  ADMIN_INQUIRE_BOARD_VIEW_ROUTE_URL,
  ADMIN_INQUIRE_BOARD_LIST_ROUTE_URL,
  ADMIN_SIGN_IN_ROUTE_URL, ERROR_ROUTE_URL, ADMIN_MAIN_ROUTE_URL
} from "@/constant/routeUrlConstant.js";
import FreeBoardForm from "@/views/member/boards/free/FreeBoardForm.vue";
import FreeBoardView from "@/views/member/boards/free/FreeBoardView.vue";
import FreeBoardList from "@/views/member/boards/free/FreeBoardList.vue";
import FreeBoardEdit from "@/views/member/boards/free/FreeBoardEdit.vue";
import NoticeBoardView from "@/views/member/boards/notice/NoticeBoardView.vue";
import NoticeBoardList from "@/views/member/boards/notice/NoticeBoardList.vue";
import InquireBoardList from "@/views/member/boards/inquire/InquireBoardList.vue";
import InquireBoardForm from "@/views/member/boards/inquire/InquireBoardForm.vue";
import InquireBoardView from "@/views/member/boards/inquire/InquireBoardView.vue";
import InquireBoardEdit from "@/views/member/boards/inquire/InquireBoardEdit.vue";
import MainView from "@/views/member/main/MainView.vue";
import AdminSignIn from "@/views/admin/sign/AdminSignIn.vue";
import AdminFreeBoardForm from "@/views/admin/boards/free/AdminFreeBoardForm.vue";
import AdminFreeBoardView from "@/views/admin/boards/free/AdminFreeBoardView.vue";
import AdminFreeBoardList from "@/views/admin/boards/free/AdminFreeBoardList.vue";
import AdminFreeBoardEdit from "@/views/admin/boards/free/AdminFreeBoardEdit.vue";
import AdminNoticeBoardForm from "@/views/admin/boards/notice/AdminNoticeBoardForm.vue";
import AdminNoticeBoardView from "@/views/admin/boards/notice/AdminNoticeBoardView.vue";
import AdminNoticeBoardList from "@/views/admin/boards/notice/AdminNoticeBoardList.vue";
import AdminNoticeBoardEdit from "@/views/admin/boards/notice/AdminNoticeBoardEdit.vue";
import AdminInquireBoardView from "@/views/admin/boards/inquire/AdminInquireBoardView.vue";
import AdminInquireBoardList from "@/views/admin/boards/inquire/AdminInquireBoardList.vue";
import {useAdminStore, useMemberStore} from "@/store/store";
import Test from "@/views/Test.vue";
import Error from "@/views/Error.vue";
import AdminMainView from "@/views/admin/main/AdminMainView.vue";
import {getTokenExpiredMillis} from "@/compositor/token";

const requireMemberAuth = () => (from, to, next) => {
  const memberStore = useMemberStore()

  if (!memberStore.isLogin) {
    alert('로그인이 필요한 서비스입니다.')
    return next(SIGN_IN_ROUTE_URL)
  }
  if (getTokenExpiredMillis(memberStore.token) < Date.now()) {

    alert('토큰이 만료되었습니다.')
    memberStore.logout()
    return next(SIGN_IN_ROUTE_URL)
  }
  return next()
}

const checkTokenTimeOut = () => (from, to, next) => {
  const memberStore = useMemberStore()

  if (!memberStore.isLogin) {
    return next()
  }

  if (getTokenExpiredMillis(memberStore.token) < Date.now()) {
    alert('토큰이 만료되었습니다.');
    memberStore.logout();
    return next(SIGN_IN_ROUTE_URL);
  }

  return next();
}
const requireAdminAuth = () => (from, to, next) => {
  const adminStore = useAdminStore()

  if (!adminStore.isLogin) {
    alert('관리자 로그인이 필요한 서비스입니다.')
    return next(ADMIN_SIGN_IN_ROUTE_URL)
  }
  if (adminStore.timeOut < Date.now()) {
    alert('관리자 세션이 만료되었습니다.')
    adminStore.reset()
    return next(ADMIN_SIGN_IN_ROUTE_URL)
  }

  return next();
}

const routes = [
    {
        path: HOME_PAGE_ROUTE_URL,
        name: HOME_PAGE_ROUTER_NAME,
        component: MainView,
        beforeEnter: checkTokenTimeOut()
    },
    {
        path: SIGN_IN_ROUTE_URL,
        name: MEMBER_SIGN_IN_ROUTER_NAME,
        component: SignIn,
        beforeEnter: checkTokenTimeOut()
    },
    {
        path: SIGN_UP_ROUTE_URL,
        name: MEMBER_SIGN_UP_ROUTER_NAME,
        component: SignUp,
        beforeEnter: checkTokenTimeOut()
    },
    {
        path: FREE_BOARD_FORM_ROUTE_URL,
        name: FREE_BOARD_FORM_ROUTER_NAME,
        component: FreeBoardForm,
        beforeEnter: requireMemberAuth()

    },
    {
        path: FREE_BOARD_VIEW_ROUTE_URL(":freeBoardId"),
        name: FREE_BOARD_VIEW_ROUTER_NAME,
        component: FreeBoardView,
        beforeEnter: checkTokenTimeOut()

    },
    {
        path: FREE_BOARD_LIST_ROUTE_URL,
        name: FREE_BOARD_LIST_ROUTER_NAME,
        component: FreeBoardList,
        beforeEnter: checkTokenTimeOut()
    },
    {
        path: FREE_BOARD_EDIT_ROUTE_URL(":freeBoardId"),
        name: FREE_BOARD_EDIT_ROUTER_NAME,
        component: FreeBoardEdit,
        beforeEnter: requireMemberAuth()
    },
    {
        path: NOTICE_BOARD_VIEW_ROUTE_URL(":noticeBoardId"),
        name: NOTICE_BOARD_VIEW_ROUTER_NAME,
        component: NoticeBoardView,
        beforeEnter: checkTokenTimeOut()

    },
    {
        path: NOTICE_BOARD_LIST_ROUTE_URL,
        name: NOTICE_BOARD_LIST_ROUTER_NAME,
        component: NoticeBoardList,
        beforeEnter: checkTokenTimeOut()

    },
    {
        path: INQUIRE_BOARD_LIST_ROUTE_URL,
        name: INQUIRE_BOARD_LIST_ROUTER_NAME,
        component: InquireBoardList,
        beforeEnter: checkTokenTimeOut()

    },
    {
        path: INQUIRE_BOARD_FORM_ROUTE_URL,
        name: INQUIRE_BOARD_FORM_ROUTER_NAME,
        component: InquireBoardForm,
        beforeEnter: requireMemberAuth()
    },
    {
        path: INQUIRE_BOARD_VIEW_ROUTE_URL(":inquireBoardId"),
        name: INQUIRE_BOARD_VIEW_ROUTER_NAME,
        component: InquireBoardView,
    },
    {
        path: INQUIRE_BOARD_EDIT_ROUTE_URL(":inquireBoardId"),
        name: INQUIRE_BOARD_EDIT_ROUTER_NAME,
        component: InquireBoardEdit,
        beforeEnter: requireMemberAuth()
    },
    {
      path: ADMIN_FREE_BOARD_FORM_ROUTE_URL,
      name: ADMIN_FREE_BOARD_FORM_ROUTER_NAME,
      component: AdminFreeBoardForm,
      beforeEnter: requireAdminAuth()
    },
    {
      path: ADMIN_FREE_BOARD_VIEW_ROUTE_URL(":freeBoardId"),
      name: ADMIN_FREE_BOARD_VIEW_ROUTER_NAME,
      component: AdminFreeBoardView,
      beforeEnter: requireAdminAuth()
    },
    {
      path: ADMIN_FREE_BOARD_LIST_ROUTE_URL,
      name: ADMIN_FREE_BOARD_LIST_ROUTER_NAME,
      component: AdminFreeBoardList,
      beforeEnter: requireAdminAuth()
    },
    {
      path: ADMIN_FREE_BOARD_EDIT_ROUTE_URL(":freeBoardId"),
      name: ADMIN_FREE_BOARD_EDIT_ROUTER_NAME,
      component: AdminFreeBoardEdit,
      beforeEnter: requireAdminAuth()
    },
    {
      path: ADMIN_NOTICE_BOARD_FORM_ROUTE_URL,
      name: ADMIN_NOTICE_BOARD_FORM_ROUTER_NAME,
      component: AdminNoticeBoardForm,
      beforeEnter: requireAdminAuth()
    },
    {
      path: ADMIN_NOTICE_BOARD_VIEW_ROUTE_URL(":noticeBoardId"),
      name: ADMIN_NOTICE_BOARD_VIEW_ROUTER_NAME,
      component: AdminNoticeBoardView,
      beforeEnter: requireAdminAuth()
    },
    {
      path: ADMIN_NOTICE_BOARD_LIST_ROUTE_URL,
      name: ADMIN_NOTICE_BOARD_LIST_ROUTER_NAME,
      component: AdminNoticeBoardList,
      beforeEnter: requireAdminAuth()
    },
    {
      path: ADMIN_NOTICE_BOARD_EDIT_ROUTE_URL(":noticeBoardId"),
      name: ADMIN_NOTICE_BOARD_EDIT_ROUTER_NAME,
      component: AdminNoticeBoardEdit,
      beforeEnter: requireAdminAuth()
    },
    {
      path: ADMIN_INQUIRE_BOARD_VIEW_ROUTE_URL(":inquireBoardId"),
      name: ADMIN_INQUIRE_BOARD_VIEW_ROUTER_NAME,
      component: AdminInquireBoardView,
      beforeEnter: requireAdminAuth()
    },
    {
      path: ADMIN_INQUIRE_BOARD_LIST_ROUTE_URL,
      name: ADMIN_INQUIRE_BOARD_LIST_ROUTER_NAME,
      component: AdminInquireBoardList,
      beforeEnter: requireAdminAuth()
    },
    {
        path: ADMIN_MAIN_ROUTE_URL,
        name: ADMIN_MAIN_ROUTER_NAME,
        component: AdminMainView,
        beforeEnter: requireAdminAuth()
    },
    {
        path: ADMIN_SIGN_IN_ROUTE_URL,
        name: ADMIN_SIGN_IN_ROUTER_NAME,
        component: AdminSignIn,
    },
    {
        path: ERROR_ROUTE_URL,
        name: ERROR_ROUTER_NAME,
        component: Error,
    },
    {
        path: '/test',
        name: 'test',
        component: Test,
    },
]

const router = createRouter({
    history : createWebHistory(),
    routes : routes
})

export default router;
