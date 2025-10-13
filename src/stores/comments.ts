import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { type profile, roles, type comment } from '../ts/types'
import { useUserStore } from './profile'

import { API } from "@/ts/api"

export const useCommentsStore = defineStore('comments', {
  state: () => ({
    index: 8 as number,
    totalComments: 8 as number,
    globalGetted: 0 as number,
    comments: [] as comment[],
  }),

  actions: {
    getCommentsFromApi(start: number, count: number, papa: number): number {

      if (papa === 0) {
        const newComs = API.getComments(this.globalGetted, count, papa)
        this.comments.push(...newComs);
        if (papa === 0) this.globalGetted += newComs.length;
        return newComs.length
      }
      else {
        const newComs = API.getComments(start, count, papa)
        this.comments.push(...newComs);
        return newComs.length
      }

    },
    createComment(body: string, file: string, papa: number) {
      const creator: profile = useUserStore().user;
      const newComment: comment = {
        "name": creator.name,
        "id": ++this.index,
        "time": new Date(),
        "role": creator.role,
        "msg": body,
        "papa": papa,
        "kidsCount": 0,
        kidsRendered: false,
        showFrom: false,
      }
      const papaComment = this.getFromId(papa)
      if (papaComment != null) papaComment.kidsCount++

      this.comments.push(newComment);
      this.totalComments++
    },
    getFromId(id: number): comment | null {
      if (id <= 0) return null;
      for (let comment of this.comments) {
        if (comment.id === id) return comment;
      }
      return null;
    },
    deleteComment(id: number) {

      this.comments = this.comments.filter(e => { 
        
         return  ((e.id != id && e.papa != id) || (this.totalComments-- && false) )
      })

    }

  },

})
