import {ref} from "vue";
import {checkLoginIdDuplicateApi} from "@/apis/main-api";

export const passwordRule = [
  value => {
    if (/^(?=.*[a-zA-Z])(?=.*[0-9])(?!.*(.)\1{2})[a-zA-z0-9]{4,11}$/.test(value)) return true
    else return '비밀번호는 영문과 숫자를 포함한 4~11자리이며 연속된 문자가 3번이상 나오면 안됩니다.'
  }
];

export const loginIdRule = [
  value => {
    if (/^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-z0-9-_]{4,12}$/.test(value)) return true
    else return '아이디는 영문과 숫자를 포함한 4-12자 이내의 중복되지 않는 문자여야 합니다.'
  },
]

export const loginIdDuplicateRule = async (value) =>  {
  const response = await checkLoginIdDuplicateApi(value)
    .catch(() => {return '중복된 아이디입니다.'})

  if (response.status === 200) {
    return true;
  } else {
    return '중복된 아이디입니다.'
  }
}


export const notMatchedLoginIdRule = (loginId, value) =>  {
  if (value === loginId) return '비밀번호와 아이디가 같으면 안됩니다.'
}


export const nickNameRule = ref([
  value => {
    if (/^[a-zA-Z가-힣]{3,5}$/.test(value)) return true
    else return '이름은 영문과 한글이 허용된 3~5글자 이여야합니다.'
  }
])

export const titleRule = ref([
  value => ( 0 < value.length && value.length < 100) || '제목은 1~100자 사이여야 합니다.'
])

export const contentRule = ref([
  value => ( 0 < value.length && value.length < 4000) || '본문은 1~4000자 사이여야 합니다.'
])

export const commentRule = ref([
  value => ( 0 < value.length && value.length < 1000) || '내용은 1~1000자 사이여야 합니다.'
])

export const passwordConfirmRule = (password, value) =>  {
  if (value !== password) return '비밀번호가 다릅니다.'
}

export const testRule = (number, value) => {console.log(number, value)}
