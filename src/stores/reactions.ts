import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useUserStore } from './profile'
import type { Reaction } from '@/ts/types';



export const useReactionsStore = defineStore('reactions', () => {
  // Состояние - массив всех реакций
  const aviableReactions = ["❤️", "👍", "😄", "🔥", "🤔","💩"];
  const user = useUserStore().user;
  const reactions = ref<Reaction[]>([{
    id: 1,
    commentId:1,
    type: "❤️",
    userId: 1
  },{
    id: 2,
    commentId:1,
    type: "❤️",
    userId: 2
  },{
    id: 3,
    commentId:1,
    type: "👍",
    userId: 3
  }])
    let index = 4;
  /**
   * Создание новой реакции
   * @param type - тип реакции (эмодзи)
   * @param commentId - id комментария
   * @param userId - id пользователя
   * @returns созданная реакция
   */
  const createReaction = (type: string, commentId: number): Reaction => {
    // Проверяем, не поставил ли уже пользователь такую же реакцию на этот комментарий
    const existingReaction = reactions.value.find(
      r => r.commentId === commentId && r.userId === user.id && r.type === type
    )

    if (existingReaction) {
      console.warn('Пользователь уже поставил эту реакцию на данный комментарий')
      return existingReaction
    }

    // Создаем новую реакцию
    const newReaction: Reaction = {
      id: index++,
      type,
      commentId,
      userId: user.id
    }

    reactions.value.push(newReaction)
    return newReaction
  }

  /**
   * Удаление реакции по id
   * @param reactionId - id реакции для удаления
   * @returns true если удаление успешно, false если реакция не найдена
   */
  const deleteReaction = (reactionId: number): boolean => {
    const index = reactions.value.findIndex(r => r.id === reactionId)
    
    if (index === -1) {
      console.warn('Реакция не найдена')
      return false
    }

    reactions.value.splice(index, 1)
    return true
  }

  /**
   * Удаление реакции пользователя на комментарий по типу реакции
   * @param commentId - id комментария
   * @param userId - id пользователя
   * @param type - тип реакции
   * @returns true если удаление успешно, false если реакция не найдена
   */
  const deleteUserReaction = (commentId: number, userId: number, type: string): boolean => {
    const index = reactions.value.findIndex(
      r => r.commentId === commentId && r.userId === userId && r.type === type
    )
    
    if (index === -1) {
      console.warn('Реакция не найдена')
      return false
    }

    reactions.value.splice(index, 1)
    return true
  }

  /**
   * Получение всех реакций для комментария по id комментария
   * @param commentId - id комментария
   * @returns массив реакций для данного комментария
   */
  const getReactionsByCommentId = (commentId: number): Reaction[] => {
    return reactions.value.filter(r => r.commentId === commentId)
  }

  /**
   * Получение количества реакций определенного типа для комментария
   * @param commentId - id комментария
   * @param type - тип реакции
   * @returns количество реакций данного типа
   */
  const getReactionCountByType = (commentId: number, type: string): number => {
    return reactions.value.filter(
      r => r.commentId === commentId && r.type === type
    ).length
  }

  /**
   * Проверка, поставил ли пользователь реакцию на комментарий
   * @param commentId - id комментария
   * @param userId - id пользователя
   * @param type - тип реакции
   * @returns true если пользователь поставил такую реакцию
   */
  const hasUserReacted = (commentId: number, userId: number, type: string): boolean => {
    return reactions.value.some(
      r => r.commentId === commentId && r.userId === userId && r.type === type
    )
  }

  /**
   * Генерация уникального идентификатора
   * @returns уникальный id
   */
  

  return {
    reactions,
    createReaction,
    deleteReaction,
    deleteUserReaction,
    getReactionsByCommentId,
    getReactionCountByType,
    hasUserReacted,
    aviableReactions
  }
})
