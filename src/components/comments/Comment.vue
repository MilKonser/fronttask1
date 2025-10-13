<script setup lang="ts">
import { roles, type commentFiles, type comment as commentType } from "@/ts/types"
import CommentList from "./CommentList.vue";
import { API } from "@/ts/api";
import { useCommentsStore } from "@/stores/comments";
import { classicNameResolver } from "typescript";
import { useUserStore } from "@/stores/profile";
import type { FilePond, FilePondEvent, FilePondFile } from "filepond";
import { useCommentFilesStore } from "@/stores/files";

const { comment } = defineProps<{ comment: commentType }>();

const files: commentFiles[] = API.getFilesByCommentId(comment.id)
const user = useUserStore().user
const commentsStore = useCommentsStore()
const emit = defineEmits(["reply"])

let kidsShodew = 0;
if (kidsShodew == comment.kidsCount) comment.kidsRendered = true

function showMore(): void {
    if (comment.kidsRendered) return;
    kidsShodew += useCommentsStore().getCommentsFromApi(kidsShodew, 5, comment.id)
    console.log(kidsShodew)
    if (kidsShodew == comment.kidsCount) comment.kidsRendered = true
}
function answer(e: Event) {
    showMore();
    if (comment.papa === 0) {
        comment.showFrom = !comment.showFrom;
    }
    else {
         const commentPapa = commentsStore.getFromId(comment.papa);
         if(commentPapa)  commentPapa.showFrom = true;
          emit("reply",comment.name+", ")
          console.log(comment.name)
    }
   
}
function deleteComment(e: Event) {
    showMore()
    useCommentsStore().deleteComment(comment.id)
}
</script>
<template>

    <div :class="{ card: true, employer: comment.role === roles.EMPLOYER, creator: comment.role == roles.CREATOR }">
        <div class="card-header d-flex">
            <div class="comment-name me-3">{{ comment.name }}</div>
            <div class="comment-role">{{ comment.role }}</div>
            <div class="comment-time text-center flex-fill">{{ comment.time }}</div>
            <button type="button" @click="deleteComment" v-if="user.id === 1">X</button>
        </div>
        <div class="card-body d-flex">
            <div class="flex-fill">
            {{ comment.msg }}
            <!-- <p>ПАПА: {{ comment.papa }}</p>
            <p>Id: {{ comment.id }}</p> -->
            </div>
        <ul class="d-flex flex-column border-start">
            
        <li v-for="(file, index) in files" :key="index" class="file-item">
        
          <template v-if="file.type.startsWith('image/')">
            <img :src="file.path" alt="preview" class="file-preview" />
          </template>
          <template v-else>
            <a :href="file.path"><span class="file-icon">📎</span></a>
          </template>
          <span class="file-name">{{ file.name }}</span>
        </li>
      </ul>
        </div>
        <div class="card-footer d-flex">
            <button type="button" v-if="comment.papa == 0 && comment.kidsCount > 0 && !comment.kidsRendered"
                @click="showMore" class="btn btn-primary">Показать </button>
            <h4 v-if="comment.papa == 0">Комментариев: {{ comment.kidsCount }}</h4>
            <button type="button" class="btn btn-primary" @click="answer">{{ comment.showFrom ? "Скрыть" :
                "Ответить"}}</button>
            <div class="comment-files">

            </div>
        </div>

    </div>
    <template v-if="comment.papa === 0" {{ comment.kidsRendered=true }}>
        <CommentList :papa="comment.id" class="ms-3" formId="{{'nigga'+comment.id }}"></CommentList>
    </template>
</template>

<style>
.creator {
    border: 1px solid purple;

    .comment-name {
        color: purple;
        font-weight: bold;
    }
}

.employer {
    border: 1px solid blue;

    .comment-name {
        color: blue;
        font-weight: bold;
    }
}

.file-list {
  margin-top: 20px;
}
.file-item {
  margin-bottom: 10px;
  display: flex;
  align-items: center;
}
.file-preview {
  width: 60px;
  height: 60px;
  object-fit: cover;
  margin-right: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
}
.file-icon {
  font-size: 30px;
  margin-right: 10px;
}
.file-name {
  font-size: 14px;
}
</style>