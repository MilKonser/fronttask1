<script setup lang="ts">
import type { Reaction } from "@/ts/types"
import { useReactionsStore } from '@/stores/reactions';
import { useUserStore } from '@/stores/profile';
import { ref } from 'vue';
import ReactionModal from './ReactionsModal.vue';

const reactions = useReactionsStore()

const { commentId } = defineProps<{
  commentId: number,
}>()


const userReaction = ref("");
let idUR = 0

const rmap = ref(new Map<string, number>())
renderReactions()

function renderReactions() {
  const rs: Reaction[] = reactions.getReactionsByCommentId(commentId);
  rmap.value = new Map<string, number>()
  rs.forEach(r => {

    if (r.userId === useUserStore().user.id) {
      userReaction.value = r.type;
      idUR = r.id
    }

    let value = rmap.value.get(r.type);
    if (value) {
      rmap.value.set(r.type, ++value)
    } else {
      rmap.value.set(r.type, 1)
    }

  });
}

function toggleActive(type: string) {
  if (type == userReaction.value) { //удаление
    userReaction.value = ""
    reactions.deleteReaction(idUR)

  } else if (userReaction.value != "") { //замена
    reactions.deleteReaction(idUR)
    userReaction.value = type
    idUR = reactions.createReaction(type, commentId).id
    reactions.createReaction(type, commentId)

  } else { // чистое создание
    idUR = reactions.createReaction(type, commentId).id
    userReaction.value = type
  }
  renderReactions()
}
interface ReactionModalExpose {
  showModal: () => void;
}
import type { ComponentPublicInstance } from 'vue';
const reactionModal =  ref<ComponentPublicInstance<ReactionModalExpose> | null>(null);;


function openModal() {
  
  reactionModal.value?.showModal();
}
function onModalSelect(type: string) {
  toggleActive(type); // используем уже реализованную функцию
}
</script>
<template>
  <ul class="">
    <li :class="{ active: userReaction === r }" v-on:click="() => toggleActive(r)" v-for="r in rmap.keys()">
      {{ rmap.get(r)}} {{ r }} </li>
    <li> <button @click="openModal"  class="btn"data-bs-toggle="modal" data-bs-target="#newreaction" type="button">+</button></li>
  </ul>

  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="newreaction" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Заголовок модального окна</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Закрыть"></button>
      </div>
      <div class="modal-body">
        ...
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Закрыть</button>
        <button type="button" class="btn btn-primary">Сохранить изменения</button>
      </div>
    </div>
  </div>
</div>
<ReactionModal
    ref="reactionModal"
    
    @select="onModalSelect"
  />
</template>

<style scoped>
li {
  cursor: pointer;
  display: inline-block;
  border: solid black 1px;
  margin: 0 5px;
  padding: 5px;
  border-radius: 25px;
  /* Убираем маркеры */
}

li.active {
  background-color: blue;
}

ul {
  margin-left: 0;
  padding-left: 0;
}
</style>