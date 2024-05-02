<script setup>
import {computed, ref} from "vue";
import FormInput from "@/components/input/FormInput.vue";
import DateDialog from "@/components/dialog/DateDialog.vue";
import {useDate} from "vuetify";

const props = defineProps(['categories', 'type'])
const searchParams = defineModel('params')
const emits = defineEmits(['search'])

const adapter = useDate()


const dialog = ref({
  startDate: false,
  endDate: false
})

const categories = computed(
    () => {
      console.log(props.categories)
      props.categories
    }
)

const startDate = computed(() => {
  return !!searchParams.value.startDate ? adapter.toISO(searchParams.value.startDate) : null
})
const endDate = computed(() => {
  return !!searchParams.value.endDate ? adapter.toISO(searchParams.value.endDate) : null
})

const pageSizes = ['5', '10', '15']
const orderColumns = [{key: '생성 일자', value: 'created_at'}, {key: '수정 일자', value: 'modified_at'}, {key: '조회순', value: 'views'}]
const orderTypes = [{key: '내림차순', value: 'DESC'}, {key: '오름차순', value: 'ASC'}]
function submit() {
  emits('search')
}

</script>

<template>
  <v-card max-width="1150" class="mx-auto mb-9 mt-5 pl-4" variant="outlined">
    <v-form>

      <v-row no-gutters>
        <v-col cols="2">
          <v-sheet class="pa-2 ma-2">
            <date-dialog class="" v-model:dialog="dialog.startDate" v-model:date="searchParams.startDate">
              <v-btn class="" @click="dialog.startDate=true"> 시작 일자 선택</v-btn>
            </date-dialog>
            <input type="date" :value="startDate" class="d-inline text-center" disabled>
          </v-sheet>
        </v-col>

        <v-col cols="2">
          <v-sheet class="pa-2 ma-2">
            <date-dialog v-model:dialog="dialog.endDate" v-model:date="searchParams.endDate">
              <v-btn class="" @click="dialog.endDate=true" >종료 일자 선택</v-btn>
            </date-dialog>
            <input type="date" :value="endDate" class="d-inline text-center" disabled>
          </v-sheet>
        </v-col>

        <v-col cols="2">
          <v-sheet class="pa-2 ma-2 mr-8">
            <v-checkbox v-if="props.type === 'inquire'" label="자신의 것만 검색" v-model="searchParams.onlyMine">
            </v-checkbox>
            <v-select
              v-else
              label="카테고리"
              v-model="searchParams.category"
              variant="underlined"
              :items="props.categories"
            ></v-select>
          </v-sheet>
        </v-col>

        <v-col cols="5">
          <v-sheet class="pa-2 ma-2 mr-8">
            <form-input label="검색 (제목, 내용, 작성자 포함)" v-model="searchParams.keyWord" class="d-inline mt-4 mr-3"/>
          </v-sheet>
        </v-col>

        <v-col cols="1">
          <v-sheet class="mt-5 pr-3">
            <v-btn
              size="large"
              @click="submit"
              block
            >
              {{ '검색' }}
            </v-btn>
          </v-sheet>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="2">
          <v-sheet class="ml-5">
            <v-select
              label="페이지 크기"
              variant="underlined"
              :items="pageSizes"
              v-model="searchParams.size"
            ></v-select>
          </v-sheet>
        </v-col>

        <v-col cols="6">
        </v-col>
        <v-col cols="2">
          <v-sheet>
            <v-select
              label="정렬 인자"
              v-model="searchParams.orderColumn"
              variant="underlined"
              :items="orderColumns"
              item-title="key"
              item-value="value"
            ></v-select>
          </v-sheet>
        </v-col>

        <v-col cols="2">
          <v-sheet class="mr-3">
            <v-select
              label="정렬 순서"
              v-model="searchParams.orderType"
              variant="underlined"
              :items="orderTypes"
              item-title="key"
              item-value="value"
            ></v-select>
          </v-sheet>
        </v-col>
        <slot></slot>
      </v-row>
    </v-form>
  </v-card>

</template>

<style scoped>

</style>
