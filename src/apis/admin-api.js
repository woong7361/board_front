import {adminApiInstance} from "@/apis/api-instance";
import {
  CREATE_FREE_BOARD_BY_ADMIN_URL,
  CREATE_FREE_BOARD_COMMENT_BY_ADMIN_URL,
  CREATE_INQUIRE_BOARD_ANSWER_URL,
  CREATE_NOTICE_BOARD_BY_ADMIN_URL,
  DELETE_COMMENT_BY_ADMIN_URL,
  DELETE_FREE_BOARD_BY_ADMIN_URL,
  DELETE_INQUIRE_BOARD_ANSWER_URL,
  DELETE_INQUIRE_BOARD_BY_ADMIN_URL,
  DELETE_NOTICE_BOARD_BY_ADMIN_URL,
  EDIT_FREE_BOARD_BY_ADMIN_URL,
  EDIT_NOTICE_BOARD_BY_ADMIN_URL, GET_INQUIRE_BOARD_BY_ADMIN_URL
} from "@/constant/urlConstant";

const adminAxiosInstance = adminApiInstance

export function adminLoginApi(member) {
  return adminAxiosInstance.post("/auth/admin/login", member)
}

export function deleteFreeBoardByAdminApi(freeBoardId) {
  return adminAxiosInstance.delete(DELETE_FREE_BOARD_BY_ADMIN_URL(freeBoardId))
}

export function editFreeBoardByAdminApi(freeBoardId, freeBoard, uploadFiles, deleteFileIds) {
  const formData = new FormData()
  formData.append('category', freeBoard.category);
  formData.append('title', freeBoard.title);
  formData.append('content', freeBoard.content);

  uploadFiles = uploadFiles
    .filter((file) => file && file !== '')
  for (const file of uploadFiles) {
    formData.append('saveFiles', file)
  }

  for (const id of deleteFileIds) {
    formData.append('deleteFileIds', id)
  }

  return adminAxiosInstance.put(EDIT_FREE_BOARD_BY_ADMIN_URL(freeBoardId), formData)
}

export function createFreeBoardByAdminApi(freeBoard, files) {
  const formData = new FormData()
  formData.append('category', freeBoard.category);
  formData.append('title', freeBoard.title);
  formData.append('content', freeBoard.content);

  files = files
    .filter((file) => file !== undefined && file !== '')

  for (const file of files) {
    formData.append('files', file)
  }

  return adminAxiosInstance.post(CREATE_FREE_BOARD_BY_ADMIN_URL, formData)
}


export function createCommentByAdminApi(freeBoardId, comment) {
  return adminAxiosInstance.post(CREATE_FREE_BOARD_COMMENT_BY_ADMIN_URL(freeBoardId), comment)
}

export function deleteCommentByAdminApi(commentId) {
  return adminAxiosInstance.delete(DELETE_COMMENT_BY_ADMIN_URL(commentId))
}


export function createNoticeBoardByAdminApi(noticeBoard) {
  return adminAxiosInstance.post(CREATE_NOTICE_BOARD_BY_ADMIN_URL, noticeBoard);
}

export function deleteNoticeBoardByAdminAPi(noticeBoardId) {
  return adminAxiosInstance.delete(DELETE_NOTICE_BOARD_BY_ADMIN_URL(noticeBoardId));
}

export function editNoticeBoardByAdminApi(noticeBoard, noticeBoardId) {
  return adminAxiosInstance.put(EDIT_NOTICE_BOARD_BY_ADMIN_URL(noticeBoardId), noticeBoard);
}


export function createInquireBoardAnswerApi(answer, inquireBoardId) {
  return adminAxiosInstance.post(CREATE_INQUIRE_BOARD_ANSWER_URL(inquireBoardId), answer)
}


export function deleteInquireBoardAnswerApi(inquireAnswerId) {
  return adminAxiosInstance.delete(DELETE_INQUIRE_BOARD_ANSWER_URL(inquireAnswerId))
}

export function deleteInquireBoardByAdminApi(inquireBoardId){
  return adminAxiosInstance.delete(DELETE_INQUIRE_BOARD_BY_ADMIN_URL(inquireBoardId))
}

export function getInquireBoardByAdminApi(inquireBoardId) {
  return adminAxiosInstance.get(GET_INQUIRE_BOARD_BY_ADMIN_URL(inquireBoardId))
}






