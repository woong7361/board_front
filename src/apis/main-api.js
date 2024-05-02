import axios from 'axios'
import {
  CHECK_LOGIN_ID_DUPLICATE_URL,
  CREATE_FREE_BOARD_COMMENT_URL,
  CREATE_FREE_BOARD_URL, CREATE_INQUIRE_BOARD_URL, DELETE_COMMENT_URL,
  DELETE_FREE_BOARD_URL, DELETE_INQUIRE_BOARD_URL,
  DOWNLOAD_FREE_BOARD_FILE_URL,
  EDIT_FREE_BOARD_URL, EDIT_INQUIRE_BOARD_URL,
  GET_FIXED_NOTICE_BOARDS_URL, GET_FREE_BOARD_CATEGORIES_URL,
  GET_FREE_BOARD_COMMENTS_URL,
  GET_FREE_BOARD_FILE_URL,
  GET_FREE_BOARD_URL,
  GET_FREE_BOARDS_URL,
  GET_INQUIRE_BOARD_URL, GET_INQUIRE_BOARDS_URL,
  GET_NONE_FIXED_NOTICE_BOARDS_URL, GET_NOTICE_BOARD_CATEGORIES_URL,
  GET_NOTICE_BOARD_URL,
  SIGN_IN_URL,
  SIGN_UP_URL
} from "@/constant/urlConstant.js";
import {memberApiInstance} from "@/apis/api-instance";

const axiosInstance = memberApiInstance


/**
 * 회원가입 API
 * @param member 회원 가입 요청 파라미터
 * @returns {Promise<axios.AxiosResponse<any>>} 서버 응답값
 */
export async function memberSignUpApi(member) {
    return axiosInstance.post(SIGN_UP_URL, member)
}

/**
 * 로그인 아이디 중복확인 API
 * @returns {Promise<axios.AxiosResponse<any>>} 서버 응답값
 */
export function checkLoginIdDuplicateApi(loginId) {
    return axiosInstance.post(CHECK_LOGIN_ID_DUPLICATE_URL, loginId)
}

/**
 * 로그인 API
 * @returns {Promise<axios.AxiosResponse<any>>} 서버 응답값
 */
export function memberSignInApi(loginRequest) {
    return axiosInstance.post(SIGN_IN_URL, loginRequest)
}

/**
 * 자유게시판 생성 API
 * @returns {Promise<axios.AxiosResponse<any>>} 서버 응답값
 */
export function createFreeBoardApi(freeBoard, files) {
    const formData = new FormData()
    formData.append('category', freeBoard.category);
    formData.append('title', freeBoard.title);
    formData.append('content', freeBoard.content);

    files = files
        .filter((file) => file !== undefined && file !== '')

    for (const file of files) {
        formData.append('files', file)
    }


    return axiosInstance.post(
        CREATE_FREE_BOARD_URL,
        formData,
        // {headers: {'Authorization': 'Bearer ' + store.getToken()}}
    )
}

/**
 * 자유게시판 게시글 조회
 * @param freeBoardId 게시글 식별자
 * @returns {Promise<axios.AxiosResponse<any>>} 서버 응답값
 */
export function getFreeBoardApi(freeBoardId) {
    return axiosInstance.get(GET_FREE_BOARD_URL(freeBoardId))
}


/**
 * 자유게시판 게시글 댓글 조회
 * @param freeBoardId 게시글 식별자
 * @returns {Promise<axios.AxiosResponse<any>>} 서버 응답값
 */
export function getFreeBoardCommentsApi(freeBoardId) {
    return axiosInstance.get(GET_FREE_BOARD_COMMENTS_URL(freeBoardId))
}

/**
 * 자유게시판 댓글 생성
 * @param freeBoardId 자유게시판 게시글 식별자
 * @param comment 댓글 생성 인자
 * @returns {Promise<axios.AxiosResponse<any>>} 서버 응답값
 */
export function createFreeBoardCommentApi(freeBoardId, comment) {
    return axiosInstance.post(CREATE_FREE_BOARD_COMMENT_URL(freeBoardId), comment)
}

/**
 * 댓글 삭제
 * @param commentId 댓글 식별자
 * @returns {Promise<axios.AxiosResponse<any>>} 서버 응답값
 */
export function deleteCommentApi(commentId) {
    return axiosInstance.delete(DELETE_COMMENT_URL(commentId))
}

/**
 * 자유게시판 게시글 파일 가져오기
 * @param freeBoardId 자유게시판 게시글 식별자
 * @returns {Promise<axios.AxiosResponse<any>>} 서버 응답값
 */
export function getFreeBoardFilesApi(freeBoardId) {
    return axiosInstance.get(GET_FREE_BOARD_FILE_URL(freeBoardId))
}

/**
 * 파일 다운로드
 * @param fileId 파일 식별자
 * @returns {Promise<void>} 실제 파일
 */
export function downloadFileApi(fileId){
    return axiosInstance.post(
        DOWNLOAD_FREE_BOARD_FILE_URL(fileId),
        null,
        {
            responseType: 'blob'
        }, )
        .then((response) => {
            const href = window.URL.createObjectURL(response.data)
            const fileName = response.headers.get('Content-Disposition')
                .split("filename*=UTF-8''")[1]

            const link = document.createElement('a')
            link.display = "none"
            link.href = href
            link.download = decodeURIComponent(fileName)

            document.body.appendChild(link)
            link.click()

            link.remove()
            URL.revokeObjectURL(href)
        })
}

/**
 * 자유게시판 게시글 삭제 API
 * @param freeBoardId 게시글 식별자
 * @returns {Promise<axios.AxiosResponse<any>>} 서버 응답값
 */
export function deleteFreeBoardApi(freeBoardId) {
    return axiosInstance.delete(DELETE_FREE_BOARD_URL(freeBoardId))
}

/**
 * 자유게시판 게시글 리스트 조회 API
 * @param params 검색 조건
 * @returns {Promise<axios.AxiosResponse<any>>} 서버 응답값
 */
export function getFreeBoardsApi(params) {
    return axiosInstance.get(GET_FREE_BOARDS_URL,
        {params: params})
}

/**
 * 자유게시판 게시글 수정 API
 * @param freeBoardId 게시글 식별자
 * @param freeBoard 게시글 수정 인자
 * @param uploadFiles 추가할 파일들
 * @param deleteFileIds 삭제할 파일 식별자들
 * @returns {Promise<axios.AxiosResponse<any>>} 서버 응답값
 */
export function editFreeBoardApi(freeBoardId, freeBoard, uploadFiles, deleteFileIds) {
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

    return axiosInstance.put(EDIT_FREE_BOARD_URL(freeBoardId), formData)
}

/**
 * 공지 게시글 조회
 * @param noticeBoardId 게시글 식별자
 * @returns {Promise<axios.AxiosResponse<any>>} 서버 응답값
 */
export function getNoticeBoardApi(noticeBoardId) {
    return axiosInstance.get(GET_NOTICE_BOARD_URL(noticeBoardId))
}

/**
 * 고정된 공지 게시글들 조회
 * @returns {Promise<axios.AxiosResponse<any>>} 서버 응답값
 */
export function getFixedNoticeBoardsApi() {
    return axiosInstance.get(GET_FIXED_NOTICE_BOARDS_URL)
}

/**
 * 고정 공지 제외 게시글들 조회
 * @param params 게시글 검색 파라미터
 * @returns {Promise<axios.AxiosResponse<any>>} 서버 응답값
 */
export function getNoneFixedNoticeBoardsApi(params) {
    return axiosInstance.get(
        GET_NONE_FIXED_NOTICE_BOARDS_URL,
        {
        params: params
    })
}

/**
 * 문의 게시글 조회
 * @param inquireBoardId 게시글 식별자
 * @returns {Promise<axios.AxiosResponse<any>>} 서버 응답값
 */
export function getInquireBoardApi(inquireBoardId) {
    return axiosInstance.get(
        GET_INQUIRE_BOARD_URL(inquireBoardId))
}

/**
 * 문의 게시판 조회
 * @param params 게시판 검색 파라미터
 * @returns {Promise<axios.AxiosResponse<any>>} 서버 응답값
 */
export function getInquireBoardsApi(params) {
    return axiosInstance.get(
        GET_INQUIRE_BOARDS_URL,
        {params: params}
    );
}

/**
 * 문의 게시글 생성
 * @param inquireBoard 게시글 생성 파라미터
 * @returns {Promise<axios.AxiosResponse<any>>} 서버 응답값
 */
export function createInquireBoardApi(inquireBoard) {
    return axiosInstance.post(
        CREATE_INQUIRE_BOARD_URL, inquireBoard
    );
}

/**
 * 문의 게시글 수정
 * @param inquireBoardId 게시글 식별자
 * @param inquireBoard 게시글 수정 파라미터
 * @returns {Promise<axios.AxiosResponse<any>>} 서버 응답값
 */
export function editInquireBoardApi(inquireBoard, inquireBoardId) {
    return axiosInstance.put(
        EDIT_INQUIRE_BOARD_URL(inquireBoardId), inquireBoard
    );
}

/**
 * 문의 게시글 삭제
 * @param inquireBoardId 게시글 식별자
 * @returns {Promise<axios.AxiosResponse<any>>} 서버 응답값
 */
export function deleteInquireBoardApi(inquireBoardId) {
    return axiosInstance.delete(
        DELETE_INQUIRE_BOARD_URL(inquireBoardId)
    );
}

/**
 * 자유게시판 게시글 카테고리 조회
 * @returns {Promise<axios.AxiosResponse<any>>} 서버 응답값
 */
export function getFreeBoardCategoriesApi() {
  return axiosInstance.get(GET_FREE_BOARD_CATEGORIES_URL);
}

/**
 * 공지게시판 게시글 카테고리 조회
 * @returns {Promise<axios.AxiosResponse<any>>} 서버 응답값
 */
export function getNoticeBoardCategoriesApi() {
  return axiosInstance.get(GET_NOTICE_BOARD_CATEGORIES_URL);
}


