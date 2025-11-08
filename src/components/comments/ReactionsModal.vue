<template>
  <div class="modal fade" id="reactionModal" tabindex="-1" aria-labelledby="reactionModalLabel" aria-hidden="true" ref="modalEl">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="reactionModalLabel">Выберите реакцию</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Закрыть"></button>
        </div>
        <div class="modal-body">
          <div class="reactions-row">
            <button v-for="type in reactionTypes"
                    :key="type"
                    class="btn btn-light mx-1"
                    @click="choose(type)">
              {{ type }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
declare const bootstrap: any;
import { useReactionsStore } from "@/stores/reactions";
import { ref, defineEmits } from "vue";


const emit = defineEmits(["select"]);
const reactionTypes = useReactionsStore().aviableReactions
const modalEl = ref(null);

function choose(type:string) {
  emit("select", type);
  hideModal();
}
function showModal():void {
  if (modalEl.value) {
    // eslint-disable-next-line no-undef
    
    new bootstrap.Modal(modalEl.value).show();
  }
}
function hideModal() {
  // eslint-disable-next-line no-undef
  if (modalEl.value) bootstrap.Modal.getInstance(modalEl.value)?.hide();
}
// для вызова showModal() из ReactionList: используйте ref на компонент и expose: showModal
defineExpose({ showModal });
</script>

<style scoped>
.reactions-row { display: flex; justify-content: center; gap: 12px; flex-wrap: wrap;}
</style>
