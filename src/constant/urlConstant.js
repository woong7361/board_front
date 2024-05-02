export const SIGN_IN_URL = `/auth/member/login`;
export const CHECK_LOGIN_ID_DUPLICATE_URL = `/auth/member/login-id`;

export const SIGN_UP_URL = `/auth/member`;

export const GET_FREE_BOARD_CATEGORIES_URL = `/api/boards/free/category`;
export const CREATE_FREE_BOARD_URL = `/api/boards/free`;
export const GET_FREE_BOARDS_URL = `/api/boards/free`;
export const GET_FREE_BOARD_URL = (freeBoardId) => `/api/boards/free/${freeBoardId}`
export const DELETE_FREE_BOARD_URL = (freeBoardId) => `/api/boards/free/${freeBoardId}`
export const EDIT_FREE_BOARD_URL = (freeBoardId) => `/api/boards/free/${freeBoardId}`


export const GET_FREE_BOARD_COMMENTS_URL = (freeBoardId) => `/api/boards/free/${freeBoardId}/comments`
export const CREATE_FREE_BOARD_COMMENT_URL = (freeBoardId) => `/api/boards/free/${freeBoardId}/comments`
export const DELETE_COMMENT_URL = (commentId) => `/api/boards/free/comments/${commentId}`


export const GET_FREE_BOARD_FILE_URL = (freeBoardId) => `/api/boards/free/${freeBoardId}/files`

export const DOWNLOAD_FREE_BOARD_FILE_URL = (fileId) => `/api/boards/files/${fileId}/download`


export const GET_NOTICE_BOARD_CATEGORIES_URL = `/api/boards/notice/category`;
export const GET_NOTICE_BOARD_URL = (noticeBoardId) => `/api/boards/notice/${noticeBoardId}`
export const GET_NONE_FIXED_NOTICE_BOARDS_URL = `/api/boards/notice`
export const GET_FIXED_NOTICE_BOARDS_URL = `/api/boards/notice/fixed`


export const GET_INQUIRE_BOARD_URL = (inquireBoardId) => `/api/boards/inquire/${inquireBoardId}`
export const GET_INQUIRE_BOARDS_URL = `/api/boards/inquire`
export const CREATE_INQUIRE_BOARD_URL = `/api/boards/inquire`
export const EDIT_INQUIRE_BOARD_URL = (inquireBoardId) => `/api/boards/inquire/${inquireBoardId}`
export const DELETE_INQUIRE_BOARD_URL = (inquireBoardId) => `/api/boards/inquire/${inquireBoardId}`



export const CREATE_FREE_BOARD_BY_ADMIN_URL =  `/admin/boards/free`
export const DELETE_FREE_BOARD_BY_ADMIN_URL = (freeBoardId) => `/admin/boards/free/${freeBoardId}`
export const EDIT_FREE_BOARD_BY_ADMIN_URL = (freeBoardId) => `/admin/boards/free/${freeBoardId}`

export const CREATE_FREE_BOARD_COMMENT_BY_ADMIN_URL = (freeBoardId) => `/admin/boards/free/${freeBoardId}/comments`
export const DELETE_COMMENT_BY_ADMIN_URL = (commentId) => `/admin/boards/free/comments/${commentId}`


export const CREATE_NOTICE_BOARD_BY_ADMIN_URL =  `/admin/boards/notice`
export const DELETE_NOTICE_BOARD_BY_ADMIN_URL = (noticeBoardId) => `/admin/boards/notice/${noticeBoardId}`
export const EDIT_NOTICE_BOARD_BY_ADMIN_URL = (noticeBoardId) => `/admin/boards/notice/${noticeBoardId}`



export const CREATE_INQUIRE_BOARD_ANSWER_URL = (inquireBoardId) => `/admin/boards/inquire/${inquireBoardId}/answers`
export const DELETE_INQUIRE_BOARD_ANSWER_URL = (inquireAnswerId) => `/admin/boards/inquire/answers/${inquireAnswerId}`


export const DELETE_INQUIRE_BOARD_BY_ADMIN_URL = (inquireBoardId) => `/admin/boards/inquire/${inquireBoardId}`
export const GET_INQUIRE_BOARD_BY_ADMIN_URL = (inquireBoardId) => `/admin/boards/inquire/${inquireBoardId}`

