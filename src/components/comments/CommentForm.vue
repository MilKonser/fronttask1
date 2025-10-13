<script setup lang="ts">
import Comment from './Comment.vue';

import { API } from '@/ts/api';
import {type comment, type profile} from "@/ts/types"
import {useUserStore} from  "@/stores/profile"
import { defineStore } from 'pinia';
import { useCommentsStore } from '@/stores/comments';

import { ref, watch } from 'vue';

import vueFilePond from "vue-filepond";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import type { FilePondFile } from 'filepond';

const FilePond = vueFilePond(FilePondPluginImagePreview, FilePondPluginFileValidateType);

const props = defineProps<{
  papa: number,
  replyNick: string
}>()

const files:any = ref([])
const inp = defineModel({default: ""})
const comments = useCommentsStore()

watch(()=> props.replyNick,(nick)=>inp.value = nick)

function sendComment(e: Event): void {
  if ("" === inp.value.trim()) return alert("НЕльзя оптравить пустой комментарий")
     comments.createComment(inp.value,"",props.papa);
     
     inp.value = "";
}
const papaComment = comments.getFromId(props.papa)
function updatefiles(fileItems: any) {
  files.value = fileItems.map((fileItem: FilePondFile) => fileItem.file)
  console.log(files.value)
}
</script>

<template>
<div v-show="!papaComment || papaComment.showFrom" class="from" >
<div class="mb-3">
  <label for="exampleFormControlTextarea1" class="form-label">Новый комментарий</label>
  
  <textarea placeholder="Напиши комментарий" title="commentText" class="form-control" v-model="inp" :key="papa"   rows="3"></textarea>
</div>
<div>
  <file-pond @updatefiles="updatefiles" class="filepond" :files="files" ref="pond"
      name="files" :label-idle="'Перетащите файлы или <span class=\'filepond--label-action\'>Выберите</span>'" :allow-multiple="true">
  </file-pond>
  <button class="btn btn-secondary submit"  type="button"   @click="sendComment" >Отправить</button>
   
</div>

</div>
</template>

<style>
@import "filepond/dist/filepond.min.css";
@import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
.submit {
 margin-bottom: 10px;
 margin-top: 5px;
 margin-left: auto;
 display: block;
}
</style>