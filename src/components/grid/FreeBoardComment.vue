<script setup>
import {computed} from "vue";
import {useAdminStore, useMemberStore} from "@/store/store";
import ButtonDialog from "@/components/dialog/ButtonDialog.vue";
import {blankDateFormat} from "../../compositor/dateFormat";
import {boardContent} from "@/compositor/stringFormat";

const model = defineModel()
const props = defineProps(['comments'])
const emits = defineEmits(['removeComment'])

const comments = computed(() => props.comments)

function clickEvent(commentId) {
  emits('removeComment', commentId)
}
</script>

<template>
  <div v-for="comment in comments.comments" >
    <v-card min-height="50px" class="mx-auto pa-3 pb-3 mt-3 bg-white" variant="outlined">
      <v-card-subtitle >
        <v-row no-gutters>
          <v-col cols="9">
            <v-icon icon="mdi-account"></v-icon>
            {{comment.memberName}}
          </v-col>
          <v-col cols="2">
            <v-icon icon="mdi-calendar-edit"></v-icon>
            {{ blankDateFormat(comment.createdAt) }}
          </v-col>
          <v-col cols="1" class="pl-10">
            <button-dialog v-model:dialog="model" title="알림" dialog-text="댓글 삭제에 실패했습니다.">
              <v-icon
                v-show="useMemberStore().memberId === comment.memberId || useAdminStore().isLogin"
                @click="clickEvent(comment.commentId)"
                icon="mdi-close-circle-outline">
              </v-icon>
            </button-dialog>
          </v-col>
        </v-row>
      </v-card-subtitle>

      <v-card-text>
        <p v-html="boardContent(comment.content)"></p>
      </v-card-text>
    </v-card>
  </div>
</template>

<style scoped>

</style>
