<script setup lang="ts">
import { useCommentsStore } from '@/stores/comments';
import Comment from './Comment.vue';
import CommentForm from './CommentForm.vue';

import { ref } from 'vue';


const props = defineProps<{
    papa:number,
}>()

const replyNick = ref("");

function setReplyNick(nick: string) {
  replyNick.value = nick;
}
</script>
<template>
<div  class="commentList d-grid" >
<template v-for="value of useCommentsStore().comments">
    <Comment v-if="value.papa == props.papa" key="{{value.id }}" @reply="setReplyNick" :comment=value ></Comment>
</template>
<CommentForm  :papa=papa :replyNick="replyNick" ></CommentForm>
</div>
</template>

<style>
.commentList {
    /* display: grid; */
    gap: 15px;
    
}
</style>